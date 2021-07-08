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
    console.log(news)
    //paginationm
    const page = pageCalculate(8, length)

    return (
        <>
            <NavBar />
            {
                loading ?
                    <DataLoading /> :
                    error ? <ErrorLoading /> :

                        <div className="container">
                            <div className="row">
                                {
                                    dimesion.width > 680 ?

                                        <div className="col-lg-12">
                                            <div class="news-container">
                                                <div class="wrapper">
                                                    {/**display news */}
                                                    {
                                                        news.slice(0, 2).map(n => {
                                                            return (
                                                                <Link to={'/news/' + n._id} key={n._id}>
                                                                    <div class="news-list">
                                                                        <div class="news-item">
                                                                            <div class="news-image">
                                                                                <img src={file + n.image} alt="sample66" width={dimesion.width > 680 ? 750 : 700}
                                                                                    style={{ height: 260, objectFit: 'cover' }} />
                                                                            </div>
                                                                            <div class="news-content">
                                                                                <h3 class="news-title">{n.title}</h3>
                                                                                <p class="news-description h6">
                                                                                    {n.content.slice(0, 50) + '...'}
                                                                                </p>

                                                                                <a class="news-button text-dark h6">
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

                                                <figure class="snip1208">
                                                    <img src={file + n.image} alt="sample66" />
                                                    <div class="date">
                                                        <span class="day">
                                                            {tellDay(n.createdAt).date}
                                                        </span><span class="month">{
                                                            tellDay(n.createdAt).month
                                                        }</span></div><i class="ion-film-marker"></i>
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

                        </div>
            }
            <Footer />

        </>
    )
}

export default withRouter(News)
