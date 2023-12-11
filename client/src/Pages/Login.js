import React, { useState } from 'react'
import './Login.css'
import { useAlert } from 'react-alert'

const Login = () => {

    const [trans, setTrans] = useState(false);
    const [formData, setFormData] = useState({})
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const alert = useAlert()


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
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await fetch('http://localhost:4000/api/auth/signup',
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
            const data = await res.json()
            console.log(data)
            if (data.success === false) {
                setLoading(false)
                setError(error.message)
                return
            }
            setLoading(false)
            setError(null)
            alert.success("User Created Successfully...")
            setTrans(false);
        } catch (error) {
            setLoading(false)
            setError(error.message)
            alert.error(error.message)
        }
    }

    return (
        <div className='main-form'>
            <div className='login'>
                <div className={`login ${trans ? 'trans' : ''}`} onClick={logClick}>
                    <form>
                        <h2 className={trans ? 'scaleDown' : ''}>Log In</h2>
                        <input
                            type='text'
                            placeholder='Username'
                            required
                        />
                        <input
                            type='password'
                            placeholder='Password'
                            required
                        />
                        <div className='submitBtn'>
                            <button>Log In</button>
                        </div>
                    </form>
                </div>
                <div className={`register ${trans ? 'transformed' : ''}`} onClick={regClick}>
                    <form onSubmit={handleSubmit}>
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
