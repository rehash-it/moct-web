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
import { faSearch } from '@fortawesome/free-solid-svg-icons'
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
    const displaySearch = () => setSearch(!search)
    return (
        <Navbar color='dark' light expand="md" style={{ height: windowDimensions.width > 680 ? '15vh' : '' }} >

            <NavbarBrand >
                {windowDimensions.width > 680 ?
                    <img src={logo} alt="" /> :
                    <img src={logo} alt="" style={{ backgroundColor: '#f1f4f8', border: 'none', width: '33vh' }} />
                }
            </NavbarBrand>

            <Collapse isOpen={isOpen} navbar className="pl-5"
                style={{ marginLeft: windowDimensions.width < 500 ? 100 : 40 }}>
                <Nav navbar>
                    <Link to='/'>
                        <NavItem>
                            <NavLink>
                                <h5 className='text-raise'>Home</h5>
                            </NavLink>
                        </NavItem>
                    </Link>

                    <Link to='/news'>
                        <NavItem>
                            <NavLink>
                                <h5 className='text-raise'>News</h5>
                            </NavLink>
                        </NavItem>
                    </Link>
                    <Link to='/vacancy'>
                        <NavItem>
                            <NavLink>
                                <h5 className='text-raise'>Vacancy and bids</h5>
                            </NavLink>
                        </NavItem>
                    </Link>

                    <Link to='/about'>
                        <NavItem>
                            <NavLink>
                                <h5 className='text-raise'>About</h5>
                            </NavLink>
                        </NavItem>
                    </Link>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret className='text-raise'>
                            <h5 className="text-raise">Sites</h5>
                        </DropdownToggle>
                        <DropdownMenu righ className='text-raise'>
                            <DropdownItem>
                                Religional
                            </DropdownItem>
                            <DropdownItem className='text-raise'>
                                Nature
                            </DropdownItem>
                            <DropdownItem divider className='text-raise' />
                            <DropdownItem>
                                others
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <UncontrolledDropdown nav inNavbar>
                        <h5>
                            <DropdownToggle nav caret className='text-raise'>
                                <h5 className="text-raise">Translate</h5>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem className='text-raise'>
                                    Amharic
                                </DropdownItem >
                                <DropdownItem className='text-raise'>
                                    oromifa
                                </DropdownItem>

                            </DropdownMenu>
                        </h5>
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
                <NavItem>
                    <NavLink href='www.fb.com'>
                        <FontAwesomeIcon icon={faFacebook} className='fa-2x text-raise' />
                    </NavLink>
                    <NavLink href='www.fb.com'>
                        <FontAwesomeIcon icon={faTwitter} className='fa-2x text-raise' />
                    </NavLink>

                </NavItem>

            </Collapse>

            <NavbarToggler onClick={toggle} className='btn btn-primary text-white' />

        </Navbar>
    );
}

export default NavBar;