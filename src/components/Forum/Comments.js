import { faComment, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { getData } from '../../config/headers'
import { SocketContext } from '../../context/context'
import { addComments, commentsClass, Donothing } from '../Admin/comments/action'
import SetName from './SetName'
function Comments({ Forum }) {
    const { socket } = useContext(SocketContext)
    const [comments, setComments] = useState([])
    let user_id = sessionStorage.getItem('user_id')
    const name = sessionStorage.getItem('chatname')
    const [state, setState] = useState({
        comment: { value: '', active: '' },
        name: { value: '', active: '' },
        user_id: { value: '', active: '' }
    })
    const [modal, setModal] = useState(false)

    useEffect(() => setState(s => ({
        ...s,
        user_id: { value: user_id, active: '' },
        name: { value: name, active: '' }
    })), [user_id, name])

    useEffect(() => {
        try {
            let Comments = new commentsClass(comments)
            let lastPoint = document.getElementById(Comments.last_comment_id())
            var topPos = lastPoint.offsetTop
            document.getElementById('comment_box').scrollTop = topPos
        }
        catch (err) { }
    }, [comments])

    useEffect(() => {
        if (socket ? true : false) {
            socket.emit('getComment', Forum._id)
            socket.on('comments', data => {
                let check = Forum._id === data.forum_id
                check ? setComments(data.data) : Donothing()
            })
        }
    }, [socket, Forum])

    const handleChange = e => {
        if (state.name.value ? state.user_id.value ? false : true : true) {
            setModal(true)
        }
        else {
            setState(s => ({
                ...s,
                [e.target.id]: {
                    value: e.target.value,
                    active: e.target.value ? 'Active' : ''
                }
            }))
        }

    }
    const handleSubmit = e => {
        e.preventDefault()
        let creater = state.user_id.value
        const user_name = state.name.value
        console.log(user_name)
        let comment = {
            comment: state.comment.value,
            creater, user_type: 'user', user_name, forum_id: Forum._id
        }
        addComments(socket, comment)
        setState(s => ({ ...s, comment: { value: '', active: '' } }))
    }
    console.log(state)
    return (
        <div className="col-lg-12">
            <div className="card bg-dark">
                <div className="card-header bg-dark">
                    <FontAwesomeIcon icon={faComment} className='mx-2' />
                    {comments.length} comments
                    <hr />
                </div>
                <div className="card-body bg-dark" id='comment_box'
                    style={{ height: '60vh', overflow: 'scroll', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
                    {
                        comments.length ?
                            comments.map(c =>
                                <div className="my-2" id={c._id} key={c._id}>
                                    <p>
                                        <FontAwesomeIcon icon={faUserCircle} className='mx-2' />
                                        {c.user_name} <br />
                                        {c.comment}
                                    </p>
                                    <hr />
                                </div>
                            ) :
                            <div className="my-2">
                                <h4 className="tex-center">
                                    No comments yet!
                                </h4>
                            </div>
                    }
                    <SetName setData={setState} setModal={setModal} modal={modal} />
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
                {/* end of content */}
            </div>
        </div>
    )
}

export default Comments
