import React, { useState, useEffect, useContext } from 'react';
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
} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import logo from '../../images/ET-emblem.png'
import { getWindowDimensions } from '../utility/screen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons'
import { LanguageContext } from '../../context/context';
import { changeLanguage } from '../../translation/i18n';
const NavBar = ({ match, history }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState(false)
    const path = (match.path.split('/')[1])
    const [index, setIndex] = useState('')
    const handleSearch = e => {
        e.preventDefault()
        localStorage.setItem('index', index)
        history.push('/search/' + index + '?p=1')
    }
    let Index = localStorage.getItem('index')
    useEffect(() => {
        if (path === 'search') {
            if (Index ? true : false) {
                setSearch(true)
                setIndex(Index)
            }
        }
    }, [path, Index])
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
    /**language */
    const { t } = useContext(LanguageContext)
    const lng = localStorage.getItem('lng')
    /**about change */
    const About = () => localStorage.getItem('about') &&
        ((path === 'about') || (path === 'messageOfMocs') || (path === 'history') || (path === 'chart')) ? localStorage.getItem('about') : 'About'
    const changeAbout = (about) => localStorage.setItem('about', about)
    /**site change */
    const site = () => localStorage.getItem('site') && (path === 'sites') ? localStorage.getItem('site') : 'Attraction sites'
    const changeSite = (site) => localStorage.setItem('site', site)
    return (
        <Navbar color='light' expand="md" style={{ height: windowDimensions.width > 680 ? '15vh' : '' }} id='top' >
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
                            <NavLink className='h5'>
                                {t('Home')}
                            </NavLink>
                        </NavItem>
                    </Link>

                    <Link to='/news'>
                        <NavItem>
                            <NavLink className='h5'>
                                {t('News')}
                            </NavLink>
                        </NavItem>
                    </Link>

                    <Link to='/vacancy'>
                        <NavItem>
                            <NavLink className='h5'>
                                {t('Vacancy')}
                            </NavLink>
                        </NavItem>
                    </Link>
                    <Link to='/bids'>
                        <NavItem>
                            <NavLink className='h5'>
                                {t('Bids')}
                            </NavLink>
                        </NavItem>
                    </Link>
                    <Link to='/forums'>
                        <NavItem>
                            <NavLink className='h5'>
                                {t('Forums')}
                            </NavLink>
                        </NavItem>
                    </Link>
                    <Link to='/docs'>
                        <NavItem>
                            <NavLink className='h5'>
                                {t('Research')}
                            </NavLink>
                        </NavItem>
                    </Link>

                    <UncontrolledDropdown nav inNavbar>
                        <h6>
                            <DropdownToggle nav caret className='h5'>
                                {t(site())}
                            </DropdownToggle>
                            <DropdownMenu right>
                                <Link to='/sites?region=All'>
                                    <DropdownItem className='h5' onClick={() => changeSite('All')}>
                                        {t('All')}
                                    </DropdownItem >
                                </Link>
                                <Link to='/sites?region=Oromia'>
                                    <DropdownItem className='h5' onClick={() => changeSite('Oromia')}>
                                        {t('Oromia')}  {t('region')}
                                    </DropdownItem >
                                </Link>
                                <Link to='/sites?region=Amhara'>
                                    <DropdownItem className='h5' onClick={() => changeSite('Amhara')}>
                                        {t('Amhara')}  {t('region')}
                                    </DropdownItem >
                                </Link>
                                <Link to='/sites?region=Harari'>
                                    <DropdownItem className='h5' onClick={() => changeSite('Harari')}>
                                        {t('Harari')}  {t('region')}
                                    </DropdownItem >
                                </Link>
                                <Link to='/sites?region=Snppr' onClick={() => changeSite('SNNPR')}>
                                    <DropdownItem className='h5'>
                                        {t('SNNPR')}  {t('region')}
                                    </DropdownItem>
                                </Link>
                                <Link to='/sites?region=Afar'>
                                    <DropdownItem className='h5' onClick={() => changeSite('Afar')}>
                                        {t('Afar')}  {t('region')}
                                    </DropdownItem>
                                </Link>
                                <Link to='/sites?region=Sidama'>
                                    <DropdownItem className='h5' onClick={() => changeSite('Sidama')}>
                                        {t('Sidama')} {t('region')}
                                    </DropdownItem>
                                </Link>
                                <Link to='/sites?region=Diredewa'>
                                    <DropdownItem className='h5' onClick={() => changeSite('Diredewa')}>
                                        {t('Diredewa')}  {t('region')}
                                    </DropdownItem >
                                </Link>
                                <Link to='/sites?region=Gambela'>
                                    <DropdownItem className='h5' onClick={() => changeSite('Gambela')}>
                                        {t('Gambela')}  {t('region')}
                                    </DropdownItem >
                                </Link>
                                <Link to='/sites?region=Somalia'>
                                    <DropdownItem className='h5' onClick={() => changeSite('Somali')}>
                                        {t('Somali')}  {t('region')}
                                    </DropdownItem >
                                </Link>
                                <Link to='/sites?region=A.A'>
                                    <DropdownItem className='h5' onClick={() => changeSite('Addis Ababa city')}>
                                        {t('Addis Ababa city')}
                                    </DropdownItem >
                                </Link>
                                <Link to='/sites?region=Tigrai'>
                                    <DropdownItem className='h5' onClick={() => changeSite('Tigrai')}>
                                        {t('Tigrai')}  {t('region')}
                                    </DropdownItem >
                                </Link>
                                <Link to='/sites?region=gumuz'>
                                    <DropdownItem className='h5' onClick={() => changeSite('Bensahangul gumuz')}>
                                        {t('Bensahangul gumuz')}  {t('region')}
                                    </DropdownItem >
                                </Link>
                            </DropdownMenu>
                        </h6>
                    </UncontrolledDropdown>
                    <UncontrolledDropdown nav inNavbar>
                        <h6>
                            <DropdownToggle nav caret className='h5'>
                                {t(About())}
                            </DropdownToggle>
                            <DropdownMenu right>
                                <Link to='/about'>
                                    <DropdownItem className='h5' onClick={() => changeAbout('Vision')}>
                                        {t('Vision')}
                                    </DropdownItem >
                                </Link>
                                <Link to='/history'>
                                    <DropdownItem className='h5' onClick={() => changeAbout('Historical Background')}>
                                        {t('Historical Background')}
                                    </DropdownItem >
                                </Link>
                                <Link to='/messageOfMocs'>
                                    <DropdownItem className='h5' onClick={() => changeAbout('Message of Mocs')}>
                                        {t('Message of Mocs')}
                                    </DropdownItem>
                                </Link>
                                <Link to='/chart'>
                                    <DropdownItem className='h5' onClick={() => changeAbout('Organization Chart')}>
                                        {t('Organization Chart')}
                                    </DropdownItem>
                                </Link>
                            </DropdownMenu>
                        </h6>
                    </UncontrolledDropdown>
                    <UncontrolledDropdown nav inNavbar>
                        <h6 className='text-raise'>
                            <DropdownToggle nav caret className='text-raise h5'>
                                {t(lng === 'amh' ? 'Amharic' : 'English')}
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem className='text-raise' onClick={() => changeLanguage('amh')}>
                                    {t('Amharic')}
                                </DropdownItem >
                                <DropdownItem className='text-raise' onClick={() => changeLanguage('eng')}>
                                    {t('English')}
                                </DropdownItem >
                            </DropdownMenu>
                        </h6>
                    </UncontrolledDropdown>
                </Nav>

                <form onSubmit={handleSearch} >
                    {
                        search ? <input type='text' className='form-control' autoFocus
                            placeholder={t("type and hit enter")} onChange={e => setIndex(e.target.value)}
                            value={index}
                            style={{ marginLeft: windowDimensions.width > 680 ? 0 : 0, transition: 3 }} /> : ''
                    }


                </form>
                <button type='button' className='btn btn-raise' onClick={index ? handleSearch : displaySearch}
                    style={{ marginLeft: windowDimensions.width > 680 && !search ? 150 : 0 }}
                >
                    <FontAwesomeIcon icon={faSearch} />
                </button>

            </Collapse>

            <NavbarToggler onClick={toggle} className='btn btn-raise text-white' >
                <FontAwesomeIcon icon={faBars} />
            </NavbarToggler>

        </Navbar>
    );
}

export default withRouter(NavBar);