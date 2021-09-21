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
import { checkAdmin, checkToken } from './Auth/ChechAdmin';
import AdminUser from './AdminUser';
import Login from './Auth/Login';
import AdminChat from './AdminChat';
import ChatNotification from './ChatNotification';
import { SocketContext } from '../../context/context';
import { createMessage } from '../../message/message';

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
    const [tabs, setTabs] = useState('main')
    /** */
    const [user, setUser] = useState({
        userid: '',
        username: '',
        admin_id: '',
        admin_name: ''
    })
    const menuIconClick = () => menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
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
        socket ? socket.on("onConnect", data => {
            const show = data.username ? data.admin_id ? false : true : true
            setUser(s => ({
                ...s,
                userid: data.userid,
                username: data.username
            }));
            showNotification(show)

        }) : Donothing()
        socket ? socket.on('chat', data => setMessage(data.message)) : Donothing()
    }, [socket])
    /** */
    console.log(message)
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
                    setUser={setUser}
                    user={user}
                    message={message}
                    setMessage={setMessage}
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
                                            tabs === 'chat' ?
                                                <AdminChat
                                                    user={user}
                                                    setUser={setUser}
                                                    socket={socket}
                                                    message={message}
                                                    setMessage={setMessage}
                                                /> :
                                                <p></p>
                }

            </div> :
            <Login setToken={setToken} />
    );
}

export default withRouter(Dashboard)
