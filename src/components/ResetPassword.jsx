import { useRef, useState, useEffect } from "react";
import { useLocation, Link } from 'react-router-dom';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../App.css';
import axios from '../api/axios';

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{8,24}$/;

const ResetPassword = () => {
    const errRef = useRef();
    const location = useLocation();

    const { email } = location.state || {};

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v2 = PWD_REGEX.test(pwd);
        console.log(email);
        if (!v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/reset-password`,
                JSON.stringify({ email, pwd}),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            )
            console.log("Password reset successful");
            setSuccess(true);
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else {
                setErrMsg(err.response?.data?.message || err.response?.data?.error || 'Password reset failed');

            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 text-center bg-[#EEFCFF]">
              <h1 className="text-3xl staatliches text-black">Success!</h1>
              <p className="mt-4 text-2xl staatliches text-gray-500">Your password has been reset successfully!</p>
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
                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-[#EEFCFF] tracking-widest">

                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="text-center staatliches text-3xl text-black mb-12 mt-12">
                        Reset Password
                        </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        <label htmlFor="password" className="block text-2xl staatliches text-black-100">
                            New Password:
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
                                className="block w-full rounded-md bg-white focus:outline-indigo-500 tracking-wide px-3 py-1.5 text-base text-black outline-1 
                                -outline-offset-1 outline-black focus:outline-2 sm:text-sm/6"
                            />
                            <button 
                                type="button"
                                className="text-md staatliches text-blue-500 hover:text-blue-300"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                        <p id="pwdnote" className={pwdFocus && !validPwd ? 
                            "mt-2 text-md text-gray-500"
                            : "sr-only" }>
                            <FontAwesomeIcon icon={faInfoCircle} className="mr-1 staatliches"/>
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>

                        <br />
                        <label htmlFor="confirm_pwd" className="block text-2xl staatliches text-black">
                            Confirm New Password:
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
                                className="block w-full rounded-md bg-white focus:outline-indigo-500 tracking-wide px-3 py-1.5 text-base text-black outline-1 
                                -outline-offset-1 outline-black focus:outline-2 sm:text-sm/6"
                            />
                            <button 
                                type="button"
                                className="text-md staatliches text-blue-500 hover:text-blue-300"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>

                        <br />
                        <button 
                            className={`flex w-full mb-24 justify-center staatliches rounded-md bg-blue-500 px-3 py-1.5 text-2xl 
                            text-white focus-visible:outline-2 focus-visible:outline-offset-2 
                            focus-visible:outline-blue-500 ${
                                validPwd && validMatch ? 
                                "bg-blue-500 text-white hover:bg-blue-400"
                                :"bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                            disabled={!validPwd || !validMatch ? true : false}
                        >
                            Reset Password
                        </button>
                    </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default ResetPassword;