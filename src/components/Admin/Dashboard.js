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
import { checkAdmin } from './Auth/ChechAdmin';

function Dashboard(props) {
    const [toggle, setToggle] = useState(false)
    const [dimesion, setWindowDimensions] = useState(getWindowDimensions());
    //create initial menuCollapse state using useState hook
    const [menuCollapse, setMenuCollapse] = useState(false)
    const [tabs, setTabs] = useState('main')
    const menuIconClick = () => menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    useEffect(() => {

        checkAdmin(props.history.push)
    }, [])
    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const handleToggle = () => toggle ? setToggle(false) : setToggle(true)
    return (
        <div>
            <NavBar />

            <SideNav
                handleToggle={handleToggle}
                toggle={toggle}
                menuCollapse={menuCollapse}
                menuIconClick={menuIconClick}
                tabs={tabs}
                setTabs={setTabs}
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
                                    <p></p>
            }
        </div>
    );
}

export default withRouter(Dashboard)
