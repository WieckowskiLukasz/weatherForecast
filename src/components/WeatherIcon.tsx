import * as React from 'react';
import { useEffect, useState } from 'react';
import {WeatherIconInterface} from '../components/Interfaces';

export default function WeatherIcon({iconCode}: WeatherIconInterface) {
	const[iconID, setIconID] = useState<string>('01d');
	const[icon, setIcon] = useState<string>();
	const[color, setColor] = useState<string>();

	const icons: { id: string, icon: string, color: string }[] = [
		{id: '01d', icon: 'wi-day-sunny', color: 'yellow'},
		{id: '01n', icon: 'wi-night-clear', color: 'yellow'},
		{id: '02d', icon: 'wi-day-cloudy', color: 'white'},
		{id: '02n', icon: 'wi-night-alt-cloudy', color: 'white'},
		{id: '03d', icon: 'wi-cloud', color: 'white'},
		{id: '03n', icon: 'wi-cloud', color: 'white'},
		{id: '04d', icon: 'wi-cloudy', color: 'white'},
		{id: '04n', icon: 'wi-cloudy', color: 'white'},
		{id: '09d', icon: 'wi-showers', color: 'white'},
		{id: '09n', icon: 'wi-showers', color: 'white'},
		{id: '10d', icon: 'wi-day-rain', color: 'white'},
		{id: '10n', icon: 'wi-night-alt-rain', color: 'white'},
		{id: '11d', icon: 'wi-thunderstorm', color: 'dimgray'},
		{id: '11n', icon: 'wi-thunderstorm', color: 'dimgray'},
		{id: '13d', icon: 'wi-snow', color: 'white'},
		{id: '13n', icon: 'wi-snow', color: 'white'},
		{id: '50d', icon: 'wi-fog', color: 'lightgray'},
		{id: '50n', icon: 'wi-fog', color: 'lightgray'},
	];
	
	useEffect(()=> {
		if(iconCode !== iconID) setIconID(iconCode);
		const selectItem = icons.filter(icon=> icon.id === iconID);
		setIcon(selectItem[0].icon);
		setColor(selectItem[0].color);
	});
	
	return (
		<i className={`wi ${icon}`} style={{color: `${color}`}}></i>
	);
};
