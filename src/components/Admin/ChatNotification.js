import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { ChatContext, SocketContext } from '../../context/context'
import { faPhone, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import '../../styles/chatNotify.css'
function ChatNotification({ tabs, setTabs, setUser, user }) {
    const { socket } = useContext(SocketContext)

    const [notifcation, showNotification] = useState(true)
    const DoNothing = () => { }
    useEffect(() => {
        socket ?
            socket.on("onConnect", data => {
                setUser(s => ({ ...s, user_id: data.userid, username: data.username }));
                showNotification(true)
            }) :
            DoNothing()
    }, [socket])
    const connect = () => {
        setUser(s => ({ ...s, admin_id: '', admin_name: '' }))
    }
    return (
        <div className="">
            dsfkogvkofdpkvbkp
        </div>
    )
}

export default ChatNotification
