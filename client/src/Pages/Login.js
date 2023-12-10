import React, { useState } from 'react'
import './Login.css'

const SignIn = () => {

    const [trans, setTrans] = useState(false);
    const [formData, setFormData] = useState({})

    const regClick = () => {
        setTrans(true);
    };

    const logClick = () => {
        setTrans(false);
    };

    const handleChange = (e) =>{
       setFormData({
        ...formData,
        [e.target.value]: e.target.value
       })
    }
    // console.log(formData)
    const handleSubmit = async (e) => {
        e.preventDefault()
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
                            <button>Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignIn
