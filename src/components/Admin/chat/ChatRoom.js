import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { createMessage } from '../../../message/message'
import { messageClass } from '../../../message/messageClass'
function ChatRoom({ connection, socket, message }) {
    const Donothing = () => []
    const [state, setState] = useState({
        message: ''
    })
    const Message = new messageClass(message, connection.user_id, connection.admin_id)
    let id = Message.lastMessage_id()
    useEffect(() => {
        try {
            let lastPoint = document.getElementById(id)
            lastPoint.scrollIntoView({ behavior: 'auto' })

        }
        catch (err) {

        }

    }, [id])
    console.log(connection)
    useEffect(() => {
        return () => socket ? socket.emit('disMiss', connection.user_id, connection.admin_id) : Donothing()
    })

    const handleSubmit = e => {
        e.preventDefault()
        socket ? socket.emit('saveMessage', [createMessage(state.message,
            'admin', 'user',
            connection.admin_id,
            connection.user_id,
            connection.admin_name,
            connection.user_name,
            false)]) : Donothing()
        setState(s => ({ ...s, message: '' }))
    }
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 bg-raise" style={{ height: 80 }}>
                        <h1 className="text-center">
                            <FontAwesomeIcon icon={faUserCircle} className='text-white' />
                            {connection.user_name}
                        </h1>
                    </div>
                </div>
            </div>
            <div className="container" style={{ backgroundColor: 'white', height: '80vh', color: 'black', overflow: 'scroll' }}>
                {
                    Message.adminMessage().map(m =>
                        m.sender === 'user' ?
                            <div className="row my-2" key={m._id ? m._id : m.id} id={m._id ? m._id : m.id}>

                                <div className="col-lg-6">
                                    <FontAwesomeIcon icon={faUserCircle} className='fa-3x' />
                                    {m.message}
                                </div>
                                <div className="col-lg-6"></div>
                            </div> :
                            m.sender === 'admin' ?
                                <div className="row my-2" key={m._id ? m._id : m.id} id={m._id ? m._id : m.id}>
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
                                value={state.message}
                            />
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ChatRoom
