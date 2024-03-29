import React from 'react';
import './App.scss';
import Header from './layouts/Header.tsx';
import Footer from './layouts/Footer.tsx';
import CookiesInfo from './layouts/CookiesInfo.tsx';
import { HashRouter } from 'react-router-dom';
import { useState } from 'react';
import { AppContext, defaultObject } from './AppContext.tsx';
import { Route , Routes} from 'react-router';
import ActualWeatherPage from './pages/ActualWeatherPage.tsx';
import ForecastPage from './pages/ForecastPage.tsx';
import {cookieExpires} from './scripts/dateFunctions.ts';
import Page404 from './pages/Page404.tsx';

function App() {
  const [lat, setLat] = useState(defaultObject.lat);
  const [lon, setLon] = useState(defaultObject.lon);
  const [city, setCity] = useState(defaultObject.city);
  const [lang, setLang] = useState(defaultObject.lang);
  const [unit, setUnit] = useState(defaultObject.unit);
  
  const setCoordinates = (lat: number | string, lon: number | string, city: string) =>{
    setLat(lat);
    setLon(lon);
    setCity(city);

    document.cookie = `lat=${lat}; path=/; expires=${cookieExpires()}`;
    document.cookie = `lon=${lon}; path=/; expires=${cookieExpires()}`;
    document.cookie = `city=${city}; path=/; expires=${cookieExpires()}`;
  };

  const setLanguage = (lang: string) =>{
    setLang(lang);
    document.cookie = `lang=${lang}; path=/; expires=${cookieExpires()}`;
  };

  const setUnits = (unit: string) =>{
    setUnit(unit);
    document.cookie = `unit=${unit}; path=/; expires=${cookieExpires()}`;
  };

  return (
    <div className="App" >
      <HashRouter>
        <AppContext.Provider
          value={{
            lat: lat,
            lon: lon,
            city: city,
            setCoordinates: setCoordinates,
            lang: lang,
            setLanguage: setLanguage,
            unit: unit,
            setUnits: setUnits,
          }}
        >
        <header>
          <Header/>
        </header>
        <div className='container'>
          <main>
            <Routes>
              <Route path='/' element={<ActualWeatherPage/>}/>
              <Route path='/prognoza' element={<ForecastPage/>}/>
              <Route path='*' element={<Page404/>}/>
            </Routes>
          </main>
          <footer>
            <Footer/>
          </footer>
        </div>
        <CookiesInfo/>
        </AppContext.Provider>
      </HashRouter>
    </div>
  );
}

export default App;
