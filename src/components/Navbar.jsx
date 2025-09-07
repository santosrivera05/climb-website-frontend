import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import '../App.css';
import axios from '../api/axios';

function Navbar() {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  const handleLogout = async () => {
    setAuth(null);
    localStorage.clear();
    try {
      const response = await axios.post(`${process.env.BACKEND_URL}/logout`, {}, {
        withCredentials: true
      });
      console.log(auth);
      
      if (response.status === 200) {
        console.log('Logout successful');
      }
      } catch (err) {
        console.error(err);
      }

    }

  return (
    <div className="navbar relative flex items-center p-1 text-white text-2xl h-16" >

      {auth?.user && auth.user.Role === 5150 && (
        <div className="exec-container absolute top-0 left-0 h-full pl-4 pr-48 flex items-center z-10">
          <a className="hover:scale-105 cursor-pointer" onClick={() => navigate('/exec')}>Exec</a>
        </div>
      )}

      <div className="flex-1 flex gap-10 justify-center text-center">
        <a onClick={() => navigate('/home')} className="navbar-links hover:scale-105">HOME</a>
        <a onClick={() => navigate('/passes')} className="navbar-links hover:scale-105">PASSES</a>
        <a onClick={() => navigate('/calendar')} className="navbar-links hover:scale-105">CALENDAR</a>
        <a onClick={() => navigate('/first-time-checklist')} className="navbar-links hover:scale-105">FIRST VISIT CHECKLIST</a>
        {auth?.user
          ? (
           <div className="flex items-center gap-3">
            <button className="navbar-links hover:scale-105" onClick={handleLogout}>LOGOUT</button>
            <span className="text-sm flex items-center">Welcome, {auth.user.First}!</span>
          </div>
          ) : <button className="navbar-links hover:scale-105" onClick={() => navigate('/login')}>LOGIN</button>
        }
        </div>

          <div className="absolute right-2 top-2 z-20">
            <img
              src="../../img/dyno-logo.png"
              alt="Logo"
              className="w-18 sm:w-32 md:w-54 lg:w-64 rounded-full"
              style={{ objectFit: 'cover' }}
            />
          </div>

    </div>
  );
}

export default Navbar;