import React, { useEffect, useState } from 'react'
import Footer from '../layouts/Footer'
import Navbar from '../layouts/navbar'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faThermometerEmpty } from '@fortawesome/free-solid-svg-icons'
import { withRouter } from 'react-router-dom'
import { pageCalculate } from '../utility/general'
import { datasDispatch } from '../../store/Actions/dataActions'
import { tellDate } from '../utility/Date'
import DataLoading from '../layouts/DataLoading'
import ErrorLoading from '../layouts/ErrorLoading'
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
    useEffect(() => datasDispatch(setState, { page, limit: 15, url: 'bid' }), [page])
    return (
        <>
            <Navbar />
            {
                loading ? <DataLoading /> :
                    error ? <ErrorLoading /> :

                        <div className="container my-3">
                            <div className="col-lg-12">
                                <h1>Bids</h1>
                                <MDBTable className='my-3' responsive={true} bordered={true} >
                                    <MDBTableHead className='text-center' textWhite>
                                        <tr>
                                            <th>#</th>
                                            <th>Title</th>
                                            <th>Instruction</th>
                                            <th>File</th>
                                            <th>Started date</th>
                                            <th>End Date</th>

                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody textWhite={true}>
                                        {
                                            length ?
                                                data.map((b, i = 0) => {
                                                    i++
                                                    return (
                                                        <tr key={b._id}>
                                                            <td>{i}</td>
                                                            <td>{b.title}</td>
                                                            <td>{b.instruction}</td>
                                                            <td>{b.file}</td>
                                                            <td>{tellDate(b.startDate)}</td>
                                                            <td>{tellDate(b.endDate)}</td>
                                                        </tr>)
                                                }) :
                                                <tr>
                                                    <td colSpan={6} className="td text-center">
                                                        <h3>
                                                            <FontAwesomeIcon icon={faThermometerEmpty} className='fa-3x mx-2' />
                                                            oops....No bids yet

                                                        </h3>
                                                    </td>
                                                </tr>
                                        }

                                    </MDBTableBody>
                                </MDBTable>
                            </div>
                        </div>
            }
            <Footer />
        </>
    )
}

export default withRouter(Bids)
