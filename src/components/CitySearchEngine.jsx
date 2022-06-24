import { AppContext } from '../AppContext';
import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';

export default function CitySearchEngine({propsPageScrolled, propsPageMobile, handleActiveMobileMenu}) {
	const [error, setError] = useState();
	const [cityList, setCityList] = useState();
	const [cityNotFound, setCityNotFound] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [cityListIsActive, setCityIsListActive] = useState();
	const [pageScrolled, setPageScrolled] = useState();
	const [pageMobile, setPageMobile] = useState(false);
	const { setCoordinates } = useContext(AppContext);
	const location = useLocation();

	useEffect(() => {
		if(propsPageMobile) setPageMobile(true);
		if(pageScrolled !== propsPageScrolled) setPageScrolled(propsPageScrolled);
	})
	useEffect(() => {
		setCityIsListActive(false);
		setInputValue('');
	},[location]);

	const fetchData = () =>{
		fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=5&lang=pl&appid=22e4cc28098f4253c589877fc9e9cbd9`)
		.then(res => res.json())
		.then((result) => {
			if(result.length > 0) {
				setCityList(result);
				setCityNotFound(false);
			}else{
				setCityNotFound(true);
				setCityList(null);
			};
		})
		.catch(error => {
			alert(error);
			setError(false);
		});
		setCityIsListActive(true);
	};

	const handleInput = (e) => setInputValue(e.target.value);
	const handleButton = () => {if(inputValue !== '') fetchData();};
	const handleClickCity = (lat, lon, city) =>{
		setInputValue('');
		setCityList(null);
		setCityIsListActive(false);
		setCoordinates(lat, lon, city);
		if(handleActiveMobileMenu) handleActiveMobileMenu(false);
	};
	const handleClickArrow = () =>{
		setCityIsListActive(false);
		setCityList(null);
		setCityNotFound(false);
	};

	const inputClassName = (pageScrolled && !pageMobile) ? 
		'city-search-engine__input city-search-engine__input--scrolled' 
		: pageMobile ? 
			'city-search-engine__input city-search-engine__input--mobile' 
			: 'city-search-engine__input';
	const buttonClassName = (pageScrolled && !pageMobile) ?
		'city-search-engine__button city-search-engine__button--scrolled' 
		: 'city-search-engine__button';
	const cityClassName = (pageScrolled && !pageMobile) ?
		'city-search-engine__city-list city-search-engine__city-list--scrolled' 
		: 'city-search-engine__city-list';
	const arrowClassName = (pageScrolled && !pageMobile) ?
		'city-search-engine__arrow city-search-engine__arrow--scrolled' 
		: 'city-search-engine__arrow';
	const showArrow = ((cityList && cityListIsActive) || cityNotFound) ? 
		<div className={arrowClassName} onClick={handleClickArrow}><i className='las la-angle-double-up'></i></div> 
		: null;
	const cityNotFoundWarningClassName = (pageScrolled && !pageMobile) ? 
		'city-search-engine__city-not-found city-search-engine__city-not-found--scrolled' 
		: 'city-search-engine__city-not-found';
	const cityNotFoundWarning = (cityNotFound || error) ? 
		<div className={cityNotFoundWarningClassName}>nie znaleziono miasta</div> 
		: null;

	const handleCityList = 
		(cityList && cityListIsActive) ?
			<div className={cityClassName}>
				<CityList 
					cities={cityList}
					handleClickCity={handleClickCity}
					handleClickArrow={handleClickArrow}
					pageScrolled={pageScrolled}
					mobile={pageMobile}
				/>
				{showArrow}
			</div>
		:<div className={cityClassName}>
			{cityNotFoundWarning}
			{showArrow}
		 </div>;

 return (
	<div className='city-search-engine'>
		<form className='city-search-engine__form' onSubmit={e => e.preventDefault()}>
			<div className='city-search-engine__input-container'>
				<input 
					autoComplete='off'
					name='city'
					list='cities'
					className={inputClassName} 
					placeholder='Podaj miasto...' 
					value={inputValue} 
					onChange={handleInput}
				/>
				<button 
					type='submit'
					onClick={()=> handleButton()} 
					className={buttonClassName}>
					<i className='las la-search'></i>
				</button>
			</div>
			{handleCityList}
		</form>
	</div>
  );
};

const CityList = ({cities, handleClickCity, pageScrolled, mobile}) =>{
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

const CityItem = ({name, country, lat, lon, handleClickCity, pageScrolled, mobile}) =>{
	const countryCode = country.toLowerCase();
	console.log(pageScrolled);
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
