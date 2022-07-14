import React, { useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';
import CitySearchEngine  from '../components/CitySearchEngine.tsx';
import whiteLogo  from '../images/logo/whiteLogo.svg';
import blackLogo  from '../images/logo/blackLogo.svg';
import { useLocation } from 'react-router-dom';

const Header = () =>{
  const [pageScrolled, setPageScrolled] = useState(false);
  const [menuMobileActive, setMenuMobileActive] = useState(false);
  const [pageMobile, setpageMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    handleWidth();
  }, [pageMobile]);
  useEffect(() => window.addEventListener('scroll', handleScroll));
  useEffect(() => window.addEventListener('resize', handleWidth));
  useEffect(() => {window.scrollTo(0,0);},[location]);

  const handleScroll = () =>{
    if(window.scrollY > 50) setPageScrolled(true);
    else setPageScrolled(false);
  };
  const handleWidth = () =>{
    if(window.innerWidth < 901) setpageMobile(true);
    else {setpageMobile(false); setMenuMobileActive(false)};
  };
  const handleHamburgerBtn = (e) =>{
    e.preventDefault();
    setMenuMobileActive(prev => !prev);
  };
  const handleActiveMobileMenu = (value) => setMenuMobileActive(value);
  const handleNavLinkClick = () => {setMenuMobileActive(false);};

  const header = pageScrolled ? 
    'header header--scrolled' 
    : 'header';
  const logoSrc = pageScrolled ?
    blackLogo 
    : whiteLogo;
  const navLink = (pageScrolled && !pageMobile) ? 
    'navigation__link navigation__link--scrolled' 
    : pageMobile ? 
      'navigation__link navigation__link--mobile' 
      : 'navigation__link ';
  const menuSwitch = pageMobile ? 
    menuMobileActive ? 
      'navigation__links  navigation__links--mobile navigation__links--active'
      : 'navigation__links  navigation__links--mobile'
    : 'navigation__links';
  const hamburgerIcon = menuMobileActive ? 
    'las la-times'
    : 'las la-bars';
  const hamburger = pageScrolled ? 
    'navigation__link  navigation__hamburger  navigation__hamburger--black'
    : 'navigation__link  navigation__hamburger navigation__hamburger--white';
  const citySearchEngineMobile = pageMobile ? 
    <CitySearchEngine propsPageScrolled={pageScrolled} handleActiveMobileMenu={handleActiveMobileMenu} propsPageMobile={true}/> 
    : null;
  const citySearchEngineDesktop = pageMobile ? 
    null 
    : <CitySearchEngine propsPageScrolled={pageScrolled}/>;
  
  return(
    <div className={header}>
      <div className='header__content'>
        <div>
          <NavLink to='/'><img src={logoSrc} alt='logo' className='logo'></img></NavLink>
        </div>
        {citySearchEngineDesktop}
        <nav className='navigation'>
          <ul className={menuSwitch}>
            <li 
              onClick={()=> handleNavLinkClick()} 
              className={navLink}>
                <NavLink to='/'>Aktualna pogoda</NavLink>
            </li>
            <li 
              onClick={()=> handleNavLinkClick()} 
              className={navLink}>
                <NavLink to='/prognoza'>Prognoza</NavLink>
            </li>
            {citySearchEngineMobile}
          </ul>
        </nav>
        <div onClick = {handleHamburgerBtn} className={hamburger}><i className={hamburgerIcon}></i></div>
      </div>
    </div>
  );
};

export default Header;