import React, { useEffect, useState, SyntheticEvent, useLayoutEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import CitySearchEngine  from '../components/CitySearchEngine.tsx';
import Settings  from '../layouts/Settings.tsx';
import whiteLogo  from '../images/logo/whiteLogo.svg';
import blackLogo  from '../images/logo/blackLogo.svg';
import Languages from '../layouts/Languages.tsx';

export default function Header() {
  const [pageScrolled, setPageScrolled] = useState<boolean>(false);
  const [menuMobileActive, setMenuMobileActive] = useState<boolean>(false);
  const [settingsActive, setSettingsActive] = useState<boolean>(false);
  const [pageMobile, setpageMobile] = useState<boolean>(false);
  const location = useLocation();

  useLayoutEffect(() => {handleWidth();}, [pageMobile]);
  useEffect(() => window.addEventListener('scroll', handleScroll));
  useEffect(() => window.addEventListener('resize', handleWidth));
  useEffect(() => {window.scrollTo(0,0); setSettingsActive(false)},[location]);

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
    setSettingsActive(false);
  };
  const handleActiveMobileMenu = (value: boolean) => setMenuMobileActive(value);
  const handleNavLinkClick = () => {setMenuMobileActive(false);};
  const handleSettings = () => {setSettingsActive(prev => !prev);setMenuMobileActive(false)};

  const logoSrc = pageScrolled ?
    blackLogo 
    : whiteLogo;
  const hamburgerIcon = menuMobileActive ? 
    'las la-times'
    : 'las la-bars';
  const menuSwitch = pageMobile ? 
    menuMobileActive ? 
      'navigation__links  navigation__links--mobile navigation__links--active'
      : 'navigation__links  navigation__links--mobile'
    : 'navigation__links';
  const headerClassName = pageScrolled ? 
    'header header--scrolled'
    : 'header';
  const navLinkClassName = (pageScrolled && !pageMobile) ? 
    'navigation__link navigation__link--scrolled' 
    : pageMobile ? 
      'navigation__link navigation__link--mobile' 
      : 'navigation__link ';
  const hamburgerClassName = pageScrolled ? 
    'navigation__link  navigation__hamburger  navigation__hamburger--scrolled'
    : 'navigation__link  navigation__hamburger';
  const setupIconClassName = pageScrolled ? 
    'navigation__link navigation__setup-icon navigation__setup-icon--scrolled'
    : 'navigation__link navigation__setup-icon';

  const citySearchEngineMobile = pageMobile ? 
    <CitySearchEngine pageScrolled={pageScrolled} handleActiveMobileMenu={handleActiveMobileMenu} pageMobile={true}/>
    : null;
  const citySearchEngineDesktop = pageMobile ? 
    null 
    : <CitySearchEngine pageScrolled={pageScrolled}/>;
  const settings = settingsActive ? 
    <Settings pageScrolled={pageScrolled}/> 
    : null;
  
  return(
    <>
      <div className={headerClassName}>
        {settings}
        <div className='header__content'>
          <div 
            onClick={()=> handleNavLinkClick()}
          >
            <NavLink to='/'>
              <img src={logoSrc} alt='logo' className='logo'></img>
            </NavLink>
          </div>
          {citySearchEngineDesktop}
          <nav className='navigation'>
            <ul className={menuSwitch}>
              <li 
                onClick={()=> handleNavLinkClick()} 
                className={navLinkClassName}
              >
                <NavLink to='/'><Languages text={'actualWeatherNavLink'}/></NavLink>
              </li>
              <li 
                onClick={()=> handleNavLinkClick()} 
                className={navLinkClassName}
              >
                <NavLink to='/prognoza'><Languages text={'forecastNavLink'}/></NavLink>
              </li>
              {citySearchEngineMobile}
            </ul>
          </nav>
          <div 
            onClick={()=> handleSettings()} 
            className={setupIconClassName}
          >
            <i className='las la-cog '></i>
          </div> 
          <div 
            onClick = {handleHamburgerBtn} 
            className={hamburgerClassName}
          >
            <i className={hamburgerIcon}></i>
          </div>
        </div>
      </div>
    </>
  );
};