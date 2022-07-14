import { createContext } from 'react';
import cookies from 'js-cookies';

const cookieLat = cookies.getItem("lat");
const cookieLon = cookies.getItem("lon");
const cookieCity = cookies.getItem("city");

const defaultLat = 52.2337;
const defaultLon = 21.0714;
const defaultCity = 'Warszawa';

const setLat = cookieLat ? cookieLat : defaultLat;
const setLon = cookieLon ? cookieLon : defaultLon;
const setCity = cookieCity ? cookieCity : defaultCity;

interface defaultSetup { 
  lat: number | string;
  lon: number | string;
  city: string;
  setCoordinates : any;
} 

export const defaultObject : defaultSetup = {
  lat: setLat,
  lon: setLon,
  city: setCity,
  setCoordinates: '',
}

export const AppContext = createContext(defaultObject);