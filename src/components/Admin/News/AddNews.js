import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Progress } from 'reactstrap';
import { host } from '../../../config/config';
import { getHeaders } from './../../../config/headers';
import { DotLoading } from '../../layouts/Loading';
import { faCalendar, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { dateFormat } from './../../utility/Date';

function AddNews({ fetch }) {

    const [modal, setModal] = useState(false);
    const [state, setState] = useState({
        title: { value: '', active: false },
        content: { value: '', active: false },
        endDate: { value: '', active: false },
        image: { value: '', active: false },
        imageUrl: ''
    })
    const [save, setSave] = useState({
        process: '',
        error: '',
        success: '',
        imageError: ''
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
        let image = e.target.files[0]
        if (image.type === 'image/png' || image.type === 'image/jpeg' || image.type === 'image/jpg') {

            setState(s => ({ ...s, image: { value: image, active: 'Active' }, imageUrl: URL.createObjectURL(image) }))
            setSave({ process: '', error: '', success: '', imageError: '' })
        }
        else {
            setState(s => ({ ...s, imageUrl: '', image: { value: '', active: true } }))
            setSave({ process: '', error: '', success: '', imageError: 'Only jpeg,jpg and png image files are supported' })
        }
    }
    const handleSubmit = async e => {
        e.preventDefault()
        try {
            if (state.image.value !== '') {
                var data = new FormData()
                data.append('image', state.image.value, state.image.value.name)
                data.append('title', state.title.value)
                data.append('content', state.content.value)
                data.append('endDate', state.endDate.value)
                setSave(s => ({ ...s, process: 'saving...', error: '', success: '' }))
                const save = await axios.post(host + 'news', data, {
                    ...getHeaders(),
                    onUploadProgress: ProgressEvent =>
                        setLoaded(ProgressEvent.loaded / ProgressEvent.total * 100)
                })
                if (save.status === 200) {
                    setSave(s => ({ ...s, process: '', error: '', success: 'saved successfully' }))
                    setTimeout(() => fetch(), 1000)
                }
                else {
                    setSave(s => ({ ...s, process: '', error: 'can not save data internal server error', success: '' }))
                }
            }
            else {
                setSave(s => ({ ...s, process: '', error: 'please set the proper image file to save the news', success: '' }))
            }
        }
        catch (err) {
            console.log(err)
            setSave(s => ({ ...s, process: '', error: 'can not save data internal server error', success: '' }))
        }
    }
    const toggle = () => setModal(!modal);

    return (
        <div>
            <Button color='primary' onClick={toggle}>
                Add new News
            </Button>
            <Modal isOpen={modal} toggle={toggle} className='' size='xl'>

                <ModalHeader toggle={toggle} className='text-dark'>
                    Add new News
                </ModalHeader>
                <form onSubmit={handleSubmit}>
                    <ModalBody>

                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 text-dark">
                                    <div className="my-3">
                                        <div id="float-label">
                                            <label htmlFor="title" className={state.title.active}>
                                                <FontAwesomeIcon icon={faNewspaper} className='mx-2' />
                                                News Title
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
                                                <FontAwesomeIcon icon={faCalendar} className='mx-2' />
                                                End date
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
                                                Upload image
                                            </label>
                                            <input type='file'
                                                className='form-control'
                                                id='image'
                                                onChange={handleFile}
                                            />
                                        </div>
                                        <div className="card">
                                            <img src={state.imageUrl} alt="" className="img-fluid" />
                                        </div>
                                        <p className="text-danger">
                                            {save.imageError}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-6 text-dark">
                                    <div className="my-3">
                                        <div id="float">
                                            <label htmlFor="title" className='Active'>
                                                Content
                                            </label>
                                            <textarea name="" id="content" cols="90" rows="10"
                                                onChange={handleChange}
                                                required={true}
                                                minLength={10}
                                                className="form-control"
                                            >
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
        </div>

    );
}

export default AddNews
