import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import useRefreshToken from '../hooks/useRefreshToken';
import { loadStripe } from '@stripe/stripe-js';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

function Passes() {

    const { auth, setAuth } = useAuth(); // Use the useAuth hook to get auth state
    const refresh = useRefreshToken();
    const axiosPrivate = useAxiosPrivate();

    const [passQuantity, setPassQuantity] = useState(1);

    const handlePassQuantityChange = (e) => {
        setPassQuantity(e.target.value);
    };

    // Refresh user info from backend on mount to ensure most recent data
    useEffect(() => {
        const updateUser = async () => {
            try {
                const response = await refresh(); // refresh hook returns updated user info
            } catch (err) {
                console.error('Could not refresh user data on Passes page:', err?.response?.data || err.message);
            }
        };
        updateUser();
    }, []);

    const handlePurchase = async (passQuantity) => {

        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE); // Stripe publishable key

        const response = await axiosPrivate.post(`${import.meta.env.VITE_BACKEND_URL}/purchase-passes`, {
            email: auth?.user?.Email,
            passes: passQuantity,
            price: passQuantity *18 // Pass price set to $18 each
        });

        const session = await response.data;

        const result = stripe.redirectToCheckout({
            sessionId: session.id
        });

        if (result.error) {
            console.error(result.error.message);
        }
    };

    const handleDues = async () => {

        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE); // Stripe publishable key

        const response = await axiosPrivate.post(`${import.meta.env.VITE_BACKEND_URL}/purchase-dues`, {
            email: auth?.user.Email,
            price: 10
        });

        const session = await response.data;

        const result = stripe.redirectToCheckout({
            sessionId: session.id
        });

        if (result.error) {
            console.error(result.error.message);
        }
    };

    return (
        <div className="bg-[#EEFCFF] min-h-screen">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between">

            {/* Pass Count */}
            <div className="flex flex-col items-center lg:ml-16 gap-8 mt-12 text-center staatliches">

                { auth?.user ?
                    <div className="bg-[#011638] flex text-white flex-col items-center text-2xl md:text-3xl lg:text-5xl 
                    px-2 py-4 lg:px-4 lg:py-8 w-70 h-80 md:w-98 md:h-84 lg:w-140 lg:h-120">
                        <div className="mt-4 md:mt-6 lg:mt-8">

                                <p className="mb-6 md:mb-6 lg:mb-10">
                                    Hello, {auth.user.First} {auth.user.Last}!
                                </p>

                            <p className="text-lg md:text-2xl lg:text-4xl">You have...</p>
                        </div>

                        <div className="gap-4 bg-[#D7263D] text-[#011638] w-1/2 py-2 px-4 md:py-4 md:px-8 mb-6 mt-2">
                            <p>{auth.user.Passes} Passes</p>
                        </div>

                        { auth?.user.Dues === 1 ?
                        <div>
                            <p>All Dues Are</p>
                            <p>Currently Paid!</p>
                        </div>
                        :
                        <div>
                            <p className="text-[#D7263D] mb-4 text-lg md:text-2xl lg:text-4xl">Unpaid Dues</p>
                            <p>Pay Dues to Buy Passes</p>
                        </div>
                        }
                    </div>
                
                :
                    <div className="bg-[#011638] flex text-white flex-col items-center text-2xl md:text-3xl lg:text-5xl 
                    px-2 py-4 lg:px-4 lg:py-8 w-70 h-80 md:w-98 md:h-90 lg:w-140 lg:h-120">
                        <div className="mt-4 md:mt-6 lg:mt-8">

                        <div className="mb-4">
                            <p>Please Login to View and </p>
                            <p>Buy Passes</p>
                        </div>

                            <p className="text-lg md:text-2xl lg:text-4xl">You have...</p>
                        </div>

                        <div className="gap-4 bg-[#D7263D] text-[#011638] w-1/2 py-2 px-4 md:py-4 md:px-8 mb-6 mt-2">
                            <p>- Passes</p>
                        </div>

                        <div>
                            <p className="text-[#D7263D]">-</p>
                            <p className="">Unpaid Dues</p>
                        </div>
                    </div>
                }

            </div>

             {/* Purchase Boxes */}
            <div className="flex flex-col items-center justify-center gap-6 mt-8 lg:mt-12 lg:mr-24 staatliches text-xl sm:text-2xl lg:text-3xl w-full px-4">
            <div className="border-2 border-[#233EA1] mt-8 px-4 py-6 text-center w-full max-w-sm sm:max-w-md lg:w-[120%]">
                <p className="mb-4">Purchase Passes</p>
                <select
                className="border-2 border-[#233EA1] px-2 py-1 hover:cursor-pointer w-full sm:w-auto"
                value={passQuantity}
                onChange={handlePassQuantityChange}
                >
                <option value={1}>1 Pass - $18.00</option>
                <option value={2}>2 Passes - $36.00</option>
                <option value={3}>3 Passes - $54.00</option>
                <option value={4}>4 Passes - $72.00</option>
                <option value={5}>5 Passes - $90.00</option>
                <option value={6}>6 Passes - $108.00</option>
                <option value={7}>7 Passes - $126.00</option>
                <option value={8}>8 Passes - $144.00</option>
                <option value={9}>9 Passes - $162.00</option>
                <option value={10}>10 Passes - $180.00</option>
                </select>
                {auth?.user?.Dues === 0 || !auth?.user ? (
                <button
                    className="mt-4 bg-gray-400 text-white px-4 py-2 w-full sm:w-auto hover:cursor-not-allowed"
                    disabled={true}
                >
                    Buy
                </button>
                ) : (
                <button
                    className="mt-4 bg-[#233EA1] text-white px-4 py-2 w-full sm:w-auto hover:cursor-pointer"
                    onClick={() => handlePurchase(passQuantity)}
                >
                    Buy
                </button>
                )}
            </div>

            <div className="border-2 border-[#233EA1] px-4 py-6 text-center w-full max-w-sm sm:max-w-md lg:w-[120%] 
            mb-8 tracking-wide">
                <p>Purchase Membership</p>
                <p>Dues</p>

                <div className="flex justify-center mt-4">
                <p className="border-2 border-[#233EA1] px-6 py-2">$10</p>
                {!auth?.user || auth?.user.Dues === 1 ? (
                    <button
                    className="ml-2 bg-gray-400 text-white px-4 py-2 hover:cursor-not-allowed"
                    disabled={true}
                    >
                    Buy
                    </button>
                ) : (
                    <button
                    className="ml-2 bg-[#233EA1] text-white px-4 py-2 hover:cursor-pointer"
                    onClick={() => handleDues()}
                    >
                    Buy
                    </button>
                )}
                </div>
            </div>
            </div>
        </div>

            {/* How It Works Info Section */}
            <section className="px-4 sm:px-8 pb-16 md:pb-24 pt-4 max-w-5xl mx-auto text-[#011638]">

                <div className="flex items-center justify-center mb-8 md:mb-10">
                    <div className="h-px flex-1 max-w-24 sm:max-w-32 bg-[#011638]"></div>
                    <h2 className="staatliches mx-4 text-center text-3xl md:text-5xl tracking-wide">HOW IT WORKS</h2>
                    <div className="h-px flex-1 max-w-24 sm:max-w-32 bg-[#011638]"></div>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-10">

                    <div className="bg-white border-2 border-[#233EA1] p-6 flex flex-col items-center text-center">
                        <div className="staatliches bg-[#011638] text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl mb-4 shrink-0">1</div>
                        <p className="staatliches text-xl md:text-2xl tracking-wide mb-2">PAY QUARTERLY DUES</p>
                        <p className="text-base md:text-lg leading-snug">
                            To come to any club meeting, you must first purchase quarterly dues for <span className="font-bold">$10</span>.
                        </p>
                    </div>

                    <div className="bg-white border-2 border-[#233EA1] p-6 flex flex-col items-center text-center">
                        <div className="staatliches bg-[#011638] text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl mb-4 shrink-0">2</div>
                        <p className="staatliches text-xl md:text-2xl tracking-wide mb-2">GET A DAY PASS</p>
                        <p className="text-base md:text-lg leading-snug">
                            Each club meeting requires at least one day pass. You can buy multiple at a time so you're covered for future meetings.
                        </p>
                    </div>

                    <div className="bg-white border-2 border-[#233EA1] p-6 flex flex-col items-center text-center">
                        <div className="staatliches bg-[#011638] text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl mb-4 shrink-0">3</div>
                        <p className="staatliches text-xl md:text-2xl tracking-wide mb-2">CHECK IN AT THE DESK</p>
                        <p className="text-base md:text-lg leading-snug">
                            At the meeting, check in with the front desk and let them know you're here for DePaul Climbing. They'll confirm your dues and pass.
                        </p>
                    </div>

                </div>

                {/* Movement Members + What's Included */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

                    <div className="bg-[#011638] text-white p-6 flex flex-col items-center text-center">
                        <p className="staatliches text-xl md:text-2xl tracking-wide mb-2 text-[#D7263D]">HAVE A MOVEMENT MEMBERSHIP?</p>
                        <p className="text-base md:text-lg leading-snug">
                            If you have a Movement Gyms membership, you do <span className="font-bold">not</span> need to buy day passes to attend club meetings. You'll still need to pay quarterly dues.
                        </p>
                    </div>

                    <div className="bg-white border-4 border-[#011638] p-6 flex flex-col items-center text-center">
                        <p className="staatliches text-xl md:text-2xl tracking-wide mb-3">YOUR DAY PASS INCLUDES</p>
                        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                            <span className="staatliches bg-[#EEFCFF] border-2 border-[#233EA1] px-3 py-1 text-base md:text-xl tracking-wide">RENTAL SHOES</span>
                            <span className="staatliches bg-[#EEFCFF] border-2 border-[#233EA1] px-3 py-1 text-base md:text-xl tracking-wide">CHALK</span>
                            <span className="staatliches bg-[#EEFCFF] border-2 border-[#233EA1] px-3 py-1 text-base md:text-xl tracking-wide">HARNESS</span>
                        </div>
                    </div>

                </div>

            </section>

        </div>
        );
}

export default Passes;