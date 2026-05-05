import SignIn from '@/components/SignIn'
import React from 'react'

const page = () => {
  return (
    <div className='w-100 d-flex'>
        <div className="container-fluid align-content-center mb-5">
            <div className="row gap-5">
                <div className="col-lg-6 d-flex justify-content-center rounded-5 py-5">
                    <SignIn className= "vw-100"/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default page