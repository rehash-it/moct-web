import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../../context/context'
import { createMessage } from '../../message/message'
import { messageClass } from '../../message/messageClass'
function AdminChat({ user, socket, message, setMessage }) {
    const Message = new messageClass(message, user.userid, user.admin_id)
    const Donothing = () => []
    const [state, setState] = useState({
        message: ''
    })
    useEffect(() => {
        try {
            let id = Message.lastMessage_id()
            let lastPoint = document.getElementById(id)
            lastPoint.scrollIntoView({ behavior: 'auto' })
        }
        catch (err) {

        }
    }, [message])
    const handleSubmit = e => {
        e.preventDefault()
        let mess = [...message, createMessage(state.message, 'admin', 'user', sessionStorage.getItem('id'), user.userid)]
        setMessage(mess)
        socket ? socket.emit('chat', mess) : Donothing()
    }
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 bg-raise" style={{ height: 80 }}>
                        <h1 className="text-center">
                            <FontAwesomeIcon icon={faUserCircle} className='text-white' />
                            {user.username}
                        </h1>
                    </div>
                </div>
            </div>
            <div className="container" style={{ backgroundColor: 'white', height: '80vh', color: 'black', overflow: 'scroll' }}>
                {
                    Message.adminMessage().map(m =>
                        m.sender === 'user' ?
                            <div className="row my-2" key={m.id} id={m.id}>

                                <div className="col-lg-6">
                                    <FontAwesomeIcon icon={faUserCircle} className='fa-3x' />
                                    {m.message}
                                </div>
                                <div className="col-lg-6"></div>
                            </div> :
                            m.sender === 'admin' ?
                                <div className="row my-2" key={m.id} id={m.id}>
                                    <div className="col-lg-6"></div>
                                    <div className="col-lg-6 d-flex justify-content-end">
                                        {m.message}
                                        <FontAwesomeIcon icon={faUserCircle} className='fa-3x' />
                                    </div>
                                </div> :
                                <p></p>
                    )
                }
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12" style={{ backgroundColor: 'white', color: 'black', height: 80 }}>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                className="form-control"
                                onChange={e => setState(s => ({ ...s, message: e.target.value }))}
                                required={true}
                            />
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AdminChat
