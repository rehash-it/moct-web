import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import ChatBoat from '../layouts/ChatBoat';
import $ from 'jquery'
function Chat(props) {
    const [show, setShow] = useState(false)
    let chat_bot = $("#chat-bot .icon")
    let chat_bot_messenger = $("#chat-bot .messenger")
    useEffect(() => {
        $("#chat-bot .icon").on('click', () => {
            $("#chat-bot .icon").toggleClass("expanded");
            setTimeout(() => {
                $("#chat-bot .messenger").toggleClass("expanded");
            }, 100);
        })
    }, [chat_bot, props.location, chat_bot_messenger])
    useEffect(() => {
        let Show = (props.location.pathname !== '/login'
            && props.location.pathname !== '/admin' &&
            props.location.pathname !== '/forums' &&
            props.location.pathname.split('/')[1] !== 'forum' &&
            props.location.pathname !== '/closedForums'
        )
        setShow(Show)
    }, [props.location, props.match])

    return (
        show ? <ChatBoat location={props.location} /> : ''
    )
}

export default withRouter(Chat)
