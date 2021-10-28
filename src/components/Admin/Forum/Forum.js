import { faCircle, faPaperclip } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { BiUserVoice } from 'react-icons/bi'
import ReactTimeAgo from 'react-time-ago/commonjs/ReactTimeAgo'
import { file } from '../../../config/config'
import { DotLoading } from '../../layouts/Loading'
import { tellDate } from '../../utility/Date'
import Comments from '../comments/comments'
import { closeForum } from './actions'

function Forum({ socket, Forum, comments, setTab }) {
    const isLive = Forum.status === 'live' ? true : false
    const [save, setSave] = useState({
        process: '',
        error: '',
        success: '',
        imageError: ''
    })
    console.log(Forum)
    const Closeforum = () => closeForum(setSave, Forum, setTab)
    return (
        <div className="row">
            <div className="col-lg-6">
                <div className="card text-center">
                    <div className="card-header ">
                        <h2 className='text-dark'>
                            {Forum.title}
                        </h2>
                        {
                            Forum.need_comment ?
                                isLive ?
                                    <p className="float-right text-dark">
                                        < FontAwesomeIcon icon={faCircle} className='text-success mx-2' />
                                        The forum is live {Forum.need_comment ? 'comments are turned on' : ''}
                                    </p> :
                                    <p className="float-right text-dark">

                                        The forum is closed <ReactTimeAgo date={Forum.closed_at} />   <br />
                                        {tellDate(Forum.closed_at)}
                                    </p> : ''
                        }
                        <hr />
                    </div>
                    <div className="card-body text-dark">
                        <BiUserVoice className='mx-2' />
                        <p className="indent text-dark h5" style={{ textAlign: 'justify' }}>
                            {Forum.description}
                        </p>
                        <div className="my-2">
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
                        </div>
                    </div>
                    {
                        isLive ?

                            <div className="card-footer float-right">
                                <button className="btn btn-danger" onClick={Closeforum}>
                                    Close this Forum
                                </button>

                            </div> :
                            <div className="card-footer float-left text-dark">
                                totall {comments.length} comments
                            </div>
                    }

                </div>
            </div>
            {
                Forum.need_comment ?
                    <Comments comments={comments} event_id={Forum._id} socket={socket} Forum={Forum} /> :
                    <div className="col-lg-6 my-auto">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="text-center text-dark">
                                    Comments are turned off
                                </h2>
                            </div>
                        </div>
                    </div>
            }
            <div className="col-lg-6">
                <div className="row">
                    <div className="col-lg-12">
                        <h4 className="text-center">Files Attached</h4>
                    </div>
                    {
                        Forum.files.length ?
                            Forum.files.map(c =>
                                <div className="col-lg-6" key={c._id}>
                                    <div className="card">
                                        <div className="card body">
                                            <a href={file + c.url} target="_blank" rel="noreferrer">
                                                {c.type === 'image/jpeg' || c.type === 'image/png' ?
                                                    <img className="img-fluid"
                                                        role="dialog"
                                                        aria-labelledby="myModalLabel"
                                                        aria-hidden="true" tabindex="-1"
                                                        src={file + c.url} alt="" /> :
                                                    <div className="img-fluid text-dark">
                                                        <h5>
                                                            <FontAwesomeIcon icon={faPaperclip} className='mx-2 text-dark' />
                                                            {c.name}
                                                        </h5>
                                                    </div>
                                                }
                                            </a>
                                        </div>
                                    </div>
                                </div>) :
                            <div className="col lg-12">
                                <h4 className="text-center text-danger">
                                    <FontAwesomeIcon icon={faPaperclip} className='text-white' />
                                    No files attachced
                                </h4>
                            </div>
                    }
                </div>
            </div>
        </div >
    )
}

export default Forum
