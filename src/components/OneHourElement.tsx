import React, {useState, useContext} from 'react';
import {getDayOfWeek, getHour} from '../scripts/dateFunctions.ts';
import {OneHourElementInterface, appContextInterface} from '../components/Interfaces';
import { AppContext } from '../AppContext.tsx';
import Languages from '../layouts/Languages.tsx';
import Units from '../layouts/Units.tsx';

export default function OneHourElement ({date, temp, description, icon, feelsLike, clouds, humidity, pressure, windSpeed, className, timezone}: OneHourElementInterface) {
  const[moreInfoActive, setMoreInfoActive] = useState(false);
  const { lang } = useContext<appContextInterface>(AppContext);
  
  const handleClick = () => setMoreInfoActive(prev => !prev);

  const MoreInfo = () =>{
    return(
      <div className={`${className}__more-info`}><hr></hr>
      <div className={`${className}__more-info-parameters`}>
        <div className={`${className}__parameter`}><Languages text={'feelsLike'}/>: </div>
        <div className={`${className}__value`}>{Math.floor(feelsLike)} <Units text={'temp'}/></div>
      </div>
      <div className={`${className}__more-info-parameters`}>
        <div className={`${className}__parameter`}><Languages text={'clouds'}/>: </div>
        <div className={`${className}__value`}>{clouds} %</div>
      </div>
      <div className={`${className}__more-info-parameters`}>
        <div className={`${className}__parameter`}><Languages text={'humidity'}/>: </div> 
        <div className={`${className}__value`}>{humidity} %</div>
      </div>
      <div className={`${className}__more-info-parameters`}>
        <div className={`${className}__parameter`}><Languages text={'pressure'}/>: </div> 
        <div className={`${className}__value`}>{pressure} hPa</div>
      </div>
      <div className={`${className}__more-info-parameters`}>
        <div className={`${className}__parameter`}><Languages text={'wind'}/>: </div> 
        <div className={`${className}__value`}>{windSpeed} <Units text={'wind'}/></div>
      </div>
    </div>
    );
  };
    
  const moreInfo = moreInfoActive ? 
    <MoreInfo/> 
    : null;

  const handleSeeMoreClass = moreInfoActive ? 
    `${className}__see-more ${className}__see-more--active` 
    : `${className}__see-more ${className}__see-more--inactive`;

  const handleMarginBottom = (moreInfoActive && (window.innerWidth <= 1600) ) ? 
    {marginBottom: '155px'} 
    : {marginBottom: '10px'} ;

  const hour = getHour(date, timezone);

  const Day = () =>{
    const day: string = getDayOfWeek(date, timezone, lang);
    let colorDay : string = '';
    if(day === 'Sobota' || day === 'Saturday') colorDay = 'dimgray';
    else if(day === 'Niedziela' || day === 'Sunday') colorDay = '#f54254';
    
    return(
      <div className={`${className}__day`} style={{color:colorDay}}>
        {day}
      </div>
    );
  };
  
  return (
    <div className={`${className}__hour-element` } style={handleMarginBottom}>
      <div className={`${className}__hour-and-day`}>
        <div className={`${className}__hour`}> 
          {hour}
        </div>
        <Day/>
      </div>
      <hr></hr>
      <div className={`${className}__temp-and-description`}>
        <div className={`${className}__temp-container`}>
          {icon}
          <div className={`${className}__temp`}>
            {Math.floor(temp)}<Units text={'temp'}/>
          </div>
        </div>
        <div className={`${className}__description`}>
          {description}
        </div>
      </div>
      <hr></hr>
      <button onClick={handleClick} className={handleSeeMoreClass}>
        <i className="las la-angle-double-down"></i>
      </button>
      {moreInfo}
    </div>
  );
};