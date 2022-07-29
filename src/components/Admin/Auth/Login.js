import { faCheck, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container, Paper } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import ReactRoundedImage from "react-rounded-image";
import { withRouter } from 'react-router-dom';
import { host } from '../../../config/config';
import { getData } from '../../../config/headers';
import Logo from '../../../images/moct-logo-2.png';
import { DotLoading } from '../../layouts/Loading';
function Login({ history, setToken }) {

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
                sessionStorage.setItem('x-auth-token', log.data.token)
                sessionStorage.setItem('id', log.data.id)
                sessionStorage.setItem('username', log.data.username)
                setSave(s => ({ ...s, error: '', process: '', success: 'Welcome' }))
                setTimeout(() =>

                    setToken ? setToken(true) :
                        history.push('/admin')
                    , 1000)
            }
            else {
                setSave({ process: '', error: 'username or password error please enter your name or password carefully', success: '' })
            }
        }
        catch (err) {
            const error = err.response ? err.response.data.message : 'Internal server error'
            setSave({ process: '', error: error, success: '' })
        }
    }
    return (
        <div className='login'>
            <Container maxWidth="sm" className='my-4'>
                <Paper className="p-4">
                    <form onSubmit={handleSubmit}>
                        <div  className="d-flex justify-content-between align-items-center mb-4">
                            <h1 className='h4'>MOCT ADMIN LOGIN</h1>
                            <ReactRoundedImage
                            image={Logo}
                            roundedColor="#66A5CC"
                            imageWidth={50}
                            imageHeight={50}
                            roundedSize={5}
                            borderRadius={3}
                            style={{ color: '#fff' }}
                        />
                        </div>
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
                        <div className="my-2">
                            <Button type="submit" color="primary" variant="contained" size='large'>
                                Login
                            </Button>
                        </div>
                    </form>
                </Paper>
            </Container>
        </div>
    )
}

export default withRouter(Login)
