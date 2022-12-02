import React, { useRef, useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';

const LOGIN_URL = '/auth/login';

const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    // const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(user, pwd);
        // setUser('');
        // setPwd('');
        // setSuccess(true);
        try {
            const response = await axios.post(LOGIN_URL, 
                JSON.stringify({email: user, password: pwd}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            console.log(JSON.stringify(response?.data.roles));
            // console.log(JSON.stringify(response?.data.roles));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data.roles;
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            // setSuccess(true);
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Email or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        // <>
        //     {success ? (
        //         <section>
        //             <h1>You are logged in!</h1>
        //             <br />
        //             <p>
        //                 <a href="#">Go to Home</a>
        //             </p>
        //         </section>
        //     ) : (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input 
                    type="text" 
                    id="email"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />
                
                <label htmlFor="password">Password:</label>
                <input 
                    type="password" 
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />

                <button>Sign In</button>
            </form>
             <p>
                Need an Account?<br />
                <span className="line">
                    <Link to="/register">Sign Up</Link>
                </span>
            </p>
        </section>
        //     )}
        // </>
    )
}

export default Login