import { faFile, faHeading, faPaperclip, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import React, { useState } from 'react'
import Switch from "react-switch";
import { Button, Progress } from 'reactstrap';
import { file, host } from '../../../config/config';
import { getData, getHeaders } from '../../../config/headers';
import { DotLoading } from '../../layouts/Loading';
import { randomID } from '../../utility/general';

function CreateForum({ setTab, setForum, socket, Forum }) {
    const [state, setState] = useState({
        title: { value: '', active: '' },
        description: { value: '', active: '' },
        need_comment: { value: true, active: '' },
        type: { value: '', active: '' },
        files: []
    })
    const [save, setSave] = useState({
        process: '',
        error: '',
        success: '',
        imageError: ''
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
    const Donothing = () => { }
    const [loaded, setLoaded] = useState(0)
    const handleSubmit = async e => {
        try {
            e.preventDefault()
            setSave(s => ({ ...s, process: 'saving...', error: '', success: '' }))
            let creater = sessionStorage.getItem('id')
            let data = new FormData()
            data.append('title', state.title.value)
            data.append('description', state.description.value)
            data.append('need_comment', state.need_comment.value)
            data.append('type', state.type.value)
            data.append('creater', creater)
            state.files.forEach(f => data.append('files', f.file, f.file.name))
            const req = await axios.post(host + 'forum', data, {
                ...getHeaders(),
                onUploadProgress: ProgressEvent => {
                    setLoaded(ProgressEvent.loaded / ProgressEvent.total * 100)
                    setSave(s => ({ ...s, process: 'uploading files.....', error: '', success: '' }))
                }
            })
            if (req.status === 200) {
                setSave(s => ({ ...s, process: '', error: '', success: 'Saved successfully!' }))
                sessionStorage.setItem('forum_id', req.data._id)
                console.log(req)
                setForum(req.data)
                socket ? socket.emit('getComment', req.data._id) : Donothing()
                setTab('forum')
            }
        }
        catch (err) {
            console.log(err)
            setSave(s => ({ ...s, process: '', error: 'can not save data internal server error', success: '' }))
        }
    }

    const handleFile = e => {
        let files = [...e.target.files]
        files.forEach(f =>
            setState(s => ({
                ...s, files: [...s.files, { file: f, id: randomID(), URL: URL.createObjectURL(f) }]
            }))
        )
        setSave({ process: '', error: '', success: '', imageError: '' })
    }
    const removeFile = File => setState(s => ({ ...s, files: s.files.filter(f => f.id !== File.id) }))
    return (
        <div className="row">
            <div className="col-lg-2"></div>
            <div className="col-lg-5">
                <form onSubmit={handleSubmit}>
                    <div className="my-3">
                        <div id="float-label">
                            <label htmlFor="title" className={state.title.active}>
                                <FontAwesomeIcon icon={faHeading} className='mx-2' />
                                Forum Title
                            </label>
                            <input type="text" className='form-control' id='title'
                                required='true'
                                minLength={5}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    {/* type */}
                    <div className="my-3">
                        <div id="float-label">
                            <label htmlFor="title" className={state.type.active}>
                                Forum type
                            </label>
                            <input type="text" className='form-control' id='type'
                                required='true'
                                minLength={5}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    {/*Description  */}
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
                    {/*Description  */}
                    <div className="my-3">
                        <div id="float">
                            <label htmlFor="file" className='Active'>

                                Attach files
                            </label>
                            <input type="file" name="" id="file" className="form-control" multiple onChange={handleFile} />
                        </div>
                    </div>


                    {/* comments */}
                    <div className="my-3">
                        comments {' '}
                        <Switch
                            onChange={e => setState(s => ({ ...s, need_comment: { value: e, active: '' } }))}
                            checked={state.need_comment.value} />
                    </div>
                    <div className="my-3">
                        <Progress max="100" color="text-success" value={loaded} >
                            {Math.round(loaded, 2)}%
                        </Progress>
                    </div>
                    <div className="my-3 text-center">
                        {save.process ?
                            <div className="d-flex justify-content-center">
                                <DotLoading />
                                <p className='text-white'>{save.process}</p>
                            </div> :
                            <p></p>
                        }
                        <p className="text-center text-success">
                            {save.success}
                        </p>
                        <p className="text-center text-danger">
                            {save.error}
                        </p>

                        <Button color="primary" type='submit' >
                            Create
                        </Button>
                    </div>
                </form>
            </div>
            <div className="col-lg-5">
                <div className="row">
                    {
                        state.files.map(im =>
                            <div className="col-lg-5 my-2">
                                <div className="card">
                                    <div className="card-header">
                                        <button className="btn btn-danger float-right" type='button' onClick={() => removeFile(im)}>
                                            <FontAwesomeIcon icon={faWindowClose} className='text-white' />
                                        </button>
                                    </div>
                                    <div className="car-body">
                                        <a href={im.URL} target="_blank" rel="noreferrer">
                                            {im.file.type === 'image/jpeg' || im.file.type === 'image/png' ?
                                                <img className="img-fluid"
                                                    role="dialog"
                                                    aria-labelledby="myModalLabel"
                                                    aria-hidden="true" tabindex="-1"
                                                    src={im.URL} alt="" /> :
                                                <div className="img-fluid text-dark">
                                                    <h5>
                                                        <FontAwesomeIcon icon={faPaperclip} className='mx-2 text-dark' />
                                                        {im.file.name}
                                                    </h5>
                                                </div>
                                            }
                                        </a>
                                    </div>

                                </div>
                            </div>
                        )}
                </div>
            </div>
        </div>
    )
}

export default CreateForum
