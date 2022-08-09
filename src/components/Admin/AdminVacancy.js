import React, { useEffect, useState } from 'react'
import { datasDispatch } from '../../store/Actions/dataActions'
import ErrorLoading from '../layouts/ErrorLoading';
import { pageCalculate, Scroll } from '../utility/general'
import DataLoading from '../layouts/DataLoading';
import { MDBTableHead, MDBTable, MDBTableBody } from 'mdbreact';
import { tellDate } from '../utility/Date';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaThermometerEmpty } from 'react-icons/fa';
import AddVacancy from './vacancy/AddVacancy';
import AdminPaginate from './AdminPaginate';
import EditVacancy from './vacancy/EditVacancy';
import DeleteVacancy from './vacancy/DeleteVacancy';
import TotalCount from './TotalCount';
function AdminVacancy() {
    const [state, setState] = useState({
        loading: true,
        data: [],
        error: true,
        length: 0
    })
    const { loading, data, error, length } = state
    const [Page, setPage] = useState(1)
    const page = pageCalculate(10, length)

    const fetchDispath = () => datasDispatch(setState, { page: Page, limit: 10, url: '/Vacancy' })

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
                                    <AddVacancy fetch={fetchDispath} />

                                </div>

                                <div className="col-sm-6 col-md-4 col-lg-5 my-auto">
                                    <TotalCount count={length}/>
                                </div>
                                <div className="col-lg-12 mt-3">
                                    <MDBTable responsive bordered>
                                        <MDBTableHead>
                                            <tr>
                                                <th>#</th>
                                                <th>Job title</th>
                                                <th>Job description</th>
                                                <th>Skills</th>
                                                <th>Work experience</th>
                                                <th>Required in quantity</th>
                                                <th>Dead line</th>
                                                <th>Options</th>
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
                                                                <td>
                                                                    <EditVacancy fetch={fetchDispath} vacancy={v} />
                                                                    <DeleteVacancy vacancy={v} fetch={fetchDispath} />
                                                                </td>
                                                            </tr>

                                                        )
                                                    }) :
                                                    <tr>
                                                        <td colSpan={8}>
                                                            <h3 className='text-center'>
                                                                <FontAwesomeIcon icon={FaThermometerEmpty} />
                                                                No Vacanices registered yet
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

export default AdminVacancy
