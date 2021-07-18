import React, { useState, useEffect } from 'react'
import Footer from '../layouts/Footer'
import NavBar from '../layouts/navbar'
import { Link, withRouter } from 'react-router-dom'
import '../../styles/sites.css'
import { sitesDispatch } from '../../store/Actions/fetchSites'
import { pageCalculate, Scroll } from '../utility/general'
import DataLoading from '../layouts/DataLoading'
import ErrorLoading from '../layouts/ErrorLoading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { file } from '../../config/config'
import PaginateSites from './PaginateSites';
function Sites({ location }) {
    const [state, setState] = useState({
        loading: true,
        error: false,
        data: [],
        length: 0
    })
    let split = location.search.split('=')
    let region = split[1].split('&')[0]
    let Page = location.search.split('p=')[1]
    console.log(region, Page)
    const { loading, error, data, length: Length } = state
    const length = region === 'All' ? Length : data.length
    let page = pageCalculate(15, length)
    useEffect(() => {
        Scroll('top')
        sitesDispatch(setState, { region, page: Page ? Page : 1, limit: 12 })
    }, [Page, region])
    return (
        <>
            <NavBar />
            {
                loading ? <DataLoading /> :
                    error ? <ErrorLoading /> :

                        <div className="container-fluid">
                            <div className="row my-3">

                                <h1 className="text-center text-white">
                                    Know about land of origins
                                </h1>
                            </div>
                            <div class="cont my-3">
                                {length ?
                                    data.slice(0, 6).map(s =>
                                        <sec class="programs" key={s._id}>
                                            <Link to={'site/' + s._id}>
                                                <div class="content">
                                                    <h2 >{region === 'All' ? (s.region + ' region') : ''}</h2>
                                                    <h3>{s.title}</h3>
                                                    <p>{s.description.slice(0, 300) + '...'}</p>
                                                    <ul>
                                                        <li >
                                                            <FontAwesomeIcon icon={faLocationArrow} />
                                                            <span>Location={s.location}</span></li>
                                                    </ul>
                                                </div>
                                            </Link>
                                            <img src={file + s.images[0]} alt='' style={{ objectFit: 'cover' }} />
                                        </sec>
                                    ) :
                                    <div className="col-lg-12 text-center">
                                        <h4 className="text-danger">
                                            sorry...   No Attraction site registered yet
                                        </h4>
                                    </div>
                                }

                            </div >
                            <div className="ml">
                                {data.slice(6, 12).map(s =>
                                    <Link to={'site/' + s._id} key={s._id}>
                                        <div className="ml-pnl ml-flp--md ml-flp ml-clstr--hrz">
                                            <div className="ml-pnl__cntnt ml-flp__cntnt">
                                                <img className="ml-flp__pnl ml-flp__pnl--frnt" src={file + s.images[0]} alt='' style={{ objectFit: 'cover' }} />
                                                <div className="ml-flp__pnl ml-flp__pnl--bck text-raise">
                                                    <h3 className="text-center">
                                                        {s.title}
                                                    </h3>
                                                    <p>
                                                        {s.description.slice(0, 401) + '...'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )}



                            </div>
                            <div className="col-lg-12 d-flex justify-content-center mt-5">
                                <PaginateSites region={region} page={page} />
                            </div>
                        </div>
            }
            <Footer />

        </>
    )
}

export default withRouter(Sites)
