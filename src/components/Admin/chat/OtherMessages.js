import { faComment, faUserCircle, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function OtherMessages({ connection, message, showVisibility, visibility, setTabs, socket }) {
    const DoNothing = () => { }
    const connect = () => {
        const admin_id = sessionStorage.getItem('id')
        const admin_name = sessionStorage.getItem('username')
        socket ? socket.emit('disMiss', connection.user_id, connection.admin_id) : DoNothing()
        sessionStorage.removeItem('user_id')
        sessionStorage.setItem('user_id', message.user_id)
        socket ? socket.emit('addConn', {
            user_name: message.user_name,
            user_id: message.user_id,
            admin_name: admin_name,
            admin_id: admin_id
        }) : DoNothing()
        socket ? socket.emit('getChat', { user_id: message.user_id, admin_id: admin_id }) : DoNothing()
        setTabs('chatRoom')
        showVisibility(false)
    }
    return (
        visibility ?
            <div id="chat-bot" >

                <div className="icon" onClick={connect} style={{ width: 300 }}>
                    <FontAwesomeIcon icon={faUserCircle} />
                    {message.user_name}........

                    {message.message}
                </div>
                <button className="btn btn-raise" onClick={e => showVisibility(false)}>
                    <FontAwesomeIcon icon={faWindowClose} />
                </button>
            </div> :
            ''
    )
}

export default OtherMessages
