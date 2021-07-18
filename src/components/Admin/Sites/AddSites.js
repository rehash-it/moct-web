import { faMap, faNewspaper, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Progress } from 'reactstrap';
import { file, host } from '../../../config/config';
import { getHeaders } from '../../../config/headers';
import { DotLoading } from '../../layouts/Loading';
import { randomID } from '../../utility/general';

function AddSites({ fetch }) {

    const [modal, setModal] = useState(false);
    const [state, setState] = useState({
        title: { value: '', active: false },
        description: { value: '', active: false },
        images: [],
        location: { value: '', active: false },
        region: { value: '', active: false }
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
        let Images = [...e.target.files]
        let image = Images.filter(f => f.type === 'image/png' || f.type === 'image/jpeg' || f.type === 'image/jpg')
        image.forEach(i =>
            setState(s => ({
                ...s, images: [...s.images, { image: i, id: randomID(), URL: URL.createObjectURL(i) }]
            }))
        )
        setSave({ process: '', error: '', success: '', imageError: '' })

    }
    const handleSubmit = async e => {
        e.preventDefault()
        try {
            if (state.images.length !== 0) {
                var data = new FormData()
                data.append('title', state.title.value)
                data.append('description', state.description.value)
                data.append('region', state.region.value)
                data.append('location', state.location.value)
                state.images.forEach(i => data.append('images', i.image, i.image.name))

                setSave(s => ({ ...s, process: 'saving...', error: '', success: '' }))
                const save = await axios.post(host + 'site', data, {
                    ...getHeaders(),
                    onUploadProgress: ProgressEvent => setLoaded(ProgressEvent.loaded / ProgressEvent.total * 100)
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
    const removeImage = (id) => {
        setState(s => ({ ...s, images: s.images.filter(i => i.id !== id) }))
        setSave({ process: '', error: '', success: '', imageError: '' })
    }
    return (
        <div>
            <Button color='primary' onClick={toggle}>
                Add new Sites
            </Button>
            <Modal isOpen={modal} toggle={toggle} className='' size='xl'>

                <ModalHeader toggle={toggle} className='text-dark'>
                    Add new sites
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
                                                Title
                                            </label>
                                            <input type="text" className='form-control' id='title'
                                                required='true'
                                                maxLength={255}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="my-3">
                                        <label htmlFor="title" className='Active'>
                                            <FontAwesomeIcon icon={faMap} className='mx-2' />
                                            Region
                                        </label>
                                        <div id="float">
                                            <select id="region" required='true' className='form-control' onChange={handleChange}>
                                                <option value=""></option>
                                                <option value="Oromia">Oromia</option>
                                                <option value="Amhara">Amhara</option>
                                                <option value="Sidama">sidama</option>
                                                <option value="Harari">Harari</option>
                                                <option value="Gambela">Gambela</option>
                                                <option value="Afar">Afar</option>
                                                <option value="Snppr">SNPPR</option>
                                                <option value="Diredewa">Diredewa</option>
                                                <option value="Somalia">Somalia</option>
                                                <option value="A.A">Addis Ababa</option>
                                                <option value="Tigrai">Tigrai</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="my-3">
                                        <div id="float-label">
                                            <label htmlFor="title" className={state.location.active}>
                                                <FontAwesomeIcon icon={faMap} className='mx-2' />
                                                Google map location(enter link)
                                            </label>
                                            <input type="text" className='form-control' id='location'
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="my-3">
                                        <div id="float">
                                            <label htmlFor="title" className='Active'>
                                                Description
                                            </label>
                                            <textarea name="" id="description" cols="90" rows="10"
                                                onChange={handleChange}
                                                required={true}
                                                minLength={10}
                                                className="form-control"
                                            >
                                            </textarea>

                                        </div>
                                    </div>

                                </div>
                                <div className="col-lg-6 text-dark">
                                    <div className="my-3">
                                        <div id="float">
                                            <label htmlFor="title" className='Active'>
                                                Upload image
                                            </label>
                                            <input type='file'
                                                className='form-control'
                                                id='image'
                                                multiple
                                                onChange={handleFile}
                                            />
                                            <p className="text-danger">
                                                {save.imageError}
                                            </p>
                                            <div className="gallery my-2" id="gallery" >


                                                {
                                                    state.images.map(im =>
                                                        <div className="mb-3 pics animation all 2 bg-dark" key={im.id}>
                                                            <button className="btn btn-danger" onClick={() => removeImage(im.id)}>
                                                                <FontAwesomeIcon icon={faWindowClose} className='mx-2' />
                                                                {im.image.name}
                                                            </button>
                                                            <img className="img-fluid"
                                                                role="dialog"
                                                                aria-labelledby="myModalLabel"
                                                                aria-hidden="true" tabindex="-1"
                                                                src={im.URL} alt="" />


                                                        </div>

                                                    )
                                                }
                                            </div>

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
        </div >

    );
}

export default AddSites
