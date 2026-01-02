import { useState } from 'react';
import { format, addWeeks, subWeeks, startOfWeek, addDays, isSameDay } from 'date-fns';

const Calendar = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  // Example events (replace with your own or fetch from backend)
  const events = [
    {
      date: new Date(2025, 8, 12), // Sept 12 2025
      title: 'INVOLVEMENT FAIR',
      location: '@DEPAUL QUAD',
      time: '1:00PM-4:00PM',
    },
    {
      date: new Date(2025, 8, 19), // Sept 19 2025
      title: 'CLUB MEETING',
      location: '@LP',
      time: '1:00PM-4:00PM',
    },
    {
      date: new Date(2025, 8, 20), // Sept 20 2025
      title: 'CHI-TOWN COMP',
      location: '@WRIG',
      time: 'FINALS @ 6',
    },
    {
      date: new Date(2025, 8, 24), // Sept 24 2025
      title: 'CLUB MEETING',
      location: '@WRIG',
      time: '6:00-9:00PM',
    },
    {
      date: new Date(2025, 8, 26), // Sept 26 2025
      title: 'CLUB MEETING',
      location: '@LP',
      time: '1:00PM-4:00PM',
    },
    {
      date: new Date(2025, 9, 1), // Oct 1 2025
      title: 'CLUB MEETING',
      location: '@LP',
      time: '6:00PM-9:00PM',
    },
    {
      date: new Date(2025, 9, 3), // Oct 3 2025
      title: 'CLUB MEETING',
      location: '@WRIG',
      time: '1:00PM-4:00PM',
    },
    {
      date: new Date(2025, 9, 8), // Oct 8 2025
      title: 'CLUB MEETING',
      location: '@WRIG',
      time: '6:00PM-9:00PM',
    },
    {
      date: new Date(2025, 9, 10), // Oct 10 2025
      title: 'CLUB MEETING',
      location: '@LP',
      time: '1:00PM-4:00PM',
    },
    {
      date: new Date(2025, 9, 15), // Oct 15 2025
      title: 'CLUB MEETING',
      location: '@WRIG',
      time: '6:00PM-9:00PM',
    },
    {
      date: new Date(2025, 9, 17), // Oct 17 2025
      title: 'CLUB MEETING',
      location: '@LP',
      time: '1:00PM-4:00PM',
    },
    {
      date: new Date(2025, 9, 22), // Oct 22 2025
      title: 'CLUB MEETING',
      location: '@LP',
      time: '6:00PM-9:00PM',
    },
    {
      date: new Date(2025, 9, 24), // Oct 24 2025
      title: 'CLUB MEETING',
      location: '@WRIG',
      time: '1:00PM-4:00PM',
    },
    {
      date: new Date(2025, 9, 29), // Oct 29 2025
      title: 'CLUB MEETING',
      location: '@WRIG',
      time: '1:00PM-4:00PM',
    },
    {
      date: new Date(2025, 9, 31), // Oct 31 2025
      title: 'CLUB MEETING',
      location: '@LP',
      time: '1:00PM-4:00PM',
    },
    {
      date: new Date(2025, 10, 5), // Nov 5 2025
      title: 'CLUB MEETING',
      location: '@WRIG',
      time: '6:00PM-9:00PM',
    },
    {
      date: new Date(2025, 10, 7), // Nov 7 2025
      title: 'CLUB MEETING',
      location: '@LP',
      time: '1:00PM-4:00PM',
    },
    {
      date: new Date(2025, 10, 12), // Nov 12 2025
      title: 'CLUB MEETING',
      location: '@LP',
      time: '6:00PM-9:00PM',
    },
    {
      date: new Date(2025, 10, 14), // Nov 14 2025
      title: 'CLUB MEETING',
      location: '@WRIG',
      time: '1:00PM-4:00PM',
    },
    // Winter Quarter
    {
      date: new Date(2026, 0, 9), // Jan 9 2026
      title: 'CLUB MEETING',
      location: '@LP',
      time: '1:00PM-4:00PM',
    },
    {
      date: new Date(2026, 0, 14), // Jan 14 2026
      title: 'CLUB MEETING',
      location: '@WRIG',
      time: '6:00PM-9:00PM',
    },
    {
      date: new Date(2026, 0, 16), // Jan 16 2026
      title: 'CLUB MEETING',
      location: '@LP',
      time: '1:00PM-4:00PM',
    },
    {
      date: new Date(2026, 0, 21), // Jan 21 2026
      title: 'CLUB MEETING',
      location: '@LP',
      time: '6:00PM-9:00PM',
    },
    {
      date: new Date(2026, 0, 23), // Jan 23 2026
      title: 'CLUB MEETING',
      location: '@WRIG',
      time: '1:00PM-4:00PM',
    },
    {
      date: new Date(2026, 0, 28), // Jan 28 2026
      title: 'CLUB MEETING',
      location: '@WRIG',
      time: '6:00PM-9:00PM',
    },
    {
      date: new Date(2026, 0, 30), // Jan 30 2026
      title: 'CLUB MEETING',
      location: '@LP',
      time: '1:00PM-4:00PM',
    },
    {
      date: new Date(2026, 1, 4), // Feb 4 2026
      title: 'CLUB MEETING',
      location: '@WRIG',
      time: '6:00PM-9:00PM',
    },
    {
      date: new Date(2026, 1, 6), // Feb 6 2026
      title: 'CLUB MEETING',
      location: '@LP',
      time: '1:00PM-4:00PM',
    },
    {
      date: new Date(2026, 1, 11), // Feb 11 2026
      title: 'CLUB MEETING',
      location: '@LP',
      time: '6:00PM-9:00PM',
    },
    {
      date: new Date(2026, 1, 13), // Feb 13 2026
      title: 'CLUB MEETING',
      location: '@WRIG',
      time: '1:00PM-4:00PM',
    },
    {
      date: new Date(2026, 1, 18), // Feb 18 2026
      title: 'CLUB MEETING',
      location: '@WRIG',
      time: '6:00PM-9:00PM',
    },
    {
      date: new Date(2026, 1, 20), // Feb 20 2026
      title: 'CLUB MEETING',
      location: '@LP',
      time: '1:00PM-4:00PM',
    },
    {
      date: new Date(2026, 1, 25), // Feb 25 2026
      title: 'CLUB MEETING',
      location: '@WRIG',
      time: '6:00PM-9:00PM',
    },
    {
      date: new Date(2026, 1, 27), // Feb 27 2026
      title: 'CLUB MEETING',
      location: '@LP',
      time: '1:00PM-4:00PM',
    },
    {
      date: new Date(2026, 2, 4), // Mar 4 2026
      title: 'CLUB MEETING',
      location: '@LP',
      time: '6:00PM-9:00PM',
    },
    {
      date: new Date(2026, 2, 6), // Mar 6 2026
      title: 'CLUB MEETING',
      location: '@WRIG',
      time: '1:00PM-4:00PM',
    },
    {
      date: new Date(2026, 2, 11), // Mar 11 2026
      title: 'CLUB MEETING',
      location: 'WRIG',
      time: '6:00PM-9:00PM',
    },
    {
      date: new Date(2026, 2, 13), // Mar 13 2026
      title: 'CLUB MEETING',
      location: '@LP',
      time: '1:00PM-4:00PM',
    }
  ];

  const start = startOfWeek(currentWeek, { weekStartsOn: 0 }); // Sunday start

  const days = Array.from({ length: 7 }).map((_, i) => addDays(start, i));

  return (
    <div className="bg-[#EEFCFF] p-6 staatliches text-[#011638] min-h-screen">

        <div>
            <h2 className="text-4xl">2025-2026</h2>
            <h1 className="text-6xl">Calendar</h1>
        </div>
      {/* Header */}
      <div className="flex items-center justify-center gap-x-8 mb-6">
        <button
          onClick={() => setCurrentWeek(subWeeks(currentWeek, 1))}
          className="text-3xl px-5 py-2 hover:bg-blue-200 rounded"
        >
          &lt;
        </button>
        <h2 className="text-3xl">
          {format(days[0], 'MMMM d')} - {format(days[6], 'MMMM d, yyyy')}
        </h2>
        <button
          onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}
          className="text-3xl px-5 py-2 hover:bg-blue-200 rounded"
        >
          &gt;
        </button>
      </div>

      {/* Calendar grid */}
      <div className="overflow-x-auto">
        <div className="grid grid-cols-7 min-w-[950px] border-4 border-[#011638] min-h-96">
          {days.map((day) => (
            <div
              key={day}
              className="border-r border-[#011638] last:border-r-0 flex flex-col p-4"
            >
              {/* Day Header */}
              <div className="text-center text-2xl lg:text-4xl">
                {format(day, 'EEE').toUpperCase()}
              </div>
              <div className="text-center text-lg lg:text-2xl mb-2 border-b border-[#011638]">
                {format(day, 'MMM. do').toUpperCase()}
              </div>

              {/* Events */}
              <div className="flex flex-col gap-4 text-lg lg:text-2xl">
                {events
                  .filter((event) => isSameDay(event.date, day))
                  .map((event, idx) => (
                    <div key={idx} className="bg-[#011638] text-white p-2 rounded">
                      <p>{event.title}</p>
                      <p className="text-[#D7263D]">{event.location}</p>
                      <p>{event.time}</p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

        {/* Location Section */}
        <div className="flex border-4 border-[#011638] p-6 mt-6 max-w-2xl mx-auto bg-white justify-between">
          <img
            src="../../img/location-icon.png"
              alt="Location Icon"
            className="lg:w-48 lg:h-48 md:w-36 md:h-36 w-24 h-24"
             />
            <div className="flex flex-col items-center mr-14 mt-4 text-3xl">
              
            <div className="text-center">
                <p className="uppercase">Movement Lincoln Park (LP)</p>
                <p className="text-lg">1460 N Dayton St, Chicago, IL 60642</p>
                <p className="uppercase mt-4">Movement Wrigleyville (WRIG)</p>
                <p className="text-lg">1115 W Addison St, Chicago, IL 60613</p>
              </div>
            </div>
        </div>

        {/* Transportation Section */}
        <div className="mb-24">
            <div className="flex flex-col justify-center items-center">
                <div className="flex items-center justify-center mt-12">
                <div className="h-0.5 w-48 bg-[#233EA1]"></div>
                <h2 className="mx-4 tracking-wider text-4xl">Transportation</h2>
                <div className="h-0.5 w-48 bg-[#233EA1]"></div>
                </div>

                <div className="flex text-center mt-6 w-1/2">
                    <p className="text-lg">*for Those taking the CTA, we meet around 15 minutes before club starts at the fullerton station  to take the train together! send a text into the groupme so we know who's coming.</p>
                </div>
            </div>

                <div className="flex flex-col lg:mr-72 lg:ml-72">
                    <p className="text-4xl mt-4 text-[#D7263D]">
                        To LP
                    </p>

                    <ul className="list-disc list-outside space-y-2 text-2xl mt-4 ml-4 pl-6">
                        <li>5 minute walk from red line North/Clyborn station</li>
                    </ul>
                </div>

                <div className="flex flex-col lg:mr-72 lg:ml-72">
                    <p className="text-4xl mt-4 text-[#D7263D]">
                        To WRIG
                    </p>

                    <ul className="list-disc list-outside space-y-2 text-2xl mt-4 ml-4 pl-6">
                        <li>5 minute walk from red line Addison station</li>
                        <ul className="list-disc list-outside ml-4 text-xl">
                            <li>Be aware that trains can get crowded during Cubs gamedays</li>
                        </ul>
                        <li>Wrig validates for the Hotel Zachary parking lot across the street when
                            there are no games/events at wrigley field
                        </li>
                        <ul className="list-disc list-outside ml-4 text-xl">
                            <li>$6 for 4 hours</li>
                        </ul>
                    </ul>
                </div>
        </div>

    </div>
  );
};

export default Calendar;
