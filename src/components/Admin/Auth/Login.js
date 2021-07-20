import React, { useState, useEffect } from 'react'
import Logo from '../../../images/moct-logo-2.png'
import ReactRoundedImage from "react-rounded-image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { DotLoading } from '../../layouts/Loading';
import axios from 'axios';
import { host } from '../../../config/config';
import { getData } from '../../../config/headers';
import { withRouter } from 'react-router-dom';
function Login({ history }) {

    const [state, setState] = useState({
        username: { value: '', active: 'Active' },
        password: { value: '', active: 'Active' },
    })
    const [save, setSave] = useState({
        process: '',
        error: '',
        success: ''
    })

    const handleChange = e => {

        setState(s => ({
            ...s,
            [e.target.id]: {
                value: e.target.value,
                active: e.target.value ? 'Active' : ''
            }
        }))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            setSave(s => ({ ...s, process: 'login please wait...', error: '' }))
            const log = await axios.post(host + 'auth', getData(state))
            if (log.status === 200) {
                sessionStorage.setItem('x-auth-token', log.data)
                setSave(s => ({ ...s, error: '', process: '', success: 'Welcome' }))
                setTimeout(() => history.push('/admin'), 1000)
            }
            else {
                setSave({ process: '', error: 'username or password error please enter your name or password carefully', success: '' })
            }
        }
        catch (err) {
            console.log(err)
            setSave({ process: '', error: 'username or password error please enter your name or password carefully', success: '' })
        }
    }
    return (
        <div className="container-fluid login" >
            <div className="row">
                <div className="col-lg-4">
                </div>
                <div className="col-lg-4 bg-white mt-5">
                    <form onSubmit={handleSubmit}>
                        <div className="card-header text-center text-dark " style={{ display: 'flex' }}>

                            <h1 className='my-auto'>MOCT ADMIN LOGIN</h1>
                            <ReactRoundedImage
                                image={Logo}
                                roundedColor="#66A5CC"
                                imageWidth={150}
                                imageHeight={120}
                                roundedSize={8}
                                borderRadius={15}
                                style={{ color: '#fff' }}
                            />
                        </div>
                        <div className="card body ">

                            <div className="my-3">
                                <div id="float-label">
                                    <label htmlFor="title" className={state.username.active}>
                                        <FontAwesomeIcon icon={faUser} className='mx-2' />
                                        username
                                    </label>
                                    <input type="text" className='form-control' id='username'
                                        required='true'
                                        minLength={5}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="my-3">
                                <div id="float-label">
                                    <label htmlFor="title" className={state.password.active}>
                                        <FontAwesomeIcon icon={faLock} className='mx-2' />
                                        password
                                    </label>
                                    <input type="password" className='form-control' id='password'
                                        required='true'
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="text-center text-dark">
                                {
                                    save.process ?
                                        <DotLoading /> :
                                        ''
                                }
                                <p className="text-danger">{save.error}</p>

                                <p className="text-success"></p>
                                {
                                    save.success ?
                                        <p className="text-success">
                                            <FontAwesomeIcon icon={faCheck} className='mx-2' />
                                            {save.success}
                                        </p> :
                                        <p></p>
                                }

                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className='btn btn-danger'>
                                Login
                            </button>
                        </div>
                    </form>
                </div>
                <div className="col-lg-4"></div>
            </div>
        </div>
    )
}

export default withRouter(Login)
