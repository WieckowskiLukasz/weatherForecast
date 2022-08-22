import React, {useState} from 'react';
import {getDayOfWeek, getHour} from '../scripts/dateFunctions.ts';
import {OneHourElementInterface} from '../components/Interfaces';

export default function OneHourElement ({date, temp, description, icon, feelsLike, clouds, humidity, pressure, windSpeed, className, timezone}: OneHourElementInterface) {
  const[moreInfoActive, setMoreInfoActive] = useState(false);
  
  const handleClick = () => setMoreInfoActive(prev => !prev);

  const MoreInfo = () =>{
    return(
      <div className={`${className}__more-info`}><hr></hr>
      <div className={`${className}__more-info-parameters`}>
        <div className={`${className}__parameter`}>Odczuwalna: </div>
        <div className={`${className}__value`}>{Math.floor(feelsLike)} °C</div>
      </div>
      <div className={`${className}__more-info-parameters`}>
        <div className={`${className}__parameter`}>Zachmurzenie: </div>
        <div className={`${className}__value`}>{clouds} %</div>
      </div>
      <div className={`${className}__more-info-parameters`}>
        <div className={`${className}__parameter`}>Wilgotność: </div> 
        <div className={`${className}__value`}>{humidity} %</div>
      </div>
      <div className={`${className}__more-info-parameters`}>
        <div className={`${className}__parameter`}>Ciśnienie: </div> 
        <div className={`${className}__value`}>{pressure} hPa</div>
      </div>
      <div className={`${className}__more-info-parameters`}>
        <div className={`${className}__parameter`}>Wiatr: </div> 
        <div className={`${className}__value`}>{windSpeed} m/s</div>
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
    const day: string = getDayOfWeek(date, timezone);
    let colorDay : string = '';
    if(day === 'Sobota') colorDay = 'dimgray';
    else if(day === 'Niedziela') colorDay = '#f54254';
    
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
            {Math.floor(temp)}°C
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