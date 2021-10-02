import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import ChatBoat from '../layouts/ChatBoat';
import $ from 'jquery'
function Chat({ location }) {
    const [show, setShow] = useState(false)

    useEffect(() => {
        let Show = (location.pathname !== '/login' && location.pathname !== '/admin')
        setShow(Show)
    }, [location])
    useEffect(() => {
        $("#chat-bot .icon").on('click', () => {
            $("#chat-bot .icon").toggleClass("expanded");
            setTimeout(() => {
                $("#chat-bot .messenger").toggleClass("expanded");
            }, 100);
        })
    }, [$("#chat-bot .icon")])
    return (
        show ? <ChatBoat /> : ''
    )
}

export default withRouter(Chat)
