import React, { useEffect, useState } from 'react'
import { datasDispatch } from '../../store/Actions/dataActions'
import DataLoading from '../layouts/DataLoading'
import ErrorLoading from '../layouts/ErrorLoading'
import { pageCalculate, Scroll } from '../utility/general'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';
import { file } from '../../config/config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThermometerEmpty } from '@fortawesome/free-solid-svg-icons'
import { tellDate } from '../utility/Date'
import AdminPaginate from './AdminPaginate'
import AddSites from './Sites/AddSites';
import EditSites from './Sites/EditSites';
import DeleteSites from './Sites/DeleteSites';
import TotalCount from './TotalCount'
function AdminSite() {
    const [state, setState] = useState({
        loading: true,
        data: [],
        error: true,
        length: 0
    })
    const { loading, data, error, length } = state
    const [Page, setPage] = useState(1)
    const page = pageCalculate(8, length)

    const fetchDispath = () => datasDispatch(setState, { page: Page, limit: 8, url: 'site' })

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
                                    <AddSites fetch={fetchDispath} />

                                </div>

                                <div className="col-sm-6 col-md-4 col-lg-5 my-auto">
                                    <TotalCount count={length}/>
                                </div>
                                <div className="col-lg-12 mt-3">
                                    <MDBTable responsive bordered>
                                        <MDBTableHead>
                                            <tr>
                                                <th>#</th>
                                                <th>Title</th>
                                                <th>Description</th>
                                                <th>Uploaded images</th>
                                                <th>Options</th>
                                            </tr>
                                        </MDBTableHead>
                                        <MDBTableBody>
                                            {
                                                length ?
                                                    data.map((s, i = 0) => {
                                                        i++
                                                        return (
                                                            <tr key={s._id}>
                                                                <td>{i}</td>
                                                                <td>{s.title}</td>
                                                                <td>
                                                                    <p className='indent'>{s.description}</p>

                                                                    <div className="d-flex justify-content-end font-italic">
                                                                        region:{s.region} <br />
                                                                        latitude:{s.lat} <br />
                                                                        longtiude:{s.lng} <br />
                                                                        created At:{tellDate(s.createdAt)} <br />

                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="gallery my-2" id="gallery" >
                                                                        {
                                                                            s.images.map(im =>

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

                                                                </td>

                                                                <td>
                                                                    <EditSites fetch={fetchDispath} site={s} />
                                                                    <DeleteSites site={s} fetch={fetchDispath} />
                                                                </td>
                                                            </tr>

                                                        )
                                                    }) :
                                                    <tr>
                                                        <td colSpan={9}>
                                                            <h3 className='text-center'>
                                                                <FontAwesomeIcon icon={faThermometerEmpty} className='text-white' />
                                                                No Sites registered yet
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

export default AdminSite
