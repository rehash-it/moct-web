import React, { useContext, useEffect, useState } from 'react'
import Footer from '../layouts/Footer'
import NavBar from '../layouts/navbar'
import { Link, withRouter } from 'react-router-dom';
import { searchDispatch } from '../../store/Actions/searchAction';
import DataLoading from '../layouts/DataLoading';
import ErrorLoading from '../layouts/ErrorLoading';
import { LanguageContext } from '../../context/context';
import { file } from '../../config/config';
import { tellDate } from '../utility/Date';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faLocationArrow, faThermometerEmpty, faDownload } from '@fortawesome/free-solid-svg-icons';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';
import { Scroll } from '../utility/general';
import PaginateSearch from './PaginateSearch';
import { pageCalculate } from '../utility/general';

const Search = ({ match, location }) => {
    const { index } = match.params
    const { search } = location
    const page = search.split('p=')[1]
    const [state, setState] = useState({
        data: {},
        loading: true,
        error: false
    })
    useEffect(() => {
        Scroll('top')
        searchDispatch(setState, { index, page, limit: 6 })
    }, [index, page])
    /**extract data */
    const { error, loading } = state
    const { news, sites, bids, docs, vacancy, archives } = state.data
    const { t } = useContext(LanguageContext)
    const paginateLength = () => {
        let pageNews = pageCalculate(6, news.length)
        let pageVacancy = pageCalculate(6, vacancy.length)
        let pageBids = pageCalculate(6, bids.length)
        let pageDocs = pageCalculate(6, docs.length)
        let pageSites = pageCalculate(6, sites.length)
        return Math.max(pageNews, pageVacancy, pageBids, pageDocs, pageSites)
    }

    return (
        <>
            <NavBar />
            {
                loading ?
                    <DataLoading /> :
                    error ?
                        <ErrorLoading /> :
                        <div className="container mt-4" style={{ minHeight: '100vh' }}>
                            {
                                (news.length + sites.length + bids.length + vacancy.length + docs.length) ?
                                    <div className="row">
                                        <div className="col-g-12">
                                            <h1>
                                                {index}:{t('search results')}
                                                ({news.length + sites.length + bids.length + vacancy.length + docs.length})
                                            </h1>
                                        </div>
                                    </div> :
                                    <div className="row">
                                        <div className="col-g-12">
                                            <h1 className='text-center'>
                                                {t('sorry ... No search result is found')}
                                            </h1>
                                        </div>
                                    </div>
                            }

                            {
                                news.data.length ?
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <h2 className="text-center text-white">{t('News')} ({news.length})</h2>
                                        </div>

                                        {news.data.map(n =>
                                            <div class="post" key={n._id}>
                                                <Link to={'/news/' + n._id}>
                                                    {
                                                        n.images.length ?
                                                            <img src={file + n.images[0]} alt=""
                                                                class="post-img" height={300} style={{ objectFit: 'cover' }} /> :
                                                            <p className="post-img">{n.content.slice(0, 700)}</p>
                                                    }
                                                    <div class="post-content">
                                                        <h5 className='text-dark'>
                                                            {n.title}
                                                        </h5>
                                                        <span class="date h6">
                                                            {tellDate(n.createdAt)}
                                                        </span>
                                                    </div>
                                                </Link>
                                            </div>
                                        )}

                                    </div> : ''
                            }
                            {
                                archives.data.length ?
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <h2 className="text-center text-white">{t('Archives')} ({archives.length})</h2>
                                        </div>

                                        {archives.data.map(n =>
                                            <div class="post" key={n._id}>
                                                <a href={n.link} target='_blank' rel="noreferrer">
                                                    {
                                                        n.image ?
                                                            <img src={file + n.image} alt=""
                                                                class="post-img" height={300} style={{ objectFit: 'cover' }} /> :
                                                            <p className="post-img">{n.title(0, 700)}</p>
                                                    }
                                                    <div class="post-content">
                                                        <h5 className='text-dark'>
                                                            {n.title}
                                                        </h5>
                                                        <span class="date h6">
                                                            {tellDate(n.createdAt)}
                                                        </span>
                                                    </div>
                                                </a>
                                            </div>
                                        )}

                                    </div> : ''
                            }
                            {
                                docs.data.length ?
                                    <div className="row">
                                        <div className="col-lg-12 my-2">
                                            <h2 className="text-center">{t('Research')} ({docs.length})</h2>
                                        </div>
                                        {
                                            docs.data.map(d =>
                                                <div className="col-lg-3" key={d._id}>
                                                    <Link to={'/docs/' + d._id}>
                                                        <div className="card">
                                                            <h4 className='text-center'>
                                                                <FontAwesomeIcon icon={faFile} className='fa-3x text-primary' /> <br />
                                                            </h4>
                                                            <div className="card-body">
                                                                <h5 className="text-dark">
                                                                    {d.title}
                                                                </h5>

                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            )
                                        }
                                    </div> : ''
                            }
                            {
                                bids.data.length ?
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <h2 className="text-center">
                                                {t('Bids')}({bids.length})
                                            </h2>
                                        </div>
                                        <div className="col-lg-12">
                                            <MDBTable className='my-3' responsive={true} bordered={true} >
                                                <MDBTableHead className='text-center' textWhite>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>{t('Title')}</th>
                                                        <th>{t('Instruction')}</th>
                                                        <th>{t('File and explanation')}</th>
                                                        <th>{t('Dead line')}</th>

                                                    </tr>
                                                </MDBTableHead>
                                                <MDBTableBody textWhite={true}>
                                                    {
                                                        bids.data.map((b, i = 0) => {
                                                            i++
                                                            return (
                                                                <tr key={b._id}>
                                                                    <td>{i}</td>
                                                                    <td>{b.title}</td>
                                                                    <td>{b.instruction}</td>
                                                                    <td>
                                                                        <a href={file + b.file} download={true} target="_blank" rel="noreferrer">

                                                                            <button className="btn btn-primary">
                                                                                <FontAwesomeIcon icon={faDownload} />
                                                                                Download
                                                                            </button>
                                                                        </a></td>
                                                                    <td>{tellDate(b.endDate)}</td>
                                                                </tr>)
                                                        })
                                                    }

                                                </MDBTableBody>
                                            </MDBTable>
                                        </div>
                                    </div> : ""
                            }
                            {
                                vacancy.data.length ?
                                    <div className="row">
                                        <div className="col-lg-12 my-3">
                                            <h2 className="text-center">
                                                {t('Vacancy')} ({vacancy.length})
                                            </h2>

                                        </div>
                                        <div className="col-lg-12">
                                            <MDBTable responsive bordered>
                                                <MDBTableHead textWhite>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>{t('Job title')}</th>
                                                        <th>{t('Job description')}</th>
                                                        <th>{t('Skills')}</th>
                                                        <th>{t('Work experience')}</th>
                                                        <th>{t('Required in quantity')}</th>
                                                        <th>{t('Dead line')}</th>
                                                    </tr>
                                                </MDBTableHead>
                                                <MDBTableBody >
                                                    {
                                                        vacancy.data.map((v, i = 0) => {
                                                            i++
                                                            return (
                                                                <tr key={v._id} className='text-white'>
                                                                    <td>{i}</td>
                                                                    <td>{v.title}</td>
                                                                    <td>{v.description}</td>
                                                                    <td>{v.skills}</td>
                                                                    <td>{v.experience}</td>
                                                                    <td>{v.quantity}</td>
                                                                    <td>{tellDate(v.endDate)}</td>

                                                                </tr>

                                                            )
                                                        })
                                                    }
                                                </MDBTableBody>
                                            </MDBTable>
                                        </div>
                                    </div> : ""
                            }
                            {
                                sites.data.length ?
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <h2 className="text-center">
                                                    {t('Attraction sites')} ({sites.length})
                                                </h2>
                                            </div>
                                            <div class="cont mt-3">
                                                {sites.data.slice(0, 3).map(s =>
                                                    <sec class="programs" key={s._id}>
                                                        <Link to={'/site/' + s._id}>
                                                            <div class="content">
                                                                <h2 >{s.region}</h2>
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
                                            <div class="cont">
                                                {sites.data.slice(3, 6).map(s =>
                                                    <sec class="programs" key={s._id}>
                                                        <Link to={'/site/' + s._id}>
                                                            <div class="content">
                                                                <h2 >{s.region}</h2>
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
                                        </div>
                                    </div> : ""
                            }
                            <div className="row">
                                <div className="col-lg-12 d-flex justify-content-center mt-5">
                                    <PaginateSearch index={index} page={paginateLength()} />
                                </div>
                            </div>
                        </div>
            }
            <Footer />
        </>
    )
}

export default withRouter(Search)
