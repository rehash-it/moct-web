import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { file } from '../../config/config';
import { LanguageContext } from '../../context/context';
import BlueNile from '../../images/Blue-Nile.jpg';
import Ertale from '../../images/erta ale the smoking mountain of afar.png';
import Meskel from '../../images/meskel celebration.png';
import Monkey from '../../images/semine mountain national park.png';
import { sitesDispatch } from '../../store/Actions/fetchSites';
import '../../styles/home.css';
import { NewsSection } from '../home/newsSection';
import CarouseL from '../layouts/carousel';
import DataLoading from '../layouts/DataLoading';
import ErrorLoading from '../layouts/ErrorLoading';
import Footer from '../layouts/Footer';
import NavBar from '../layouts/navbar';
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
    const [sites, setSite] = useState({
        data: [], loading: true, error: false, length: 0
    })
    useEffect(() => {
        //es-lint
        sitesDispatch(setSite, { region: 'All', page: 1, limit: 6 })
    }, [])
    const { t } = useContext(LanguageContext)
    return (
        <>
            <NavBar />
            <CarouseL items={items} />
        {/** */}
             <NewsSection />

            <div className="container">
                <div className="row">
                    {/**sites */}
                    <div className="col-lg-12">
                        {sites.data.slice(0, 6).length ?
                            <h1 className="text-center text-white my-3">{t('Attraction sites')}</h1> :
                            <p></p>
                        } {
                            sites.loading ? <DataLoading /> :
                                sites.error ? <ErrorLoading /> :

                                    <div className="ml">
                                        {
                                            sites.data.slice(0, 6).map(s =>
                                                <Link to={'/site/' + s._id} key={s._id}>
                                                    <div className="ml-pnl ml-flp--md ml-flp ml-clstr--hrz" >

                                                        <div className="ml-pnl__cntnt ml-flp__cntnt">
                                                            <img className="ml-flp__pnl ml-flp__pnl--frnt" src={file + s.images[0]} alt=''
                                                                style={{ objectFit: 'cover' }} />
                                                            <div className="ml-flp__pnl ml-flp__pnl--bck text-raise">
                                                                <h4 className="text-raise text-center">{s.title}</h4>
                                                                <p className="text-white h6">
                                                                    {s.description.slice(0, 300) + '...'}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            )}
                                    </div>
                        }
                    </div>

                    {/* some importnt links */}
                    <div className="col-lg-12 ">
                        <div className="buttons text-center">
                            <h1 className='text-center my-2'>{t('important links')} </h1>
                            <a href="https://www.gallery.gov.eimport { product } from './../Forum/tryclass';
t" target="_blank" rel="noreferrer">
                                <button className="fill h6">www.gallery.gov.et</button>
                            </a>
                            <a href="https://www.gallery.gov.et" target="_blank" rel="noreferrer">
                                <button className="pulse h6">www.gallery.gov.et</button>
                            </a>
                            <a href="https://www.gallery.gov.et" target="_blank" rel="noreferrer">
                                <button className="raise h6">www.gallery.gov.et</button>
                            </a>
                            <a href="https://www.gallery.gov.et" target="_blank" rel="noreferrer">
                                <button className="up h6">www.gallery.gov.et</button>
                            </a>
                            <a href="https://www.gallery.gov.et" target="_blank" rel="noreferrer">
                                <button className="slider h6">www.gallery.gov.et</button>
                            </a>

                        </div>
                    </div>
                </div>
            </div >
            <Footer />
        </ >
    )
}

export default Home
