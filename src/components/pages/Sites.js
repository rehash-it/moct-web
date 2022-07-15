import React, { useState, useEffect } from 'react'
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
import { useContext } from 'react'
import { LanguageContext } from '../../context/context'
import { TitleBar } from '../layouts/titlebar'
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
    const { loading, error, data, length: Length } = state
    const length = region === 'All' ? Length : state.data.length
    let page = pageCalculate(15, length)
    useEffect(() => {
        Scroll('top')
        sitesDispatch(setState, { region, page: Page ? Page : 1, limit: 12 })
    }, [Page, region])
    const { t } = useContext(LanguageContext)
    return (
                loading ? <DataLoading /> :
                    error ? <ErrorLoading /> :
                        length ?
                        <>
                            <TitleBar text='Know about land of origins' />
                            <div className="container-fluid">
                                <div class="cont mt-3">
                                    {data.slice(0, 3).map(s =>
                                        <sec class="programs" key={s._id}>
                                            <Link to={'site/' + s._id}>
                                                <div class="content">
                                                    <h2 >{`${s.region} region`}</h2>
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
                                    )
                                    }

                                </div >
                                {data.length > 3 && <div className="cont" >
                                    {data.slice(3, 5).map(s =>
                                        <sec class="programs" key={s._id}>
                                            <Link to={'site/' + s._id}>
                                                <div class="content">
                                                    <h2 >{region === 'All' ? (s.region + ' region') : ''}</h2>
                                                    <h3>{s.title}</h3>
                                                    <p>{s.description.slice(0, 300) + '...'}</p>
                                                    <ul>
                                                        <li >
                                                            <FontAwesomeIcon icon={faLocationArrow} />
                                                            <span>Location = {'lng: ' + s.lng + '  lat: ' + s.lat}</span></li>
                                                    </ul>
                                                </div>
                                            </Link>
                                            <img src={file + s.images[0]} alt='' style={{ objectFit: 'cover' }} />
                                        </sec>
                                    )
                                    }

                                </div>}
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
                            </>
                            :
                            <div className="col-lg-12 text-center mt-4" style={{ minHeight: '100vh' }}>
                                <h1 className="text-danger">
                                    {t('No Attraction site registered yet')}
                                </h1>
                            </div>
    )
}

export default withRouter(Sites)
