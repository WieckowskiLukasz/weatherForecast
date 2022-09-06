import React, {useContext} from 'react';
import { AppContext } from '../AppContext.tsx';
import {LanguagesInterface, appContextInterface} from '../components/Interfaces';

export default function Languages({text}: LanguagesInterface) {
  const {lang} = useContext<appContextInterface>(AppContext);

  const textArray = {
    pl: {
      actualWeatherNavLink: 'Aktualna pogoda',
      forecastNavLink: 'Prognoza',
      citySearchEnginePlaceholder: 'Podaj miasto...',
      cityNotFound: 'nie znaleziono miasta',
      citySearchError: 'błąd wyszukiwania',
      feelsLike: 'Temp. odczuwalna',
      clouds: 'Zachmurzenie',
      humidity: 'Wilgotność',
      pressure: 'Ciśnienie',
      wind: 'Wiatr',
      forecast: 'Prognoza',
      page404Text: 'Strona o podanym adresie nie istnieje.',
      page404Button: 'Przejdź do strony głównej',
      cookiesInfo: 'Strona korzysta z plików cookies w celu realizacji usług i zgodnie z Polityką Prywatności. Możesz określić warunki przechowywania lub dostępu do plików cookies w Twojej przeglądarce.',
      acceptButton: 'Akceptuję'
    },
    en: {
      actualWeatherNavLink: 'Actual weather',
      forecastNavLink: 'Forecast',
      citySearchEnginePlaceholder: 'Enter the city...',
      cityNotFound: 'city not found',
      citySearchError: 'search error',
      feelsLike: 'Feels like',
      clouds: 'Clouds',
      humidity: 'Humidity',
      pressure: 'Pressure',
      wind: 'Wind',
      forecast: 'Forecast',
      page404Text: 'Page you requested does not exist.',
      page404Button: 'Go to the home page',
      cookiesInfo: 'The website uses cookies to provide services in accordance with the Privacy Policy. You can define the conditions for storing or accessing cookies in your browser.',
      acceptButton: 'Accept',
    },
  };

  return (
    <>
      {textArray[lang][text]}
    </>
  )
}
