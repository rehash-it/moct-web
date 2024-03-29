import { faComment, faDownload, faPaperclip, faPencilAlt, faTrash, faUserCircle, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import Tree from 'rc-tree'
import React, { useState, useEffect, useRef } from 'react'
import { Progress } from 'reactstrap'
import { file, host } from '../../../config/config'
import { getData, getHeaders } from '../../../config/headers'
import CommentReply from '../../Forum/CommentReply'
import { randomID } from '../../utility/general'
import { addComments, commentsClass, DeleteComments } from './action'
function Comments({ comments, event_id, socket, Forum }) {
    const [state, setState] = useState({
        comment: { value: '', active: '' },
        files: []
    })
    const [loaded, setLoaded] = useState(0)
    const fileBtn = useRef(null)
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
    const handleFile = e => {
        let files = [...e.target.files]
        files.forEach(f =>
            setState(s => ({
                ...s, files: [...s.files, { file: f, id: randomID(), URL: URL.createObjectURL(f) }]
            }))
        )
    }
    const Donothing = () => { }
    const handleSubmit = async e => {
        e.preventDefault()
        try {
            let data = new FormData()
            let creater = sessionStorage.getItem('id')
            const user_name = sessionStorage.getItem('username')
            state.files.length ? state.files.forEach(f => data.append('files', f.file, f.file.name)) : Donothing()
            const req = state.files.length ? await axios.post(host + 'fileupload', data, {
                ...getHeaders(),
                onUploadProgress: ProgressEvent => {
                    setLoaded(ProgressEvent.loaded / ProgressEvent.total * 100)
                }
            }) : ''
            console.log(req)
            if (req ? true : false) {
                let comment = {
                    comment: state.comment.value,
                    creater,
                    user_type: 'admin',
                    user_name,
                    forum_id: Forum._id,
                    reply: false,
                    files: req.data
                }
                saveComment(comment)
            }
            if (!req ? true : false) {
                let comment = {
                    comment: state.comment.value,
                    creater,
                    user_type: 'admin',
                    user_name,
                    forum_id: Forum._id,
                    reply: false
                }
                saveComment(comment)
            }
        }
        catch (err) {
            console.log(err)
        }

    }
    const saveComment = (comment) => {

        addComments(socket, comment)
        setState(s => ({ ...s, comment: { value: '', active: '' }, files: [] }))
    }
    let CommentClass = new commentsClass(comments)
    let Comm = CommentClass.comments()
    const replyComment = comment => setReplyComment(s => ({ ...s, modal: true, comment }))
    const removeFile = File => setState(s => ({ ...s, files: s.files.filter(f => f.id !== File.id) }))

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
                                <div className="row">
                                    {
                                        state.files.map(im =>
                                            <div className="col-lg-3 my-2">
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
                                    {
                                        state.files.length ?
                                            <div className="col-lg-12">
                                                <Progress max="100" color="text-success" value={loaded} >
                                                    {Math.round(loaded, 2)}%
                                                </Progress>
                                            </div> : ''
                                    }
                                </div>
                                <div style={{ display: 'inline-flex', justifyContent: 'end' }}>
                                    <button type='submit' className="d-flex align-items-end btn btn-raise float-right">
                                        comment
                                    </button>
                                    <React.Fragment>
                                        <input
                                            ref={fileBtn}
                                            onChange={handleFile}
                                            type="file"
                                            style={{ display: "none" }}
                                            multiple={true}
                                        />
                                        <button type='button' className='btn btn-raise' onClick={() => fileBtn.current.click()}>
                                            <FontAwesomeIcon icon={faPaperclip} />
                                            Attach files on comment
                                        </button>
                                    </React.Fragment>
                                </div>

                            </form>
                        </div> :
                        ''}
                {/*  end of file*/}
            </div>

        </div>
    )
}

export default Comments
