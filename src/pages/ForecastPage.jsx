import {useState, useEffect, useContext} from 'react';
import DayElement from '../components/DayElement';
import WeatherBackground from '../components/WeatherBackground';
import LoadingScreen from '../components/LoadingScreen';
import { AppContext } from '../AppContext.tsx';
import {getDayOfWeek, getHour} from '../scripts/dateFunctions.ts';

export default function ForecastPage() {
  
  const [country, setCountry] = useState();
  const [fourDaysData, setFourDaysData] = useState();
  const { city, lat, lon } = useContext(AppContext);
  const [error, setError] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState();

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

  const handleDataLoaded = (value) =>setDataLoaded(value);

  const handleDayOfWeek = (result, timezone) =>{
    let newWeek = [];
    let newDay = [];
    result.forEach(item => {
      let timestamp = item.dt + timezone;
      let hour = getHour(timestamp);
      item.day = getDayOfWeek(timestamp);
      item.dt = timestamp;
      newDay.push(item);
      if(hour === '21:00'|| hour === '22:00' || hour === '23:00'){newWeek.push(newDay); newDay = [];}
    });
    return newWeek;
  };

  const weatherBackground = !dataLoading ? 
    <WeatherBackground backgroundID={'01d'}/> 
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
            <div class={`fi fi-${country}`}></div>
            <div className='forecast-city__country'>{country}</div>
          </div>
          <DayElement forecast={fourDaysData}/>
        </div>
      : null}
    </>
  );
};
