import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { randomID } from '../utility/general'

const id = randomID() + 'moct' + Date.now()

function SetName({ modal, setModal, setData }) {
    const toggle = () => setModal(!modal);
    const [state, setState] = useState({
        name: { active: '', value: '' }
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
        sessionStorage.setItem('chatname', state.name.value)
        sessionStorage.setItem('user_id', id)
        setData(s => ({
            ...s,
            user_id: { value: id, active: '' },
            name: { value: state.name.value, active: '' }
        }
        ))
        toggle()
    }
    return (
        <div>
            <Modal isOpen={modal} toggle={toggle} size='md' style={{ paddingTop: 200 }}>
                <form onSubmit={handleSubmit}>

                    <ModalHeader toggle={toggle} className='text-dark'>
                        please tell me your name and you can comment
                    </ModalHeader>
                    <ModalBody>
                        <div id="float-label">
                            <label htmlFor="title" className={state.name.active}>
                                <FontAwesomeIcon icon={faUser} className='mx-2' />
                                Name
                            </label>
                            <input type="text" className='form-control' id='name'
                                required={true}
                                onChange={handleChange}
                                value={state.name.value}
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button type='submit' className="btn btn-raise">
                            Set name
                        </button>
                        {' '}
                    </ModalFooter>
                </form>

            </Modal>
        </div>
    )
}

export default SetName
