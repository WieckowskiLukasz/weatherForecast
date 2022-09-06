import React from 'react';
import { NavLink } from 'react-router-dom';
import whiteLogo  from '../images/logo/whiteLogo.svg';
import clearSkyDay from '../images/weather-backgrounds/01d.webp';
import Languages from '../layouts/Languages.tsx';

export default function Page404() {
  return (
    <>
			<div 
        className='page404' 
        style={{
          backgroundImage:`url(${clearSkyDay})`,
        }}>
        <div className='page404__content'>
          <img src={whiteLogo} alt='logo' className='page404__logo'></img>
          <div className='page404__text'>
            <Languages text={'page404Text'}/>
          </div>
          <button className='page404__button'>
            <NavLink to='/'><Languages text={'page404Button'}/></NavLink>
          </button>
        </div>
			</div>
    </>
  );
};
