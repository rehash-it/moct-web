import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { LanguageContext } from '../../context/context'
import Logo from '../../images/Hirut.jpg'
import '../../styles/about.css'
import { Vision } from '../../translation/aboutTranslate'

function About() {
    const { t } = useContext(LanguageContext)
    return (
            <section class="about-section">
                <div class="container-fluid p-0">
                    <div class="row no-gutters position-relative">
                        <div class="left-header d-none d-lg-block col-lg-2 col-xl-3">
                            <div class="v-center-box d-flex align-items-end text-uppercase">
                                <h2 class="mb-0">{t('About us')}</h2>
                            </div>
                        </div>
                        <div class="col-lg-9 col-xl-8">
                            <div class="main-content p-5">
                                <div class="main-header mb-4">
                                    <h1 class="main-heading d-inline-block text-uppercase pb-3 border-bottom">{t('Moct')}</h1>
                                </div>

                                <div class="row mb-5">
                                    <div class="mb-5 mb-sm-4 col-md-4">
                                        <img src={Logo} alt="Colorful Wall" />
                                    </div>
                                    <div class="col-md-8">
                                        <div class="about__text mb-5 mb-sm-4 mb-md-4">
                                            <h1>{t('Vision')}</h1>
                                            <p class="my-2 h6 indent text-dark justify-content">
                                                {Vision()}
                                            </p>
                                        </div>
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
                                                                <h4 class="m-0">{t('Message of Moct')}</h4>
                                                            </Link>
                                                            <p class="m-0">
                                                                {t('Read about our concerns and ideas')}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="mb-4 mb-sm-0 pl-sm-3 col-sm-6 ">
                                                    <div class="media">
                                                        <i class="fab fa-react icon-18 mr-3"></i>
                                                        <div class="media-body">
                                                            <Link to='/chart'>
                                                                <h4 class="m-0">{t('Organization Chart')}</h4>
                                                            </Link>
                                                            <p class="m-0">
                                                                {t('see about our organization structure')}
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
                    </div>
                </div>

            </section>
    )
}

export default About
