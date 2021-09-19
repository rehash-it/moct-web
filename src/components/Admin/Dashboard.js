import React, { useState, useEffect } from 'react'

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

function Dashboard(props) {
    const [toggle, setToggle] = useState(false)

    const [token, setToken] = useState(false)
    const [dimesion, setWindowDimensions] = useState(getWindowDimensions());
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
                                                <AdminChat user={user} setUser={setUser} /> :
                                                <p></p>
                }
                <ChatNotification tabs={tabs} setTabs={setTabs} setUser={setUser} user={user} />

            </div> :
            <Login setToken={setToken} />
    );
}

export default withRouter(Dashboard)
