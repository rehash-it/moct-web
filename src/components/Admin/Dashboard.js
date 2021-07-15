import React, { useState, useEffect } from 'react'

import NavBar from '../layouts/navbar';
import SideNav from './SideNav';
import { getWindowDimensions } from '../utility/screen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import AdminVacancy from './AdminVacancy';

function Dashboard() {
    const [toggle, setToggle] = useState(false)
    const [dimesion, setWindowDimensions] = useState(getWindowDimensions());
    //create initial menuCollapse state using useState hook
    const [menuCollapse, setMenuCollapse] = useState(false)
    const [tabs, setTabs] = useState('main')
    const menuIconClick = () => menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const handleToggle = () => toggle ? setToggle(false) : setToggle(true)
    const offToggle = () => setToggle(false)
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
                    <p></p>
            }
        </div>
    );
}

export default Dashboard
