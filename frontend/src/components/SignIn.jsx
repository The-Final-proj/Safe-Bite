'use client'
import API from '@/app/api';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'


const SignIn = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {login} = useAuth()
    const router = useRouter()

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("")
        if (!email || !password) {
            setError("all fields must be filled")
            return
        }
        try {
            const res = await API.post("/users/login", {
                email, password
            })

            if(res.data.token) {
                console.log(res.data)
                login(res.data.token, res.data.user)
                router.push("/welcome")
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
        <div id="logIn" className="col-md-6 p-5 border-end">
            <form id="logInForm" onSubmit={handleLogin}>
                <div className="mb-4">
                    <h1>Welcome Back!</h1>
                    <p className='fs-4'>sign in to your account</p>
                </div>
                
                    <div className="mb-3">
                        <label htmlFor="inputEmail" className="form-label">Email</label>
                        <input type="email" className="form-control" placeholder="john.doe@gmail.com" id="inputEmail" onChange={(e)=> {
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

                        <div className="d-flex justify-content-between align-items-center mb-4">

                            <div className="form-check">
                                <input type="checkbox" id='rememberMe' className="form-check-input" />
                                <label htmlFor="rememberMe">stay logged in</label>
                            </div>

                            <button className="btn btn-link p-0 small">
                                forgot password
                            </button>
                        </div>    

                        <button className="btn btn-dark w-100 mb-4" type='submit'>
                            sign in
                        </button>

                        <div className="d-flex align-items center mb-4">
                            <hr className="flex-grow-1" />
                            <span className="px-2 text-muted">or</span>
                            <hr className="flex-grow-1" />
                        </div>

                        <button className="btn btn-secondary w-100 mb-3">
                            continue with google
                        </button>

                        <p className="text-center small">
                            don't have an account? <Link href={"/register"}>create account</Link>
                        </p>

                    </div>
            </form>
        </div>
  )
}

export default SignIn