import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react'
import ReactTimeAgo from 'react-time-ago'
import DataLoading from '../../layouts/DataLoading'
import ErrorLoading from '../../layouts/ErrorLoading'
import SaveProcess from '../../layouts/SaveProcess'
import { saveArchives } from './action'
function NewArchives({ newArchives: state, fetchNewArchives, fetchSavedArchives }) {
    const [Process, setProcess] = useState({
        process: '',
        success: '',
        error: ""
    })
    return (
        state.loading ?
            <DataLoading /> :
            state.error ?
                <ErrorLoading /> :
                state.data.length ?
                    <div className="row">
                        <div className="col-lg-12 my-2">
                            <h1 className="text-center">New Archives</h1>
                        </div>
                        {
                            state.data.map(r =>
                                <div className="col-lg-3 col-md-6 col-sm-12 mt-3" key={r.id}>
                                    <a href={r.url} target="_blank" rel="noreferrer">
                                        <div className="card" style={{ height: 500 }}>
                                            <img src={r.enclosure.url}
                                                alt="" className="img-fluid"
                                                style={{ objectFit: 'cover', height: 400 }}
                                            />
                                            <h6 className="text-center my-2 text-dark">
                                                {r.title}
                                            </h6>
                                            <p className="d-flex justify-content-center text-dark">
                                                {
                                                    r.from === 'twitter' ?
                                                        <FontAwesomeIcon icon={faTwitter} className='text-primary fa-2x mx-2' /> :
                                                        r.from === 'fb' ?
                                                            <FontAwesomeIcon icon={faFacebook} className='text-primary fa-2x mx-2' /> :
                                                            ''
                                                }
                                                {r.from}<ReactTimeAgo date={r.date} />
                                            </p>
                                        </div>
                                    </a>
                                </div>
                            )
                        }
                        <SaveProcess Process={Process} />
                        <div className="col-lg-12 d-flex justify-content-center mt-5">
                            <button className="btn btn-raise"
                                onClick={() => saveArchives(setProcess, fetchNewArchives, fetchSavedArchives)}>
                                save archives
                            </button>
                        </div>

                    </div> :
                    <p></p>
    )
}

export default NewArchives
