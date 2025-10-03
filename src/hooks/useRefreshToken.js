import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token available');

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/refresh`, {
                token: refreshToken
            });

            console.log(response.data);
            const { accessToken, user } = response.data;

            setAuth(prev => ({ ...(prev || {}), user, accessToken }));
            localStorage.setItem('user', JSON.stringify(user));
            
            return accessToken;
        } catch (err) {
            console.error('Refresh token error:', err);
            throw err;
        }
    };
    return refresh;
};

export default useRefreshToken;