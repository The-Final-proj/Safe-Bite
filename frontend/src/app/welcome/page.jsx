'use client'
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { useDependent } from "@/context/DependentContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const page = () => {
  const { dependents } = useDependent();
  // const dependents = ["Sara", "John", "Johnathan"]
  const { user } = useAuth();
  console.log(user);

    const router = useRouter();

    useEffect(() => {
    if (user && user.role !== "user") {
        router.replace("/");
    }
    }, [user]);

    if (!user) return null;

  return (
    <div>
    <div className="bg-light min-vh-100 d-flex align-items-center justify-content-center">
        <div className="bg-light p-5 rounded shadow-sm">
            <h3 className="fw-bold mb2">Welcome back, {user?.firstName}</h3>
            <p className="text-muted mb-4">select a member to shop for</p>        
            {
                dependents.length !== 0 && 
                <div className="row mb-4">
                {
                    dependents.map((member, index) => (
                        <div className="col-md-4 mb-3" key={index}>
                            <Link href={`/products/member/${member._id}`} className="btn shadow-sm text-center p-4 rounded bg-body-secondary" style={{
                                cursor: "pointer", transition: "0.2s"
                            }}>
                                {member.name}
                            </Link>
                        </div>
                    ))
                }
                </div>                
            }
            <div className="d-flex gap-3">
                <Link href={"/welcome/add-member"} className='btn btn-outline-secondary px-4'>add new</Link>
                <Link href={"/"} className="btn btn-secondary px-3">
                    view all products →
                </Link>
            </div>            
        </div>
      </div>   
        <Footer/>
    </div>
  );
};

export default page;
