import React, { useContext, useEffect, useState } from 'react'
import '../../styles/chatBoat.css'
import $ from 'jquery'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { LanguageContext, SocketContext } from '../../context/context';
import { randomID } from '../utility/general';
import { localTime } from '../utility/Date';
import { createMessage } from '../../message/message';
import { withRouter } from 'react-router-dom';
import { messageClass } from '../../message/messageClass';

const id = randomID() + 'moct' + Date.now()

function ChatBoat() {

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
    const name = localStorage.getItem('chatname')
    const userid = localStorage.getItem('user_id') ? localStorage.getItem('user_id') : id
    useEffect(() => {

        setState(s => ({
            ...s,
            chatname: name,
            user_id: userid,
            loading: false,
        }))

    }, [name])

    /***for socket */
    useEffect(() => {
        socket ? socket.on('conn', data => {
            let connected = data.user_id === state.user_id && data.user_name === state.chatname
            if (connected) {
                setConnection(s => ({ ...data }))
                setState(s => ({ ...s, inputField: true }))
            }
        }) : Donothing()
        socket ? socket.on('chat', data => {
            let check = (data.admin_id === connection.admin_id) && (data.user_id === connection.user_id)
            let Mess = []
            data.message.forEach(d => {
                let add = (d.admin_id === connection.admin_id) && (d.user_id === connection.user_id)
                add ? Mess.push(d) : Donothing()
            })
            check ? setMessage(Mess) : Donothing()
        }) : Donothing()

        return (() => {
            socket ? socket.emit('disMiss', connection.user_id, connection.admin_id) : Donothing()
        })
    }, [socket, state, connection])
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
        let nameMessage = createMessage(chatname, 'user', 'admin', '', state.user_id, connection.admin_id, chatname, true)

        setMessage(s => ([...s, nameMessage]))
        localStorage.setItem('chatname', chatname)
        localStorage.setItem('user_id', state.user_id)
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
    console.log(connection)
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
                                            <h6 className="name">{state.chatname}</h6>
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
