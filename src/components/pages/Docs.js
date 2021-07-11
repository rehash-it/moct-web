import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { datasDispatch } from '../../store/Actions/dataActions'
import { getPage } from '../../utility/route'
import DataLoading from '../layouts/DataLoading'
import ErrorLoading from '../layouts/ErrorLoading'
import Footer from '../layouts/Footer'
import Navbar from '../layouts/navbar'
import { pageCalculate, Scroll } from '../utility/general'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import Paginate from './Paginate'
function Docs({ location }) {
    const [collapse, setCollapse] = useState([])
    const [research, setResearch] = useState({
        data: [],
        length: 0,
        loading: true,
        error: false
    })
    const { data, length, loading, error } = research
    let Page = getPage(location.search)
    const page = pageCalculate(9, length)
    useEffect(() => {
        Scroll('top')
        datasDispatch(setResearch, { page: Page, limit: 9, url: 'docs' })
    }, [Page])
    const isCollapsed = id => collapse.find(c => c === id) ? false : true

    const Collapse = id => isCollapsed(id) ?
        setCollapse(s => ([...s, id])) :
        setCollapse(s => s.filter(d => d !== id))


    return (
        <>
            <Navbar />
            {
                loading ?
                    <DataLoading /> :
                    error ?
                        <ErrorLoading /> :
                        <div className="container my-3">
                            <h1 className="text-center">
                                Here are some research and studies about Ethiopia
                            </h1>
                            <div className="col-lg-12 my-3">
                                {
                                    data.map(d =>
                                        <div className="card bg-dark" key={d._id}>
                                            <div className="card-header text-white">

                                                <button className="btn btn-primary" onClick={() => Collapse(d._id)}>
                                                    {isCollapsed(d._id) ?
                                                        <FontAwesomeIcon icon={faPlus} />
                                                        : <FontAwesomeIcon icon={faMinus} />

                                                    }
                                                </button>
                                                {d.title}

                                            </div>

                                            {
                                                isCollapsed(d._id) ? <p></p> :

                                                    <>
                                                        <div className="card-body">
                                                            {d.description.slice(0, 380) + '...'}
                                                        </div>
                                                        <div className="card-footer d-flex justify-content-end">
                                                            <Link to={'/docs/' + d._id}>
                                                                <button className="btn btn-primary float-right">
                                                                    Find out more
                                                                </button>
                                                            </Link>
                                                            <button className="btn btn-primary" onClick={() => Collapse(d._id)}>
                                                                <FontAwesomeIcon icon={faMinus} />
                                                            </button>
                                                        </div>
                                                    </>
                                            }
                                        </div>

                                    )
                                }

                            </div>
                        </div>
            }
            <div className="col-lg-12 d-flex justify-content-center mt-5">
                <Paginate link='docs' page={page} />
            </div>
            <Footer />
        </>
    )
}

export default withRouter(Docs)
