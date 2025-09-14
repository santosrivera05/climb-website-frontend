import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const ForgotPassword = () => {

    const [ email, setEmail ] = useState('');
    const  [OTP, setOTP] = useState('');
    const navigate = useNavigate();

    const handleOTP = async (e) => {
        e.preventDefault();

        if (email) {
            const OTP = Math.floor(Math.random() * 9000 + 1000); // Generate a random 4-digit OTP
            // console.log(`OTP for ${email} is: ${OTP}`);
            setOTP(OTP);

            try {
                await axios.post(`${import.meta.env.VITE_BACKEND_URL}/send-recovery-email`, { OTP, recipient_email: email });
                navigate('/otp', { state: { email, OTP } });
            } catch (err) {
                console.error("Error sending OTP:", err.response?.data?.message || err.message);
                alert("Failed to send OTP: " + (err.response?.data?.message || err.message));
            }
            return;
        }
    } 

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-[#EEFCFF] tracking-widest">

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center staatliches text-3xl text-black mb-12 mt-12">
          Forgot Your Password?
        </h2>

            <form onSubmit={handleOTP} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-2xl staatliches text-black-100">
                  DePaul Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full rounded-md bg-white focus:outline-indigo-500 tracking-wide px-3 py-1.5 text-base text-black outline-1 
                    -outline-offset-1 outline-black focus:outline-2 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center staatliches rounded-md bg-blue-500 px-3 py-1.5 text-2xl text-white hover:bg-blue-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  Send Reset Link
                </button>
              </div>
            </form>

            <p className="mt-10 text-center staatliches text-lg text-gray-500 mb-32">
              Remember your password?{" "}
              <span
                className="text-blue-500 hover:text-blue-300 hover:cursor-pointer"
                onClick={() => navigate('/login')}
              > 
                Sign In
            </span>
            </p>

        </div>
      </div>
  );
}

export default ForgotPassword;