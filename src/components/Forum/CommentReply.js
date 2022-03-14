import { faEdit, faPen, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { addComments } from '../Admin/comments/action';
import { randomID } from '../utility/general'

const id = randomID() + 'mocs' + Date.now()

function CommentReply({ modal, setModal, Forum, comment, socket, user_type }) {
    const toggle = () => setModal(s => ({ ...s, modal: false }));
    const [state, setState] = useState({
        comment: { active: '', value: '' }
    })
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
        let creater = localStorage.getItem('user_id')
        const user_name = localStorage.getItem('chatname')
        let Comment = {
            comment: state.comment.value,
            creater,
            user_type: user_type ? user_type : 'user',
            user_name,
            forum_id: Forum._id,
            reply: true,
            reply_id: comment._id
        }
        addComments(socket, Comment)
        setModal(s => ({ ...s, modal: false }))
    }
    return (
        <div>
            <Modal isOpen={modal} toggle={toggle} size='md' style={{ paddingTop: 100 }}>
                <form onSubmit={handleSubmit}>

                    <ModalHeader toggle={toggle} className='text-dark'>
                        <FontAwesomeIcon
                            icon={faPen} className='mx-2' />
                        Reply to comment- {comment.comment}
                    </ModalHeader>
                    <ModalBody>
                        <div id="float-labe">
                            <label htmlFor="title" className={state.comment.active}>
                                <FontAwesomeIcon icon={faEdit} className='mx-2' />
                            </label>
                            <textarea cols="30" rows="10" className='form-control' id='comment'
                                required='true'
                                onChange={handleChange}
                                value={state.comment.value}></textarea>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button type='submit' className="btn btn-raise">
                            Comment
                        </button>
                        {' '}
                    </ModalFooter>
                </form>

            </Modal>
        </div>
    )
}

export default CommentReply
