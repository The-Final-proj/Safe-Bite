import SignIn from '@/components/SignIn'
import React from 'react'

const page = () => {
  return (
    <div className='register d-flex'>
        <div className="container align-content-center mb-5">
            <div className="row gap-5">
                <div className="col-lg-5 d-flex justify-content-center rounded-5 py-5 ms-5">
                    <SignIn />
                </div>
            </div>
        </div>
    </div>
  )
}

export default page