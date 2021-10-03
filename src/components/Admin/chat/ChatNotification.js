import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { faPhone, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery'
import { createMessage } from '../../../message/message';
import '../../../styles/chatNotify.css'
function ChatNotification({ call, notifcation, showNotification, setTabs, socket }) {

    const DoNothing = () => { }
    useEffect(() => {
        $("#chat-bot .icon").toggleClass("expanded");
        setTimeout(() => {
            $("#chat-bot .messenger").toggleClass("expanded");
        }, 100);
    }, [notifcation])

    const connect = () => {
        const { message } = call
        const admin_id = sessionStorage.getItem('id')
        const admin_name = sessionStorage.getItem('username')
        sessionStorage.removeItem('user_id')
        sessionStorage.setItem('user_id', call.user_id)
        socket ? socket.emit('addConn', {
            user_name: call.user_name,
            user_id: call.user_id,
            admin_name: admin_name,
            admin_id: admin_id
        }) : DoNothing()
        socket ? socket.emit('saveMessage',
            [
                createMessage('Hello, i am ' + admin_name + ' what can i help you?', 'admin', 'user', admin_id, call.user_id, admin_name, call.user_name, false),
                createMessage(message, 'user', 'admin', admin_id, call.user_id, admin_name, call.user_name, false)
            ])
            : DoNothing()
        setTabs('chatRoom')
    }
    return (
        notifcation ?
            <div id="chat-bot" >
                <div className="icon shake" onClick={connect}>
                    <div className="user">
                        <FontAwesomeIcon icon={faPhone} className='mx-2' />
                        {call.user_name} wants a help please contact to him.
                    </div>


                </div>
                <button className="btn btn-raise" onClick={e => showNotification(false)}>
                    <FontAwesomeIcon icon={faWindowClose} />
                </button>
            </div>
            :
            <p style={{ display: 'none' }}></p>
    )
}

export default ChatNotification
