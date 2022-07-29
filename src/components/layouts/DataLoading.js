import React from 'react'
import { DotLoading } from './Loading'

const DataLoading = () => {
    return (
        <div className="col-lg-12">
            <div className="card">
                <h3 className="text-center text-dark">Loading...</h3>
                <DotLoading className='mt-5' />
            </div>
        </div>
    )
}

export default DataLoading
