'use client'

import React, { useState } from 'react'
import API from "../app/api"
import Link from 'next/link'

const SignUp = () => {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [pwd, setPwd] = useState('')
    const [confirmPwd, setConfirmPwd] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [error, setError] = useState('')

    const handleRegister = async (e) => {
        e.preventDefault()
        setError("")
        if (!email || !username || !pwd || !confirmPwd || !lastName || !firstName) {
            setError("all data fields must be filled in")
            return
        }

        if (pwd !== confirmPwd) {
            setError("make sure to write the password correctly")
            return
        }

        if (pwd.length < 8) {
            setError("minimum password length is 8 characters")
            return
        }

        try {
            const res = API.post("/user/register", {
                email, username, firstName, lastName, password: pwd
            }) 

            if (res.data) {

            }
        }

        catch (err) {
            setError("an error has occured, please try again")
        }
    }

  return (
        <div id="signUp" className="container-fluid mt-5 mx-5">
            <form id="signUpForm" className="w-100" onSubmit={handleRegister}>
                <div>
                    <h1 className="mb-3">Create account</h1>                    
                </div>

                <div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" placeholder='john.doe@gmail.com' onChange={(e)=>{setEmail(e.target.value)}}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" onChange={(e)=>{setPassword(e.target.value)}}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" onChange={(e)=>{setConPass(e.target.value)}}/>
                    </div>
                    <div className="mb-3 d-flex justify-content-between">
                        <div className="w-50 pe-2">
                            <label className="form-label">username</label>
                            <input type="text" className="form-control" placeholder="@johndoe123" onChange={(e)=>{setUsername(e.target.value)}}/>
                        </div>
                        <div className="w-50 ps-2"> 
                            <label className="form-label">name</label>
                            <input type="text" className="form-control" placeholder="John Doe" onChange={(e)=>{setName(e.target.value)}}/>
                        </div>  
                        </div>                       
                        <div className='text-center mt-1'>
                            {
                                error && <div className='text-danger-emphasis'>{error}</div>
                            }                            
                        </div>
                </div>
                <div className='d-flex justify-content-between'>
                    <button className="btn btn-primary" id="signUpButton" type='submit'>Sign Up</button>
                    <Link href={'/login'}className='mt-2'>already have an account</Link>
                </div>
                
            </form>
        </div>
  )
}

export default SignUp