'use client'
import { useAuth } from '@/context/AuthContext';
import { useDependent } from '@/context/DependentContext'
import Link from 'next/link';
import React from 'react'

const page = () => {
    const {dependents} = useDependent();
    // const dependents = ["Sara", "John", "Johnathan"]
    const {user} = useAuth()
    console.log(user)
    console.log(dependents)
  return (
    <div className="bg-dark min-vh-100 d-flex align-items-center justify-content-center">
        <div className="bg-light p-5 rounded">
            <h3 className="fw-bold mb2">Welcome back, {user.firstName}</h3>
            <p className="text-muted mb-4">select a member to shop for</p>        
            
            {
                dependents && 
                <div className="row mb-4">
                {
                    dependents.map((member, index) => (
                        <div className="col-md-4 mb-3" key={index}>
                            <div className="text-center p-4 rounded bg-body-secondary" style={{
                                cursor: "pointer", transition: "0.2s"
                            }}>
                                {member.name}
                            </div>
                        </div>
                    ))
                }
                </div>                
            }


            <div className="d-flex gap-3">
                <Link href={"/welcome/add-member"} className='btn btn-outline-secondary px-4'>add new</Link>
                <Link href={"/products"} className="btn btn-secondary px-3">
                    view all products →
                </Link>
            </div>            
        </div>
    </div>
  )
}

export default page