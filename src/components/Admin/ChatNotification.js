import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { ChatContext, SocketContext } from '../../context/context'
import { faPhone, faUserCircle, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import '../../styles/chatNotify.css'
import $ from 'jquery'
import { createMessage } from '../../message/message';

function ChatNotification({ tabs, notifcation, showNotification, setTabs, setUser, user, socket, message, setMessage }) {

    const DoNothing = () => { }
    useEffect(() => {
        $("#chat-bot .icon").toggleClass("expanded");
        setTimeout(() => {
            $("#chat-bot .messenger").toggleClass("expanded");
        }, 100);
    }, [notifcation])

    const connect = () => {
        setUser(s => ({
            ...s,
            admin_id: sessionStorage.getItem('id'),
            admin_name: sessionStorage.getItem('username')
        }))
        socket ? socket.emit("onConnect", {
            ...user,
            admin_id: sessionStorage.getItem('id'),
            admin_name: sessionStorage.getItem('username')
        }) : DoNothing()
        /** id: randomID(),
    message,
    reciever,
    sender,
    date: Date.now(),
    admin_id,
    user_id */
        let mess = message.map(m => {
            return { ...m, admin_id: sessionStorage.getItem('id') }
        })

        setMessage([...mess,
        createMessage('hii, i am ' + sessionStorage.getItem('username') + ' moct admin what can i help u?', 'admin',
            'user',
            sessionStorage.getItem('id'),
            user.userid
        )])
        socket.emit('chat', [...mess,
        createMessage('hii, i am ' + sessionStorage.getItem('username') + ' moct admin what can i help u?',
            'admin',
            'user',
            sessionStorage.getItem('id'),
            user.userid)
        ])
        setTabs('chat')
    }
    return (
        notifcation ?
            <div id="chat-bot" >
                <div className="icon shake" onClick={e => connect()}>
                    <div className="user">
                        <FontAwesomeIcon icon={faPhone} className='mx-2' />
                        {user.username} wants a help please contact to him.
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
