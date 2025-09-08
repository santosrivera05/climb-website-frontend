import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Passes from './components/Passes';
import Exec from './components/Exec';
import RequireAuth from './components/RequireAuth';
import Unauthorized from './components/Unauthorized';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Success from './components/Success';
import Cancel from './components/Cancel';
import Calendar from './components/Calendar';
import FirstTimeChecklist from './components/FirstTimeChecklist';
import ForgotPassword from './components/ForgotPassword';
import OTP from './components/OTP';
import ProtectedResetPassword from './components/ProtectedResetPassword';

import useRefreshToken from './hooks/useRefreshToken';
import useAuth from './hooks/useAuth';
import { useEffect, useState } from 'react';

const ROLES = { // Define roles for authorization, still need to implement for Exec page
  'User': 2001,
  'Admin': 5150,
}

function App() {

  const refresh = useRefreshToken();
  const { setAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
      const stored = localStorage.getItem("user");
      const storedUser = stored ? JSON.parse(stored) : null;
      if (storedUser) {
        setAuth(prev => ({ ...prev, user: storedUser }));
      }
    } catch (error) {
      console.log('Error parsing user from localStorage:', error);
      localStorage.removeItem("user");
    }

      try {
        await refresh(); // Wait for refresh to complete
      } catch (error) {
        console.log('No valid refresh token');
      } finally {
        setIsLoading(false); // Always set loading to false
      }
    };

    initializeAuth();
  }, []);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div>Loading...</div>
      </div>
    );
  }
    
  return (
    <>
    <Navbar />
     <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/passes' element={<Passes/>}/>
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]}/>}>
          <Route path='/exec' element={<Exec/>}/>
        </Route>
        <Route path='/unauthorized' element={<Unauthorized/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/success' element={<Success/>}/>
        <Route path='/cancel' element={<Cancel/>}/>
        <Route path='/calendar' element={<Calendar/>}/>
        <Route path='/first-time-checklist' element={<FirstTimeChecklist/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/otp' element={<OTP/>}/>
        <Route path='/reset-password' element={<ProtectedResetPassword/>}/>
        <Route path='*' element={<h1>404 Not Found</h1>}/>
     </Routes>
    <Footer />
    </>
    
  );
}

export default App