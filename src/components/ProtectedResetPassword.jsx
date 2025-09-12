import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ResetPassword from './ResetPassword';

const ProtectedResetPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        // Check if user came through proper OTP verification flow
        const { email, verified } = location.state || {};
        
        if (!verified || !email) {
            setIsAuthorized(false);
            setIsLoading(false);
            return;
        }
        
        setIsAuthorized(true);
        setIsLoading(false);
    }, [location.state]);
    
    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    if (!isAuthorized) {
        // Use navigate to redirect imperatively
        navigate('/forgot-password', { replace: true });
        return null;
    }

    // Use navigate to go to /reset-password with email in state
    navigate('/reset-password', { state: { email: location.state.email } });
    return null;
};

export default ProtectedResetPassword;