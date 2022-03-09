import React, { useState, useEffect } from 'react'
import { FaArchive, FaList, FaNewspaper, FaPeopleCarry, FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogOut } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog, BiMessage, BiUser, BiUserVoice } from "react-icons/bi";
import '../../styles/admin.css'
import {
    ProSidebar, Menu, MenuItem,
    SidebarContent, SidebarHeader, SidebarFooter
} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft, faArrowCircleRight, faPeopleArrows, faSitemap, faUserTimes, faFile } from '@fortawesome/free-solid-svg-icons';
import { getWindowDimensions } from '../utility/screen';
import { withRouter } from 'react-router-dom';
import { Logout } from './Auth/Logout';
function SideNav({ handleToggle,
    toggle,
    menuCollapse,
    menuIconClick,
    setTabs, tabs,
    history,
    collapse
}) {
    const [dimesion, setWindowDimensions] = useState(getWindowDimensions());
    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <div id="header"  >
            {/* collapsed props to change menu size using menucollapse state */}
            <ProSidebar collapsed={dimesion.width >= 768 ? menuCollapse : false}
                breakPoint='md'
                toggled={toggle}
                width={dimesion.width > 980 ? 343 : 200}>
                <SidebarHeader>
                    <div className="logotext">
                        {/* small and big change using menucollapse state */}
                        <p>{menuCollapse ? "Admin" : "Moct Admin"}</p>
                    </div>
                    <div className="closemenu"
                        onClick={dimesion.width > 768 ? menuIconClick : handleToggle}>
                        {/* changing menu collapse icon on click */}
                        {menuCollapse && dimesion.width >= 768 ? (
                            <FontAwesomeIcon icon={faArrowCircleRight} />
                        ) : (
                            <FontAwesomeIcon icon={faArrowCircleLeft} />
                        )}
                    </div>
                </SidebarHeader>
                <SidebarContent >
                    <Menu iconShape="square">
                        <MenuItem
                            active={tabs === 'News'}
                            onClick={() => { setTabs('News'); collapse() }}
                            icon={<FaNewspaper />}>
                            News
                        </MenuItem>
                        <MenuItem
                            active={tabs === 'Archives'}
                            onClick={() => { setTabs('Archives'); collapse() }}
                            icon={<FaArchive />}>
                            Archives
                        </MenuItem>
                        <MenuItem
                            onClick={() => { setTabs('Vacancy'); collapse() }}
                            active={tabs === 'Vacancy'}
                            icon={<FaPeopleCarry />}>
                            Vacancy
                        </MenuItem>
                        <MenuItem
                            active={tabs === 'Bids'}
                            onClick={() => { setTabs('Bids'); collapse() }}
                            icon={<FontAwesomeIcon icon={faUserTimes} />}>
                            Bids
                        </MenuItem>
                        <MenuItem
                            active={tabs === 'Sites'}
                            onClick={() => { setTabs('Sites'); collapse() }}
                            icon={<FontAwesomeIcon icon={faSitemap} />}>
                            Attraction sites
                        </MenuItem>
                        <MenuItem
                            active={tabs === 'Studies'}
                            onClick={() => { setTabs('Studies'); collapse() }}
                            icon={<FontAwesomeIcon icon={faFile} />}>
                            Research and studies
                        </MenuItem>
                        <MenuItem
                            active={tabs === 'Users'}
                            onClick={() => { setTabs('Users'); collapse() }}
                            icon={<BiUser />}>
                            Users
                        </MenuItem>
                        <MenuItem
                            active={tabs === 'Forum'}
                            onClick={() => { setTabs('Forum'); collapse() }}
                            icon={<BiUserVoice />}>
                            Forum
                        </MenuItem>
                        <MenuItem
                            active={tabs === 'chats'}
                            onClick={() => { setTabs('chats'); collapse() }}
                            icon={<BiMessage />}>
                            Chats
                        </MenuItem>
                        {
                            dimesion.width >= 768 ? <p></p> :
                                <Menu iconShape="square" onClick={() => Logout(history.push)}>
                                    <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
                                </Menu>
                        }
                    </Menu>
                </SidebarContent>
                <SidebarFooter >
                    <Menu iconShape="square" onClick={() => Logout(history.push)}>
                        <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
                    </Menu>
                </SidebarFooter>
            </ProSidebar>
        </div>
    )
}

export default withRouter(SideNav)
