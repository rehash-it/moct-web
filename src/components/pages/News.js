import React, { useState, useEffect, useContext } from 'react'
import '../../styles/news.css'
import { getWindowDimensions } from '../utility/screen'
import { Link, withRouter } from 'react-router-dom'
import { getPage } from '../../utility/route'
import { LanguageContext, StoreContext } from '../../context/context'
import { newsDispatch } from '../../store/Actions/newsActions'
import DataLoading from '../layouts/DataLoading'
import ErrorLoading from '../layouts/ErrorLoading'
import { file } from '../../config/config'
import { tellDay } from '../utility/Date'
import { pageCalculate, Scroll } from '../utility/general'
import Paginate from './Paginate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { fbRssFeed, twitterFeed } from './RssFeed'
import Carousel from 'react-multi-carousel'
import { responsive } from '../layouts/carousel'
import { SpinnerLoading } from '../layouts/Loading'
import 'react-multi-carousel/lib/styles.css';
import ReactTimeAgo from 'react-time-ago/commonjs/ReactTimeAgo'
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';

function News({ location }) {
    const [dimesion, setWindowDimensions] = useState(getWindowDimensions());
    const [rssButton, showRssButton] = useState(true)
    const [RssFeed, setRssFeed] = useState({
        data: [],
        error: false,
        loading: true
    })
    const [tRssFeed, setTRssFeed] = useState({
        data: [],
        error: false,
        loading: true
    })
    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    //store context
    const { news: News
        , dispatchNews } = useContext(StoreContext)
    let Page = getPage(location.search)

    useEffect(() => {
        newsDispatch(dispatchNews, Page)
        Scroll('top')
    }, [Page])
    const { loading, state: newS, error } = News
    const [news, length] = newS
    //paginationm
    const page = pageCalculate(8, news ? news.length : 0)
    const { t } = useContext(LanguageContext)
    const rss = () => {
        fbRssFeed(setRssFeed)
        twitterFeed(setTRssFeed)
        showRssButton(!rssButton)
    }
    const rssDismiss = () => showRssButton(true)
    return (
                loading ?
                    <DataLoading /> :
                    error ? <ErrorLoading /> :
                        news.length ?
                            <div className="container">
                                <div className="row justify-content-around">
                                    <div className="col-lg-12 d-flex justify-content-center">
                                        <button className="btn btn-raise my-2" onClick={rss}>
                                            {
                                                rssButton ? 'Rss feed' : ' close'
                                            }
                                        </button>

                                    </div>
                                    {
                                        !rssButton ?
                                            RssFeed.loading ?
                                                <div className="col-lg-12 col-md-12 col-sm-12">
                                                    <SpinnerLoading />
                                                </div> :
                                                RssFeed.error ?
                                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                                        <h4 className="text-center text-danger">
                                                            Can not fetch rss feed connection time out <br />
                                                        </h4>
                                                        <button className="btn btn-danger text-center" onClick={rssDismiss}>
                                                            dismiss
                                                        </button>
                                                    </div> :
                                                    <div className="row justify-content-center">

                                                        <Carousel responsive={responsive} infinite={true}>
                                                            {
                                                                RssFeed.data.map(r =>
                                                                    <div className="col-lg-11 col-md-11 col-sm-11" key={r.id}>
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
                                                                                    <FontAwesomeIcon icon={faFacebook} className='text-primary fa-2x mx-2' />
                                                                                    facebook.com <ReactTimeAgo date={r.date} />
                                                                                </p>
                                                                            </div>
                                                                        </a>
                                                                    </div>
                                                                )}
                                                        </Carousel>
                                                        {
                                                            (!tRssFeed.loading && !tRssFeed.error) ?
                                                                <Carousel responsive={responsive} infinite={true}>
                                                                    {
                                                                        tRssFeed.data.map(r =>
                                                                            <div className="col-lg-11 col-md-11 col-sm-11 mt-3" key={r.id}>
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
                                                                                            <FontAwesomeIcon icon={faTwitter} className='text-primary fa-2x mx-2' />
                                                                                            twitter.com <ReactTimeAgo date={r.date} />
                                                                                        </p>
                                                                                    </div>
                                                                                </a>
                                                                            </div>
                                                                        )
                                                                    }
                                                                </Carousel>
                                                                : ''
                                                        }
                                                    </div>
                                            : ''
                                    }
                                    {
                                            <div className="col-lg-12">
                                                <div className="news-container">
                                                    <div className="row">
                                                        {/**display news */}
                                                        {
                                                            news.slice(0,2).map(n => {
                                                                return (
                                                                    <div className='col-12 col-lg-6'>
                                                                        <Link to={'/news/' + n._id} key={n._id}>
                                                                            <div className="news-list">
                                                                                <div className="news-item">
                                                                                    {
                                                                                        n.images.length ?
                                                                                            <div className="news-image">
                                                                                                <img src={file + n.images[0]} alt={n.title} width={dimesion.width > 680 ? 750 : 700}
                                                                                                    style={{ height: 260, objectFit: 'cover' }} />
                                                                                            </div> : ''
                                                                                    }
                                                                                    <div className="news-content">
                                                                                        <h3 className="news-title">{n.title}</h3>
                                                                                        <p className="news-description h6">
                                                                                            {n.content.slice(0, 50) + '...'}
                                                                                        </p>
                                                                                        <a className="news-button text-dark h6">
                                                                                            {t('Read more')}
                                                                                        </a>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                )
                                                            }
                                                            )
                                                        }

                                                    </div>
                                                </div>
                                            </div>
                                    }
                                    {
                                        news.slice(2, 8).map(n =>
                                            <div className="col-12 col-md-6 col-lg-4 my-2">
                                                <Link to={'/news/' + n._id} key={n._id} style={{display: 'inline-block', width: '100%'}}>
                                                    <figure className="snip1208" style={{width: "100%", margin: 'auto'}}>
                                                        <div className='row'>
                                                            <div className="col-6">{n.images.length ? <img src={file + n.images[0]} alt="sample66" /> : ''}</div>
                                                            <div className='col-6'>
                                                                {n.images.length ?
                                                                    <div className="date">
                                                                        <span className="day">
                                                                            {tellDay(n.createdAt).date}
                                                                        </span><span className="month">{
                                                                            tellDay(n.createdAt).month
                                                                        }</span>
                                                                    </div> : ''
                                                                }
                                                                <i className="ion-film-marker"></i>
                                                                <figcaption className='mx-auto'>
                                                                    <h5>{n.title}</h5>
                                                                    <p>
                                                                        {n.content.slice(0, 50) + '...'}
                                                                    </p>
                                                                    <button> {t('Read more')}</button>
                                                                </figcaption>
                                                            </div>
                                                        </div>
                                                    </figure>
                                                </Link>
                                            </div>
                                        )
                                    }

                                    <div className="col-lg-12 d-flex justify-content-center mt-5">
                                        <Paginate link='news' page={page} />
                                    </div>
                                </div>

                            </div> :
                            <div className="container mt-4" style={{ minHeight: '100vh' }}>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <h1 className="text-center">
                                            <FontAwesomeIcon icon={faNewspaper} className='mx-2' />

                                            {t('No news  registered yet')}
                                        </h1>
                                    </div>
                                </div>
                            </div>
    )
}

export default withRouter(News)
