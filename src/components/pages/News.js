import React, { useState, useEffect, useContext } from 'react'
import NavBar from '../layouts/navbar'
import '../../styles/news.css'
import { getWindowDimensions } from '../utility/screen'
import Footer from '../layouts/Footer'
import { Link, withRouter } from 'react-router-dom'
import { getPage } from '../../utility/route'
import { StoreContext } from '../../context/context'
import { newsDispatch } from '../../store/Actions/newsActions'
import DataLoading from '../layouts/DataLoading'
import ErrorLoading from '../layouts/ErrorLoading'
import { file } from '../../config/config'
import { tellDay } from '../utility/Date'
import { pageCalculate, Scroll } from '../utility/general'
import Paginate from './Paginate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';

function News({ location }) {
    const [dimesion, setWindowDimensions] = useState(getWindowDimensions());
    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    //store context
    const { news: News, dispatchNews } = useContext(StoreContext)
    let Page = getPage(location.search)

    useEffect(() => {
        newsDispatch(dispatchNews, Page)
        Scroll('top')
    }, [Page])
    const { loading, state: newS, error } = News
    const [news, length] = newS
    //paginationm
    const page = pageCalculate(8, news ? news.length : 0)

    return (
        <>
            <NavBar />
            {
                loading ?
                    <DataLoading /> :
                    error ? <ErrorLoading /> :
                        news.length ?
                            <div className="container">
                                <div className="row">
                                    {
                                        dimesion.width > 680 ?

                                            <div className="col-lg-12">
                                                <div className="news-container">
                                                    <div className="wrapper">
                                                        {/**display news */}
                                                        {
                                                            news.slice(0, 2).map(n => {
                                                                return (
                                                                    <Link to={'/news/' + n._id} key={n._id}>
                                                                        <div className="news-list">
                                                                            <div className="news-item">
                                                                                <div className="news-image">
                                                                                    <img src={file + n.image} alt="sample66" width={dimesion.width > 680 ? 750 : 700}
                                                                                        style={{ height: 260, objectFit: 'cover' }} />
                                                                                </div>
                                                                                <div className="news-content">
                                                                                    <h3 className="news-title">{n.title}</h3>
                                                                                    <p className="news-description h6">
                                                                                        {n.content.slice(0, 50) + '...'}
                                                                                    </p>

                                                                                    <a className="news-button text-dark h6">
                                                                                        Read more
                                                                                    </a>
                                                                                </div>


                                                                            </div>
                                                                        </div>
                                                                    </Link>
                                                                )
                                                            }
                                                            )
                                                        }

                                                    </div>
                                                </div>
                                            </div>
                                            : ''
                                    }
                                    {
                                        news.slice(2, 8).map(n =>
                                            <div className="col-lg-4">
                                                <Link to={'/news/' + n._id} key={n._id}>

                                                    <figure className="snip1208">
                                                        <img src={file + n.image} alt="sample66" />
                                                        <div className="date">
                                                            <span className="day">
                                                                {tellDay(n.createdAt).date}
                                                            </span><span className="month">{
                                                                tellDay(n.createdAt).month
                                                            }</span></div><i className="ion-film-marker"></i>
                                                        <figcaption>
                                                            <h5>{n.title}</h5>
                                                            <p>
                                                                {n.content.slice(0, 50) + '...'}
                                                            </p>
                                                            <button>Read More</button>
                                                        </figcaption>
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

                                            No news  registered yet
                                        </h1>
                                    </div>
                                </div>
                            </div>
            }
            <Footer />

        </>
    )
}

export default withRouter(News)
