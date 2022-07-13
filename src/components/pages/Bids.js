import React, { useContext, useEffect, useState } from 'react'
import Footer from '../layouts/Footer'
import Navbar from '../layouts/navbar'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faThermometerEmpty } from '@fortawesome/free-solid-svg-icons'
import { withRouter } from 'react-router-dom'
import { pageCalculate } from '../utility/general'
import { datasDispatch } from '../../store/Actions/dataActions'
import { tellDate } from '../utility/Date'
import DataLoading from '../layouts/DataLoading'
import ErrorLoading from '../layouts/ErrorLoading'
import Paginate from './Paginate'
import { file } from '../../config/config'
import { LanguageContext } from '../../context/context'
import { Box } from '@material-ui/core'

import styles from "../../styles/titlebar.module.css"
function Bids({ location }) {
    const [state, setState] = useState({
        loading: true,
        error: false,
        data: [],
        length: 0
    })  
    let Page = location.search
    const { loading, error, data, length } = state
    let page = pageCalculate(15, length)
    useEffect(() => datasDispatch(setState, { page, limit: 15, url: 'bid', admin: false }), [page])
    const { t } = useContext(LanguageContext)
    return (
        <>
            <Navbar />
            {
                loading ? <DataLoading /> :
                    error ? <ErrorLoading /> :
                    <>
                        <Box paddingX={10} paddingY={2} className={styles.titlebar} height={200} display="flex" alignItems="end">
                            <h1 style={{color: '#fff'}}>{t('Bids')}</h1>
                        </Box>
                        <div className="container my-3">
                            <div className="col-lg-12">
                                <MDBTable className='my-3' responsive={true} bordered={true} >
                                    <MDBTableHead className='text-center' >
                                        <tr>
                                            <th>#</th>
                                            <th>{t('Title')}</th>
                                            <th>{t('Instruction')}</th>
                                            <th>{t('File and explanation')}</th>
                                            <th>{t('Dead line')}</th>

                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        {
                                            length ?
                                                data.map((b, i = 0) => {
                                                    i++
                                                    return (
                                                        <tr key={b._id}>
                                                            <td>{i}</td>
                                                            <td>{b.title}</td>
                                                            <td>{b.instruction}</td>
                                                            <td>
                                                                <a href={file + b.file} download={true} target="_blank" rel="noreferrer">

                                                                    <button className="btn btn-primary">
                                                                        <FontAwesomeIcon icon={faDownload} />
                                                                        Download
                                                                    </button>
                                                                </a></td>
                                                            <td>{tellDate(b.endDate)}</td>
                                                        </tr>)
                                                }) :
                                                <tr>
                                                    <td colSpan={6} className="td text-center">
                                                        <h3>
                                                            <FontAwesomeIcon icon={faThermometerEmpty} className='fa-2x mx-2' />
                                                            {t('No bids registered  yet')}

                                                        </h3>
                                                    </td>
                                                </tr>
                                        }

                                    </MDBTableBody>
                                </MDBTable>
                            </div>
                            <div className="col-lg-12 d-flex justify-content-center mt-5">
                                <Paginate link='' page={page} />
                            </div>
                        </div>
                    </>
            }
            <Footer />
        </>
    )
}

export default withRouter(Bids)
