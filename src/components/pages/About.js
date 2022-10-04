import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { LanguageContext } from '../../context/context'
import Logo from '../../images/Hirut.jpg'
import '../../styles/about.css'
import { Mission, Values, Vision } from '../../translation/aboutTranslate'

function About() {
    const { t } = useContext(LanguageContext)
    return (
            <section className="about-section">
                <div className="container-fluid p-0">
                    <div className="row no-gutters position-relative">
                        <div className="left-header d-none d-lg-block col-lg-2 col-xl-3">
                            <div className="v-center-box d-flex align-items-end text-uppercase">
                                <h2 className="mb-0">{t('About us')}</h2>
                            </div>
                        </div>
                        <div className="col-lg-9 col-xl-8">
                            <div className="main-content p-5">
                                <div className="main-header mb-4">
                                    <h1 className="main-heading d-inline-block text-uppercase pb-3 border-bottom">{t('Moct')}</h1>
                                </div>

                                <div className="row mb-5">
                                    <div className="mb-5 mb-sm-4 col-md-4">
                                        <img src={Logo} alt="Colorful Wall" />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="about__text mb-5 mb-sm-4 mb-md-4">
                                            <h1>{t('Vision')}</h1>
                                            <p className="my-2 h6 indent text-dark justify-content">
                                                {Vision()}
                                            </p>
                                            <h1>{t('Values')}</h1>
                                            <p className="my-2 h6 text-dark justify-content">
                                                <ul>{Values().map(value => <li class="text-left" key={value}>{value}</li>)}</ul>
                                            </p>
                                            <h1>{t('Mission')}</h1>
                                            <p className="my-2 h6 text-dark justify-content">
                                                {Mission()}
                                            </p>
                                        </div>
                                        <div className="about__skills mt-4 pt-4 border-top">
                                            <div className="row no-gutters mb-0 mb-sm-4">
                                                <div className="mb-4 mb-sm-0 pr-sm-3 col-sm-6">
                                                    <div className="media">
                                                        <i className="fab fa-js-square icon-18 mr-3"></i>
                                                        <div className="media-body">
                                                            <Link to='/history'>
                                                                <h4 className="m-0">{t('History')}</h4>
                                                            </Link>
                                                            <p className="m-0">
                                                                {t('Know About history and formulation of this organization')}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mb-4 mb-sm-0 pl-sm-3 col-sm-6 ">
                                                    <div className="media">
                                                        <i className="fab fa-react icon-18 mr-3"></i>
                                                        <div className="media-body">
                                                            <Link to='/messageOfMoct'>
                                                                <h4 className="m-0">{t('Message of Mocs')}</h4>
                                                            </Link>
                                                            <p className="m-0">
                                                                {t('Read about our concerns and ideas')}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mb-4 mb-sm-0 pl-sm-3 col-sm-6 ">
                                                    <div className="media">
                                                        <i className="fab fa-react icon-18 mr-3"></i>
                                                        <div className="media-body">
                                                            <Link to='/chart'>
                                                                <h4 className="m-0">{t('Organization Chart')}</h4>
                                                            </Link>
                                                            <p className="m-0">
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
