import React from 'react'
import CarouseL from '../layouts/carousel';
import NavBar from '../layouts/navbar'
import Lalibela from '../../images/lalibela.jpg'
import Gonder from '../../images/Gonder.png'
import BlueNile from '../../images/Blue-Nile.jpg'
import Monkey from '../../images/monkey.jpg'
import Danakil from '../../images/Danakil.jpg'
import '../../styles/home.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag } from '@fortawesome/free-solid-svg-icons'
const items = [
    {
        src: Lalibela,
        altText: 'Lalibela',
        caption: 'Rock-cut monolithic churches'
    },
    {
        src: Danakil,
        altText: 'Danakil',
        caption: 'The deepest place in the world'
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
        <div className="container-fluid">
            <NavBar />
            <div className="cotainer" >
                <CarouseL items={items} />
            </div>
            <div className="container">
                <div className="row">
                    {/**sites */}
                    <div className="col-lg-12">
                        <h1 className="text-center text-dark my-3">Attraction sites</h1>
                        <div class="ml">
                            <div class="ml-pnl ml-flp--md ml-flp">
                                <div class="ml-pnl__cntnt ml-flp__cntnt"><img class="ml-flp__pnl ml-flp__pnl--frnt" src="img/photo-1.jpg" />
                                    <div class="ml-flp__pnl ml-flp__pnl--bck bg--green">
                                        <p>Here is a flpped image...</p>
                                    </div>
                                </div>
                            </div>
                            <div class="ml-pnl">
                                <div class="ml-pnl__cntnt tx--white bg--green">
                                    <h1>Here is a masonry layout.</h1>
                                </div>
                            </div>
                            <div class="ml-pnl ml-clstr ml-clstr--hrz">
                                <div class="ml-clstr__sgmnt ml-clstr__sgmnt--rw">
                                    <div class="ml-pnl ml-clstr__sgmnt">
                                        <img class="ml-pnl__cntnt ml-pnl__cntnt--img" src={Gonder} alt='' /></div>
                                </div>
                                <div class="ml-clstr__sgmnt ml-clstr__sgmnt--rw">
                                    <div class="ml-pnl ml-clstr__sgmnt ml-clstr__sgmnt--hlf"><img class="ml-pnl__cntnt ml-pnl__cntnt--img" src="img/photo-1.jpg" /></div>
                                    <div class="ml-pnl ml-clstr__sgmnt">
                                        <div class="ml-pnl__cntnt bg--red tx--white">
                                            <p>Some cool pics.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="ml-pnl">
                                <div class="ml-pnl__cntnt tx--white bg--purple">
                                    <h3>That's pretty cool, thanks for showing me.</h3>
                                </div>
                            </div>
                            <div class="ml-pnl ml-clstr ml-clstr--vrt">
                                <div class="ml-clstr__sgmnt ml-clstr__sgmnt--clmn ml-clstr__sgmnt--hlf">
                                    <div class="ml-pnl ml-clstr__sgmnt"><img class="ml-pnl__cntnt ml-pnl__cntnt--img" src="img/photo-2.jpg" /></div>
                                </div>
                                <div class="ml-clstr__sgmnt ml-clstr__sgmnt--clmn">
                                    <div class="ml-pnl ml-clstr__sgmnt">
                                        <div class="ml-pnl__cntnt bg--blue tx--white">
                                            <p>This is an image, it's quite nice.</p>
                                        </div>
                                    </div>
                                    <div class="ml-pnl ml-clstr__sgmnt">
                                        <div class="ml-pnl__cntnt bg--blue tx--white"><a>Click here to find out more.</a></div>
                                    </div>
                                </div>
                            </div>
                            <div class="ml-pnl ml-pnl--fcs">
                                <div class="ml-pnl__cntnt tx--white bg--green">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu justo ex. Praesent mollis augue sagittis eros pharetra feugiat. Phasellus dignissim est lacus. Sed nec imperdiet dolor, sit amet mattis ex.</p>
                                </div>
                            </div>
                            <div class="ml-pnl">
                                <div class="ml-pnl__cntnt tx--white bg--red">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu justo ex. Praesent mollis augue sagittis eros pharetra feugiat. Phasellus dignissim est lacus. Sed nec imperdiet dolor, sit amet mattis ex. Sed sed augue eu neque tristique commodo. Mauris aliquet tortor sollicitudin nibh molestie, id egestas nisl sollicitudin. Aliquam erat volutpat. Donec quis ultrices ligula. Cras sed purus risus. Curabitur quis eros eu tortor semper eleifend. Pellentesque lorem elit, dignissim interdum massa id, malesuada rutrum ligula. Suspendisse tempor quis mauris eu facilisis. Phasellus non volutpat diam, non dapibus ligula. Ut non molestie ex, nec sagittis mi. Curabitur suscipit tellus id dolor pretium blandit. Cras tristique tristique pharetra.</p>
                                </div>
                            </div>
                            <div class="ml-pnl">
                                <div class="ml-pnl__cntnt tx--white bg--green">
                                    <h2>Some post about something</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu justo ex. Praesent mollis augue sagittis eros pharetra feugiat. Phasellus dignissim est lacus. Sed nec imperdiet dolor, sit amet mattis ex. Sed sed augue eu neque tristique commodo. Mauris aliquet tortor sollicitudin nibh molestie, id egestas nisl sollicitudin. Aliquam erat volutpat. Donec quis ultrices ligula. Cras sed purus risus. Curabitur quis eros eu tortor semper eleifend.</p>
                                </div>
                            </div>
                            <div class="ml-pnl"><img class="ml-pnl__cntnt ml-pnl__cntnt--img" src="img/photo-1.jpg" /></div>
                            <div class="ml-pnl ml-pnl--fcs">
                                <div class="ml-pnl__cntnt tx--white bg--blue">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu justo ex. Praesent mollis augue sagittis eros pharetra feugiat. Phasellus dignissim est lacus. Sed nec imperdiet dolor, sit amet mattis ex.</p>
                                </div>
                            </div>
                            <div class="ml-pnl ml-pnl--pls"><img class="ml-pnl__cntnt ml-pnl__cntnt--img" src="img/photo-1.jpg" /></div>
                            <div class="ml__fcs-crtn"></div>
                        </div>
                    </div>

                    {/** */}
                    <div className="col-lg-12">
                        <div className="dark">
                            <main className="container">
                                <div className="h1 text-center" id="pageHeaderTitle">News</div>
                                <article className="postcard dark blue">
                                    <Link to="#" className="postcard__img_link" >
                                        <img className="postcard__img" src={Lalibela} alt='' />
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
                                                Read more
                                            </li>
                                            <li className="tag__item"><i className="fas fa-clock mr-2"></i>55 mins.</li>
                                            <li className="tag__item play blue">
                                                <a href="#"><i className="fas fa-play mr-2"></i>Play Episode</a>
                                            </li>
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
                                            <li className="tag__item"><i className="fas fa-tag mr-2"></i>Podcast</li>
                                            <li className="tag__item"><i className="fas fa-clock mr-2"></i>55 mins.</li>
                                            <li className="tag__item play red">
                                                <a href="#"><i className="fas fa-play mr-2"></i>Play Episode</a>
                                            </li>
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
                                            <li className="tag__item"><i className="fas fa-tag mr-2"></i>Podcast</li>
                                            <li className="tag__item"><i className="fas fa-clock mr-2"></i>55 mins.</li>
                                            <li className="tag__item play green">
                                                <a href="#"><i className="fas fa-play mr-2"></i>Play Episode</a>
                                            </li>
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
                                            <li className="tag__item"><i className="fas fa-tag mr-2"></i>Podcast</li>
                                            <li className="tag__item"><i className="fas fa-clock mr-2"></i>55 mins.</li>
                                            <li className="tag__item play yellow">
                                                <a href="#"><i className="fas fa-play mr-2"></i>Play Episode</a>
                                            </li>
                                        </ul>
                                    </div>
                                </article>
                            </main>
                        </div>
                    </div>

                </div>
            </div >
        </div >
    )
}

export default Home
