import React, { useContext } from 'react'
import Logo from '../../images/MOCT-አማርኛ-Org-struct-min.png'
import { Link } from 'react-router-dom'
import { BiFullscreen } from 'react-icons/bi'
import { LanguageContext } from '../../context/context'
function OrganizationChart() {
    const { t } = useContext(LanguageContext)
    return (
            <section class="about-section">
                <div class="container-fluid p-0">
                    <div class="row no-gutters position-relative">
                        <div class="left-header d-none d-lg-block col-lg-2 col-xl-3">
                            <div class="v-center-box d-flex align-items-end text-uppercase">
                                <h2 class="mb-0">{t('About')}</h2>
                            </div>
                        </div>
                        <div class="col-lg-9 col-xl-8 text-center mx-lg-4">
                            <div class="main-content p-5">
                                <a href={Logo} target="_blank" rel="noreferrer">
                                    <img src={Logo} alt="" className='img-fluid' style={{ backgroundColor: '#17181c', objectFit: 'cover' }} />
                                </a>
                                <p className="text-center d-flex align-items-center justify-content-center">
                                    < BiFullscreen />
                                    {t('click the image for fullscreen')}
                                </p>
                            </div>
                            <div className="text-center">
                                <div class="about__skills">
                                    <div class="row no-gutters mb-0 mb-sm-4">
                                        <div class="mb-4 mb-sm-0 pr-sm-3 col-sm-6">
                                            <div class="media">
                                                <i class="fab fa-js-square icon-18 mr-3"></i>
                                                <div class="media-body">
                                                    <Link to='/history'>
                                                        <h4 class="m-0">{t('History')}</h4>
                                                    </Link>
                                                    <p class="m-0">
                                                        {t('Know About history and formulation of this organization')}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mb-4 mb-sm-0 pl-sm-3 col-sm-6 ">
                                            <div class="media">
                                                <i class="fab fa-react icon-18 mr-3"></i>
                                                <div class="media-body">
                                                    <Link to='/messageOfMoct'>
                                                        <h4 class="m-0">{t('Message of Mocs')}</h4>
                                                    </Link>
                                                    <p class="m-0">
                                                        {t('Read about our concerns and ideas')}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mb-4 mb-sm-0 pr-sm-3 col-sm-6">
                                            <div class="media">
                                                <i class="fab fa-js-square icon-18 mr-3"></i>
                                                <div class="media-body">
                                                    <Link to='/about'>
                                                        <h4 class="m-0">{t('Vision')} </h4>
                                                    </Link>
                                                    <p class="m-0">
                                                        {t('Know About our vision and mission')}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
    )
}

export default OrganizationChart
