import React from 'react'
import Footer from '../layouts/Footer'
import NavBar from '../layouts/navbar'
import hirut from '../../images/Hirut.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons'
import '../../styles/newDetails.css'
import Image from '../../images/lalibela.jpg'
import Image1 from '../../images/zebras at nechisar park.png'
import Image2 from '../../images/axum obelisks.png'

const NewDetail = (props) => {
    console.log(props)
    return (
        <>
            <NavBar />
            <div className="container my-4">
                <div className="row g-0">
                    <div className="col-lg-12 my-2">
                        <h1>Title Lorem ipsum dolor sit amet.</h1>
                    </div>
                    <div className="col-lg-7 justify-content-end">
                        <img src={hirut} width={600} alt="" className="img-fluid" style={{ objectFit: 'cover' }} />
                        <p className="small float-right my-2">
                            55mins ago
                        </p>
                        <div className="float-lg-right float-sm-right mb-3" >
                            <FontAwesomeIcon icon={faFacebook} className="fa-1x mx-2 text-primary" />
                            <FontAwesomeIcon icon={faTwitter} className="fa-1x text-primary" />
                        </div>

                    </div>
                    <div className="col-lg-5">
                        <p className="indent text-white h5" style={{ textAlign: 'justify' }}>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt inventore magni ad cum facere, pariatur expedita aperiam reprehenderit nobis quibusdam perferendis tempore officia quae optio. Reiciendis perspiciatis quia autem cum optio. Unde, nesciunt exercitationem vel praesentium beatae at quis illum quaerat maxime itaque nulla aspernatur blanditiis error cupiditate, magnam optio minima rerum a corporis saepe? Sed earum quaerat, illo adipisci iusto alias! Nostrum iste aspernatur unde optio ad sequi cupiditate doloribus dicta exercitationem quis voluptas porro magni dignissimos maiores delectus adipisci, ratione aliquam! Sapiente eos voluptates soluta numquam ducimus iusto non? Labore dolores molestias dolorem, nostrum quis doloremque ducimus distinctio ad officiis commodi voluptatibus vitae ex sit, in assumenda rem! Sed commodi rerum molestiae animi non ea, quia vitae laborum est explicabo amet perspiciatis, illo sunt exercitationem dicta deleniti eos sapiente quaerat. Nobis voluptates vero quibusdam fugiat nihil, numquam officiis vitae! Asperiores explicabo quibusdam ipsa, natus optio in perspiciatis. Est expedita, voluptate distinctio quod recusandae quisquam voluptates aspernatur, ipsa aliquam natus repellat facilis quos fuga at eum ratione, vero necessitatibus laborum id. Accusamus ea laudantium corporis tempore error eos fugit modi facilis consequatur, expedita magni vero maxime? Dolores exercitationem culpa atque aut, iste quod vitae voluptatem nam magnam eligendi ipsam?
                        </p>
                    </div>
                    <div className="col-lg-12 my-2">
                        <h1 className="text-center my-3">Other news</h1>
                        <div class="blog-posts">
                            <div class="post">
                                <img src={Image} alt="" class="post-img" height={300} style={{ objectFit: 'cover' }} />
                                <div class="post-content">
                                    <h5 className='text-dark'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis, soluta?</h5>
                                    <span class="date">July 13, 2020</span>
                                </div>
                            </div>
                            <div class="post">
                                <img src={Image1} alt="" class="post-img" height={300} style={{ objectFit: 'cover' }} />
                                <div class="post-content">
                                    <h5 className='text-dark'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis, soluta?</h5>
                                    <span class="date">July 13, 2020</span>
                                </div>
                            </div>
                            <div class="post">
                                <img src={Image2} alt="" class="post-img" height={300} style={{ objectFit: 'cover' }} />
                                <div class="post-content">
                                    <h5 className='text-dark'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis, soluta?</h5>
                                    <span class="date">July 13, 2020</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default NewDetail
