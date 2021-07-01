import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
} from 'reactstrap';
import ReactRoundedImage from "react-rounded-image";
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png'
import { getWindowDimensions } from '../utility/screen';
const NavBar = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <Navbar color='light' light expand="md" >
            <Link to='/'>
                {
                    windowDimensions.width > 680 ?
                        <ReactRoundedImage
                            image={logo}
                            roundedColor="#66A5CC"
                            imageWidth="60"
                            imageHeight="60"
                            roundedSize="8"
                            color='warning'
                            className='show'
                        /> :
                        <ReactRoundedImage
                            image={logo}
                            roundedColor="#66A5CC"
                            imageWidth="80"
                            imageHeight="80"
                            roundedSize="8"
                            color='warning'
                            className='show'
                        />
                }
            </Link>
            <NavbarBrand >
                {
                    windowDimensions.width > 680 ? <h2>Ministry of Culture and Tourism</h2>
                        : <h1>MOCT</h1>

                }
            </NavbarBrand>
            <NavbarToggler onClick={toggle} className='text-dark' />
            <Collapse isOpen={isOpen} navbar className="pl-5" style={{ marginLeft: windowDimensions.width < 500 ? 100 : 250 }}>
                <Nav navbar>
                    <Link to='/'>
                        <NavItem>
                            <NavLink>
                                <h5>Home</h5>
                            </NavLink>
                        </NavItem>
                    </Link>

                    <Link to='/blog'>
                        <NavItem>
                            <NavLink>
                                <h5>Blog</h5>
                            </NavLink>
                        </NavItem>
                    </Link>
                    <Link to='/news'>
                        <NavItem>
                            <NavLink>
                                <h5>News</h5>
                            </NavLink>
                        </NavItem>
                    </Link>
                    <Link to='/vacancy'>
                        <NavItem>
                            <NavLink>
                                <h5>Vacancy</h5>
                            </NavLink>
                        </NavItem>
                    </Link>
                    <Link to='/bids'>
                        <NavItem>
                            <NavLink>
                                <h5>Bids</h5>
                            </NavLink>
                        </NavItem>
                    </Link>
                    <Link to='/about'>
                        <NavItem>
                            <NavLink>
                                <h5>About</h5>
                            </NavLink>
                        </NavItem>
                    </Link>
                    <UncontrolledDropdown nav inNavbar>
                        <h5>
                            <DropdownToggle nav caret>
                                Sites
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    Religional
                                </DropdownItem>
                                <DropdownItem>
                                    Nature
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    others
                                </DropdownItem>
                            </DropdownMenu>
                        </h5>
                    </UncontrolledDropdown>
                </Nav>

            </Collapse>
        </Navbar>
    );
}

export default NavBar;