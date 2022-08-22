import React, {useState, useEffect, useContext} from 'react';
import DayElements from '../components/DayElements.tsx';
import WeatherBackground from '../components/WeatherBackground.tsx';
import LoadingScreen from '../components/LoadingScreen.tsx';
import { AppContext } from '../AppContext.tsx';
import {getDayOfWeek, getHour} from '../scripts/dateFunctions.ts';

export default function ForecastPage() {
  const [country, setCountry] = useState<string>();
  const [fourDaysData, setFourDaysData] = useState<any[]>();
  const [error, setError] = useState<boolean>(false);
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const [dataLoaded, setDataLoaded] = useState<boolean>();
  const { city, lat, lon } = useContext(AppContext);

  const fetchData = () =>{
    fetch(`https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${lat}&lon=${lon}&lang=pl&appid=22e4cc28098f4253c589877fc9e9cbd9`)
      .then(res => res.json())
      .then((result) => {
        setCountry(result.city.country.toLowerCase());
        setFourDaysData(handleDayOfWeek(result.list, result.city.timezone));
        setDataLoading(false);
      })
      .catch(error => {
        setError(true);
    });
  };

  useEffect(() => {
    setDataLoading(true);
    setDataLoaded(false);
    fetchData();
  },[lat, lon]);

  const handleDataLoaded = (value: boolean) =>setDataLoaded(value);

  const handleDayOfWeek = (result: any[], timezone: number) =>{
    let newWeek: any[] = [];
    let newDay: any[] = [];
    result.forEach(item => {
      let timestamp: number = item.dt + timezone;
      let hour: string = getHour(timestamp);
      item.day = getDayOfWeek(timestamp);
      item.dt = timestamp;
      newDay.push(item);
      if(hour === '21:00'|| hour === '22:00' || hour === '23:00'){newWeek.push(newDay); newDay = [];}
    });
    return newWeek;
  };

  const weatherBackground = !dataLoading ? 
    <WeatherBackground backgroundCode={'01d'}/> 
    : null;

  return (
    <>
      <LoadingScreen 
        dataLoading={dataLoading} 
        error={error} 
        handleDataLoaded={handleDataLoaded}
      />
      {weatherBackground}
      {dataLoaded ? 
        <div className='forecast-container'>
          <div className='forecast-city'>
            <div className='forecast-city__city-name'>Prognoza: {city}</div>
            <div className={`fi fi-${country}`}></div>
            <div className='forecast-city__country'>{country}</div>
          </div>
          <DayElements forecast={fourDaysData}/>
        </div>
      : null}
    </>
  );
};
