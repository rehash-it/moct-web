import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Progress } from 'reactstrap';
import { file, host } from '../../../config/config';
import { getHeaders } from '../../../config/headers';
import { DotLoading } from '../../layouts/Loading';
import { Disperse, removeItem } from '../Controller';
import { blobCreationFromURL, getFileName } from '../../utility/file';
import { Button } from '@material-ui/core';

function EditDocs({ fetch, docs }) {
    const [state, setState] = useState({
        title: { value: '', active: false },
        description: { value: '', active: false },
        file: { value: {}, name: '' },
    })
    useEffect(() => {
        setState({
            ...removeItem(Disperse(docs)),
            file: {
                value: blobCreationFromURL(file + docs.file),
                name: getFileName(docs.file)
            }
        })
    }, [docs])
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
        let file = e.target.files[0]
        setState(s => ({ ...s, file: { value: file, name: file.name } }))
        setSave({ process: '', error: '', success: '' })
    }
    const handleSubmit = async e => {
        e.preventDefault()
        try {
            var data = new FormData()
            data.append('file', state.file.value, state.file.name)
            data.append('title', state.title.value)
            data.append('description', state.description.value)
            setSave({ process: 'saving...', error: '', success: '' })
            const save = await axios.put(host + 'docs/' + docs._id, data, {
                ...getHeaders(),
                onUploadProgress: ProgressEvent =>
                    setLoaded(ProgressEvent.loaded / ProgressEvent.total * 100)
            })
            console.log(save)
            if (save.status === 200) {
                setSave({ process: '', error: '', success: 'saved successfully' })
                setTimeout(() => fetch(), 1000)
            }
            else {
                setSave({ process: '', error: 'can not save data internal server error', success: '' })
            }
        }
        catch (err) {
            console.log(err)
            setSave({ process: '', error: 'can not save data internal server error', success: '' })
        }
    }
    const toggle = () => setModal(!modal);
    return (
        <div>
            <Button color='primary' variant="contained" onClick={toggle} style={{margin: 4}} startIcon={<FontAwesomeIcon icon={faPencilAlt}/>}>
                Edit
            </Button>
            <Modal isOpen={modal} toggle={toggle} className='' size='lg'>

                <ModalHeader toggle={toggle} className='text-dark'>
                    Add new Docs
                </ModalHeader>
                <form onSubmit={handleSubmit}>
                    <ModalBody>

                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 text-dark">
                                    <div className="my-3">
                                        <div id="float-label">
                                            <label htmlFor="title" className={state.title.active}>
                                                Docs Title
                                            </label>
                                            <input type="text" className='form-control' id='title'
                                                required='true'
                                                minLength={5}
                                                maxLength={255}
                                                value={state.title.value}
                                                onChange={handleChange}
                                            />
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
                                    <p className="text-center">
                                        Attached file name-{state.file.name}
                                    </p>
                                    <Progress max="100" color="text-success" value={loaded} >
                                        {Math.round(loaded, 2)}%
                                    </Progress>
                                </div>
                                <div className="col-lg-6 text-dark">
                                    <div className="my-3">
                                        <div id="float">
                                            <label htmlFor="title" className='Active'>
                                                Description
                                            </label>
                                            <textarea name="" id="description" cols="90" rows="10"
                                                onChange={handleChange}
                                                required={true}
                                                minLength={10}
                                                value={state.description.value}
                                                className="form-control"
                                            >
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

                        <Button color="primary" type='submit' variant='contained' >Submit</Button>
                    </ModalFooter>
                </form>
            </Modal>
        </div>

    )
}

export default EditDocs
