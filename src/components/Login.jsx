import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import axios from '../api/axios';
const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            
            setAuth({ user: response.data.user, accessToken: response?.data?.accessToken }); // changed from setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg(err.response?.data?.message || 'Incorrect Email or Password');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
  <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 tracking-widest bg-[#EEFCFF]">

    <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm mb-32">
      <p ref={errRef} className={errMsg ? "text-red-500 text-sm mb-4" : "hidden"} aria-live="assertive">
        {errMsg}
      </p>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="staatliches mt-10 text-center text-3xl text-black">
            Sign in to your account
          </h2>
        </div>

      <form onSubmit={handleSubmit} className="space-y-6 mt-10">
        {/* Email */}
        <div>
          <label htmlFor="username" className="block staatliches text-2xl text-black-100">
            DePaul Email
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              className="font-arial tracking-wide block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 
              -outline-offset-1 outline-black focus:outline-indigo-500 focus:outline-2 sm:text-sm/6"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block staatliches text-2xl text-black-100">
              Password
            </label>
            <div className="text-sm">
              <a href="/forgot-password" className="text-md staatliches text-blue-500 hover:text-blue-300">
                Forgot password?
              </a>
            </div>
          </div>
          <div className="mt-2 flex gap-2 items-center">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              className="block w-full tracking-wide rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 
              -outline-offset-1 outline-black placeholder:text-gray-500 focus:outline-2 
              focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-md text-blue-500 hover:text-blue-300 staatliches hover:cursor-pointer"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* Submit button */}
        <div>
          <button
            type="submit"
            className="flex w-full staatliches justify-center rounded-md bg-blue-500 px-3 py-1.5 text-2xl text-white hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            Sign In
          </button>
        </div>
      </form>

      {/* Links */}
      <p className="mt-10 text-center staatliches text-md text-gray-400">
        Need an account?{" "}
        <Link to="/register" className="text-blue-500 hover:text-blue-300">
          Sign Up
        </Link>
      </p>
    </div>
  </div>
);
}

export default Login
