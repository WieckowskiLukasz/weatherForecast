import React from 'react';
import { useEffect, useState} from 'react';
import {WeatherBackgroundInterface} from '../components/Interfaces';
import clearSkyDay from '../images/weather-backgrounds/01d.webp';
import clearSkyNight from '../images/weather-backgrounds/01n.webp';
import fewCloudsDays from '../images/weather-backgrounds/02d.webp';
import fewCloudsNight from '../images/weather-backgrounds/02n.webp';
import scatteredCloudsDay from '../images/weather-backgrounds/03d.webp';
import scatteredCloudsNight from '../images/weather-backgrounds/03n.webp';
import brokenCloudsDay from '../images/weather-backgrounds/04d.webp';
import brokenCloudsNight from '../images/weather-backgrounds/04n.webp';
import rainDay from '../images/weather-backgrounds/09d.webp';
import rainNight from '../images/weather-backgrounds/09n.webp';
import showerRainDay from '../images/weather-backgrounds/10d.webp';
import showerRainNight from '../images/weather-backgrounds/10n.webp';
import thunderstormDay from '../images/weather-backgrounds/11d.webp';
import thunderstormNight from '../images/weather-backgrounds/11n.webp';
import snowDay from '../images/weather-backgrounds/13d.webp';
import snowNight from '../images/weather-backgrounds/13n.webp';
import mistDay from '../images/weather-backgrounds/50d.webp';
import mistNight from '../images/weather-backgrounds/50n.webp';

export default function WeatherBackground({backgroundCode}: WeatherBackgroundInterface) {
  const[backgroundID, setBackgroundID] = useState<string>('01d');
  const[background, setBackground] = useState<string>();

  const backgrounds: { id: string, image: string }[]  = [
      {id: '01d', image: clearSkyDay},
      {id: '01n', image: clearSkyNight},
      {id: '02d', image: fewCloudsDays},
      {id: '02n', image: fewCloudsNight},
      {id: '03d', image: scatteredCloudsDay},
      {id: '03n', image: scatteredCloudsNight},
      {id: '04d', image: brokenCloudsDay},
      {id: '04n', image: brokenCloudsNight},
      {id: '09d', image: rainDay},
      {id: '09n', image: rainNight},
      {id: '10d', image: showerRainDay},
      {id: '10n', image: showerRainNight},
      {id: '11d', image: thunderstormDay},
      {id: '11n', image: thunderstormNight},
      {id: '13d', image: snowDay},
      {id: '13n', image: snowNight},
      {id: '50d', image: mistDay},
      {id: '50n', image: mistNight},
  ];

  useEffect(()=> {
    if(backgroundCode !== backgroundID) setBackgroundID(backgroundCode);
    const selectBackground = backgrounds.filter(background=> background.id === backgroundID);
    setBackground(selectBackground[0].image);
  });
  
  return (
    <div 
      className="weather-background-image" 
      style={{
        backgroundImage:`url(${background})`,
        filter: `brightness(70%)`,
      }}>
    </div>
  );
};
