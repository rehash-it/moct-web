import React, { useState, useEffect } from 'react'
import { datasDispatch } from '../../store/Actions/dataActions'
import DataLoading from '../layouts/DataLoading'
import ErrorLoading from '../layouts/ErrorLoading'
import { pageCalculate, Scroll } from '../utility/general'
import AddBids from './Bids/AddBids'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import EditBids from './Bids/EditBids'
import DeleteBids from './Bids/DeleteBids'
import { tellDate } from '../utility/Date'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { file } from '../../config/config'
import { FaThermometerEmpty } from 'react-icons/fa'
import AdminPaginate from './AdminPaginate'

function AdminBids() {
    const [state, setState] = useState({
        loading: true,
        data: [],
        error: true,
        length: 0
    })
    const { loading, data, error, length } = state
    const [Page, setPage] = useState(1)
    const page = pageCalculate(10, length)

    const fetchDispath = () => datasDispatch(setState, { page: Page, limit: 10, url: 'bid', admin: true })

    useEffect(() => {
        Scroll('top')
        fetchDispath()
    }, [Page])
    return (
        <>
            {
                loading ?
                    <DataLoading /> :
                    error ? <ErrorLoading /> :

                        <div className="container my-4 ml-4" >
                            <div className="row">
                                <div className="col-lg-1"></div>
                                <div className="col-lg-5  my-auto">
                                    <AddBids fetch={fetchDispath} />

                                </div>

                                <div className="col-sm-6 col-md-4 col-lg-5 my-auto">
                                    <div className="card bg-dark">
                                        <h2 className='text-white text-center'>Totall registered {length}</h2>
                                    </div>
                                </div>
                                <div className="col-lg-12 mt-3">
                                    <MDBTable responsive bordered>
                                        <MDBTableHead>
                                            <tr>
                                                <th>#</th>
                                                <th>Title</th>
                                                <th>Instruction</th>
                                                <th>File</th>
                                                <th>Dead line</th>
                                                <th>options</th>
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
                                                                    </a>

                                                                </td>
                                                                <td>{tellDate(b.endDate)}</td>

                                                                <td>
                                                                    <EditBids fetch={fetchDispath} bid={b} />
                                                                    <DeleteBids bid={b} fetch={fetchDispath} />
                                                                </td>
                                                            </tr>

                                                        )
                                                    }) :
                                                    <tr>
                                                        <td colSpan={7}>
                                                            <h3 className='text-center'>
                                                                <FontAwesomeIcon icon={FaThermometerEmpty} className='text-dark' />
                                                                No Bids registered yet
                                                            </h3>
                                                        </td>
                                                    </tr>
                                            }
                                        </MDBTableBody>
                                    </MDBTable>
                                </div>
                                <div className="col-lg-12 d-flex justify-content-center mt-5">
                                    <AdminPaginate setPage={setPage} page={page} />
                                </div>
                            </div>
                        </div>
            }
        </>
    )
}

export default AdminBids
