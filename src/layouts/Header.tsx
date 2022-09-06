import React, { useEffect, useState, SyntheticEvent, useLayoutEffect, useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import CitySearchEngine  from '../components/CitySearchEngine.tsx';
import whiteLogo  from '../images/logo/whiteLogo.svg';
import blackLogo  from '../images/logo/blackLogo.svg';
import pl from '../flags/pl.svg';
import en from '../flags/en.svg';
import Languages from '../layouts/Languages.tsx';
import { AppContext } from '../AppContext.tsx';
import {appContextInterface} from '../components/Interfaces';

export default function Header() {
  const [pageScrolled, setPageScrolled] = useState<boolean>(false);
  const [menuMobileActive, setMenuMobileActive] = useState<boolean>(false);
  const [pageMobile, setpageMobile] = useState<boolean>(false);
  const location = useLocation();
  const {lang, setLanguage} = useContext<appContextInterface>(AppContext);

  useLayoutEffect(() => {handleWidth();}, [pageMobile]);
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
  const handleHamburgerBtn = (e: SyntheticEvent) =>{
    e.preventDefault();
    setMenuMobileActive(prev => !prev);
  };
  const handleLangBtn = () =>{
    if(lang === 'en') setLanguage('pl');
    else setLanguage('en');
  };
  const handleActiveMobileMenu = (value: boolean) => setMenuMobileActive(value);
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
  const flagIcon = lang === 'en' ? 
  pl
  : en;
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
          <NavLink to='/'>
            <img src={logoSrc} alt='logo' className='logo'></img>
          </NavLink>
        </div>
        {citySearchEngineDesktop}
        <nav className='navigation'>
          <ul className={menuSwitch}>
            <li 
              onClick={()=> handleNavLinkClick()} 
              className={navLink}
            >
              <NavLink to='/'><Languages text={'actualWeatherNavLink'}/></NavLink>
            </li>
            <li 
              onClick={()=> handleNavLinkClick()} 
              className={navLink}
            >
              <NavLink to='/prognoza'><Languages text={'forecastNavLink'}/></NavLink>
            </li>
            <li 
              onClick={()=> handleLangBtn()} 
              className={navLink}>
                <img src={flagIcon} alt='flag'/>
            </li>
            {citySearchEngineMobile}
          </ul>
        </nav>
        <div 
          onClick = {handleHamburgerBtn} 
          className={hamburger}
        >
          <i className={hamburgerIcon}></i>
        </div>
      </div>
    </div>
  );
};