import React, { useContext, useEffect, useState } from 'react'
import '../../styles/chatBoat.css'
import $ from 'jquery'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { LanguageContext, SocketContext } from '../../context/context';
import { webSocket } from '../../socket';
import { randomID } from '../utility/general';
import { localTime } from '../utility/Date';
import { connectUserName, createMessage } from '../../message/message';
import { withRouter } from 'react-router-dom';
import { messageClass } from '../../message/messageClass';
const id = randomID() + Date.now()

function ChatBoat({ location }) {
    useEffect(() => {
        $("#chat-bot .icon").on('click', () => {
            $("#chat-bot .icon").toggleClass("expanded");
            setTimeout(() => {
                $("#chat-bot .messenger").toggleClass("expanded");
            }, 100);
        })
        setSocket(webSocket)
    }, [$("#chat-bot .icon")])

    const { t } = useContext(LanguageContext)
    /**socket io */
    const { socket, setSocket } = useContext(SocketContext)
    const [state, setState] = useState({
        chatname: '',
        loading: true,
        connected: false,
        message: '',
        inputField: true,
        show: false
    })
    const [user, setUser] = useState({
        user_id: '',
        admin_id: ''
    })
    const Donothing = () => { }
    const [message, setMessage] = useState([])
    const Message = new messageClass(message, id, user.admin_id)
    const name = localStorage.getItem('chatname')

    useEffect(() => {
        setState(s => ({
            ...s,
            chatname: name,
            loading: false,
            connected: false,
            show: (location.pathname !== '/login' && location.pathname !== '/admin')
        }))
    }, [name, location])
    useEffect(() => {
        socket ? socket.on("onConnect", data => {
            const show = data.username ? data.admin_id ? true : false : false
            setState(s => ({ ...s, inputField: show, connected: true }))
            setUser({ admin_id: data.admin_id, user_id: data.user_id })
        }) : Donothing()
        socket ? socket.on('getChat', data => data.user_id === id ? socket.emit('chat', message) : Donothing()) : Donothing()
        socket ? socket.on('chat', data => setMessage(data.message)) : Donothing()
    }, [socket])
    useEffect(() => {
        try {
            let mid = Message.lastMessage_id()
            let lastPoint = document.getElementById(mid)
            lastPoint.scrollIntoView({ behavior: 'auto' })
        }
        catch (err) {

        }
    }, [message])
    const setName = chatname => {
        setState(s => ({ ...s, chatname, loading: false, inputField: false }))
        setMessage(s => ([...s, createMessage(chatname, 'user', 'admin', user.admin_id, id),
        createMessage('connecting to an admin, please wait...', 'admin', 'user', user.admin_id, id)
        ]))
        localStorage.setItem('chatname', chatname)
    }
    const reConnect = () => socket ? socket.emit('onConnect', connectUserName(id, state.chatname)) : Donothing()


    const handleSubmit = e => {
        e.preventDefault()
        /** */
        state.chatname ? state.connected ? setMessage(s => ([...s,
        createMessage(state.message, 'user', 'admin', user.admin_id, id)])) :
            setMessage(s => ([
                ...s,
                createMessage(state.message, 'user', 'admin', user.admin_id, id),
                createMessage('connecting to an admin, please wait...', 'admin', 'user', user.admin_id, id)
            ])) :
            setName(state.message)
        /** */
        !state.connected ? socket ? socket.emit('onConnect', connectUserName(id, state.chatname)) : Donothing() : Donothing()
        /** */
        socket ? state.connected ? socket.emit('chat', [...message,
        createMessage(state.message, 'user', 'admin', user.admin_id, id)
        ]) :
            socket.emit('chat', [...message,
            createMessage(state.message, 'user', 'admin', user.admin_id, id),
            createMessage('connecting to an admin, please wait...', 'admin', 'user', user.admin_id, id)
            ]) :
            Donothing()
        /** */
        setState(s => ({ ...s, message: '' }))
    }

    return (
        state.show ?
            <div id="chat-bot">
                <div className="messenger br10">
                    <div className="timestamp">{localTime(Date.now())}</div>
                    <div className="chatroom">
                        {/* <!-- msgs  --> */}
                        {
                            !state.loading && !state.chatname ?

                                <div className="msg msg-left">
                                    <div className="bubble">
                                        <h6 className="name">{t('Moct')}</h6>
                                        {t('Hello, I am a  Moct chat bot')}, <br />
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
                            Message.userMessage().map(m => m.sender === 'admin' ?
                                <div className="msg msg-left" key={m.id} id={m.id}>
                                    <div className="bubble">
                                        <h6 className="name">{t('Moct')}</h6>
                                        {m.message}
                                    </div>
                                </div> :
                                m.reciever === 'admin' ?
                                    <div className="msg msg-right" key={m.id} id={m.id}>
                                        <div className="bubble">
                                            <h6 className="name">{state.chatname}</h6>
                                            {m.message}
                                        </div>
                                    </div> :
                                    <p></p>
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
            </div> :
            <p></p>
    )
}

export default withRouter(ChatBoat)
