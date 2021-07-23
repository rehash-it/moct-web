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
import { StoreContext } from '../../context/context';
import { newsDispatch } from '../../store/Actions/newsActions';
import { DotLoading } from '../layouts/Loading';
import ErrorLoading from '../layouts/ErrorLoading';
import { file } from '../../config/config';
import ReactTimeAgo from 'react-time-ago'
import { sitesDispatch } from '../../store/Actions/fetchSites';
import DataLoading from '../layouts/DataLoading';
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

    return (
        <>
            <NavBar />
            <CarouseL items={items} />

            <div className="container">
                <div className="row">
                    {/**sites */}
                    <div className="col-lg-12">
                        <h1 className="text-center text-white my-3">Attraction sites</h1>
                        {
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
                                    <div className="dark">
                                        <main className="container">
                                            <div className="h1 text-center" id="pageHeaderTitle">News</div>
                                            {
                                                news.slice(0, 4).map(n => {
                                                    return (
                                                        <article className="postcard dark yellow" key={n._id}>
                                                            <Link to={'/news/' + n._id} className="postcard__img_link" >
                                                                <img className="postcard__img"
                                                                    src={file + n.image} alt='error in loading' />
                                                            </Link>
                                                            <div className="postcard__text">
                                                                <Link to={'/news/' + n._id}>
                                                                    <h1 className="postcard__title yellow">

                                                                        {n.title}
                                                                    </h1>
                                                                </Link>
                                                                <div className="postcard__subtitle small">
                                                                    <time datetime="2020-05-25 12:00:00">
                                                                        <FontAwesomeIcon icon={faCalendarAlt} className='fas mr-2' />
                                                                        {new Date(n.createdAt).toUTCString().slice(0, 17)}
                                                                    </time>
                                                                </div>
                                                                <div className="postcard__bar"></div>
                                                                <div className="postcard__preview-txt">
                                                                    {n.content.slice(0, 240)}
                                                                </div>
                                                                <ul className="postcard__tagbox">
                                                                    <li className="tag__item">
                                                                        <FontAwesomeIcon icon={faTag} className="fas fa-calendar-alt mr-2" />
                                                                        <span>
                                                                            <Link to={'/news/' + n._id}>
                                                                                Read more
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
                                                })
                                            }




                                        </main>
                                    </div>
                                </div>
                    }
                    {/* some importnt links */}
                    <div className="col-lg-12">
                        <div className="buttons">
                            <h1 className='text-center'> important links</h1>
                            <button className="fill">www.moctgaller.gov.et</button>
                            <button className="pulse">www.moctgaller.gov.et</button>
                            <button className="raise">www.moctgaller.gov.et</button>
                            <button className="up">www.moctgaller.gov.et</button>
                            <button className="slide">www.moctgaller.gov.et</button>
                            <button className="fill">www.moctgaller.gov.et</button>
                        </div>
                    </div>
                </div>
            </div >
            <Footer />
        </ >
    )
}

export default Home
