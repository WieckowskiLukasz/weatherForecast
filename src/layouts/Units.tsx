import React, {useContext} from 'react';
import { AppContext } from '../AppContext.tsx';
import {LanguagesInterface, appContextInterface} from '../components/Interfaces';

export default function Languages({text}: LanguagesInterface) {
  const {unit} = useContext<appContextInterface>(AppContext);

  const textArray = {
    metric: {
      temp: '°C',
      wind: 'm/s',
    },
    imperial: {
      temp: '°F',
      wind: 'm/h',
    },
  };

  return (
    <>
      {textArray[unit][text]}
    </>
  )
}
