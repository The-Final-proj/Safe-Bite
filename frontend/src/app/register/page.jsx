import SignUp from '../../components/SignUp'
import React from 'react'

const page = () => {
  return (
    <div className="bg-dark min-vh-100 d-flex align-items-center justify-content-center ">
        <div className="container bg-light rounded-3 p-0" style={{ maxWidth: "1000px" }}>
            <div className="row g-0">
                    <SignUp className= "vw-100"/>
                    <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center bg-body-secondary">
                        <span className="text-muted">image here</span>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default page