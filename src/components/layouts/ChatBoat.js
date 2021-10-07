import React, { useContext, useEffect, useState } from 'react'
import '../../styles/chatBoat.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { LanguageContext, SocketContext } from '../../context/context';
import { randomID } from '../utility/general';
import { localTime } from '../utility/Date';
import { createMessage } from '../../message/message';
import { messageClass } from '../../message/messageClass';
import $ from 'jquery'
const id = randomID() + 'moct' + Date.now()

function ChatBoat({ location }) {
    let chat_bot = $("#chat-bot .icon")
    let chat_bot_messenger = $("#chat-bot .messenger")
    useEffect(() => {
        $("#chat-bot .icon").on('click', () => {
            $("#chat-bot .icon").toggleClass("expanded");
            setTimeout(() => {
                $("#chat-bot .messenger").toggleClass("expanded");
            }, 100);
        })
    }, [chat_bot, location, chat_bot_messenger])
    const { t } = useContext(LanguageContext)
    /**socket io */
    const { socket } = useContext(SocketContext)
    const [state, setState] = useState({
        chatname: '',
        user_id: '',
        loading: true,
        connected: false,
        message: '',
        inputField: true
    })
    const [connection, setConnection] = useState({
        user_name: '',
        user_id: '',
        admin_id: '',
        status: '',
        connected_time: '',
        disconnected_time: ''
    })
    const [message, setMessage] = useState([])
    const Message = new messageClass(message, state.user_id, connection.admin_id)
    let last_id = Message.lastMessage_id()

    const Donothing = () => { }
    const name = sessionStorage.getItem('chatname')

    useEffect(() => {
        let user_id = sessionStorage.getItem('user_id')
        if (user_id ? true : false) {
            setState(s => ({ ...s, chatname: name, user_id, loading: false, }))
        }
        else {
            sessionStorage.setItem('user_id', id)
            setState(s => ({ ...s, chatname: name, user_id: id, loading: false }))
        }

    }, [name])

    /***for socket */
    useEffect(() => {
        socket ? socket.on('conn', data => {
            let connected = data.user_id === state.user_id && data.user_name === state.chatname
            if (connected) {
                sessionStorage.removeItem('admin_id')
                sessionStorage.setItem('admin_id', data.admin_id)
                setConnection(s => ({ ...data }))
                setState(s => ({ ...s, inputField: true }))
            }
        }) : Donothing()
        socket ? socket.on('chat', data => {
            let admin_id = sessionStorage.getItem('admin_id')
            let check = (data.admin_id === admin_id) && (data.user_id === state.user_id)
            let Mess = []
            data.message.forEach(d => {
                let add = (d.admin_id === admin_id) && (d.user_id === state.user_id)
                add ? Mess.push(d) : Donothing()
            })
            check ? setMessage(Mess) : Donothing()
        }) : Donothing()

        return (() => {
            let admin_id = sessionStorage.getItem('admin_id')
            socket ? socket.emit('disMiss', state.user_id, admin_id) : Donothing()
        })
    }, [socket, state])
    /**for scroll */
    useEffect(() => {
        try {
            let lastPoint = document.getElementById(last_id)
            lastPoint.scrollIntoView({ behavior: 'auto' })
        }
        catch (err) {

        }
    }, [last_id])


    const setName = chatname => {
        setState(s => ({ ...s, chatname }))
        sessionStorage.setItem('chatname', chatname)
        sessionStorage.setItem('user_id', state.user_id)
    }


    const handleSubmit = e => {
        e.preventDefault()
        !state.chatname ? setName(state.message) : Donothing()
        if (connection.status !== 'connected') {
            socket ? socket.emit('call', {
                user_name: !state.chatname ? state.message : state.chatname,
                user_id: state.user_id,
                admin_id: '',
                admin_name: '',
                message: state.message
            }) : Donothing()
            setMessage(s => ([
                ...s,
                createMessage(
                    state.message,
                    'user',
                    'admin',
                    connection.admin_id,
                    state.user_id,
                    connection.admin_id,
                    state.chatname,
                    true),
                createMessage(
                    'connecting to admin please wait',
                    'admin',
                    'user',
                    connection.admin_id,
                    state.user_id,
                    connection.admin_id,
                    state.chatname,
                    true)

            ]))

            setState(s => ({
                ...s,
                inputField: false
            }))
        }
        else if (connection.status === 'connected') {
            socket ? socket.emit('saveMessage', [createMessage(state.message,
                'user', 'admin',
                connection.admin_id,
                connection.user_id,
                connection.admin_name,
                connection.user_name,
                false)]) : Donothing()
        }
        setState(s => ({ ...s, message: '' }))
    }
    return (
        <div id="chat-bot">
            <div className="messenger br10">
                <div className="timestamp">{localTime(Date.now())}</div>
                <div className="chatroom">
                    {/* <div className="msg msg-right" key={m.id} id={m.id}>
                                        <div className="bubble">
                                            <h6 className="name">{state.chatname}</h6>
                                            {m.message}
                                        </div>
                                    </div> */}
                    {/* <!-- msgs  --> */}
                    {
                        !state.loading && !state.chatname ?

                            <div className="msg msg-left">
                                <div className="bubble">
                                    <h6 className="name">{t('Moct')}</h6>
                                    {t('Hello, I am a  Moct chatbot')}, <br />
                                    {t('can tell me your name')} ?
                                </div>
                            </div> :
                            <div className="msg msg-left">
                                <div className="bubble">
                                    <h6 className="name">{t('Moct')}</h6>
                                    {t('Hello, I am a  Moct chat bot')}, <br />
                                    what can i help you {state.chatname} ?
                                </div>
                            </div>
                    }
                    {
                        Message.userMessage().map(m =>
                            m.sender === 'user' ?
                                <div className="msg msg-right" key={m._id ? m._id : m.id} id={m._id ? m._id : m.id}>
                                    <div className="bubble">
                                        <h6 className="name">{state.chatname}</h6>
                                        {m.message}
                                    </div>
                                </div> :
                                m.sender === 'admin' ?
                                    <div className="msg msg-left" key={m._id ? m._id : m.id} id={m._id ? m._id : m.id}>
                                        <div className="bubble">
                                            <h6 className="name">Moct</h6>
                                            {m.message}
                                        </div>
                                    </div> : ''

                        )
                    }
                    {/* <!-- msgs  --> */}
                </div>
                <div className="type-area">
                    <form onSubmit={handleSubmit}>
                        {
                            state.inputField ?
                                <input type="text"
                                    className="typing"
                                    placeholder={t("type and hit enter")}
                                    value={state.message}
                                    required={true}
                                    onChange={e => setState(s => ({ ...s, message: e.target.value }))}
                                /> : ''
                        }
                    </form>
                    <span className="send">
                        <i className="bi bi-arrow-return-left"></i>
                    </span>
                </div>
            </div>
            <div className="icon">
                <div className="user">
                    <FontAwesomeIcon icon={faUserCircle} className='mr-2' />
                    {t('what can i help you?')}
                </div>
                <FontAwesomeIcon icon={faEnvelope} />
            </div>
        </div>
    )
}

export default ChatBoat
