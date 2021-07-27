import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Progress } from 'reactstrap';
import { host } from '../../../config/config';
import { getHeaders } from '../../../config/headers';
import { DotLoading } from '../../layouts/Loading';
import { dateFormat } from './../../utility/Date';


const AddBids = ({ fetch }) => {
    const [state, setState] = useState({
        title: { value: '', active: false },
        instruction: { value: '', active: false },
        endDate: { value: '', active: false },
        file: { value: 0, active: true },
    })
    const [modal, setModal] = useState(false)
    const [save, setSave] = useState({
        process: '',
        error: '',
        success: ''
    })
    const [loaded, setLoaded] = useState(0)
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
    const handleFile = e => {
        setState(s => ({ ...s, file: { value: e.target.files[0], active: 'Active' } }))
        setSave({ process: '', error: '', success: '' })
    }
    const handleSubmit = async e => {
        e.preventDefault()
        try {
            var data = new FormData()
            data.append('file', state.file.value, state.file.value.name)
            data.append('title', state.title.value)
            data.append('instruction', state.instruction.value)
            data.append('endDate', state.endDate.value)
            setSave({ process: 'saving...', error: '', success: '' })
            const save = await axios.post(host + 'bid', data, {
                ...getHeaders(),
                onUploadProgress: ProgressEvent =>
                    setLoaded(ProgressEvent.loaded / ProgressEvent.total * 100)
            })
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
        <>
            <button className="btn btn-primary mx-2" onClick={toggle}>
                <FontAwesomeIcon icon={faPlus} className='mx-2' />
                Add new bids
            </button>
            <Modal isOpen={modal} toggle={toggle} className='' size='lg'>

                <ModalHeader toggle={toggle} className='text-dark'>
                    Add new Bids
                </ModalHeader>
                <form onSubmit={handleSubmit}>
                    <ModalBody>

                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 text-dark">
                                    <div className="my-3">
                                        <div id="float-label">
                                            <label htmlFor="title" className={state.title.active}>
                                                Bids Title
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
                                            <label htmlFor="title" className='Active'>
                                                Deadline
                                            </label>
                                            <input type='date'
                                                className='form-control'
                                                id='endDate'
                                                required={true}
                                                min={new Date().toISOString().split("T")[0]}
                                                onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="my-3">
                                        <div id="float">
                                            <label htmlFor="title" className='Active'>
                                                Attach file to read
                                            </label>
                                            <input type='file'
                                                className='form-control'
                                                id='file'
                                                onChange={handleFile} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 text-dark">
                                    <div className="my-3">
                                        <div id="float">
                                            <label htmlFor="title" className='Active'>
                                                instruction
                                            </label>
                                            <textarea name="" id="instruction" cols="30" rows="10"
                                                onChange={handleChange}
                                                required={true}
                                                minLength={10}
                                                className="form-control">
                                            </textarea>
                                            <Progress max="100" color="text-success" value={loaded} >
                                                {Math.round(loaded, 2)}%
                                            </Progress>
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
        </>

    )
}

export default AddBids
