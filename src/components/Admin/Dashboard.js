import React, { useState, useEffect, useContext } from 'react'

import NavBar from '../layouts/navbar';
import SideNav from './SideNav';
import { getWindowDimensions } from '../utility/screen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import AdminVacancy from './AdminVacancy';
import AdminBids from './AdminBids';
import AdminNews from './AdminNews';
import AdminSite from './AdminSites';
import AdminResearch from './AdminResearch';
import { withRouter } from 'react-router-dom';
import { checkToken } from './Auth/ChechAdmin';
import AdminUser from './AdminUser';
import Login from './Auth/Login';
import ChatNotification from './chat/ChatNotification';
import { SocketContext } from '../../context/context';
import ChatRoom from './chat/ChatRoom';
import AdminChat from './AdminChat';
import { messageClass } from './../../message/messageClass';
import OtherMessages from './chat/OtherMessages';
import AdminForum from './AdminForum';

function Dashboard(props) {
    const Donothing = () => { }
    const [toggle, setToggle] = useState(false)
    const [notifcation, showNotification] = useState(false)
    const { socket } = useContext(SocketContext)
    const [token, setToken] = useState(false)
    const [dimesion, setWindowDimensions] = useState(getWindowDimensions());
    const [message, setMessage] = useState([])
    //create initial menuCollapse state using useState hook
    const [menuCollapse, setMenuCollapse] = useState(true)
    const [tabs, setTabs] = useState('News')
    /** */
    const [connection, setConnection] = useState({
        user_id: '',
        admin_id: '',
        status: '',
        connected_time: '',
        disconnected_time: '',
        user_name: '',
        admin_name: ''
    })
    const [call, setCall] = useState({
        user_name: '',
        user_id: '',
        status: '',
        message: ''
    })
    const [otherMessageNotification, showOtherMessageNotification] = useState(false)
    const [otherMessages, setOtherMessage] = useState({})
    const [forum, setForum] = useState({})
    const menuIconClick = () => menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    const [comments, setComments] = useState([])
    useEffect(() => {
        checkToken(setToken)
    }, [setToken])
    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    /**socket chat */
    useEffect(() => {
        socket ? socket.on("conn", data => {
            let user_id = sessionStorage.getItem('user_id')
            let admin_id = sessionStorage.getItem('id')
            const notification = user_id === data.user_id ? admin_id === data.admin_id ? true : false : false
            if (notification) {
                setConnection(s => ({
                    ...s,
                    user_name: data.user_name,
                    user_id: data.user_id,
                    status: data.status,
                    admin_id: data.admin_id,
                    admin_name: data.admin_name,
                    connected_time: data.connected_time,
                    disconnected_time: data.disconnected_time
                }))
            }

            showNotification(!notification)
        }) : Donothing()
        /** */
        socket ? socket.on('calling', data => {
            showNotification(true)
            setCall(s => ({
                ...s,
                user_name: data.user_name,
                user_id: data.user_id,
                status: data.status,
                message: data.message
            }))
        }) : Donothing()


        socket ? socket.on('chat', data => {
            let user_id = sessionStorage.getItem('user_id')
            let admin_id = sessionStorage.getItem('id')
            if ((data.admin_id === admin_id) && (data.user_id === user_id)) {
                let Mess = []
                data.message.forEach(d => {
                    let add = (d.admin_id === admin_id) && (d.user_id === user_id)
                    add ? Mess.push(d) : Donothing()
                })

                setMessage(Mess)
            }
            else if (data.admin_id === admin_id) {
                let userid = data.message.length ? data.message[0].user_id : ''
                let mess = new messageClass(data.message, userid, admin_id)
                let last_message = mess.lastMessage()
                let check = last_message ? last_message.sender === 'user' ? true : false : false
                check ? setOtherMessage(last_message) : Donothing()
                showOtherMessageNotification(check)
            }
        }) : Donothing()

        socket ? socket.on('comments', data => {

            let forum_id = sessionStorage.getItem('forum_id')
            console.log(data, forum_id)
            let comment = forum_id === data.forum_id
            comment ? setComments(data.data) : Donothing()
        }) : Donothing()

    }, [socket])

    const handleToggle = () => toggle ? setToggle(false) : setToggle(true)
    const collapse = () => setMenuCollapse(true)

    return (
        token ?
            <div>
                <NavBar />
                <SideNav
                    handleToggle={handleToggle}
                    toggle={toggle}
                    menuCollapse={menuCollapse}
                    menuIconClick={menuIconClick}
                    tabs={tabs}
                    setTabs={setTabs}
                    collapse={collapse}
                />
                <ChatNotification
                    tabs={tabs}
                    notifcation={notifcation}
                    showNotification={showNotification}
                    socket={socket}
                    setTabs={setTabs}
                    setConnection={setConnection}
                    call={call}
                />
                <OtherMessages
                    setTabs={setTabs}
                    message={otherMessages}
                    visibility={otherMessageNotification}
                    showVisibility={showOtherMessageNotification}
                    socket={socket}
                    connection={connection}
                />
                {
                    dimesion.width >= 768 ? <p></p> :
                        <button className="btn btn-primary" onClick={handleToggle}>
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                }
                {
                    tabs === 'Vacancy' ?
                        <AdminVacancy /> :
                        tabs === 'Bids' ?
                            <AdminBids /> :
                            tabs === 'News' ?
                                <AdminNews /> :
                                tabs === 'Sites' ?
                                    <AdminSite /> :
                                    tabs === 'Studies' ?
                                        <AdminResearch /> :
                                        tabs === 'Users' ?
                                            <AdminUser /> :
                                            tabs === 'chatRoom' ?
                                                <ChatRoom
                                                    connection={connection}
                                                    socket={socket}
                                                    message={message}
                                                /> :
                                                tabs === 'chats' ?
                                                    <AdminChat
                                                        connection={connection}
                                                        setTabs={setTabs}
                                                        setConnection={setConnection}
                                                        socket={socket}
                                                    /> :
                                                    tabs === 'Forum' ?
                                                        <AdminForum
                                                            socket={socket}
                                                            comments={comments}
                                                            forum={forum}
                                                            setForum={setForum}
                                                        />
                                                        : <p></p>
                }

            </div> :
            <Login setToken={setToken} />
    );
}

export default withRouter(Dashboard)
