import React, { useState, useEffect } from 'react'
import NavBar from '../layouts/navbar'
import '../../styles/news.css'
import Hirut from '../../images/Hirut.jpg'
import Zebras from '../../images/zebras at nechisar park.png'
import { getWindowDimensions } from '../utility/screen'
import Footer from '../layouts/Footer'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
function News() {
    const [dimesion, setWindowDimensions] = useState(getWindowDimensions());
    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <>
            <NavBar />
            <div className="container">
                <div className="row">
                    {
                        dimesion.width > 680 ?

                            <div className="col-lg-12">
                                <div class="news-container">
                                    <div class="wrapper">
                                        {/**newws one */}
                                        <div class="news-list">
                                            <div class="news-item">
                                                <div class="news-image">
                                                    <img src={Hirut} alt="" width={dimesion.width > 680 ? 750 : 700} style={{ height: 260, objectFit: 'cover' }} />
                                                </div>
                                                <div class="news-content">
                                                    <h3 class="news-title">Lorem ipsum dolor sit amet.</h3>
                                                    <p class="news-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, nihil!</p>

                                                    <a class="news-button">
                                                        Read more
                                                    </a>
                                                </div>


                                            </div>
                                        </div>
                                        {/**news two */}
                                        <div class="news-list">
                                            <div class="news-item">
                                                <div class="news-image">
                                                    <img src={Zebras} alt="" width={750} style={{ height: 250, objectFit: 'cover' }} />
                                                </div>
                                                <div class="news-content">
                                                    <h3 class="news-title">Lorem ipsum dolor sit amet.</h3>
                                                    <p class="news-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, nihil!</p>

                                                    <a class="news-button">
                                                        Read more
                                                    </a>
                                                </div>


                                            </div>
                                        </div>
                                        {/*  */}
                                        <a class="image-author" href={Hirut}>Photo by: anna-m. w.
                                        </a>
                                    </div>
                                </div>
                            </div>
                            : ''
                    }
                    <div className="col-lg-4">
                        <figure class="snip1208">
                            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample66.jpg" alt="sample66" />
                            <div class="date"><span class="day">28</span><span class="month">Oct</span></div><i class="ion-film-marker"></i>
                            <figcaption>
                                <h3>The World Ended Yesterday</h3>
                                <p>
                                    I don't need to compromise my principles, because they don't have the slightest bearing on what happens to me anyway.
                                </p>
                                <button>Read More</button>
                            </figcaption><a href="#"></a>
                        </figure>

                    </div>
                    <div className="col-lg-4">
                        <figure class="snip1208">
                            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample6.jpg" alt="sample6" />
                            <div class="date"><span class="day">01</span><span class="month">Dec</span></div><i class="ion-checkmark"> </i>
                            <figcaption>
                                <h3>Down with this sort of thing</h3>
                                <p>
                                    I don't need to compromise my principles, because they don't have the slightest bearing on what happens to me anyway.
                                </p>
                                <button>Read More</button>
                            </figcaption><a href="#"></a>
                        </figure>
                    </div>
                    <div className="col-lg-4">
                        <figure class="snip1208 hover">
                            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample9.jpg" alt="sample9" />
                            <div class="date"><span class="day">17</span><span class="month">Nov</span></div><i class="ion-headphone"> </i>
                            <figcaption>
                                <h3>An Abstract Post Heading</h3>
                                <p>
                                    Sometimes the surest sign that intelligent life exists elsewhere in the universe is that none of it has tried to contact us.
                                </p>
                                <button>Read More</button>
                            </figcaption><a href="#"></a>
                        </figure>

                    </div>
                    <div className="col-lg-4">
                        <figure class="snip1208 hover">
                            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample9.jpg" alt="sample9" />
                            <div class="date"><span class="day">17</span><span class="month">Nov</span></div><i class="ion-headphone"> </i>
                            <figcaption>
                                <h3>An Abstract Post Heading</h3>
                                <p>
                                    Sometimes the surest sign that intelligent life exists elsewhere in the universe is that none of it has tried to contact us.
                                </p>
                                <button>Read More</button>
                            </figcaption><a href="#"></a>
                        </figure>

                    </div>
                    <div className="col-lg-4">
                        <figure class="snip1208 hover">
                            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample9.jpg" alt="sample9" />
                            <div class="date"><span class="day">17</span><span class="month">Nov</span></div><i class="ion-headphone"> </i>
                            <figcaption>
                                <h3>An Abstract Post Heading</h3>
                                <p>
                                    Sometimes the surest sign that intelligent life exists elsewhere in the universe is that none of it has tried to contact us.
                                </p>
                                <button>Read More</button>
                            </figcaption><a href="#"></a>
                        </figure>

                    </div>
                    <div className="col-lg-4">
                        <figure class="snip1208 hover">
                            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample9.jpg" alt="sample9" />
                            <div class="date"><span class="day">17</span><span class="month">Nov</span></div><i class="ion-headphone"> </i>
                            <figcaption>
                                <h3>An Abstract Post Heading</h3>
                                <p>
                                    Sometimes the surest sign that intelligent life exists elsewhere in the universe is that none of it has tried to contact us.
                                </p>
                                <button>Read More</button>
                            </figcaption><a href="#"></a>
                        </figure>

                    </div>
                    <div className="col-lg-12 d-flex justify-content-center mt-5">
                        <Pagination aria-label="Page navigation example">

                            <PaginationItem>
                                <PaginationLink href="#">
                                    <h4>1</h4>
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">
                                    <h4>2</h4>
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">
                                    <h4>3</h4>
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">
                                    <h4>3</h4>
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">
                                    <h4>4</h4>
                                </PaginationLink>
                            </PaginationItem>

                        </Pagination>
                    </div>
                </div>

            </div>
            <Footer />

        </>
    )
}

export default News
