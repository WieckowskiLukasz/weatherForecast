import React, {useState, useEffect, useContext} from 'react';
import WeatherIcon from '../components/WeatherIcon.tsx';
import LoadingScreen from '../components/LoadingScreen.tsx';
import WeatherBackground from '../components/WeatherBackground.tsx';
import WeatherHourElements from '../components/WeatherHourElements.tsx';
import { AppContext } from '../AppContext.tsx';

export default function ActualWeatherPage() {
  const [country, setCountry] = useState<string>();
  const [temp, setTemp] = useState<number>();
  const [feelsLike, setFeelsLike] = useState<number>();
  const [description, setDescription] = useState<string>();
  const [clouds, setClouds] = useState<number>();
  const [humidity, setHumidity] = useState<number>();
  const [pressure, setPressure] = useState<number>();
  const [windSpeed, setWindSpeed] = useState<number>();
  const [shortTermForecastData, setShortTermForecastData] = useState<any[]>();
  const [weatherCode, setWeatherCode] = useState('01d');
  const [timezone, setTimezone] = useState<number>();
  const [error, setError] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState<boolean>();
  const { city, lat, lon } = useContext(AppContext);

  useEffect(() => {
    setDataLoading(true);
    setDataLoaded(false);
    fetchData();
  },[lat, lon]);

  const fetchData = () =>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&lang=pl&appid=22e4cc28098f4253c589877fc9e9cbd9`)
    .then(res => res.json())
    .then((result) => {
      setCountry(result.sys.country.toLowerCase());
      setTemp(Math.floor(result.main.temp));
      setFeelsLike(Math.floor(result.main.feels_like));
      setDescription(result.weather[0].description)
      setClouds(result.clouds.all)
      setHumidity(result.main.humidity);
      setPressure(result.main.pressure);
      setWindSpeed(result.wind.speed);
      setWeatherCode(result.weather[0].icon);
      setDataLoading(false);
    })
    .catch(error => {
      setError(true);
    });

    fetch(`https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${lat}&lon=${lon}&lang=pl&appid=22e4cc28098f4253c589877fc9e9cbd9`)
    .then(res => res.json())
    .then((result) => {
      setTimezone(result.city.timezone);
      setShortTermForecastData(result.list.slice(0, 8));
      setDataLoading(false);
    })
    .catch(error => {
      setError(true);
    });
  };
  const handleDataLoaded = (value) => setDataLoaded(value);

  const weatherBackground = !dataLoading ? 
    <WeatherBackground backgroundID={weatherCode}/> 
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
        <div className='weather-container'>
          <div className='weather-city'>
            <div className='weather-city__name'>{city}</div>
            <div className={`fi fi-${country}`}></div>
            <div className='weather-city__country'>{country}</div>
          </div>
          <div className='actual-weather'>
            <div className='actual-weather__main-data'>
              <div className='actual-weather__coordinates'>
                <a target='_blank' rel='noreferrer' href={`https://google.com/maps/?ll=${lat},${lon}`}>
                  <i className='las la-map-marked-alt'></i>&nbsp;
                  lat: {lat}&nbsp;
                  lon: {lon}
                </a>
              </div>
              <div className='actual-weather__temp'>
                <WeatherIcon iconID={weatherCode}/>
                {temp}°C
              </div>
              <div className='actual-weather__feels'>
                <i className='wi wi-thermometer'></i>
                Temp. odczuwalna: {feelsLike} °C
              </div>
              <div className='actual-weather__description'>
                {description}
              </div>
            </div>
            <div className='actual-weather__details'>
            <div className='actual-weather__details-parameters'>
                <div className='actual-weather__details-name'> 
                  <i className='wi wi-cloudy'></i>Zachmurzenie: 
                </div>
                <div className='actual-weather__details-value'> 
                  {clouds} %
                </div>
              </div>
              <div className='actual-weather__details-parameters'>
                <div className='actual-weather__details-name'> 
                  <i className='wi wi-humidity'></i>Wilgotność: 
                </div>
                <div className='actual-weather__details-value'> 
                  {humidity} %
                </div>
              </div>
              <div className='actual-weather__details-parameters'>
                <div className='actual-weather__details-name'> 
                  <i className='wi wi-barometer'></i>Ciśnienie: 
                </div>
                <div className='actual-weather__details-value'> 
                  {pressure} hPa
                </div>
              </div>
              <div className='actual-weather__details-parameters'>
                <div className='actual-weather__details-name'> 
                  <i className='wi wi-strong-wind'></i>Wiatr: 
                </div>
                <div className='actual-weather__details-value'> 
                  {windSpeed} m/s
                </div>
              </div>
            </div>
          </div>
          <div className='short-term-forecast'>
            <WeatherHourElements 
              forecast={shortTermForecastData} 
              className={'short-term-forecast'}
              timezone={timezone}
            />
          </div>
        </div> 
      :null}
    </>
  );
};
