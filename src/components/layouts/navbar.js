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
    Na
} from 'reactstrap';
import ReactRoundedImage from "react-rounded-image";
import { Link } from 'react-router-dom';
import logo from '../../images/ET-emblem.png'
import logo2 from '../../images/moct-logo-2.png'
import { getWindowDimensions } from '../utility/screen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faGoogle, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
const NavBar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState(false)
    const toggle = () => setIsOpen(!isOpen);
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        var top = document.getElementById('top')
        top.scrollIntoView({ behavior: 'auto' })
    }, [])

    const displaySearch = () => setSearch(!search)
    return (
        <Navbar color='dark' expand="md" style={{ height: windowDimensions.width > 680 ? '15vh' : '' }} id='top' >
            <Link to='/'>
                <NavbarBrand >
                    {windowDimensions.width > 680 ?
                        <img src={logo} alt="" style={{ width: 343 }} /> :
                        <img src={logo} alt="" style={{ width: '33vh' }} />
                    }
                </NavbarBrand>
            </Link>
            <Collapse isOpen={isOpen} navbar className="pl-5"
                style={{ marginLeft: windowDimensions.width < 500 ? 100 : 40 }}>
                <Nav navbar>
                    <Link to='/'>
                        <NavItem>
                            <NavLink>
                                <h6 className='text-raise'>Home</h6>
                            </NavLink>
                        </NavItem>
                    </Link>

                    <Link to='/news'>
                        <NavItem>
                            <NavLink>
                                <h6 className='text-raise'>News</h6>
                            </NavLink>
                        </NavItem>
                    </Link>
                    <Link to='/about'>
                        <NavItem>
                            <NavLink>
                                <h6 className='text-raise'>About</h6>
                            </NavLink>
                        </NavItem>
                    </Link>
                    <Link to='/vacancy'>
                        <NavItem>
                            <NavLink>
                                <h6 className='text-raise'>Vacancy and bids</h6>
                            </NavLink>
                        </NavItem>
                    </Link>
                    <Link to='/studies'>
                        <NavItem>
                            <NavLink>
                                <h6 className='text-raise'>Research</h6>
                            </NavLink>
                        </NavItem>
                    </Link>
                    <UncontrolledDropdown nav inNavbar>
                        <h6>
                            <DropdownToggle nav caret className='text-raise h6'>
                                About
                            </DropdownToggle>
                            <DropdownMenu right>
                                <Link to='/about'>
                                    <DropdownItem className='text-raise h6'>
                                        Vision
                                    </DropdownItem >
                                </Link>
                                <Link to='/history'>
                                    <DropdownItem className='text-raise h6'>
                                        History and background
                                    </DropdownItem >
                                </Link>
                                <Link to='/messageOfMoct'>
                                    <DropdownItem className='text-raise h6'>
                                        Message from the organizarion
                                    </DropdownItem>
                                </Link>
                            </DropdownMenu>
                        </h6>
                    </UncontrolledDropdown>
                    <UncontrolledDropdown nav inNavbar>
                        <h6 className='text-raise'>
                            <DropdownToggle nav caret className='text-raise h6'>
                                Language
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem className='text-raise'>
                                    Amharic
                                </DropdownItem >
                                <DropdownItem className='text-raise'>
                                    oromifa
                                </DropdownItem>

                            </DropdownMenu>
                        </h6>
                    </UncontrolledDropdown>
                </Nav>

                <form  >
                    {
                        search ? <input type='text' className='form-control'
                            style={{ marginLeft: windowDimensions.width > 680 ? 0 : 0, transition: 3 }} /> : ''
                    }

                </form>
                <button type='button' className='btn text-raise' onClick={displaySearch}
                    style={{ marginLeft: windowDimensions.width > 680 && !search ? 250 : 0 }}
                >
                    <FontAwesomeIcon icon={faSearch} />
                </button>
                {/* <NavItem>
                    <NavLink href='www.fb.com'>
                        <FontAwesomeIcon icon={faFacebook} className='fa-2x text-raise' />
                    </NavLink>
                    <NavLink href='www.fb.com'>
                        <FontAwesomeIcon icon={faTwitter} className='fa-2x text-raise' />
                    </NavLink>

                </NavItem> */}

            </Collapse>

            <NavbarToggler onClick={toggle} className='btn btn-raise text-white' >
                <FontAwesomeIcon icon={faBars} />
            </NavbarToggler>

        </Navbar>
    );
}

export default NavBar;