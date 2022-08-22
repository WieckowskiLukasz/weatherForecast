import React from "react";
import {CityItemInterface} from '../components/Interfaces';

export default function CityItem ({name, country, lat, lon, handleClickCity, pageScrolled, mobile}: CityItemInterface){
	const countryCode = country.toLowerCase();
	const cityListItemClass = (pageScrolled && !mobile) ? 
		'city-search-engine__city-list-item city-search-engine__city-list-item--scrolled' 
		: 'city-search-engine__city-list-item';
	const countryClass = (pageScrolled && !mobile) ? 
		'city-search-engine__country city-search-engine__country--scrolled' 
		: 'city-search-engine__country';
	
  return(
		<div 
			className={cityListItemClass}
			onClick={()=> handleClickCity(lat, lon, name)}>
			<div>
				{`${name}`} 
			</div>
			<div className={countryClass}>
				<div className={`fi fi-${countryCode}`}></div>
				<div>{country}</div>
			</div>
		</div>
	);
};