import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { randomID } from '../utility/general'
import GoogleLogin from 'react-google-login'
import { GoogleClientId } from '../../../config/config';

const id = randomID() + 'moct' + Date.now()

function ModalLogin({ modal, setModal, setData }) {
    const toggle = () => setModal(!modal);
    const [state, setState] = useState({
        username: { active: '', value: '' },
        password: { active: '', value: '' }
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
        // localStorage.setItem('chatname', state.name.value)
        // localStorage.setItem('user_id', id)
        // setData(s => ({
        //     ...s,
        //     user_id: { value: id, active: '' },
        //     name: { value: state.name.value, active: '' }
        // }
        // ))
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
                        <GoogleLogin
                            clientId={GoogleClientId}
                            onSuccess={response}
                            onFailure={failure}
                            cookiePolicy={'single_host_origin'}
                            render={renderProps => (
                                <button className='btn btn-danger form-control'
                                    onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                    <FontAwesomeIcon icon={faGoogle} style={{ marginRight: 10 }} />
                                    Login with googe
                                </button>
                            )}
                        />
                        <div id="float-label">
                            <label htmlFor="title" className={state.username.active}>
                                <FontAwesomeIcon icon={faUser} className='mx-2' />
                                username
                            </label>
                            <input type="text" className='form-control' id='password'
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
