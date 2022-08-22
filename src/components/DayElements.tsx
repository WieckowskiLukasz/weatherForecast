import React from 'react';
import {getHour} from '../scripts/dateFunctions.ts';
import OneDayElement from '../components/OneDayElement.tsx';
import {daysMainDataInterface, DayElementsInterface} from './Interfaces';


export default function DayElements({forecast}: DayElementsInterface) {
  const forecastFourDays: any[] = forecast.slice(1, 5);
  
  let oneDay: {
    clouds: number;
    day: string;
    feels_like: number;
    temp: number;
    humidity: number;
    pressure: number;
    icon: string;
    description: string;
    wind: number;
  };

  let daysMainData: daysMainDataInterface[] = [];

  forecastFourDays.forEach((item) => {
    item.forEach(element =>{
      let hour = getHour(element.dt);
      if(hour === '13:00' || hour === '14:00' || hour === '15:00'){
        oneDay = {
          clouds: element.clouds.all, 
          day: element.day, 
          feels_like: element.main.feels_like, 
          temp: element.main.temp, 
          humidity: element.main.humidity, 
          pressure: element.main.pressure, 
          description: element.weather[0].description,
          icon: element.weather[0].icon, 
          wind: element.wind.speed
        };
        daysMainData.push(oneDay);
      };
    });
  });

  const dayElements = forecastFourDays.map((item, index)=>
    <OneDayElement
      key = {index}
      day = {daysMainData[index].day}
      date = {item[0].dt_txt.slice(0, 10)}
      temp = {Math.floor(daysMainData[index].temp)}
      feelsLike = {Math.floor(daysMainData[index].feels_like)}
      icon = {daysMainData[index].icon}
      description = {daysMainData[index].description}
      clouds = {daysMainData[index].clouds}
      humidity = {daysMainData[index].humidity}
      pressure = {daysMainData[index].pressure}
      wind = {daysMainData[index].wind}
      oneDayForeceast = {item}
    />
  );
  return (
    <div>
      {dayElements}
    </div>
  );
};