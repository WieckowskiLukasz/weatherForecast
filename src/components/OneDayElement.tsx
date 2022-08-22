import React from 'react';
import HourElements from '../components/HourElements.tsx';
import WeatherIcon from '../components/WeatherIcon.tsx';
import {OneDayElementInterface} from '../components/Interfaces';

export default function OneDayElement({day, date, temp, feelsLike, icon, description, clouds, humidity, pressure, wind, oneDayForeceast}: OneDayElementInterface) {
  return (
    <div className='day-forecast'>
        <div className='day-forecast__day-and-details'>
          <div className='day-forecast__day-of-week'>
            <div className='day-forecast__day-name'>
              {day}
            </div>
            <div className='day-forecast__date'>
              {date}
            </div>
            <div className='day-forecast__day-temp'>
              <WeatherIcon iconCode={icon}/>
              {temp}°C
            </div>
          <div className='day-forecast__feels'>
            <i className='wi wi-thermometer'></i>
            odczuwalna: {feelsLike} °C
          </div>
          <div className='day-forecast__day-description'>
            {description}
          </div>
        </div>
        <div className='day-forecast__details'>
          <div className='day-forecast__details-parameters'>
            <div className='day-forecast__details-name'> 
              <i className='wi wi-cloudy'></i>
              Zachmurzenie: 
            </div>
            <div className='day-forecast__details-value'> 
              {clouds} %
            </div>
          </div>
          <div className='day-forecast__details-parameters'>
            <div className='day-forecast__details-name'> 
              <i className='wi wi-humidity'></i>
              Wilgotność: 
            </div>
            <div className='day-forecast__details-value'> 
              {humidity} %
            </div>
          </div>
          <div className='day-forecast__details-parameters'>
            <div className='day-forecast__details-name'> 
              <i className='wi wi-barometer'></i>
              Ciśnienie: 
            </div>
            <div className='day-forecast__details-value'> 
              {pressure} hPa
            </div>
          </div>
          <div className='day-forecast__details-parameters'>
            <div className='day-forecast_details-name'> 
              <i className='wi wi-strong-wind'></i>
              Wiatr: 
            </div>
            <div className='day-forecast__details-value'> 
              {wind} m/s
            </div>
          </div>
        </div>
      </div>
        <div className='day-forecast__hours'>
          <HourElements
            forecast={oneDayForeceast}
            className={'day-forecast'}
          />
        </div>
    </div>
  );
};

