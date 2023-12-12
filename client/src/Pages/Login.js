import React, { useState } from 'react'
import './Login.css'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../Redux/User/userSlice';


const Login = () => {

    const [trans, setTrans] = useState(false);
    const [formData, setFormData] = useState({})
    const { loading, error } = useSelector((state) => state.user)
    const alert = useAlert()
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const regClick = () => {
        setTrans(true);
    };

    const logClick = () => {
        setTrans(false);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const loginChangeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const registerSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            // setLoading(true);
                // dispatch(registerStart())
            const res = await fetch('http://localhost:4000/api/auth/register', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.success === false) {
                // setLoading(false);
                // dispatch(registerFailure(data.message))
                return;
            }
            // setLoading(false);
            // dispatch(registerSuccess(data))
            alert.success("User Created Successfully...");
            setTrans(false);
        } catch (error) {
            // dispatch(registerFailure(error.message))
            alert.error(error.message);
        }
    };



    const loginSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            // setLoading(true);
            dispatch(loginStart())
            const loginData = {
                email: formData.loginUsername,
                password: formData.loginPassword
            };

            const res = await fetch('http://localhost:4000/api/auth/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            const data = await res.json();
            if (data.success === false) {
                // setLoading(false);
                dispatch(loginFailure(error.message))
                console.log("this is error for login loading", error)
                return;
            }
            // setLoading(false);
            // setError(null);
            dispatch(loginSuccess(data))
            alert.success("User Logged In Successfully...");
            navigate("/");
        } catch (error) {
            // setLoading(false);
            // setError(error.message);
            dispatch(loginFailure(error.message))
            alert.error(error.message);
            console.log("this is error for loading", error)
        }
    };


    return (
        <div className='main-form'>
            <div className='login'>
                <div className={`login ${trans ? 'trans' : ''}`} onClick={logClick}>
                    <form onSubmit={loginSubmitHandler}>
                        <h2 className={trans ? 'scaleDown' : ''}>Log In</h2>
                        <input
                            type='text'
                            placeholder='Email'
                            onChange={loginChangeHandler}
                            id='loginEmail'
                            required
                        />
                        <input
                            type='password'
                            placeholder='Password'
                            onChange={loginChangeHandler}
                            id='loginPassword'
                            required
                        />

                        <div className='submitBtn'>
                            <button type='submit'>{loading ? 'Loading...' : 'Log In'}</button>
                        </div>
                    </form>

                </div>
                <div className={`register ${trans ? 'transformed' : ''}`} onClick={regClick}>
                    <form onSubmit={registerSubmitHandler}>
                        <h2>Register</h2>
                        <input
                            type='text'
                            id='username'
                            name='username'
                            placeholder='Username'
                            onChange={handleChange}
                            required
                        />
                        <input
                            type='email'
                            id='email'
                            name='email'
                            placeholder='Email'
                            onChange={handleChange}
                            required
                        />
                        <input
                            type='password'
                            id='password'
                            name='password'
                            placeholder='Password'
                            onChange={handleChange}
                            required
                        />
                        <div className='submitBtn'>
                            <button type='submit'>{loading ? "Loading..." : "Register"}</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Login
