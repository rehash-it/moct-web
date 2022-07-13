import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact'
import { useContext, useEffect, useState } from 'react'
import { FaThermometerEmpty } from 'react-icons/fa'
import { withRouter } from 'react-router-dom'
import { LanguageContext } from '../../context/context'
import { datasDispatch } from '../../store/Actions/dataActions'
import { getPage } from '../../utility/route'
import DataLoading from '../layouts/DataLoading'
import ErrorLoading from '../layouts/ErrorLoading'
import Footer from '../layouts/Footer'
import NavBar from '../layouts/navbar'
import { tellDate } from '../utility/Date'
import { pageCalculate, Scroll } from '../utility/general'
import Paginate from './Paginate'
import styles from '../../styles/titlebar.module.css'
import { Box } from '@material-ui/core'

const Vacancy = ({ location }) => {
    const [state, setState] = useState({
        loading: true,
        data: [],
        error: true,
        length: 0
    })
    const { loading, data, error, length } = state
    let Page = getPage(location.search)
    const page = pageCalculate(10, length)

    useEffect(() => {
        Scroll('top')
        datasDispatch(setState, { page: Page, limit: 10, url: 'vacancy' })
    }, [Page])
    const { t } = useContext(LanguageContext)
    return (
        <>
            <NavBar />
            {
                loading ?
                    <DataLoading /> :
                    error ? <ErrorLoading /> :
                    <>
                    <Box paddingX={10} paddingY={2} className={styles.titlebar} height={200} display="flex" alignItems="end">
                            <h1 style={{color: '#fff'}}>{t('Vacancy')}</h1>
                        </Box>
                        <div className="container my-4 ml-4" >
                            <div className="row">
                                <div className="col-lg-12 mt-3">
                                    <MDBTable responsive bordered>
                                        <MDBTableHead >
                                            <tr>
                                                <th>#</th>
                                                <th>{t('Job title')}</th>
                                                <th>{t('Job description')}</th>
                                                <th>{t('Skills')}</th>
                                                <th>{t('Work experience')}</th>
                                                <th>{t('Required in quantity')}</th>
                                                <th>{t('Dead line')}</th>
                                            </tr>
                                        </MDBTableHead>
                                        <MDBTableBody >
                                            {
                                                length ?
                                                    data.map((v, i = 0) => {
                                                        i++
                                                        return (
                                                            <tr key={v._id} >
                                                                <td>{i}</td>
                                                                <td>{v.title}</td>
                                                                <td>{v.description}</td>
                                                                <td>{v.skills}</td>
                                                                <td>{v.experience}</td>
                                                                <td>{v.quantity}</td>
                                                                <td>{tellDate(v.endDate)}</td>

                                                            </tr>

                                                        )
                                                    }) :
                                                    <tr>
                                                        <td colSpan={7}>
                                                            <h3 className='text-dark text-center'>
                                                                <FontAwesomeIcon icon={FaThermometerEmpty} className='text-white' />
                                                                {t('No Vacanices registered yet')}
                                                            </h3>
                                                        </td>
                                                    </tr>
                                            }
                                        </MDBTableBody>
                                    </MDBTable>
                                </div>
                                <div className="col-lg-12 d-flex justify-content-center mt-5">
                                    <Paginate link='vacancy' page={page} />
                                </div>
                            </div>
                        </div>
                    </>
            }
            <Footer />
        </>
    )
}

export default withRouter(Vacancy)
