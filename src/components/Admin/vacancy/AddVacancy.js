import axios from 'axios';
import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { host } from '../../../config/config';
import { getData, getHeaders } from '../../../config/headers';
import { DotLoading } from '../../layouts/Loading';
import { DateNow } from '../../utility/Date';
import { Button } from '@material-ui/core';
import styles from '../../../styles/modal.module.scss'

function AddVacancy({ fetch }) {
    const [state, setState] = useState({
        title: { value: '', active: false },
        description: { value: '', active: false },
        skills: { value: '', active: false },
        quantity: { value: 0, active: false },
        endDate: { value: '', active: false },
        experience: { value: '', active: false }
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
        try {
            setSave({ process: 'saving...', error: '', success: '' })
            const save = await axios.post(host + 'vacancy', getData(state), getHeaders())
            if (save.status === 200) {
                setSave({ process: '', error: '', success: 'saved successfully' })
                setTimeout(() => fetch(), 1000)
            }
            else {
                setSave({ process: '', error: 'can not save data internal server error', success: '' })
            }
        }
        catch (err) {
            setSave({ process: '', error: 'can not save data internal server error', success: '' })
        }
    }
    const toggle = () => setModal(!modal);
    return (
        <div>
            <Button variant='contained' color='primary' onClick={toggle} style={{margin: 4 }}>
                Add new Vacacancy
            </Button>
            <Modal isOpen={modal} toggle={toggle} className='' size='lg'>
                <ModalHeader toggle={toggle} className={styles.modalHeader}>
                    Add new Vacacancy
                </ModalHeader>
                <form onSubmit={handleSubmit}>
                    <ModalBody>

                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 text-dark">
                                    <div className="my-3">
                                        <div id="float-label">
                                            <label htmlFor="title" className={state.title.active}>
                                                Job Title
                                            </label>
                                            <input type="text" className='form-control' id='title'
                                                required='true'
                                                minLength={5}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="my-3">
                                        <div id="float-label">
                                            <label htmlFor="title" className={state.skills.active}>
                                                skills
                                            </label>
                                            <input type="text"
                                                className='form-control'
                                                id='skills'
                                                onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="my-3">
                                        <div id="float-label">
                                            <label htmlFor="title" className={state.quantity.active}>
                                                Quantity
                                            </label>
                                            <input type="number"
                                                className='form-control'
                                                id='quantity'
                                                min='1'
                                                required={true}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="my-3">
                                        <div id="float-label">
                                            <label htmlFor="title" className={state.experience.active}>
                                                work expereince
                                            </label>
                                            <input type='number'
                                                className='form-control'
                                                id='experience'
                                                required={true}
                                                onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="my-3">
                                        <div id="float-label">
                                            <label htmlFor="title" className='Active'>
                                                Deadline
                                            </label>
                                            <input type='date'
                                                className='form-control'
                                                id='endDate'
                                                min={DateNow()}
                                                required={true}
                                                onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 text-dark">
                                    <div className="my-3">
                                        <div id="float">
                                            <label htmlFor="title" className={state.description.active}>
                                                Description
                                            </label>
                                            <textarea name="" id="description" cols="30" rows="10"
                                                onChange={handleChange}
                                                required={true}
                                                minLength={10}
                                                className="form-control">
                                            </textarea>
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
                        <Button color="primary" type='submit' size="large" variant="contained" >Submit</Button>
                    </ModalFooter>
                </form>
            </Modal>
        </div>

    )
}

export default AddVacancy
