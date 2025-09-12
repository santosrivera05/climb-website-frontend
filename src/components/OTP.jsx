import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from '../api/axios';
import { Link } from "react-router-dom";


const OTP = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { email, pwd, firstName, lastName, membership, OTP } = location.state || {};
    const [timerCount, setTimer] = useState(60); // Timer for OTP validity
    const [otpExpiry, setOtpExpiry] = useState(300); // 5 minutes (300 seconds) for OTP expiry
    const [otpExpired, setOtpExpired] = useState(false);
    const [currentOTP, setCurrentOTP] = useState(OTP);
    const [OTPinput, setOTPinput] = useState([0,0,0,0]);
    const [disabled, setDisable] = useState(true);
    const [success, setSuccess] = useState(false);
    

    function handleOTP() {
        if (disabled) return;

        const newOTP = Math.floor(Math.random() * 9000 + 1000); // Generate a random 4-digit OTP
            setCurrentOTP(newOTP);
            // console.log(`OTP for ${email} is: ${currentOTP}`);


        axios.post(`${import.meta.env.VITE_BACKEND_URL}/send-recovery-email`, {OTP: currentOTP, recipient_email: email})
        .then(() => {
            setDisable(true);
            setTimer(60);
            setOtpExpiry(300);
            setOtpExpired(false);
        })
        .catch(error => console.error(error));
    }

async function verifyOTP() { 
    if (otpExpired) {
        alert("OTP has expired. Please request a new one.");
        return;
    }
    if (parseInt(OTPinput.join("")) === currentOTP) {
        if(!firstName) {
            navigate('/reset-password', { state: { email, verified: true } });
            return;
        } else {
            try {
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/register`,
                    JSON.stringify({
                        email,
                        pwd,
                        firstName,
                        lastName,
                        membership
                    }),
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    }
                );
                
                // Handle successful registration
                console.log('Registration successful:', response.data);
                setSuccess(true);
                
            } catch (error) {
                console.error('Registration failed:', error);
                alert('Registration failed: ' + (error.response?.data?.message || error.message));
            }
            return; // Add return here to avoid the error alert below
        }
    }
    
    alert("The code you have entered is not correct, try again or re-send the link");
}
    React.useEffect(() => {
        let interval = setInterval(() => {
            setTimer((lastTimerCount) => {
                lastTimerCount <= 1 && clearInterval(interval);
                if (lastTimerCount <= 1) setDisable(false);
                if (lastTimerCount <= 0) return lastTimerCount;
                return lastTimerCount - 1;
            });
            }, 1000); //each count lasts for a second
            //cleanup the interval on complete
            return () => clearInterval(interval);
    }, [disabled]);

    // Timer for OTP expiry (5 minutes)
    React.useEffect(() => {
        let expiryInterval = setInterval(() => {
            setOtpExpiry((lastExpiryCount) => {
                if (lastExpiryCount <= 1) {
                    setOtpExpired(true);
                    clearInterval(expiryInterval);
                    return 0;
                }
                return lastExpiryCount - 1;
            });
        }, 1000);
        return () => clearInterval(expiryInterval);
    }, [currentOTP]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

 return (
    <>
        {success ? (
            <section className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 text-center bg-[#EEFCFF]">
              <h1 className="text-3xl staatliches text-black">Success!</h1>
              <p className="mt-4 text-blue-500 text-2xl staatliches underline mb-8 hover:text-blue-300">
                <Link to='/login'>Sign In</Link>
              </p>

              <img
              src="../../img/dog-smile.gif"
              alt="Happy Dog"
              className="mx-auto object-cover mb-24"
            />
            </section>
          ) : (

          
      <div className="flex flex-col justify-center px-6 py-12 lg:px-8 bg-[#EEFCFF] min-h-full">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-4xl staatliches tracking-wide text-black mb-4">
            Email Verification
          </h2>

          <p className="text-center text-gray-700 mb-2 staatliches tracking-wider">
            We have sent a 4-digit code to <span className="semibold">{email}</span>.
          </p>

          {otpExpired ? (
            <p className="text-center text-red-500 staatliches tracking-wide mb-4">
              Your OTP has expired. Please request a new one.
            </p>
          ) : (
            <p
              className={`text-center staatliches tracking-wider mb-4 ${
                otpExpiry <= 60 ? "text-red-500" : "text-orange-500"
              }`}
            >
              Code expires in: {formatTime(otpExpiry)}
            </p>
          )}

          {/* OTP Inputs */}
          <div className="flex justify-center gap-4 mb-6">
            <input
              maxLength="1"
              type="text"
              className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md bg-black/5 text-black focus:outline-indigo-500"
              onChange={(e) =>
                setOTPinput([
                  e.target.value,
                  OTPinput[1],
                  OTPinput[2],
                  OTPinput[3],
                ])
              }
            />
            <input
              maxLength="1"
              type="text"
              className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md bg-black/5 text-black focus:outline-indigo-500"
              onChange={(e) =>
                setOTPinput([
                  OTPinput[0],
                  e.target.value,
                  OTPinput[2],
                  OTPinput[3],
                ])
              }
            />
            <input
              maxLength="1"
              type="text"
              className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md bg-black/5 text-black focus:outline-indigo-500"
              onChange={(e) =>
                setOTPinput([
                  OTPinput[0],
                  OTPinput[1],
                  e.target.value,
                  OTPinput[3],
                ])
              }
            />
            <input
              maxLength="1"
              type="text"
              className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md bg-black/5 text-black focus:outline-indigo-500"
              onChange={(e) =>
                setOTPinput([
                  OTPinput[0],
                  OTPinput[1],
                  OTPinput[2],
                  e.target.value,
                ])
              }
            />
          </div>

          <p className="text-center text-gray-700 mb-2 staatliches tracking-wider">
            Double check your spam/junk folder for the email!
          </p>

          {/* Buttons */}
          <div className="space-y-4">
            <button
              onClick={verifyOTP}
              className="w-full flex justify-center rounded-md bg-blue-500 px-3 py-2 text-lg tracking-wider staatliches text-white hover:bg-blue-400 focus:outline-2 focus:outline-blue-500"
            >
              Verify Account
            </button>

            <button
              onClick={handleOTP}
              disabled={disabled && !otpExpired}
              className={`w-full flex justify-center rounded-md px-3 py-2 text-lg tracking-wider staatliches text-white mb-32 ${
                disabled && !otpExpired
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-400"
              }`}
            >

              {otpExpired
                ? "Get New Code"
                : disabled
                ? `Resend OTP in ${timerCount}s`
                : "Resend OTP"}
                </button>
          </div>
        </div>
      </div>
      )}
    </>
);
}

export default OTP;