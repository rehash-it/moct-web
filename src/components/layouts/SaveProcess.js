import React from 'react'
import { DotLoading } from './Loading'

function SaveProcess({ Process }) {
    return (
        <div className="col-lg-12">
            {
                Process.process ? <DotLoading /> : ''
            }
            {Process.process ?
                <p className="text-center text-info">{Process.process}</p> : ''
            }
            {
                Process.success ?
                    <p className="text-success text-center">
                        {Process.success}
                    </p> : ''
            }
            {
                Process.error ?
                    <p className="text-danger text-center">
                        {Process.error}
                    </p> : ''
            }
        </div>
    )
}

export default SaveProcess
