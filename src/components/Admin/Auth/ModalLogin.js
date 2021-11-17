import { faEnvelope, faLock, faUser, faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { randomID } from '../utility/general'
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { GoogleClientId, FacebookClientId } from '../../../config/config';
import { FbLogin, GoogleSignin, loginUser, onFailure } from './social';
import { DotLoading } from '../../layouts/Loading';

const id = randomID() + 'moct' + Date.now()

function ModalLogin({ modal, setModal, setData, signUp }) {
    const toggle = () => setModal(!modal);
    const [state, setState] = useState({
        username: { active: '', value: '' },
        password: { active: '', value: '' }
    })
    const [save, setProcess] = useState({
        process: false,
        success: '',
        error: '',
        message: ''
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
    const handleSubmit = e => {
        e.preventDefault()
        loginUser({
            username: state.username.value,
            password: state.password.value,
            isAdmin: false,
            isActive: true,
            account_type: 'locall'
        }, setProcess, 'login', setTimeout(() => toggle(), 1000))
    }
    const googleResponse = res => {
        let user = GoogleSignin(res)
        loginUser(user, setProcess, 'login', setTimeout(() => toggle(), 1000))
    }
    const signInwithFb = res => loginUser(FbLogin(res), setProcess, 'fb', 'login', setTimeout(() => toggle(), 1000))
    const googleoOnFailure = (fail) => onFailure(setProcess, 'google')
    const signInFbFailure = fail => onFailure(setProcess, 'fb')
    const setUserAnonymous = () => {
        localStorage.setItem('chatname', 'anonymous')
        localStorage.setItem('user_id', id)
    }
    return (
        <div>
            <Modal isOpen={modal} toggle={toggle} size='md' style={{ paddingTop: 200 }}>
                <form onSubmit={handleSubmit}>

                    <ModalHeader toggle={toggle} className='text-dark'>
                        Please signin or you can be anonymous
                    </ModalHeader>
                    <button type='button'
                        className="btn btn-dark my-2 text-whte"
                        onClick={() => setUserAnonymous()}>
                        <FontAwesomeIcon icon={faUserSecret} className='mx-2 text-white' />
                        Anonymous
                    </button>
                    <ModalBody>
                        <GoogleLogin
                            clientId={GoogleClientId}
                            onSuccess={googleResponse}
                            onFailure={googleoOnFailure}
                            cookiePolicy={'single_host_origin'}
                            render={renderProps => (
                                <button type='button' className='btn btn-danger my-2  form-control'
                                    onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                    <FontAwesomeIcon icon={faGoogle} className='mx-2 text-white' />
                                    Login with googe
                                </button>
                            )}
                        />
                        <FacebookLogin
                            appId={FacebookClientId}
                            fields="name,email,picture"
                            callback={signInwithFb}
                            onFailure={signInFbFailure}
                            render={renderProps => (
                                <button type='button' class='btn btn-primary my-2  form-control'
                                    onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                    <FontAwesomeIcon icon={faFacebook} className='mx-2 text-white' />
                                    Login with googe
                                </button>
                            )}
                        />
                        <div id="float-label">
                            <label htmlFor="email" className={state.username.active}>
                                <FontAwesomeIcon icon={faEnvelope} className='mx-2' />
                                email
                            </label>
                            <input type="email" className='form-control' id='username'
                                required={true}
                                onChange={handleChange}
                                value={state.username.value}
                            />
                        </div>

                        {/*  */}
                        <div className="my-2">
                            <div id="float-label">
                                <label htmlFor="title" className={state.password.active}>
                                    <FontAwesomeIcon icon={faLock} className='mx-2' />
                                    password
                                </label>
                                <input type="text" className='form-control' id='password'
                                    required={true}
                                    onChange={handleChange}
                                    value={state.password.value}
                                />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        {save.process ?
                            <div className="d-flex justify-content-center">
                                <DotLoading />
                                <p className='text-dark'>{save.process}</p>
                            </div> :
                            <p></p>
                        }
                        <p className="text-center text-success">
                            {save.success}
                        </p>
                        <p className="text-center text-danger">
                            {save.error}
                        </p>
                        <div className="" style={{ display: 'inline-flex' }}>
                            <p className="text-center" onClick={signUp}>
                                New to moct please <b>signup</b>
                            </p>
                        </div>
                        <button type='submit' className="btn btn-raise">
                            signin
                        </button>
                        {' '}
                    </ModalFooter>
                </form>

            </Modal>
        </div>
    )
}

export default ModalLogin
