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
        return <Navigate to="/forgot-password" replace />;
    }
    
    return <ResetPassword email={location.state.email} />;
};

export default ProtectedResetPassword;