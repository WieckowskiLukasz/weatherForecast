import React from "react";
import CityItem from '../components/CityItem.tsx';
import {CityListInterface} from '../components/Interfaces';

export default function CityList ({cities, handleClickCity, pageScrolled, mobile}: CityListInterface){
	const items = cities.map((item, index)=> 
		<CityItem
			key={index}
			name={item.pl ? item.pl : item.name}
			country={item.country}
			lat={item.lat}
			lon={item.lon}
			handleClickCity={handleClickCity}
			pageScrolled={pageScrolled}
			mobile={mobile}
		/>
  );
  return (
    <>{items}</>
  );
};