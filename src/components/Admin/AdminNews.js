import React, { useEffect, useState } from 'react'
import { datasDispatch } from '../../store/Actions/dataActions'
import DataLoading from '../layouts/DataLoading'
import ErrorLoading from '../layouts/ErrorLoading'
import { pageCalculate, Scroll } from '../utility/general'
import AddNews from './News/AddNews'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';
import { file } from '../../config/config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faThermometerEmpty } from '@fortawesome/free-solid-svg-icons'
import { tellDate } from '../utility/Date'
import EditNews from './News/EditNews';
import DeleteNews from './News/DeleteNews'
import AdminPaginate from './AdminPaginate'
function AdminNews() {
    const [state, setState] = useState({
        loading: true,
        data: [],
        error: true,
        length: 0
    })
    const { loading, data, error, length } = state
    const [Page, setPage] = useState(1)
    const page = pageCalculate(8, length)

    const fetchDispath = () => datasDispatch(setState, { page: Page, limit: 8, url: 'news', admin: true })

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
                                    <AddNews fetch={fetchDispath} />

                                </div>

                                <div className="col-sm-6 col-md-4 col-lg-5 my-auto">
                                    <div className="card bg-dark">
                                        <h2 className='text-white text-center'>Totall registered {length}</h2>
                                    </div>
                                </div>
                                <div className="col-lg-12 mt-3">
                                    <MDBTable responsive bordered>
                                        <MDBTableHead textWhite>
                                            <tr>
                                                <th>#</th>
                                                <th>Title</th>
                                                <th>content</th>
                                                <th>image</th>
                                                <th>Options</th>
                                            </tr>
                                        </MDBTableHead>
                                        <MDBTableBody textWhite>
                                            {
                                                length ?
                                                    data.map((n, i = 0) => {
                                                        i++
                                                        return (
                                                            <tr key={n._id}>
                                                                <td>{i}</td>
                                                                <td>{n.title}</td>
                                                                <td>
                                                                    <p className='indent'>{n.content}</p>

                                                                    <div className="d-flex justify-content-end italic">
                                                                        created At:{tellDate(n.createdAt)} <br />
                                                                        enddate :{tellDate(n.endDate)}
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <a href={file + n.image} download={true} target="_blank" rel="noreferrer">
                                                                        <img src={file + n.image} alt="" className="img-fluid" />
                                                                    </a>
                                                                </td>

                                                                <td>
                                                                    <EditNews fetch={fetchDispath} news={n} />
                                                                    <DeleteNews news={n} fetch={fetchDispath} />
                                                                </td>
                                                            </tr>

                                                        )
                                                    }) :
                                                    <tr>
                                                        <td colSpan={9}>
                                                            <h3 className='text-white text-center'>
                                                                <FontAwesomeIcon icon={faThermometerEmpty} className='text-white' />
                                                                No News registered yet
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

export default AdminNews
