import { useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const Success = () => {
    const { setAuth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const refreshUser = async () => {
      try {
        // axiosPrivate should send credentials (cookies) and baseURL '/api' or full URL.
        // If axiosPrivate already prefixes '/api', call '/refresh'.
        // Otherwise call `${import.meta.env.VITE_BACKEND_URL}/api/refresh`.
        const res = await axiosPrivate.get(`${import.meta.env.VITE_BACKEND_URL}/refresh`); // or get('/api/refresh') depending on your axios config

        // backend returns { user, accessToken, roles } per your /refresh implementation
        const user = res.data.user;
        const accessToken = res.data.accessToken;

        // update context
        setAuth(prev => ({ ...(prev || {}), user, accessToken }));

        // update localStorage so other tabs and future reloads use fresh user data
        localStorage.setItem('user', JSON.stringify(user));

      } catch (err) {
        console.error('Could not refresh user after checkout:', err?.response?.data || err.message);
        // You may want to show an error or still allow the user to continue
      }
    };

    // run it once on mount
    refreshUser();
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