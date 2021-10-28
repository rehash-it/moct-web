import React, { useEffect, useState } from 'react'
import { dataDispatch, datasDispatch } from '../../store/Actions/dataActions'
import DataLoading from '../layouts/DataLoading'
import ErrorLoading from '../layouts/ErrorLoading'
import { pageCalculate, Scroll } from '../utility/general'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faThermometerEmpty, faUser } from '@fortawesome/free-solid-svg-icons'
import { tellDate } from '../utility/Date'
import AdminPaginate from './AdminPaginate'
import AddUser from './user/AddUser'
import EditUser from './user/EditUser';
import DeleteUser from './user/DeleteUser'
import Switch from "react-switch";
import { submitUser } from './user/submitUser';
import { SpinnerLoading } from '../layouts/Loading'
function AdminUser() {
    const [state, setState] = useState({
        loading: true,
        data: [],
        error: true,
        length: 0
    })
    const [user, setUser] = useState({})
    const { loading, data, error, length } = state
    const [Page, setPage] = useState(1)
    const page = pageCalculate(8, length)
    const [save, setSave] = useState({
        process: '',
        error: '',
        success: '',
        open: false
    })
    const [popOver, setPopOver] = useState('')
    const fetchDispath = () => datasDispatch(setState, { page: Page, limit: 8, url: 'user' })
    /** */
    useEffect(() => {
        Scroll('top')
        datasDispatch(setState, { page: Page, limit: 8, url: 'user' })
    }, [Page])
    /** */
    const id = sessionStorage.getItem('id')
    useEffect(() => {
        let User = data.find(u => u._id === id)
        setUser(User ? User : { isActive: false, isAdmin: false, username: '', _id: '' })
    }, [data, id])
    /**handle pop ups for the given switch toogle */
    const handleOpen = (id) => setPopOver(id)
    /**
     * @param {*} value -Boolean that the current va
     * @param {*} user-user object 
     */
    const handleActive = (value, user) => {
        handleOpen(user._id)
        submitUser('put', { ...user, isActive: !value }, fetchDispath, setSave)
    }
    /**
     * @param {*} value -Boolean that the current va
     * @param {*} user-user object 
     */
    const handleAdmin = (value, user) => {
        handleOpen(user._id)
        submitUser('put', { ...user, isAdmin: !value }, fetchDispath, setSave)
    }
    const showProcess = (id) => popOver === id ? true : false
    return (
        <>
            {
                error ? <ErrorLoading /> :

                    <div className="container my-4 ml-4" >
                        <div className="row">
                            <div className="col-lg-1"></div>
                            <div className="col-sm-4 col-md-4 col-lg-4  my-auto">
                                <AddUser fetch={fetchDispath} />

                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-4 text-center my-3" style={{ display: 'flex' }}>
                                <h4 className='mx-2 my-auto'>
                                    <FontAwesomeIcon icon={faUser} className='text-white fa-1x mx-2' />
                                    {user.username ? user.username : ''}

                                </h4>
                                <EditUser fetch={fetchDispath} user={user} />

                            </div>
                            <div className="col-sm-3 col-md-3 col-lg-3 my-auto">
                                <div className="card bg-dark">
                                    <h2 className='text-center'>Totall registered {length}</h2>
                                </div>
                            </div>
                            <div className="col-lg-12 mt-3">
                                <MDBTable responsive bordered>
                                    <MDBTableHead>
                                        <tr>
                                            <th>#</th>
                                            <th>useranme</th>
                                            <th>is Admin</th>
                                            <th>Activation</th>
                                            <th>Options</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        {
                                            length ?
                                                data.map((u, i = 0) => {
                                                    i++
                                                    return (
                                                        <tr key={u._id}>
                                                            <td>{i}</td>
                                                            <td>{u.username}</td>
                                                            <td>
                                                                <p className='indent'>{u.isAdmin ? 'user is an Admin' : 'user is not admin'}</p>
                                                                <Switch onChange={() => handleAdmin(u.isAdmin, { ...u, new: false })} checked={u.isAdmin} />
                                                                <div className="d-flex justify-content-end italic">
                                                                    created At:{tellDate(u.createdAt)} <br />
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <label>
                                                                    <span className='mx-2 my-auto'>{u.isActive ? 'user is active' : 'user is deactivated'}</span>
                                                                    <Switch onChange={() => handleActive(u.isActive, { ...u, new: false })} checked={u.isActive} />
                                                                    {
                                                                        showProcess(u.id) ?
                                                                            <div className="card bg-white">
                                                                                {save.process ?
                                                                                    <div className="card-header">
                                                                                        <SpinnerLoading />
                                                                                        <p className="text-info">{save.success}</p>

                                                                                    </div> : ''
                                                                                }
                                                                                <p className="text-danger">{save.error}</p>
                                                                                {save.success ?
                                                                                    <div className="card-header">
                                                                                        <FontAwesomeIcon icon={faCheck} className='mx-2' />
                                                                                        <p className="text-success">{save.success}</p>
                                                                                    </div> : ''
                                                                                }
                                                                            </div> : ''
                                                                    }
                                                                </label>
                                                            </td>

                                                            <td>
                                                                <DeleteUser user={u} fetch={fetchDispath} />
                                                            </td>
                                                        </tr>

                                                    )
                                                }) :
                                                <tr>
                                                    <td colSpan={9}>
                                                        <h3 className='text-center'>
                                                            <FontAwesomeIcon icon={faThermometerEmpty} className='text-white' />
                                                            No Users registere yet
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

export default AdminUser
