import WeatherHourElements from '../components/WeatherHourElements';
import WeatherIcon from '../components/WeatherIcon';
import {getHour} from '../scripts/dateFunctions.ts';

export default function DayElement({forecast}) {
  forecast = forecast.slice(1, 5);
  let oneDay = {};
  let daysMainData = [];

  forecast.forEach((item) => {
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

  const dayElements = forecast.map((item, index)=>
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

function OneDayElement({day, date, temp, feelsLike, icon, description, clouds, humidity, pressure, wind, oneDayForeceast}) {
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
              <WeatherIcon iconID={icon}/>
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
          <WeatherHourElements
            forecast={oneDayForeceast}
            className={'day-forecast'}
          />
        </div>
    </div>
  );
};

