'use client'
import { useDependent } from '@/context/DependentContext'
import React from 'react'

const DependentCard = ({name, relation, id}) => {

    const {deleteDependent} = useDependent()

  return (
    <div className='card bg-light p-3 positioon-relative h-100'>
        <button onClick={()=>deleteDependent(id)} className="btn btn-sm btn-outline-danger position-absolute top-0 end-0">
            ×
        </button>
        <h3 className="fw-semibold">{name}</h3>
        <p className="text-muted mb-2">{relation}</p>
    </div>
  )
}

export default DependentCard