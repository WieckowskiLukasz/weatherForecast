import { useEffect, useState } from 'react';

export default function WeatherIcon(props) {
    const[iconID, setIconID] = useState('01d');
    const[icon, setIcon] = useState();
    const[color, setColor] = useState();

    const icons = [
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
        if(props.iconID !== iconID) setIconID(props.iconID);
        const selectItem = icons.filter(icon=> icon.id === iconID);
        setIcon(selectItem[0].icon);
        setColor(selectItem[0].color);
    })
    
    return (
        <i className={`wi ${icon}`} style={{color: `${color}`}}></i>
    );
};