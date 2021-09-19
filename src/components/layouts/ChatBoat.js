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
const id = randomID() + Date.now()
function ChatBoat({ location }) {
    const chatbutton = $("#chat-bot .icon")
    const chatBot = ("#chat-bot .messenger")
    useEffect(() => {
        $("#chat-bot .icon").on('click', () => {
            $("#chat-bot .icon").toggleClass("expanded");
            setTimeout(() => {
                $("#chat-bot .messenger").toggleClass("expanded");
            }, 100);
        })
        setSocket(webSocket)
    }, [chatbutton, chatBot])

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
    const Donothing = () => { }
    const [message, setMessage] = useState([])
    const name = localStorage.getItem('chatname')

    useEffect(() => {
        setState(s => ({
            ...s,
            chatname: name,
            loading: false,
            show: (location.pathname !== '/login' && location.pathname !== '/admin')
        }))
    }, [name, location])

    const setName = chatname => {
        setState({ chatname, loading: false, inputField: false })
        setMessage(s => (
            [...s,
            createMessage(chatname, 'user', 'admin'),
            createMessage('connecting to an admin, please wait...', 'admin', 'user')
            ]))
        localStorage.setItem('chatname', chatname)
        socket ? socket.emit('onConnect', connectUserName(id, chatname)) : Donothing()
    }

    const handleSubmit = e => {
        e.preventDefault();
        state.message && state.chatname ? setMessage(s => (
            [...s, createMessage(state.message, 'user', 'reciever')])) : setName(state.message)

    }
    console.log(message, state.inputField)
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
                            message.map(m => m.sender === 'admin' ?
                                <div className="msg msg-left">
                                    <div className="bubble">
                                        <h6 className="name">{t('Moct')}</h6>
                                        {m.message}
                                    </div>
                                </div> :
                                m.reciever === 'user' ?
                                    <div className="msg msg-right">
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
