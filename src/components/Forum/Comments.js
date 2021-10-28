import { faComment, faEdit, faPencilAlt, faUpload, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { SocketContext } from '../../context/context'
import { addComments, commentsClass, Donothing, motion } from '../Admin/comments/action'
import CommentReply from './CommentReply'
import SetName from './SetName'
import Tree from 'rc-tree';

function Comments({ Forum }) {
    const { socket } = useContext(SocketContext)
    const [comments, setComments] = useState([])
    let user_id = localStorage.getItem('user_id')
    const name = localStorage.getItem('chatname')
    const [state, setState] = useState({
        comment: { value: '', active: '' },
        name: { value: '', active: '' },
        user_id: { value: '', active: '' }
    })
    const fileBtn = useRef(null)
    const treeRef = React.useRef();
    //modal for sate name
    const [modal, setModal] = useState(false)
    //modal for reply name
    const [ReplyComment, setReplyComment] = useState({
        modal: false,
        comment: ''
    })
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
        let comment = {
            comment: state.comment.value,
            creater,
            user_type: 'user',
            user_name,
            forum_id: Forum._id,
            reply: false
        }
        addComments(socket, comment)
        setState(s => ({ ...s, comment: { value: '', active: '' } }))
    }
    const replyComment = comment => {
        if (name ? true : false) {
            setReplyComment(s => ({ ...s, modal: true, comment }))
        }
        else {
            setModal(true)
        }
    }
    let CommentClass = new commentsClass(comments)
    let Comments = CommentClass.comments()
    console.log(Comments)
    const handleFileUpload = file => {

    }
    return (
        <div className="col-lg-12">
            <div className="card">
                <div className="card-header text-dark">
                    <FontAwesomeIcon icon={faComment} className='mx-2 text-dark' />
                    {comments.length} comments
                    <hr />
                </div>
                <div className="card-body" id='comment_box'
                    style={{ height: '60vh', overflow: 'scroll', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
                    {
                        comments.length ?
                            <Tree
                                ref={treeRef}
                                // defaultExpandAll={false}
                                defaultExpandAll
                                treeData={Comments}
                                titleRender={props => {
                                    let c = CommentClass.find_comment(props._id);
                                    return (
                                        c ?
                                            <div className="row my-2" id={c._id} style={{ marginLeft: c.reply ? 40 : 0 }}>
                                                <p className='my-auto'>
                                                    <FontAwesomeIcon icon={faUserCircle} className='mx-2' />
                                                    {c.user_name}
                                                    {
                                                        c.reply ?
                                                            CommentClass.find_comment(c.reply_id) ?
                                                                '       -Reply to comment - ' + CommentClass.find_comment(c.reply_id).comment
                                                                : ""
                                                            : ''
                                                    }
                                                </p>
                                                <p className='indent text-dark my-auto ' style={{ display: 'inline-flex' }}>
                                                    {c.comment}
                                                    <button className="btn" onClick={() => replyComment(c)}>
                                                        <FontAwesomeIcon icon={faPencilAlt} />
                                                        Reply

                                                    </button>

                                                </p>
                                                {!props.children.length ? <hr /> : ''}

                                            </div>
                                            : '')
                                }}
                            />
                            :
                            <div className="my-2">
                                <h4 className="tex-center text-white">
                                    No comments yet!
                                </h4>
                            </div>
                    }
                    <SetName setData={setState} setModal={setModal} modal={modal} />
                    <CommentReply
                        modal={ReplyComment.modal}
                        comment={ReplyComment.comment}
                        Forum={Forum}
                        setModal={setReplyComment}
                        socket={socket}
                    />
                </div>
                {
                    Forum.status !== 'closed' ?
                        <div className="card-footer">
                            <form onSubmit={handleSubmit}>
                                <div id="float-labe">
                                    <label htmlFor="title" >
                                        <FontAwesomeIcon icon={faComment} className='mx-2' />
                                        comment
                                    </label>
                                    <textarea cols="30" rows="10" className='form-control' id='comment'
                                        required='true'
                                        onChange={handleChange}
                                        value={state.comment.value}>
                                    </textarea>

                                </div>
                                <div style={{ display: 'inline-flex', justifyContent: 'end' }}>
                                    <button type='submit' className="d-flex align-items-end btn btn-raise float-right">
                                        comment
                                    </button>
                                    <React.Fragment>
                                        <input
                                            ref={fileBtn}
                                            onChange={handleFileUpload}
                                            type="file"
                                            style={{ display: "none" }}
                                        // multiple={false}
                                        />
                                        <button type='btn btn-raise' onClick={() => fileBtn.current.click()}>
                                            <FontAwesomeIcon icon={faUpload} />
                                        </button>
                                    </React.Fragment>
                                </div>

                            </form>
                        </div> :
                        ''}
                {/*  */}
            </div>
        </div >
    )
}

export default Comments
