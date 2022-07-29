import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons'
import '../../styles/newDetails.css'
import { Link, withRouter } from 'react-router-dom'
import { Scroll } from '../utility/general'
import axios from 'axios'
import { file, host } from '../../config/config'
import DataLoading from '../layouts/DataLoading'
import ErrorLoading from '../layouts/ErrorLoading'
import { LanguageContext, StoreContext } from '../../context/context'
import { newsDispatch } from '../../store/Actions/newsActions'
import ReactTimeAgo from 'react-time-ago/commonjs/ReactTimeAgo'
import { FacebookShareCount, FacebookShareButton, TwitterShareButton } from "react-share";
import { faShare } from '@fortawesome/free-solid-svg-icons'
import { tellDate } from '../utility/Date'
import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-multi-carousel'
import { responsive } from '../layouts/carousel'
const NewDetail = ({ match }) => {
    const id = match.params.id
    const { news: NewS, dispatchNews } = useContext(StoreContext)
    const { state: NEWS, loading: newsLoading, error: newsError } = NewS
    const [News] = NEWS
    const [news, setNews] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const url = window.location.href
    useEffect(() => {
        try {
            Scroll('top')
            setLoading(true)
            const getNews = async () => {
                const data = await axios.get(host + '/news/' + id)
                setNews(data.data)
                setLoading(false)
            }
            getNews()
            newsDispatch(dispatchNews, 1)
            Scroll('top')
        }
        catch (err) {
            console.log(err)
            setError(true)
        }
    }, [id])
    const { t } = useContext(LanguageContext)

    return (
                loading ?
                    <DataLoading /> :
                    error ?
                        <ErrorLoading /> :

                        <div className="container my-4">
                            <div className="row g-0 justify-content-center">
                                <div className="col-lg-12 text-center my-2">
                                    <h1>{news.title}</h1>
                                </div>
                                {news.images.length ?
                                    <div className="col-lg-7 justify-content-end">
                                        <img src={file + news.images[0]} width={600} alt="" className="img-fluid" style={{ objectFit: 'cover' }} />
                                        <p className="small float-right my-2">
                                            <ReactTimeAgo date={news.createdAt} />
                                        </p>
                                        <div className="d-flex justify-content-center mb-3" >
                                            <FontAwesomeIcon icon={faShare} className="fa-1x mx-2 text-primary my-auto" />
                                            <FacebookShareButton url={url} className='my-auto'>
                                                <FontAwesomeIcon icon={faFacebook} className="fa-2x mx-2 text-primary" />
                                                <FacebookShareCount url={url}>
                                                    {shareCount =>
                                                        <span className="myShareCountWrapper">
                                                            {shareCount}
                                                        </span>
                                                    }
                                                </FacebookShareCount>
                                            </FacebookShareButton>
                                            {/* twitter */}
                                            <TwitterShareButton url={url} className='my-auto'>
                                                <FontAwesomeIcon icon={faTwitter} className="fa-2x mx-2 text-primary" />

                                            </TwitterShareButton>

                                        </div>

                                    </div> : ''
                                }
                                {
                                    news.images.length ?

                                        <div className="col-lg-8 col-md-12">
                                            <p className="indent text-dark h5" style={{ textAlign: 'justify' }}>
                                                {news.content}
                                            </p>
                                        </div> :
                                        <div className="col-lg-12">
                                            <p className="indent h5" style={{ textAlign: 'justify' }}>
                                                {news.content}
                                            </p>
                                            <div className="d-flex justify-content-center mb-3" >
                                                <FontAwesomeIcon icon={faShare} className="fa-1x mx-2 text-primary my-auto" />
                                                <FacebookShareButton url={url} className='my-auto'>
                                                    <FontAwesomeIcon icon={faFacebook} className="fa-2x mx-2 text-primary" />
                                                    <FacebookShareCount url={url}>
                                                        {shareCount => <span className="myShareCountWrapper">{shareCount}</span>}
                                                    </FacebookShareCount>
                                                </FacebookShareButton>
                                                {/* twitter */}
                                                <TwitterShareButton url={url} className='my-auto'>
                                                    <FontAwesomeIcon icon={faTwitter} className="fa-2x mx-2 text-primary" />

                                                </TwitterShareButton>

                                            </div>
                                        </div>
                                }
                                <Carousel responsive={responsive} infinite={true}>
                                    {
                                        news.images.slice(1, news.images.length).map(i =>
                                            <div className="col-md-11 col-lg-11 col-sm-12" key={i} >
                                                <div className="card">
                                                    <img src={file + i} alt="" className="img-fluid" style={{ height: 400, objectFit: 'cover' }} />
                                                </div>
                                            </div>)
                                    }

                                </Carousel>
                                <div className="col-lg-12 my-2">
                                    {
                                        !newsLoading ? !newsError ?
                                            News.filter(n => n._id !== id).length ?
                                                <h1 className="text-center my-3">{t('Other news')} </h1> : <p></p>
                                            : '' : ''
                                    }
                                    <div class="blog-posts">
                                        {
                                            newsLoading ?
                                                <DataLoading /> :
                                                newsError ?
                                                    <ErrorLoading />
                                                    : News.filter(n => n._id !== id).slice(0, 6).map(n =>
                                                        <div class="post" key={n._id} >
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
                                                    )
                                        }


                                    </div>
                                </div>
                            </div>
                        </div>
    )
}

export default withRouter(NewDetail)
