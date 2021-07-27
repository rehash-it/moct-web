import React, { useEffect, useState } from 'react'
import Footer from '../layouts/Footer'
import NavBar from '../layouts/navbar'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faForward } from '@fortawesome/free-solid-svg-icons'
import { pageCalculate, Scroll } from '../utility/general'
import { datasDispatch } from '../../store/Actions/dataActions'
import Paginate from './Paginate';
import { Link, withRouter } from 'react-router-dom'
import { getPage } from '../../utility/route'
import DataLoading from '../layouts/DataLoading'
import ErrorLoading from '../layouts/ErrorLoading'
import { tellDate } from '../utility/Date'
import { FaThermometerEmpty } from 'react-icons/fa'
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
    return (
        <>
            <NavBar />
            {
                loading ?
                    <DataLoading /> :
                    error ? <ErrorLoading /> :

                        <div className="container my-4 ml-4" >
                            <div className="row">
                                <div className="col-lg-12">
                                    <h1 className="text-center ">
                                        Vacancies
                                    </h1>
                                </div>
                                <div className="col-lg-12 mt-3">
                                    <MDBTable responsive bordered>
                                        <MDBTableHead textWhite>
                                            <tr>
                                                <th>#</th>
                                                <th>Job title</th>
                                                <th>Job description</th>
                                                <th>Skills</th>
                                                <th>Work experience</th>
                                                <th>Required in quantity</th>
                                                <th>Dead line</th>
                                            </tr>
                                        </MDBTableHead>
                                        <MDBTableBody >
                                            {
                                                length ?
                                                    data.map((v, i = 0) => {
                                                        i++
                                                        return (
                                                            <tr key={v._id} className='text-white'>
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
                                                            <h3 className='text-white text-center'>
                                                                <FontAwesomeIcon icon={FaThermometerEmpty} className='text-white' />
                                                                No Vacanices registered yet
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
            }
            <Footer />
        </>
    )
}

export default withRouter(Vacancy)
