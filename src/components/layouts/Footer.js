import React, { useContext } from 'react'
import '../../styles/footer.css'
import Logo from '../../images/ET-emblem.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../../context/context';
function Footer() {
    const { t } = useContext(LanguageContext)
    return (
        <div className="container-fluiD pb-0 mb-0 justify-content-center text-light ">
            <footer>
                <div className="row mb-3 justify-content-center py-5">
                    <div className="col-11">
                        <div className="row ">
                            <div className="col-xl-8 col-md-4 col-sm-4 col-12 my-auto mx-auto a">
                                <img src={Logo} alt="" style={{ border: 'none' }} />
                            </div>
                            <div className="col-xl-2 col-md-4 col-sm-4 col-12">
                                <h4 className="mb-3 mb-lg-4 bold-text "><b>{t('MENU')}</b></h4>
                                <Link to='/'>
                                    <h6>{t('Home')}</h6>
                                </Link>
                                <Link to='/about'>
                                    <h6>{t('About')}</h6>
                                </Link>
                                <Link to='/docs'>
                                    <h6>{t('Research and studies')}</h6>
                                </Link>
                            </div>
                            <div className="col-xl-2 col-md-4 col-sm-4 col-12">
                                <h6 className="mb-3 mb-lg-4 text-muted bold-text mt-sm-0 mt-5"><b>{t('ADDRESS')}</b></h6>
                                <p className="mb-1">605, {t('Addis Ababa')}</p>
                                <p>{t('Ethiopia')}</p>
                            </div>
                        </div>
                        <div className="row ">
                            <div className="col-xl-8 col-md-4 col-sm-4 col-auto my-md-0 mt-5 order-sm-1 order-3 align-self-end">
                                <p className="social text-muted mb-0 pb-0 bold-text">
                                    <a href="https://www.facebook.com/tuorismcultureethiopia" target="_blank" rel="noreferrer" >
                                        <FontAwesomeIcon icon={faFacebook} className='fa-2x text-raise mx-2' />
                                    </a>
                                    <a href="https://www.facebook.com/tuorismcultureethiopia" target="_blank" rel="noreferrer" >
                                        <FontAwesomeIcon icon={faTwitter} className='fa-2x text-raise' />
                                    </a>
                                </p>

                                <small className="rights"><span>&#174;
                                </span> {t('Mocs All Rights Reserved')}.</small>
                            </div>
                            <div className="col-xl-2 col-md-4 col-sm-4 col-auto order-1 align-self-end ">
                                <h6 className="mt-55 mt-2 text-muted bold-text"><b>Mocs Admin</b></h6><small> <span><i className="fa fa-envelope" aria-hidden="true"></i></span> admin@mocs.com</small>
                            </div>
                            <div className="col-xl-2 col-md-4 col-sm-4 col-auto order-2 align-self-end mt-3 ">
                                <h6 className="text-muted bold-text"><b>Mocs Admin</b></h6><small><span><i className="fa fa-envelope" aria-hidden="true"></i></span> admin@mocs.com</small>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div >
    )
}

export default Footer
