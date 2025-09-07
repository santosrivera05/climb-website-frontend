import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import { Link } from "react-router-dom";
import '../App.css';

const USER_REGEX = /^[a-zA-Z0-9._%+-]+@depaul+\.edu$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
    const emailRef = useRef();
    const errRef = useRef();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [email, setEmail] = useState('');
    const [validName, setValidName] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const [OTP, setOTP] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(email);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }

        if (email) {
            const OTP = Math.floor(Math.random() * 9000 + 1000); // Generate a random 4-digit OTP
            console.log(`OTP for ${email} is: ${OTP}`);
            setOTP(OTP);
        
        try {
            const response = await axios.post(`${import.meta.env.BACKEND_URL}/send-recovery-email`, // might cause a bug
                JSON.stringify({
                    recipient_email: email,
                    pwd,
                    firstName: firstName.trim(), 
                    lastName: lastName.trim(),
                    OTP
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            //clear state and controlled inputs
            setEmail('');
            setPwd('');
            setMatchPwd('');
            navigate('/otp', { state: {email, pwd, firstName, lastName, OTP}});
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Account already exists with email');
            } else {
                setErrMsg(err.response?.data?.message || 'Registration Failed');
            }
            errRef.current.focus();
        }
        }
    }

    return (

      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 tracking-widest bg-[#EEFCFF]">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-3xl staatliches text-black">
            Create an Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <p
            ref={errRef}
            className={errMsg ? "text-red-500 text-sm mb-4" : "hidden"}
            aria-live="assertive"
          >
            {errMsg}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First Name */}
            <div>
              <label htmlFor="firstname" className="block staatliches text-2xl text-black">
                First Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="firstname"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  required
                  className="block w-full tracking-wide rounded-md bg-white px-3 py-1.5 text-base focus:outline-indigo-500 text-black outline-1 outline-black focus:outline-2 sm:text-sm/6"
                />
              </div>
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastname" className="block staatliches text-2xl text-black">
                Last Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="lastname"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                  required
                  className="block tracking-wide w-full rounded-md bg-white focus:outline-indigo-500 px-3 py-1.5 text-base text-black outline-1 outline-black focus:outline-2 sm:text-sm/6"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-2xl staatliches text-black">
                DePaul Email
                <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={!validName && email ? "invalid" : "hide"} />
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="email"
                  ref={emailRef}
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  className="block tracking-wide w-full rounded-md bg-white focus:outline-indigo-500 px-3 py-1.5 text-base text-black outline-1 outline-black focus:outline-2 sm:text-sm/6"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-2xl staatliches text-black">
                Password
                <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={!validPwd && pwd ? "invalid" : "hide"} />
              </label>
              <div className="mt-2 flex items-center gap-2">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                  className="block w-full tracking-wide rounded-md focus:outline-indigo-500 bg-white px-3 py-1.5 text-base text-black outline-1 outline-black focus:outline-2 sm:text-sm/6"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-md staatliches text-blue-500 hover:text-blue-300"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <p
                id="pwdnote"
                className={
                  pwdFocus && !validPwd
                    ? "mt-2 text-md text-gray-500"
                    : "sr-only"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} className="mr-1 staatliches" />
                8 to 24 characters. Must include uppercase and lowercase letters, a number, and a special character.
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirm_pwd" className="block text-2xl staatliches text-black">
                Confirm Password
                <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={!validMatch && matchPwd ? "invalid" : "hide"} />
              </label>
              <div className="mt-2 flex items-center gap-2">
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirm_pwd"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  value={matchPwd}
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                  className="block tracking-wide w-full rounded-md focus:outline-indigo-500 bg-white px-3 py-1.5 text-base text-black outline-1 outline-black focus:outline-2 sm:text-sm/6"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-md staatliches text-blue-500 hover:text-blue-300"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <p
                id="confirmnote"
                className={
                  matchFocus && !validMatch
                    ? "mt-2 text-md text-gray-500"
                    : "sr-only"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} className="mr-1 staatliches" />
                Must match the first password input field.
              </p>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={!validName || !validPwd || !validMatch}
                className={`flex w-full justify-center rounded-md px-3 py-1.5 text-2xl staatliches ${
                  validName && validPwd && validMatch
                    ? "bg-blue-500 text-white hover:bg-blue-400"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Sign Up
              </button>
            </div>
          </form>

          {/* Already registered */}
          <p className="mt-10 mb-12 text-center text-md staatliches text-gray-400">
            Already registered?{" "}
            <Link to="/login" className="text-blue-500 hover:text-blue-300">
              Sign In
            </Link>
          </p>
        </div>
      </div>

    );
}

export default Register