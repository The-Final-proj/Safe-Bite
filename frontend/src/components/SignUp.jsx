'use client'

import React, { useState } from 'react'
import API from "../app/api"
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const SignUp = () => {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [pwd, setPwd] = useState('')
    const [confirmPwd, setConfirmPwd] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [error, setError] = useState('')
    
    const router = useRouter()

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
            const res = await API.post("/users/register", {
                email, username, firstName, lastName, password: pwd
            }) 

            console.log(res)

            if (res.data) {
                console.log("registered")
                router.push("/login")
            }
        }

        catch (err) {
            setError("an error has occured, please try again")
        }
    }

  return (
        <div id="signUp" className="col-md-6 p-5 border-end">
            <form id="signUpForm" onSubmit={handleRegister}>
                <div className="mb-4">
                    <h1>Welcome!</h1>
                    <p className='fs-4'>join us today</p>
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" placeholder='john.doe@gmail.com' onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>
                
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input type="text" placeholder='@johndoe' className="form-control" onChange={(e)=>setUsername(e.target.value)}/>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <label className="form-label">First Name</label>
                        <input type="text" className="form-control" onChange={(e)=>setFirstName(e.target.value)}/>
                    </div>
                    <div className="col">
                        <label className="form-label">Last Name</label>
                        <input type="text" className="form-control" onChange={(e)=>setLastName(e.target.value)}/>
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={(e)=>setPwd(e.target.value)}/>
                </div>
            

                <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" onChange={(e)=>setConfirmPwd(e.target.value)}/>
                </div>

                {
                    error && (
                        <div className="text-danger mb-3 text-center">
                            {error}
                        </div>
                    )
                }

                <button type='submit' className="btn btn-dark w-100 mb-3">
                    Sign Up
                </button>

                <p className="text-center small">
                    already have an account? <Link href={"/login"}>Sign in</Link>
                </p>
            
            </form>
        </div>
  )
}

export default SignUp