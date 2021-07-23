import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, } from 'reactstrap';
import { removeItem } from '../Controller';
import { host } from '../../../config/config';
import { getData, getHeaders } from '../../../config/headers';
import { DotLoading } from '../../layouts/Loading';
function AddUser({ fetch }) {

    const [state, setState] = useState({
        username: { value: '', active: '' },
        password: { value: '', active: '' },
        cpassword: { value: '', active: '' }
    })
    const [modal, setModal] = useState(false)
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
        setSave({ process: '', error: '', success: '' })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        if (state.password.value === state.cpassword.value) {
            try {
                setSave(s => ({ ...s, success: '', save: '', process: 'saving...' }))
                const req = await axios.post(host + 'user', removeItem(getData(state), 'cpassword'), getHeaders())
                if (req.status === 200) {
                    setSave({ process: '', error: '', success: 'saved successfully' })
                    setTimeout(() => { fetch(); toggle() }, 1000)
                }
                else {
                    setSave({ process: '', error: 'can not save data internal server error', success: '' })
                }
            }
            catch (err) {
                setSave({ process: '', error: 'can not save data internal server error', success: '' })
            }
        }
        else {
            setSave({ process: '', error: 'password confirmation error check the password', success: '' })
        }
    }
    const toggle = () => setModal(!modal);
    return (
        <div>
            <Button color='primary' onClick={toggle}>
                Add new users
            </Button>
            <Modal isOpen={modal} toggle={toggle} className='' size='md'>

                <ModalHeader toggle={toggle} className='text-dark'>
                    Add new users
                </ModalHeader>
                <form onSubmit={handleSubmit}>
                    <ModalBody>

                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 text-dark">
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
                                            <input type='password'
                                                className='form-control'
                                                id='password'
                                                required={true}
                                                minlength={5}
                                                maxlength={1024}
                                                onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="my-3">
                                        <div id="float-label">
                                            <label htmlFor="title" className={state.cpassword.active}>
                                                <FontAwesomeIcon icon={faLock} className='mx-2' />
                                                confirm password
                                            </label>
                                            <input type='password'
                                                className='form-control'
                                                id='cpassword'
                                                required={true}
                                                minlength={5}
                                                maxlength={1024}
                                                onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>

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

                        <Button color="primary" type='submit' >Submit</Button>
                    </ModalFooter>
                </form>
            </Modal>
        </div>

    )
}

export default AddUser
