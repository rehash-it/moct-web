import { faComment, faPaperclip, faTrash, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react'
import { getData } from '../../../config/headers'
import { addComments, commentsClass, DeleteComments } from './action'
function Comments({ comments, event_id, socket, Forum }) {
    const [state, setState] = useState({
        comment: { value: '', active: '' }
    })
    let Comments = new commentsClass(comments)
    useEffect(() => {
        try {
            let Comments = new commentsClass(comments)
            let lastPoint = document.getElementById(Comments.last_comment_id())
            lastPoint.scrollIntoView({ behavior: 'auto' })
        }
        catch (err) {

        }
    }, [comments])
    const handleChange = e => {
        setState(s => ({
            ...s,
            [e.target.id]: {
                value: e.target.value,
                active: e.target.value ? 'Active' : ''
            }
        }))
    }
    const handleSubmit = e => {
        e.preventDefault()
        let creater = sessionStorage.getItem('id')
        const user_name = sessionStorage.getItem('username')
        let comment = { ...getData(state), creater, user_type: 'admin', user_name, forum_id: event_id, reply: false }
        addComments(socket, comment)
        setState(s => ({ ...s, comment: { value: '', active: '' } }))
    }
    return (
        <div className="col-lg-6">
            <div className="card bg-dark">
                <div className="card-header bg-dark text-white">
                    <FontAwesomeIcon icon={faComment} className='mx-2' />
                    comments
                    <hr />
                </div>
                <div className="card-body bg-dark"
                    style={{ height: '60vh', overflow: 'scroll', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
                    {
                        comments.length ?
                            comments.map(c =>
                                <div className="my-2" id={c._id} key={c._id}>
                                    <p className='text-white'>
                                        <FontAwesomeIcon icon={faUserCircle} className='mx-2 text-white' />
                                        {c.user_name} <br />
                                        {c.comment}
                                    </p>
                                    <div className="d-flex justify-content-end">
                                        <button className="btn btn-outline-danger"
                                            onClick={() => DeleteComments(socket, c)}>
                                            <FontAwesomeIcon icon={faTrash} className='mx-2' />
                                        </button>

                                    </div>
                                    <hr />
                                </div>
                            ) :
                            <div className="my-2">
                                <h4 className="tex-center text-white">
                                    No comments yet!
                                </h4>
                            </div>
                    }
                </div>
                {
                    Forum.status !== 'closed' ?
                        <div className="card-footer">
                            <form onSubmit={handleSubmit}>
                                <div id="float-label">
                                    <label htmlFor="title" className={state.comment.active}>
                                        <FontAwesomeIcon icon={faComment} className='mx-2' />
                                        comment
                                    </label>
                                    <input type="text" className='form-control' id='comment'
                                        required='true'
                                        onChange={handleChange}
                                        value={state.comment.value}
                                    />
                                </div>
                            </form>
                        </div> :
                        ''}
                {/*  */}
            </div>

        </div>
    )
}

export default Comments
