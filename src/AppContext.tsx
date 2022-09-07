import { createContext } from 'react';
import cookies from 'js-cookies';
import {appContextDefaultObjectInterface} from './components/Interfaces';

const cookieLat = cookies.getItem("lat");
const cookieLon = cookies.getItem("lon");
const cookieCity = cookies.getItem("city");
const cookieLang = cookies.getItem('lang');
const cookieUnit = cookies.getItem('unit');

const defaultLat = 52.2337;
const defaultLon = 21.0714;
const defaultCity = 'Warszawa';
const defaultLang = 'pl';
const defaultUnit = 'metric';

const setLat = cookieLat ? cookieLat : defaultLat;
const setLon = cookieLon ? cookieLon : defaultLon;
const setCity = cookieCity ? cookieCity : defaultCity;
const setLang = cookieLang ? cookieLang : defaultLang;
const setUnit = cookieUnit ? cookieUnit : defaultUnit;

export const defaultObject : appContextDefaultObjectInterface = {
  lat: setLat,
  lon: setLon,
  city: setCity,
  lang: setLang,
  unit: setUnit,
};

export const AppContext = createContext(defaultObject);