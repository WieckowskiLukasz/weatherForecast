import { AppContext } from '../AppContext.tsx';
import React, { useEffect, useState, useContext, SyntheticEvent} from 'react';
import { useLocation } from 'react-router-dom';
import {CitySearchEngineInterface, appContextInterface} from '../components/Interfaces';
import CityList from '../components/CityList.tsx';
import Languages from '../layouts/Languages.tsx';

export default function CitySearchEngine({propsPageScrolled, propsPageMobile, handleActiveMobileMenu}:CitySearchEngineInterface) {
	const [error, setError] = useState<boolean>(false);
	const [cityList, setCityList] = useState<[] | null>();
	const [cityNotFound, setCityNotFound] = useState<boolean>(false);
	const [inputValue, setInputValue] = useState<string>();
	const [cityListIsActive, setCityIsListActive] = useState<boolean>(false);
	const [pageScrolled, setPageScrolled] = useState<boolean>(false);
	const [pageMobile, setPageMobile] = useState<boolean>(false);
	const { setCoordinates, lang } = useContext<appContextInterface>(AppContext);
	const location = useLocation();

	useEffect(() => {
		if(propsPageMobile) setPageMobile(true);
		if(pageScrolled !== propsPageScrolled) setPageScrolled(propsPageScrolled);
	});
	useEffect(() => {setCityIsListActive(false);setInputValue('');},[location]);

	const fetchData = () =>{
		fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=5&lang=${lang}&appid=22e4cc28098f4253c589877fc9e9cbd9`)
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
			setError(true);
		});
		setCityIsListActive(true);
	};

	const handleInput = (e: SyntheticEvent) => setInputValue((e.target as HTMLInputElement).value);
	const handleButton = () => {if(inputValue !== '') fetchData();};
	const handleClickCity = (lat: string | number, lon: string | number, city: string) =>{
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
		setError(false);
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
	const showArrow = ((cityList && cityListIsActive) || cityNotFound || error) ? 
		<div 
			className={arrowClassName} 
			onClick={()=> handleClickArrow()}
		>
			<i className='las la-angle-double-up'></i>
		</div>
		: null;
	const cityNotFoundWarningClassName = (pageScrolled && !pageMobile) ? 
		'city-search-engine__city-not-found city-search-engine__city-not-found--scrolled' 
		: 'city-search-engine__city-not-found';
	const cityNotFoundWarningText= (cityNotFound && !error) ? 
		<Languages text={'cityNotFound'}/>
		: (error) ?
			<Languages text={'citySearchError'}/>
			: null;
	const cityNotFoundWarning = (cityNotFound || error) ? 
		<div className={cityNotFoundWarningClassName}>{cityNotFoundWarningText}</div> 
		: null;
	const cityInputPlaceholder = (lang === 'pl') ?
		'Podaj miasto...'
		: 'Enter the city...';

	const handleCityList = 
		(cityList && cityListIsActive) ?
			<div className={cityClassName}>
				<CityList 
					cities={cityList}
					handleClickCity={handleClickCity}
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
		<form 
			className='city-search-engine__form' 
			onSubmit={e => e.preventDefault()}
		>
			<div className='city-search-engine__input-container'>
				<input 
					autoComplete='off'
					name='city'
					list='cities'
					className={inputClassName} 
					placeholder={cityInputPlaceholder}
					value={inputValue} 
					onChange={handleInput}
				/>
				<button 
					type='submit'
					onClick={()=> handleButton()} 
					className={buttonClassName}
				>
					<i className='las la-search'></i>
				</button>
			</div>
			{handleCityList}
		</form>
	</div>
  );
};