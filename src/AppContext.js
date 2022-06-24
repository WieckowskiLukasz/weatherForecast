import { createContext } from 'react';
import cookies from 'js-cookies';

const cookieLat = cookies.getItem("lat");
const cookieLon = cookies.getItem("lon");
const cookieCity = cookies.getItem("city");

const setLat = () => {if(cookieLat){return cookieLat} else{return 52.2337;}}
const setLon = () => {if(cookieLon){return cookieLon} else{return 21.0714;}}
const setCity = () => {if(cookieCity){return cookieCity} else{return 'Warszawa';}}

export const defaultObject = {
  lat: setLat,
  lon: setLon,
  city: setCity,
  setCoordinates: () => '',
}

export const AppContext = createContext(defaultObject);