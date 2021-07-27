import React, { useEffect, useState } from 'react'
import Footer from '../layouts/Footer'
import NavBar from '../layouts/navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faFile } from '@fortawesome/free-solid-svg-icons'
import { dataDispatch } from '../../store/Actions/dataActions'
import DataLoading from '../layouts/DataLoading'
import ErrorLoading from '../layouts/ErrorLoading'
import { withRouter } from 'react-router-dom'
import { file } from '../../config/config'
import { CSSTransition } from 'react-transition-group';

const ResearchDetails = ({ match }) => {
    const { id } = match.params
    const [state, setState] = useState({
        data: {},
        error: false,
        loading: true
    })
    useEffect(() => dataDispatch(setState, { page: 'docs', id }), [id])

    const { error, loading, data } = state
    return (
        <>
            <NavBar />
            {
                loading ? <DataLoading /> :
                    error ? <ErrorLoading /> :
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <h1 className='text-center'>{data.title}</h1>
                                </div>
                                <div className="col-lg-10">
                                    <p className="indent h6" style={{ textAlign: 'justify' }}>
                                        {data.description}
                                    </p>
                                </div>
                                <div className="col-lg-2 text-center">
                                    <FontAwesomeIcon icon={faFile} className='text-white fa-4x' />
                                    <h5>{data.file.split('/')[2]}</h5>
                                    <a href={file + data.file} download={true} target="_blank" rel="noreferrer">

                                        <button className="btn btn-primary">
                                            <FontAwesomeIcon icon={faDownload} />
                                            Download
                                        </button>
                                    </a>

                                </div>
                            </div>
                        </div>
            }
            <Footer />
        </>
    )
}

export default withRouter(ResearchDetails)
