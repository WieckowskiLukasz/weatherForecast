import React from 'react';
import WeatherIcon from '../components/WeatherIcon.tsx';
import OneHourElement from '../components/OneHourElement.tsx';
import {WeatherHourElementsInterface} from '../components/Interfaces';

export default function HourElements({forecast, className, timezone}: WeatherHourElementsInterface) {
  const items = forecast.map((item, index)=> 
    <OneHourElement
      key={index}
      date={item.dt}
      temp={item.main.temp}
      description={item.weather[0].description}
      icon={<WeatherIcon iconCode={item.weather[0].icon}/>}
      feelsLike={item.main.feels_like}
      clouds={item.main.humidity}
      humidity={item.clouds.all}
      pressure={item.main.pressure}
      windSpeed={item.wind.speed}
      className={className}
      timezone={timezone}
    />
  );
  return (
    <>{items}</>
  );
};