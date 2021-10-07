import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { BiUserVoice } from 'react-icons/bi'
import ReactTimeAgo from 'react-time-ago/commonjs/ReactTimeAgo'
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
        </div >
    )
}

export default Forum
