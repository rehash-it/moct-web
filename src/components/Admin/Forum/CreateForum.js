import { faHeading } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import React, { useState } from 'react'
import Switch from "react-switch";
import { Button } from 'reactstrap';
import { host } from '../../../config/config';
import { getData, getHeaders } from '../../../config/headers';
import { DotLoading } from '../../layouts/Loading';

function CreateForum({ setTab, setForum, socket, Forum }) {
    const [state, setState] = useState({
        title: { value: '', active: '' },
        description: { value: '', active: '' },
        need_comment: { value: true, active: '' }
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
    const handleSubmit = async e => {
        try {
            e.preventDefault()
            setSave(s => ({ ...s, process: 'saving...', error: '', success: '' }))
            let creater = sessionStorage.getItem('id')
            let forum = { ...getData(state), creater, status: state.need_comment.value ? 'live' : 'closed' }
            const req = await axios.post(host + 'forum', forum, getHeaders())
            if (req.status === 200) {
                setSave(s => ({ ...s, process: '', error: '', success: 'Saved successfully!' }))
                sessionStorage.setItem('forum_id', req.data._id)
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
    return (
        <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-6">
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
                    {/* comments */}
                    <div className="my-3">
                        comments {' '}
                        <Switch
                            onChange={e => setState(s => ({ ...s, need_comment: { value: e, active: '' } }))}
                            checked={state.need_comment.value} />
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
            <div className="col-lg-3"></div>
        </div>
    )
}

export default CreateForum
