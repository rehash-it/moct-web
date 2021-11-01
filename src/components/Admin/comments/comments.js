import { faComment, faDownload, faPaperclip, faPencilAlt, faTrash, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tree from 'rc-tree'
import React, { useState, useEffect, useRef } from 'react'
import { file } from '../../../config/config'
import { getData } from '../../../config/headers'
import CommentReply from '../../Forum/CommentReply'
import { addComments, commentsClass, DeleteComments } from './action'
function Comments({ comments, event_id, socket, Forum }) {
    const [state, setState] = useState({
        comment: { value: '', active: '' }
    })
    const treeRef = useRef(null)
    const [ReplyComment, setReplyComment] = useState({
        modal: false,
        comment: ''
    })
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
    let CommentClass = new commentsClass(comments)
    let Comm = CommentClass.comments()
    const replyComment = comment => setReplyComment(s => ({ ...s, modal: true, comment }))


    return (
        <div className="col-lg-6">
            <div className="card">
                <div className="card-header  text-dark">
                    <FontAwesomeIcon icon={faComment} className='mx-2' />
                    comments
                    <hr />
                </div>
                <div className="card-body" id='comment_box'
                    style={{ height: '60vh', overflow: 'scroll', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
                    {
                        comments.length ?
                            <Tree
                                ref={treeRef}

                                defaultExpandAll={true}
                                treeData={Comm}
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
                                                {
                                                    c.files ? c.files.map(f =>
                                                        <div className="col-lg-6 my-2">
                                                            <div className="card" style={{ height: 200 }}
                                                                onClick={() => window.open(file + f.url, '_blank')} >
                                                                <a href={file + f.url} target="_blank" rel="noreferrer">
                                                                    {f.type === 'image/jpeg' || f.type === 'image/png' ?
                                                                        <img className="img-fluid"
                                                                            role="dialog"
                                                                            aria-labelledby="myModalLabel"
                                                                            aria-hidden="true" tabindex="-1"
                                                                            style={{ objectFit: 'cover', width: '100%', height: 200 }}
                                                                            src={file + f.url} alt="" /> :
                                                                        <div className="img-fluid text-dark">
                                                                            <h6>
                                                                                <FontAwesomeIcon icon={faPaperclip} className='mx-2 text-dark fa-2x' />
                                                                                {f.name}
                                                                            </h6>
                                                                            <h6 className="text-center">
                                                                                {f.type}
                                                                                <FontAwesomeIcon icon={faDownload} className='mx-2' />
                                                                            </h6>
                                                                        </div>
                                                                    }
                                                                </a>
                                                            </div>
                                                        </div>
                                                    ) : ''
                                                }
                                                <button className="btn btn-danger" onClick={() => DeleteComments(socket, c)}>
                                                    <FontAwesomeIcon icon={faTrash} className='fa-2x' />
                                                </button>
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

                </div>
                <CommentReply
                    modal={ReplyComment.modal}
                    comment={ReplyComment.comment}
                    Forum={Forum}
                    setModal={setReplyComment}
                    socket={socket}
                    user_type="admin"
                />
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
