import React, { useContext, useEffect, useState } from 'react'
import CarouseL from '../layouts/carousel';
import NavBar from '../layouts/navbar'
import Ertale from '../../images/erta ale the smoking mountain of afar.png'
import BlueNile from '../../images/Blue-Nile.jpg'
import Monkey from '../../images/semine mountain national park.png'
import Meskel from '../../images/meskel celebration.png'
import '../../styles/home.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt, faClock, faTag } from '@fortawesome/free-solid-svg-icons'
import Footer from '../layouts/Footer';
import { LanguageContext, StoreContext } from '../../context/context';
import { newsDispatch } from '../../store/Actions/newsActions';
import { DotLoading } from '../layouts/Loading';
import ErrorLoading from '../layouts/ErrorLoading';
import { file } from '../../config/config';
import ReactTimeAgo from 'react-time-ago'
import { sitesDispatch } from '../../store/Actions/fetchSites';
import DataLoading from '../layouts/DataLoading';
import { tellDate } from '../utility/Date'
const items = [
    {
        src: Ertale,
        altText: 'Eritale',
        caption: 'Active magma'
    },
    {
        src: Meskel,
        altText: 'Meskel',
        caption: 'Christian celebration'
    },
    {
        src: BlueNile,
        altText: 'Blue nile',
        caption: 'Longet river in the world'
    },
    {
        src: Monkey,
        altText: 'Semen mountain',
        caption: 'semen mountain park'
    }
];
function Home() {
    const { news: News, dispatchNews } = useContext(StoreContext)
    const { state: NewS, loading: loadingNews, error } = News
    const [sites, setSite] = useState({
        data: [], loading: true, error: false, length: 0
    })
    useEffect(() => {
        //es-lint
        newsDispatch(dispatchNews, 1)
        sitesDispatch(setSite, { region: 'All', page: 1, limit: 6 })

    }, [])
    const [news] = NewS
    const { t } = useContext(LanguageContext)
    return (
        <>
            <NavBar />
            <CarouseL items={items} />

            <div className="container">
                <div className="row">
                    {/**sites */}
                    <div className="col-lg-12">
                        {sites.data.slice(0, 6).length ?
                            <h1 className="text-center text-white my-3">{t('Attraction sites')}</h1> :
                            <p></p>
                        } {
                            sites.loading ? <DataLoading /> :
                                sites.error ? <ErrorLoading /> :

                                    <div className="ml">
                                        {
                                            sites.data.slice(0, 6).map(s =>
                                                <Link to={'/site/' + s._id} key={s._id}>
                                                    <div className="ml-pnl ml-flp--md ml-flp ml-clstr--hrz" >

                                                        <div className="ml-pnl__cntnt ml-flp__cntnt">
                                                            <img className="ml-flp__pnl ml-flp__pnl--frnt" src={file + s.images[0]} alt=''
                                                                style={{ objectFit: 'cover' }} />
                                                            <div className="ml-flp__pnl ml-flp__pnl--bck text-raise">
                                                                <h4 className="text-raise text-center">{s.title}</h4>
                                                                <p className="text-white h6">
                                                                    {s.description.slice(0, 300) + '...'}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            )}
                                    </div>
                        }
                    </div>

                    {/** */}
                    {
                        loadingNews ? <DotLoading /> :
                            error ?
                                <ErrorLoading /> :

                                <div className="col-lg-12">
                                    <div className="light">
                                        <main className="container">
                                            {news.slice(0, 4).length ?
                                                <div className="h1 text-center" id="pageHeaderTitle">{t('News')}</div> :
                                                <p></p>
                                            }{
                                                news.slice(0, 4).map(n =>

                                                    <article className="postcard light yellow" key={n._id}>
                                                        <Link to={'/news/' + n._id} className="postcard__img_link" >
                                                            <img className="postcard__img"
                                                                src={file + n.images[0]} alt='error in loading' />
                                                        </Link>
                                                        <div className="postcard__text">
                                                            <Link to={'/news/' + n._id}>
                                                                <h1 className="postcard__title yellow text-dark">

                                                                    {n.title}
                                                                </h1>
                                                            </Link>
                                                            <div className="postcard__subtitle small">
                                                                <time datetime="2020-05-25 12:00:00">
                                                                    <FontAwesomeIcon icon={faCalendarAlt} className='fas mx-2' />
                                                                    {tellDate(n.createdAt)}
                                                                </time>
                                                            </div>
                                                            <div className="postcard__bar"></div>
                                                            <div className="postcard__preview-txt text-dark">
                                                                {n.content.slice(0, 240)}
                                                            </div>
                                                            <ul className="postcard__tagbox">
                                                                <li className="tag__item">
                                                                    <FontAwesomeIcon icon={faTag} className="fas fa-calendar-alt mr-2" />
                                                                    <span>
                                                                        <Link to={'/news/' + n._id}>
                                                                            {t('Read more')}
                                                                        </Link>
                                                                    </span>
                                                                </li>
                                                                <li className="tag__item">
                                                                    <FontAwesomeIcon icon={faClock} className='fas mr-2' />
                                                                    <ReactTimeAgo date={n.createdAt} />
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </article>

                                                )
                                            }




                                        </main>
                                    </div>
                                </div>
                    }
                    {/* some importnt links */}
                    <div className="col-lg-12 ">
                        <div className="buttons text-center">
                            <h1 className='text-center my-2'>{t('important links')} </h1>
                            <a href="https://www.gallery.gov.eimport { product } from './../Forum/tryclass';
t" target="_blank" rel="noreferrer">
                                <button className="fill h6">www.gallery.gov.et</button>
                            </a>
                            <a href="https://www.gallery.gov.et" target="_blank" rel="noreferrer">
                                <button className="pulse h6">www.gallery.gov.et</button>
                            </a>
                            <a href="https://www.gallery.gov.et" target="_blank" rel="noreferrer">
                                <button className="raise h6">www.gallery.gov.et</button>
                            </a>
                            <a href="https://www.gallery.gov.et" target="_blank" rel="noreferrer">
                                <button className="up h6">www.gallery.gov.et</button>
                            </a>
                            <a href="https://www.gallery.gov.et" target="_blank" rel="noreferrer">
                                <button className="slider h6">www.gallery.gov.et</button>
                            </a>

                        </div>
                    </div>
                </div>
            </div >
            <Footer />
        </ >
    )
}

export default Home
