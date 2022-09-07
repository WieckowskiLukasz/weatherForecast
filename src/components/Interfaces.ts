interface CitySearchEngineInterface {
	propsPageScrolled: boolean;
	propsPageMobile: boolean;
	handleActiveMobileMenu: (value: boolean) => boolean;
};

interface CityListInterface {
	cities: any[];
	handleClickCity: (lat: string | number, lon: string | number, name: string) => void;
	pageScrolled: boolean;
	mobile: boolean;
};

interface CityItemInterface {
	name: string;
	country: string;
	lat: string | number;
	lon: string | number;
	handleClickCity: (lat: string | number, lon: string | number, name: string) => void;
	pageScrolled: boolean;
	mobile: boolean;
};

interface DayElementsInterface {
  forecast: any[];
}

interface OneDayElementInterface {
  day: string;
	date: string;
	temp: number;
	description: string;
  icon: string;
  feelsLike: number;
  clouds: number;
  humidity: number;
  pressure: number;
  wind: number;
  oneDayForeceast: any[];
};

interface LoadingScreenInterface {
	dataLoading: boolean;
	error: boolean;
	handleDataLoaded: (value: boolean) => boolean;
};

interface WeatherBackgroundInterface {
	backgroundCode: string;
};

interface WeatherIconInterface {
	iconCode: string;
};

interface OneHourElementInterface {
	date: number;
	temp: number;
	description: string;
  icon: JSX.Element;
  feelsLike: number;
  clouds: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  className: string;
  timezone: number;
};

interface WeatherHourElementsInterface {
	forecast: any[];
	className: string;
	timezone: number;
};

interface daysMainDataInterface {
	clouds: number;
  day: string;
  feels_like: number;
  temp: number;
  humidity: number;
  pressure: number;
  icon: string;
  description: string;
  wind: number;
};

interface LanguagesInterface {
	text: string;
};

interface appContextDefaultObjectInterface { 
  lat: number | string;
  lon: number | string;
  city: string;
  lang: string;
  unit: string;
}; 

interface appContextInterface { 
  lat: number | string;
  lon: number | string;
  city: string;
  lang: string;
  unit: string;
  setCoordinates: (lat: number | string, lon: number | string, city: string) => void;
  setLanguage: (lang: string) => void;
  setUnits: (unit: string) => void;
};

export{
  CitySearchEngineInterface,
  CityListInterface,
  CityItemInterface,
  DayElementsInterface,
  OneDayElementInterface,
  LoadingScreenInterface,
  WeatherBackgroundInterface,
  OneHourElementInterface,
  WeatherHourElementsInterface,
  WeatherIconInterface,
	daysMainDataInterface,
  LanguagesInterface,
  appContextDefaultObjectInterface,
  appContextInterface,
};