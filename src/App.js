import './App.scss';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import CookiesInfo from './layouts/CookiesInfo';
import { HashRouter } from 'react-router-dom';
import { useState } from 'react';
import { AppContext, defaultObject } from './AppContext';
import { Route , Routes} from 'react-router';
import ActualWeatherPage from './pages/ActualWeatherPage';
import ForecastPage from './pages/ForecastPage';
import {cookieExpires} from './scripts/dateFunctions';
import Page404 from './pages/Page404';

function App() {
  const[lat, setLat] = useState(defaultObject.lat);
  const[lon, setLon] = useState(defaultObject.lon);
  const[city, setCity] = useState(defaultObject.city);
  
  const setCoordinates = (lat, lon, city) =>{
    setLat(lat);
    setLon(lon);
    setCity(city);

    document.cookie = `lat=${lat}; path=/; expires=${cookieExpires()}`;
    document.cookie = `lon=${lon}; path=/; expires=${cookieExpires()}`;
    document.cookie = `city=${city}; path=/; expires=${cookieExpires()}`;
  };

  return (
    <div className="App" >
      <HashRouter hashtype='noslash'>
        <AppContext.Provider
          value={{
            lat: lat,
            lon: lon,
            city: city,
            setCoordinates: setCoordinates,
          }}
        >
        <header>
          <Header/>
        </header>
        <div className='container'>
          <main>
            <Routes>
              <Route exact path='/' element={<ActualWeatherPage/>}/>
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
