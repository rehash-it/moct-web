import { faLock, faPen, faPencilAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, } from 'reactstrap';
import { removeItem } from '../Controller';
import { host } from '../../../config/config';
import { getData, getHeaders } from '../../../config/headers';
import { DotLoading } from '../../layouts/Loading';
import { Button } from '@material-ui/core';

function EditUser({ fetch, user }) {

    const [state, setState] = useState({
        username: { value: '', active: '' },
        password: { value: '', active: '' },
        oldPassword: { value: '', active: '' },
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
                const req = await axios.put(host + 'changePassword/' + user._id,
                    {
                        ...removeItem(getData(state), 'cpassword'),
                        _id: user._id,
                        new: true,
                        isAdmin: user.isAdmin,
                        isActive: user.isActive
                    },
                    getHeaders())

                if (req.status === 200) {
                    setSave({ process: '', error: '', success: 'saved successfully' })
                    setTimeout(() => {
                        fetch()
                        toggle()
                    }, 1000)

                }
                else {
                    setSave({ process: '', error: 'username or password error please check your old password', success: '' })
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
            <Button color="primary" variant="contained" onClick={toggle} style={{margin: 4, padding: 10}} >
            <FontAwesomeIcon icon={faPencilAlt}/>
            </Button>
            <Modal isOpen={modal} toggle={toggle} className='' size='md'>

                <ModalHeader toggle={toggle} className='text-dark'>
                    {user.username} edit
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
                                                value={state.username.value}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="my-3">
                                        <div id="float-label">
                                            <label htmlFor="title" className={state.oldPassword.active}>
                                                <FontAwesomeIcon icon={faLock} className='mx-2' />
                                                old  password
                                            </label>
                                            <input type='password'
                                                className='form-control'
                                                id='oldPassword'
                                                required={true}
                                                minlength={5}
                                                autoComplete={false}
                                                maxlength={1024}
                                                onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="my-3">
                                        <div id="float-label">
                                            <label htmlFor="title" className={state.password.active}>
                                                <FontAwesomeIcon icon={faLock} className='mx-2' />
                                                new  password
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
                                                confirm new password
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

                        <Button color="primary" type='submit' variant='contained' >Submit</Button>
                    </ModalFooter>
                </form>
            </Modal>
        </div>

    )
}

export default EditUser
