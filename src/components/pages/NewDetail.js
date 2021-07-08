import React, { useContext, useEffect, useState } from 'react'
import Footer from '../layouts/Footer'
import NavBar from '../layouts/navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons'
import '../../styles/newDetails.css'
import { Link, withRouter } from 'react-router-dom'
import { Scroll } from '../utility/general'
import axios from 'axios'
import { file, host } from '../../config/config'
import DataLoading from '../layouts/DataLoading'
import ErrorLoading from '../layouts/ErrorLoading'
import { StoreContext } from '../../context/context'
import { newsDispatch } from '../../store/Actions/newsActions'
import ReactTimeAgo from 'react-time-ago/commonjs/ReactTimeAgo'
const NewDetail = ({ match }) => {
    const id = match.params.id
    const { news: NewS, dispatchNews } = useContext(StoreContext)
    const { state: NEWS, loading: newsLoading, error: newsError } = NewS
    const [News] = NEWS
    const [news, setNews] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
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
    return (
        <>
            <NavBar />
            {
                loading ?
                    <DataLoading /> :
                    error ?
                        <ErrorLoading /> :

                        <div className="container my-4">
                            <div className="row g-0">
                                <div className="col-lg-12 my-2">
                                    <h1>{news.title}</h1>
                                </div>
                                <div className="col-lg-7 justify-content-end">
                                    <img src={file + news.image} width={600} alt="" className="img-fluid" style={{ objectFit: 'cover' }} />
                                    <p className="small float-right my-2">
                                        <ReactTimeAgo date={news.createdAt} />
                                    </p>
                                    <div className="float-lg-right float-sm-right mb-3" >
                                        <FontAwesomeIcon icon={faFacebook} className="fa-1x mx-2 text-primary" />
                                        <FontAwesomeIcon icon={faTwitter} className="fa-1x text-primary" />
                                    </div>

                                </div>
                                <div className="col-lg-5">
                                    <p className="indent text-white h5" style={{ textAlign: 'justify' }}>
                                        {news.content}
                                    </p>
                                </div>

                                <div className="col-lg-12 my-2">
                                    <h1 className="text-center my-3">Other news</h1>
                                    <div class="blog-posts">
                                        {
                                            newsLoading ?
                                                <DataLoading /> :
                                                newsError ?
                                                    <ErrorLoading />
                                                    : News.filter(n => n._id !== id).slice(0, 6).map(n =>
                                                        <div class="post" key={n._id}>
                                                            <Link to={'/news/' + n._id}>
                                                                <img src={file + n.image} alt=""
                                                                    class="post-img" height={300} style={{ objectFit: 'cover' }} />
                                                                <div class="post-content">
                                                                    <h5 className='text-dark'>
                                                                        {n.title}
                                                                    </h5>
                                                                    <span class="date">
                                                                        {new Date(n.createdAt).toUTCString().slice(0, 17)}
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
            }
            <Footer />
        </>
    )
}

export default withRouter(NewDetail)
