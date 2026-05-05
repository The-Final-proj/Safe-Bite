'use client'
import API from '@/app/api';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import React, { useState } from 'react'


const SignIn = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {login} = useAuth()

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("")
        if (!email || !password) {
            setError("all fields must be filled")
            return
        }
        try {
            const res = await API.post("/user/login", {
                email, password
            })

            if(res.data.token) {
                login(res.data.token, res.data.user)
                // navigate to welcome page
            }

            else {
                setError("invalid email or wrong password")
                return
            }
            
        }

        catch (err) {
            setError("an error has occured, please try again")
        }
    }

  return (
            <div id="logIn" className="container-fluid mx-5 mt-5 vw-75">
            <form id="logInForm" onSubmit={handleLogin}>
                <div className="pb-4">
                    <h1>Welcome Back!</h1>
                    <p className='fs-4'>sign in to your account</p>
                </div>
                
                <div className='w-100'>
                    <div className="mb-3 w">
                        <label htmlFor="inputEmail" className="form-label">Email address</label>
                        <input type="email" className="form-control w-100" placeholder="john.doe@gmail.com" id="inputEmail" onChange={(e)=> {
                            setEmail(e.target.value)
                            console.log(email)                            
                        }}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputPassword" className="form-label">Password</label>
                        <input type="password" className="form-control" id="inputPassword" onChange={(e)=> {
                            setPassword(e.target.value)
                            console.log(password)                            
                        }}/>  
                        <div className='text-center mt-1'>
                            {
                                error && <div className='text-danger-emphasis'>{error}!!</div>
                            }                            
                        </div>                  

                        <div className="d-flex justify-content-between">
                            <button id="forgetPassword" className="form-text btn btn-link p-0">forget password</button>       
                            {/* <Link href={'/register'} className="form-text btn btn-link p-0" id="signUpLink">create account</Link>                             */}
                            <div>
                                <input type="checkbox" className="form-check-input" id="rememberMe" />
                                <label htmlFor="rememberMe" className="form-check-label ps-2">Remember me</label>                                 
                            </div>
                           
                        </div>                 
                        </div>

                    </div>  

                    <div className="mb-3 form-check d-flex justify-content-center">
                        <button className="btn btn-primary w-50 mt-2" id="logInBtn" type='submit'>log in</button>        
                </div>
                
            </form>
        </div>
  )
}

export default SignIn