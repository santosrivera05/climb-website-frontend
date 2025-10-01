import { useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import useRefreshToken from '../hooks/useRefreshToken'; 
const Success = () => {
    const { setAuth } = useAuth();
    const refresh = useRefreshToken();

    useEffect(() => {
        const updateUserAfterPurchase = async () => {
            try {
                const response = await refresh(); // This should refresh tokens and return updated user info
            } catch (err) {
                console.error('Could not refresh user after purchase:', err?.response?.data || err.message);
            }
        };

        updateUserAfterPurchase();
    }, []);

    return (
        <div className="min-h-screen bg-[#EEFCFF]">
            <h1 className="text-4xl text-center mb-4 py-4 staatliches">
                    Thank you for your purchase!
            </h1>

            <img className="block mx-auto w-75" src='../../img/happycat.jpg' alt='Thank you'/>
        </div>
    )
}

export default Success;