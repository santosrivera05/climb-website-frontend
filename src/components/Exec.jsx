import { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

function Exec() {
    const [data, setData] = useState([]);
    const [checkInData, setCheckInData] = useState([]);
    const [search, setSearch] = useState('');
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/users`)
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/check-ins`)
            .then(res => res.json())
            .then(data => setCheckInData(data))
            .catch(err => console.log(err));
    }, []);

    // Filter users by search (case-insensitive, first or last name)
    const filteredData = data.filter(d =>
        `${d.First} ${d.Last}`.toLowerCase().includes(search.toLowerCase()) ||
        `${d.Last} ${d.First}`.toLowerCase().includes(search.toLowerCase())
    );

    // Get row color based on pass count
    const getRowStyle = (passes, membership, dues) => {
        if (dues === 0) return { border: '2px solid red', background: '#ff7878' };
        if (membership === 1) return { border: '2px solid blue', background: '#49c6f0ff' };
        if (passes === 0) return { border: '2px solid red', background: '#ff7878' };
        if (passes === 1) return { border: '2px solid orange', background: '#f2fa7f'};
        if (passes >= 2) return { border: '2px solid green', background: '#6ef07b'};
        return {};
    };

    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return date.toLocaleString('en-US', {
            timeZone: 'America/Chicago',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
    };

    const handlePassUse = async (firstName, lastName, email, membership) => {

        try {
            const response = await axiosPrivate.post(`${import.meta.env.VITE_BACKEND_URL}/use-pass`, 
                { firstName, lastName, email, membership });
            if (response.status === 200) {
                if (membership === 0) {
                setData(prevData =>
                    prevData.map(user =>
                        user.Email === email ?
                            { ...user, Passes: user.Passes - 1 }
                    : user
                        )
                    );
                }
            const newCheckIn = {
                First: firstName,
                Last: lastName,
                Email: email,
                DateTime: response.data.dateTime
            };
            console.log(newCheckIn.DateTime);
                setCheckInData(prevData => [newCheckIn, ...prevData]);
            } else {
                console.log('Error using pass:', response.data);
            }
        } catch (err) {
            console.error('Error:', err.response?.data || err.message);
        }
    };

    const handleUndo = async (email, membership, dateTime) => {

        try {
            const response = await axiosPrivate.post(`${import.meta.env.VITE_BACKEND_URL}/undo-check-in`, 
                { email, membership, dateTime });
            if (response.status === 200) {
                if (membership === 0) {
                setData(prevData =>
                    prevData.map(user =>
                        user.Email === email ?
                            { ...user, Passes: user.Passes + 1 }
                    : user
                        )
                    );
                }

                // Remove check-in from the table
                const deletedEmail = response.data.email;
                const deletedDateTime = response.data.dateTime;
                setCheckInData(prevData => prevData.filter(checkIn => !(
                        checkIn.Email === deletedEmail &&
                        checkIn.DateTime === deletedDateTime
                    ))
                )
            } else {
                console.log('Error undoing check-in:', response.data);
            }
        } catch (err) {
            console.error('Error:', err.response?.data || err.message);
        }
    };

    return (
    <div className="flex px-8 py-4">
        {/* Users Table */}
        <div className="flex-1 mb-36">
        <h1 className="text-2xl font-bold mb-4">Users</h1>

        <input
            type="search"
            placeholder="Search by Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4 p-2 w-72 border-2 border-gray-300 rounded"
        />

        <table className="w-full border-collapse border-spacing-x-4">
            <thead>
            <tr className="text-left">
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Passes</th>
                <th className="p-2">Dues</th>
                <th className="p-2">Member</th>
                <th className="p-2">Actions</th>
            </tr>
            </thead>
            <tbody>
            {filteredData.map((d, i) => (
                <tr key={i} style={getRowStyle(d.Passes, d.Membership, d.Dues)}>
                <td className="p-2">{d.Last}, {d.First}</td>
                <td className="p-2">{d.Email}</td>
                <td className="p-2">{d.Passes}</td>
                <td className="p-2">{d.Dues === 1 ? "Yes" : "No"}</td>
                <td className="p-2">{d.Membership === 1 ? "Yes" : "No"}</td>
                <td className="p-2">
                    <button
                    className={`px-3 py-1 rounded text-white 
                        ${d.Passes === 0 
                        ? "bg-gray-400 cursor-not-allowed" 
                        : "bg-red-600 hover:bg-red-700"
                        }`}
                    onClick={() => handlePassUse(d.First, d.Last, d.Email, d.Membership)}
                    disabled={d.Passes === 0}
                    >
                    { d.Membership === 1 ? "Check In" : "Use Pass" }
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>

        {/* Check-ins Table */}
        <div className="flex-1 ml-12 mb-36">
        <h1 className="text-2xl font-bold mb-4">Check-Ins</h1>

        <table className="w-full border-collapse border-spacing-x-4 mt-20">
            <thead>
            <tr className="text-left">
                <th className="p-2">Date</th>
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Membership</th>
                <th className="p-2">Actions</th>
            </tr>
            </thead>
            <tbody>
            {checkInData.map((d, i) => (
                <tr key={i} className="odd:bg-gray-100">
                <td className="p-2">{formatDateTime(d.DateTime)}</td>
                <td className="p-2">{d.Last}, {d.First}</td>
                <td className="p-2">{d.Email}</td>
                <td className="p-2">{d.Membership === 1 ? "Yes" : "No"}</td>
                <td className="p-2">
                    <button
                    className={'px-3 py-1 rounded text-white bg-red-600 hover:bg-red-700'}
                    onClick={() => handleUndo(d.Email, d.Membership, d.DateTime)}
                    >
                    Undo
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    </div>
    );
}

export default Exec;