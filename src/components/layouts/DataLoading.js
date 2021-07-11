import React from 'react'
import { DotLoading } from './Loading'

const DataLoading = () => {
    return (
        <div className="col-lg-12 bg-dark">
            <div className="card bg-dark" style={{ minHeight: '100vh' }}>
                <h3 className="text-center">Loading...</h3>
                <DotLoading className='mt-5' />
            </div>
        </div>
    )
}

export default DataLoading
