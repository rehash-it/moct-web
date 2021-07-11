import React from 'react'
import Footer from '../layouts/Footer'
import NavBar from '../layouts/navbar'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
const Vacancy = () => {
    return (
        <>
            <NavBar />
            <div className="container my-3">
                <div className="row">
                    <div className="col-lg-12">
                        <h1>Vacancies</h1>
                        <MDBTable className='my-3' responsive={true} bordered={true} >
                            <MDBTableHead className='text-center' textWhite>
                                <tr>
                                    <th>id</th>
                                    <th>Job title</th>
                                    <th>Job description</th>
                                    <th>Skills</th>
                                    <th>Required in quantity</th>
                                    <th>Dead line</th>
                                    <th>Apply</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody textWhite={true}>
                                <tr>
                                    <td>1</td>
                                    <td>Tour guide</td>
                                    <td>We want a female tour Guider with ...</td>
                                    <td>Master in tourism</td>
                                    <td>
                                        2
                                    </td>
                                    <td>
                                        3/20/2021
                                    </td>
                                    <td>
                                        <button className="btn-raise">
                                            <FontAwesomeIcon icon={faArrowRight} />
                                            Apply
                                        </button>
                                    </td>
                                </tr>
                            </MDBTableBody>
                        </MDBTable>
                    </div>


                </div>
            </div>
            <Footer />
        </>
    )
}

export default Vacancy
