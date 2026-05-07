'use client'
import DependentCard from '@/components/DependentCard'
import { useAllergens } from '@/context/allergensContext'
import { useDependent } from '@/context/DependentContext'
import React, { useState } from 'react'
import Link from 'next/link'

const page = () => {

    const {dependents, addDependent, removeAll} = useDependent()
    const [name, setName] = useState('')
    const [relation, setRelation] = useState('')
    const allergens = useAllergens()
    const [userAllergens, setAllergens] = useState('')

  return (
    <div className="container py-5">
        <div className="card shadow-sm p-4 mb-5">
            <h2 className="fw-semibold mb-3">
                Add new member
            </h2>
            <input value={name} className="form-control mb-3"  onChange={(e) => {setName(e.target.value)}}/>

            <select className="form-select mb-3" value={relation} onChange={(e)=>{setRelation(e.target.value)}}>
                <option value="">Select Relation</option>
                <option >Myself</option>
                <option >Family/Friend</option>
                <option >Other</option>
            </select>

            <div className="mb-3 border rounded p-3">
                <label className="form-label fw-semibold">
                    Select Allergens
                </label>

                <div className="row">
                    {allergens.map((item) => (
                    <div className="col-6" key={item}>
                        <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id={item}
                            checked={userAllergens.includes(item)}
                            onChange={(e) => {
                            if (e.target.checked) {
                                setAllergens([...userAllergens, item])
                            } else {
                                setAllergens(userAllergens.filter((a) => a !== item))
                            }
                            }}
                        />
                        <label className="form-check-label" htmlFor={item}>
                            {item}
                        </label>
                        </div>
                    </div>
                    ))}
                </div>
            </div>

            <button className="btn btn-dark w-100" onClick={()=>{
                addDependent(name, relation, userAllergens)
            }}>
                Add Member
            </button>
        </div>

        <div>
            <h2 className="fw-semibold mb-3">
                Existing Members
            </h2>
            {
                dependents.length === 0 ? (
                    <p className="text-muted">No members yet</p>
                ) : (
                    <div className="row g-3">
                        {
                            dependents.map((elem)=> (
                                <div className="col-12 col-md-4" key={elem._id}>
                                    <DependentCard id={elem._id} name={elem.name} relation = {elem.relation}></DependentCard>                                
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>

        <div className='container-fluid d-flex justify-content-between align-items-center'>

            <Link href={"/welcome"} className='btn btn-dark mt-4'>view all members</Link>
            {
                dependents.length !== 0 &&
                <button className="btn btn-outline-danger" onClick={()=>removeAll()}>delete all</button>
            }
            <Link href={"/products"} className='btn btn-dark mt-4'>view all products →</Link>

        </div>
    </div>
  )
}

export default page