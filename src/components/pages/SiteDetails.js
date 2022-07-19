import { useContext, useEffect, useState } from 'react'
import "react-multi-carousel/lib/styles.css"
import { Link, withRouter } from 'react-router-dom'
import { file } from '../../config/config'
import { LanguageContext } from '../../context/context'
import { dataDispatch } from '../../store/Actions/dataActions'
import { sitesDispatch } from '../../store/Actions/fetchSites'
import DataLoading from '../layouts/DataLoading'
import ErrorLoading from '../layouts/ErrorLoading'
import Map from '../layouts/Map'
import { Scroll } from '../utility/general'
function SiteDetails({ match }) {
    const { id } = match.params
    const [sites, setSites] = useState({
        data: [],
        loading: true,
        length: 0,
        error: false
    })
    const [site, setSite] = useState({
        data: {},
        error: false,
        loading: true
    })

    useEffect(() => {
        Scroll('top')
        sitesDispatch(setSites, { region: 'All', page: 1, limit: 6 })
        dataDispatch(setSite, { id, page: 'site' })
    }, [id])
    const { t } = useContext(LanguageContext)
    return (
                site.loading ? <DataLoading /> :
                    site.error ? <ErrorLoading /> :
                        <div className="container mt-4">
                            <div className="row justify-content-center">
                                <div className="col-lg-12">
                                    <h1 className="text-center">
                                        {site.data.title}
                                    </h1>
                                </div>
                                <div className="col-12 text-center col-lg-6" >
                                    <p className="indent">
                                        {site.data.description}
                                    </p>
                                </div>
                                <div className="col-12">
                                    <div className="row justify-content-center">
                                        <div className="col-12 col-md-6">
                                            <a href={file + site.data.images[0]} download={true} target="_blank" rel="noreferrer">
                                                <img src={file + site.data.images[0]} alt={site.title   } className="img-fluid" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12 mt-3">
                                    <div className="gallery my-2" id="gallery" >
                                        {
                                            site.data.images.slice(1, site.data.images.length).map(im =>

                                                <div className="mb-3 pics animation all 2 bg-dark" key={im.id}>
                                                    <a href={file + im} download={true} target="_blank" rel="noreferrer">
                                                        <img className="img-fluid"
                                                            role="dialog"
                                                            aria-labelledby="myModalLabel"
                                                            aria-hidden="true" tabindex="-1"
                                                            src={file + im} alt="" />
                                                    </a>

                                                </div>
                                            )}
                                    </div>

                                </div>
                                <div className="col-lg-12 d-flex flex-column align-items-center mt-5">
                                    {site.data.lat && site.data.lng ?
                                        <>
                                            <h1 className="d-block text-center">{t('See on google map')}</h1>
                                            <Map center={{ lat: site.data.lat, lng: site.data.lng }} />
                                        </>
                                        :
                                        <p></p>
                                    }
                                </div>
                                {sites.data.filter(s => s._id !== id).length >= 2 ?
                                    <div className="col-lg-12 mt-3">
                                        <h3 className="text-center">
                                            {t('Other attraction sites')}
                                        </h3>
                                        <div class="row justify-content-evenly mb-4">
                                            {
                                                sites.data.filter(s => s._id !== id).slice(0, 6).map(s =>
                                                    <div className="col-12 col-md-4 border"  key={s._id}>
                                                        <Link to={'/site/' + s._id}>
                                                            <img src={file + s.images[0]} alt={s.title}
                                                                className="post-img card-image top" height={300} style={{
                                                                    objectFit: 'cover',
                                                                    height: ' inherit !important',
                                                                    width: 'auto'
                                                                }} />
                                                            <h5 className='my-2'>
                                                                {s.title}
                                                            </h5>
                                                        </Link>
                                                    </div>
                                                )}
                                        </div>
                                    </div> :
                                    <p></p>
                                }
                            </div>
                        </div>
    )
}

export default withRouter(SiteDetails)
