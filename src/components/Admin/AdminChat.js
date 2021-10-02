import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import React, { useEffect, useState } from 'react'
import DataLoading from '../layouts/DataLoading';
import ErrorLoading from '../layouts/ErrorLoading';
import { fetchChats } from './chat/chat';
import ReactTimeAgo from 'react-time-ago/commonjs/ReactTimeAgo'
import { tellDate } from '../utility/Date';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

function AdminChat({ socket, setTabs, connection }) {
    const [state, setState] = useState({
        loading: true,
        data: [],
        error: false
    })
    useEffect(() => {
        fetchChats(setState)
    }, [])
    function DoNothing() { }
    const connect = user => {
        const admin_id = sessionStorage.getItem('id')
        const admin_name = sessionStorage.getItem('username')
        socket ? socket.emit('disMiss', connection.user_id, connection.admin_id) : DoNothing()
        sessionStorage.removeItem('user_id')
        sessionStorage.setItem('user_id', user.user_id)
        socket ? socket.emit('addConn', {
            user_name: user.user_name,
            user_id: user.user_id,
            admin_name: admin_name,
            admin_id: admin_id
        }) : DoNothing()
        socket ? socket.emit('getChat', { user_id: user.user_id, admin_id: admin_id }) : DoNothing()
        setTabs('chatRoom')
    }
    return (
        <>
            {
                state.loading ?
                    <DataLoading /> :
                    state.error ?
                        <ErrorLoading /> :
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-1"></div>
                                <div className="col-lg-5  my-auto">
                                </div>

                                <div className="col-sm-6 col-md-4 col-lg-5 my-auto">
                                    <div className="card bg-dark">
                                        <h2 className='text-white text-center'>Totall contacted {state.data.length}</h2>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <MDBTable responive bordered>
                                        <MDBTableHead textWhite>
                                            <th>#</th>
                                            <th>username</th>
                                            <th>last contacted</th>
                                            <th>contact</th>
                                        </MDBTableHead>
                                        <MDBTableBody textWhite>
                                            {
                                                state.data.map((c, i) =>
                                                    <tr key={c._id}>
                                                        <th>{i + 1}</th>
                                                        <th>{c.user_name}</th>
                                                        <th>
                                                            <ReactTimeAgo date={c.connection_time} />
                                                            <p className="text-center">
                                                                {tellDate(c.connection_time)}
                                                            </p>
                                                        </th>

                                                        <th>
                                                            <button className="text-center btn btn-raise" onClick={() => connect(c)}>
                                                                Contact
                                                            </button>
                                                        </th>
                                                    </tr>

                                                )
                                            }
                                        </MDBTableBody>
                                    </MDBTable>
                                </div>
                            </div>
                        </div>
            }
            <div className="container"></div>
        </>
    )
}

export default AdminChat
