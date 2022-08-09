import React, { useState, useEffect } from 'react'
import { datasDispatch } from '../../store/Actions/dataActions'
import DataLoading from '../layouts/DataLoading'
import ErrorLoading from '../layouts/ErrorLoading'
import { pageCalculate, Scroll } from '../utility/general'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { tellDate } from '../utility/Date'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { file } from '../../config/config'
import { FaThermometerEmpty } from 'react-icons/fa'
import AdminPaginate from './AdminPaginate'
import AddDocs from './Docs/AddDocs'
import EditDocs from './Docs/EditDocs'
import DeleteDocs from './Docs/DeleteDocs'
import { getFileName } from '../utility/file'
import TotalCount from './TotalCount'
function AdminResearch() {
    const [state, setState] = useState({
        loading: true,
        data: [],
        error: true,
        length: 0
    })
    const { loading, data, error, length } = state
    const [Page, setPage] = useState(1)
    const page = pageCalculate(10, length)

    const fetchDispath = () => datasDispatch(setState, { page: Page, limit: 10, url: 'docs' })

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
                                    <AddDocs fetch={fetchDispath} />

                                </div>

                                <div className="col-sm-6 col-md-4 col-lg-5 my-auto">
                                    <TotalCount count={length} />
                                </div>
                                <div className="col-lg-12 mt-3">
                                    <MDBTable responsive bordered>
                                        <MDBTableHead>
                                            <tr>
                                                <th>#</th>
                                                <th>Title</th>
                                                <th>Description</th>
                                                <th>File</th>
                                                <th>options</th>
                                            </tr>

                                        </MDBTableHead>
                                        <MDBTableBody>
                                            {
                                                length ?
                                                    data.map((d, i = 0) => {
                                                        i++
                                                        return (
                                                            <tr key={d._id}>
                                                                <td>{i}</td>
                                                                <td>{d.title}</td>
                                                                <td>
                                                                    <p className="indent">
                                                                        {d.description}
                                                                    </p>
                                                                    <div className="col-lg-12 d-flex justify-content-center mt-5">
                                                                        <p>{tellDate(d.createdAt)}</p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <a href={file + d.file} download={true} target="_blank" rel="noreferrer">
                                                                        {getFileName(d.file)}
                                                                        <button className="btn btn-primary">
                                                                            <FontAwesomeIcon icon={faDownload} />
                                                                            Download
                                                                        </button>
                                                                    </a>

                                                                </td>

                                                                <td>
                                                                    <EditDocs fetch={fetchDispath} docs={d} />
                                                                    <DeleteDocs docs={d} fetch={fetchDispath} />
                                                                </td>
                                                            </tr>

                                                        )
                                                    }) :
                                                    <tr>
                                                        <td colSpan={5}>
                                                            <h3 className='text-center'>
                                                                <FontAwesomeIcon icon={FaThermometerEmpty} className='text-white' />
                                                                No Document  registered yet
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

export default AdminResearch
