import { faEnvelope, faLock, faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { GoogleClientId, FacebookClientId } from '../../../config/config';
import { FbLogin, GoogleSignin, loginUser, onFailure } from './social';
import { DotLoading } from '../../layouts/Loading';
import { randomID } from '../../utility/general';
import SaveProcess from '../../layouts/SaveProcess';

const id = randomID() + 'mocs' + Date.now()

function ModalSignup({ modal, setModal, signIn }) {
    const toggle = () => setModal(!modal);
    const [state, setState] = useState({
        username: { active: '', value: '' },
        password: { active: '', value: '' },
        cpassword: { active: '', value: '' }

    })
    const [save, setProcess] = useState({
        process: '',
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
        state.cpassword.value === state.password.value ?
            loginUser({
                username: state.username.value,
                password: state.password.value,
                isAdmin: false,
                isActive: true,
                account_type: 'locall'
            }, setProcess, 'signup', toggle) :
            setProcess(s => ({ ...s, error: 'password confirmation error', success: '', process: '' }))
    }
    const googleResponse = res => {
        let user = GoogleSignin(res)
        loginUser(user, setProcess, 'signup', toggle)
    }
    const signInwithFb = res => loginUser(FbLogin(res), setProcess, 'signup', toggle)
    const googleoOnFailure = (fail) => onFailure(setProcess, 'google')
    const signInFbFailure = fail => onFailure(setProcess, 'fb')
    const setUserAnonymous = () => {
        localStorage.setItem('chatname', 'anonymous')
        localStorage.setItem('user_id', id)
        toggle()
    }
    return (
        <div>
            <Modal isOpen={modal} toggle={toggle} size='md' style={{ paddingTop: 200 }}>
                <form onSubmit={handleSubmit}>

                    <ModalHeader toggle={toggle} className='text-dark'>
                        Please signin or you can be anonymous
                    </ModalHeader>
                    <ModalBody>
                        <button type='button'
                            className="btn btn-dark my-2 text-whte form-control"
                            onClick={() => setUserAnonymous()}>
                            <FontAwesomeIcon icon={faUserSecret} className='mx-2 text-white' />
                            Anonymous
                        </button>
                        <GoogleLogin
                            clientId={GoogleClientId}
                            onSuccess={googleResponse}
                            onFailure={googleoOnFailure}
                            cookiePolicy={'single_host_origin'}
                            render={renderProps => (
                                <button type='button' className='btn btn-danger my-2  form-control'
                                    onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                    <FontAwesomeIcon icon={faGoogle} className='mx-2 text-white' />
                                    signUp with googe
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
                                    signUp with facebook
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
                                <input type="password" className='form-control' id='password'
                                    required={true}
                                    onChange={handleChange}
                                    value={state.password.value}
                                />
                            </div>
                        </div>
                        {/***/}
                        <div className="my-2">
                            <div id="float-label">
                                <label htmlFor="title" className={state.cpassword.active}>
                                    <FontAwesomeIcon icon={faLock} className='mx-2' />
                                    confirm password
                                </label>
                                <input type="password" className='form-control' id='cpassword'
                                    required={true}
                                    onChange={handleChange}
                                    value={state.cpassword.value}
                                />
                            </div>
                        </div>
                        <SaveProcess Process={save} />
                        <div onClick={signIn}>
                            <p className="text-center text-dark">
                                New to mocs please <b>signIn</b>
                            </p>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button type='submit' className="btn btn-raise form-control">
                            signup
                        </button>
                        {' '}
                    </ModalFooter>
                </form>

            </Modal>
        </div>
    )
}

export default ModalSignup
