import React from 'react'
import CarouseL from '../layouts/carousel';
import NavBar from '../layouts/navbar'
import Ertale from '../../images/erta ale the smoking mountain of afar.png'
import Gonder from '../../images/Gonder.png'
import BlueNile from '../../images/Blue-Nile.jpg'
import Monkey from '../../images/semine mountain national park.png'
import Danakil from '../../images/Danakil.jpg'
import Meskel from '../../images/meskel celebration.png'
import '../../styles/home.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag } from '@fortawesome/free-solid-svg-icons'
import Footer from '../layouts/Footer';
import Axum from '../../images/axum obelisks.png'
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
    return (
        <>
            <NavBar />
            <CarouseL items={items} />

            <div className="container">
                <div className="row">
                    {/**sites */}
                    <div className="col-lg-12">
                        <h1 className="text-center text-white my-3">Attraction sites</h1>
                        <div className="ml">
                            <div className="ml-pnl ml-flp--md ml-flp ml-clstr--hrz">
                                <div className="ml-pnl__cntnt ml-flp__cntnt">
                                    <img className="ml-flp__pnl ml-flp__pnl--frnt" src={Gonder} alt='' />
                                    <div className="ml-flp__pnl ml-flp__pnl--bck text-raise">
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur fugit maiores reiciendis? Sit ullam ipsa consectetur ratione obcaecati architecto! Cupiditate?</p>
                                    </div>
                                </div>
                            </div>
                            <div className="ml-pnl ml-flp--md ml-flp ml-clstr--hrz">
                                <div className="ml-pnl__cntnt ml-flp__cntnt">
                                    <img className="ml-flp__pnl ml-flp__pnl--frnt" src={Monkey} alt='' />
                                    <div className="ml-flp__pnl ml-flp__pnl--bck bg--white">
                                        <h3>Lorem, ipsum dolor.</h3>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur fugit maiores reiciendis? Sit ullam ipsa consectetur ratione obcaecati architecto! Cupiditate?</p>
                                    </div>
                                </div>
                            </div>
                            <div className="ml-pnl ml-flp--md ml-flp ml-clstr--hrz">
                                <div className="ml-pnl__cntnt ml-flp__cntnt">
                                    <img className="ml-flp__pnl ml-flp__pnl--frnt" src={Axum} alt='' />
                                    <div className="ml-flp__pnl ml-flp__pnl--bck bg--white">
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur fugit maiores reiciendis? Sit ullam ipsa consectetur ratione obcaecati architecto! Cupiditate?</p>
                                    </div>
                                </div>
                            </div>
                            <div className="ml-pnl ml-flp--md ml-flp ml-clstr--hrz">
                                <div className="ml-pnl__cntnt ml-flp__cntnt">
                                    <img className="ml-flp__pnl ml-flp__pnl--frnt" src={Danakil} alt='' />
                                    <div className="ml-flp__pnl ml-flp__pnl--bck bg--white">
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur fugit maiores reiciendis? Sit ullam ipsa consectetur ratione obcaecati architecto! Cupiditate?</p>
                                    </div>
                                </div>
                            </div>
                            <div className="ml-pnl ml-flp--md ml-flp ml-clstr--hrz">
                                <div className="ml-pnl__cntnt ml-flp__cntnt">
                                    <img className="ml-flp__pnl ml-flp__pnl--frnt" src={Danakil} alt='' />
                                    <div className="ml-flp__pnl ml-flp__pnl--bck bg--white">
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur fugit maiores reiciendis? Sit ullam ipsa consectetur ratione obcaecati architecto! Cupiditate?</p>
                                    </div>
                                </div>
                            </div>
                            <div className="ml-pnl ml-flp--md ml-flp ml-clstr--hrz">
                                <div className="ml-pnl__cntnt ml-flp__cntnt">
                                    <img className="ml-flp__pnl ml-flp__pnl--frnt" src={Danakil} alt='' />
                                    <div className="ml-flp__pnl ml-flp__pnl--bck bg--white">
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur fugit maiores reiciendis? Sit ullam ipsa consectetur ratione obcaecati architecto! Cupiditate?</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/** */}
                    <div className="col-lg-12">
                        <div className="dark">
                            <main className="container">
                                <div className="h1 text-center" id="pageHeaderTitle">News</div>
                                <article className="postcard dark blue">
                                    <Link to="#" className="postcard__img_link" >
                                        <img className="postcard__img" src={Ertale} alt='' />
                                    </Link>
                                    <div className="postcard__text">
                                        <h1 className="postcard__title blue">
                                            <a href="#">Lalibela</a></h1>
                                        <div className="postcard__subtitle small">
                                            Wello lalibela
                                        </div>
                                        <div className="postcard__bar"></div>
                                        <div className="postcard__preview-txt">
                                            s a town in Lasta district of North Wollo Zone in Amhara Region, Ethiopia. It is famous for rock-cut monolithic churches. The whole of Lalibela is a large and important site for the antiquity, medieval and post-medieval civilization of Ethiopia.[1] To Christians, Lalibela is one of Ethiopia's holiest cities, second only to Axum, and a center of pilgrimage. Unlike Axum, the population of Lalibela is almost completely Ethiopian Orthodox Christian.
                                        </div>
                                        <ul className="postcard__tagbox">
                                            <li className="tag__item">
                                                <FontAwesomeIcon icon={faTag} className="fas fa-calendar-alt mr-2" />
                                                 <span> Read more</span>
                                            </li>
                                            <li className="tag__item"><i className="fas fa-clock mr-2"></i>55 mins.</li>
                                         
                                        </ul>
                                    </div>
                                </article>
                                <article className="postcard dark red">
                                    <a className="postcard__img_link" href="#">
                                        <img className="postcard__img" src="https://picsum.photos/501/500" alt="Image Title" />
                                    </a>
                                    <div className="postcard__text">
                                        <h1 className="postcard__title red"><a href="#">Podcast Title</a></h1>
                                        <div className="postcard__subtitle small">
                                            <time datetime="2020-05-25 12:00:00">
                                                <i className="fas fa-calendar-alt mr-2"></i>Mon, May 25th 2020
                                            </time>
                                        </div>
                                        <div className="postcard__bar"></div>
                                        <div className="postcard__preview-txt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugiat asperiores inventore beatae accusamus odit minima enim, commodi quia, doloribus eius! Ducimus nemo accusantium maiores velit corrupti tempora reiciendis molestiae repellat vero. Eveniet ipsam adipisci illo iusto quibusdam, sunt neque nulla unde ipsum dolores nobis enim quidem excepturi, illum quos!</div>
                                        <ul className="postcard__tagbox">
                                        <li className="tag__item">
                                                <FontAwesomeIcon icon={faTag} className="fas fa-calendar-alt mr-2" />
                                                 <span> Read more</span>
                                            </li>
                                            <li className="tag__item"><i className="fas fa-clock mr-2"></i>55 mins.</li>
                                        
                                        </ul>
                                    </div>
                                </article>
                                <article className="postcard dark green">
                                    <a className="postcard__img_link" href="#">
                                        <img className="postcard__img" src="https://picsum.photos/500/501" alt="Image Title" />
                                    </a>
                                    <div className="postcard__text">
                                        <h1 className="postcard__title green"><a href="#">Podcast Title</a></h1>
                                        <div className="postcard__subtitle small">
                                            <time datetime="2020-05-25 12:00:00">
                                                <i className="fas fa-calendar-alt mr-2"></i>Mon, May 25th 2020
                                            </time>
                                        </div>
                                        <div className="postcard__bar"></div>
                                        <div className="postcard__preview-txt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugiat asperiores inventore beatae accusamus odit minima enim, commodi quia, doloribus eius! Ducimus nemo accusantium maiores velit corrupti tempora reiciendis molestiae repellat vero. Eveniet ipsam adipisci illo iusto quibusdam, sunt neque nulla unde ipsum dolores nobis enim quidem excepturi, illum quos!</div>
                                        <ul className="postcard__tagbox">
                                        <li className="tag__item">
                                                <FontAwesomeIcon icon={faTag} className="fas fa-calendar-alt mr-2" />
                                                 <span> Read more</span>
                                            </li>
                                            <li className="tag__item"><i className="fas fa-clock mr-2"></i>55 mins.</li>
                                         
                                        </ul>
                                    </div>
                                </article>
                                <article className="postcard dark yellow">
                                    <a className="postcard__img_link" href="#">
                                        <img className="postcard__img" src="https://picsum.photos/501/501" alt="Image Title" />
                                    </a>
                                    <div className="postcard__text">
                                        <h1 className="postcard__title yellow"><a href="#">Podcast Title</a></h1>
                                        <div className="postcard__subtitle small">
                                            <time datetime="2020-05-25 12:00:00">
                                                <i className="fas fa-calendar-alt mr-2"></i>Mon, May 25th 2020
                                            </time>
                                        </div>
                                        <div className="postcard__bar"></div>
                                        <div className="postcard__preview-txt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugiat asperiores inventore beatae accusamus odit minima enim, commodi quia, doloribus eius! Ducimus nemo accusantium maiores velit corrupti tempora reiciendis molestiae repellat vero. Eveniet ipsam adipisci illo iusto quibusdam, sunt neque nulla unde ipsum dolores nobis enim quidem excepturi, illum quos!</div>
                                        <ul className="postcard__tagbox">
                                        <li className="tag__item">
                                                <FontAwesomeIcon icon={faTag} className="fas fa-calendar-alt mr-2" />
                                                 <span> Read more</span>
                                            </li>
                                            <li className="tag__item"><i className="fas fa-clock mr-2"></i>55 mins.</li>
                                        </ul>
                                    </div>
                                </article>
                            </main>
                        </div>
                    </div>
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
