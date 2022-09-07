import React, { useContext } from 'react';
import pl from '../flags/pl.svg';
import en from '../flags/en.svg';
import { AppContext } from '../AppContext.tsx';
import {appContextInterface} from '../components/Interfaces';

export default function Settings() {
  const {lang, setLanguage, unit, setUnits} = useContext<appContextInterface>(AppContext);

  const handleLangSwitch = () =>{
    if(lang === 'en') setLanguage('pl');
    else setLanguage('en');
  };

  const handleUnitSwitch = () =>{
    if(unit === 'metric') setUnits('imperial');
    else setUnits('metric');
  };

  const langSwitcherPosition = (lang === 'pl') ?
    '0'
    : '50%';
  const unitSwitcherPosition = (unit === 'metric') ?
    '0'
    : '50%';

  return (
    <div className='settings'>
      <div className='settings__switch' onClick={()=> handleLangSwitch()}>
        <div className='settings__active-option' style={{left: langSwitcherPosition}}></div>
        <img src={pl} alt='flag'/>
        <img src={en} alt='flag'/>
      </div>
      <div className='settings__switch' onClick={()=> handleUnitSwitch()}>
        <div className='settings__active-option' style={{left: unitSwitcherPosition}}></div>
        <div className='settings__unit'>°C</div>
        <div className='settings__unit'>°F</div>
      </div>
    </div>
  );
};
