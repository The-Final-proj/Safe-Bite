import SignUp from '../../components/SignUp'
import React from 'react'

const page = () => {
  return (
    <div className='register d-flex'>
        <div className="container-fluid align-content-center mb-5">
            <div className="row gap-5">
                <div className="col-lg-6 d-flex justify-content-center rounded-5 py-5" >
                    <SignUp />
                </div>
            </div>
        </div>
    </div>
  )
}

export default page