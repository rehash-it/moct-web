import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { datasDispatch } from '../../store/Actions/dataActions'
import { getPage } from '../../utility/route'
import DataLoading from '../layouts/DataLoading'
import ErrorLoading from '../layouts/ErrorLoading'
import { pageCalculate, Scroll } from '../utility/general'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import Paginate from './Paginate'
import { CSSTransition } from 'react-transition-group';
import { useContext } from 'react'
import { LanguageContext } from '../../context/context'

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
        datasDispatch(setResearch, { page: Page, limit: 9, url: 'docs', admin: false })
    }, [Page])
    const isCollapsed = id => collapse.find(c => c === id) ? false : true

    const Collapse = id => isCollapsed(id) ?
        setCollapse(s => ([...s, id])) :
        setCollapse(s => s.filter(d => d !== id))
    const [inProp, setInProp] = useState(false);
    const { t } = useContext(LanguageContext)
    return (
                loading ?
                    <DataLoading /> :
                    error ?
                        <ErrorLoading /> :
                        data.length ?
                            <div className="container my-3">
                                <h1 className="text-center">
                                    {t('Research and studies')}
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

                                                        <CSSTransition in={inProp} timeout={300} classNames="my-node">
                                                            <>
                                                                <div className="card-body">
                                                                    {d.description.slice(0, 380) + '...'}
                                                                </div>
                                                                <div className="card-footer d-flex justify-content-end">
                                                                    <Link to={'/docs/' + d._id}>
                                                                        <button className="btn btn-primary float-right">
                                                                            {t('Find out more')}
                                                                        </button>
                                                                    </Link>
                                                                    <button className="btn btn-primary" onClick={() => Collapse(d._id)}>
                                                                        <FontAwesomeIcon icon={faMinus} />
                                                                    </button>
                                                                </div>
                                                            </>
                                                        </CSSTransition>
                                                }
                                            </div>

                                        )
                                    }

                                </div>
                                <div className="col-lg-12 d-flex justify-content-center mt-5">
                                    <Paginate link='docs' page={page} />
                                </div>
                            </div> :
                            <div className="container mt-4" style={{ minHeight: '100vh' }}>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <h1 className="text-center">
                                            <FontAwesomeIcon icon={faFile} className='mx-2' />

                                            No news  Studies and research registered yet
                                        </h1>
                                    </div>
                                </div>
                            </div>
    )
}

export default withRouter(Docs)
