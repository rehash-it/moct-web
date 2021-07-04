import React from 'react'
import '../../styles/footer.css'
import logo from '../../images/moct-logo-2.png'
import Logo from '../../images/ET-emblem.png'
import ReactRoundedImage from "react-rounded-image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
function Footer() {
    return (
        <div className="container-fluiD pb-0 mb-0 justify-content-center text-light ">
            <footer>
                <div className="row my-3 justify-content-center py-5">
                    <div className="col-11">
                        <div className="row ">
                            <div className="col-xl-8 col-md-4 col-sm-4 col-12 my-auto mx-auto a">
                                <ReactRoundedImage
                                    image={logo}
                                    roundedColor="#321124"
                                    imageWidth="300"
                                    imageHeight="250"
                                    roundedSize="13"
                                    borderRadius="70"
                                />
                                <img src={Logo} alt="" style={{ border: 'none' }} />
                            </div>
                            <div className="col-xl-2 col-md-4 col-sm-4 col-12">
                                <h6 className="mb-3 mb-lg-4 bold-text "><b>MENU</b></h6>
                                <ul className="list-unstyled">
                                    <li>Home</li>
                                    <li>News</li>
                                    <li>Blog</li>
                                    <li>Research and studies</li>
                                </ul>
                            </div>
                            <div className="col-xl-2 col-md-4 col-sm-4 col-12">
                                <h6 className="mb-3 mb-lg-4 text-muted bold-text mt-sm-0 mt-5"><b>ADDRESS</b></h6>
                                <p className="mb-1">605, RATAN ICON BUILDING</p>
                                <p>SEAWOODS SECTOR</p>
                            </div>
                        </div>
                        <div className="row ">
                            <div className="col-xl-8 col-md-4 col-sm-4 col-auto my-md-0 mt-5 order-sm-1 order-3 align-self-end">
                                <p className="social text-muted mb-0 pb-0 bold-text">
                                    <span className="mx-2">
                                        <FontAwesomeIcon icon={faFacebook} className='text-raise' />
                                    </span>
                                    <span className="mx-2">
                                        <FontAwesomeIcon icon={faTwitter} className='text-raise' />
                                    </span> <span className="mx-2"><i className="fa fa-twitter" aria-hidden="true"></i></span> <span className="mx-2"><i className="fa fa-instagram" aria-hidden="true"></i></span> </p><small className="rights"><span>&#174;
                                    </span> Moct All Rights Reserved.</small>
                            </div>
                            <div className="col-xl-2 col-md-4 col-sm-4 col-auto order-1 align-self-end ">
                                <h6 className="mt-55 mt-2 text-muted bold-text"><b>ANIRUDH SINGLA</b></h6><small> <span><i className="fa fa-envelope" aria-hidden="true"></i></span> anirudh@gmail.com</small>
                            </div>
                            <div className="col-xl-2 col-md-4 col-sm-4 col-auto order-2 align-self-end mt-3 ">
                                <h6 className="text-muted bold-text"><b>RISHABH SHEKHAR</b></h6><small><span><i className="fa fa-envelope" aria-hidden="true"></i></span> rishab@gmail.com</small>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div >
    )
}

export default Footer
