import React, { useState, useEffect } from 'react';
import {LoadingScreenInterface} from '../components/Interfaces';

export default function LoadingScreen({dataLoading, error, handleDataLoaded}: LoadingScreenInterface) {
  const [stateLoading, setStateLoading] = useState<boolean>(true);
  const [stateError, setStateError] = useState<boolean>(false);

  useEffect(() =>{
    handleTimeout();
    setStateLoading(true);
  },[dataLoading, error]);

  const setState = () =>{
    setStateLoading(dataLoading);
    setStateError(error);
    if(!dataLoading && !error) handleDataLoaded(true);
  };
  const handleTimeout = () =>{
    const timer = setTimeout(() => {
      setState();
    }, 600);
    return () => clearTimeout(timer);
  };

  const loadingScreen = (stateLoading && !stateError) ? 
    <i className="wi wi-day-sunny"></i>
    : null; 

  const errorScreen = stateError ? 
    <div className='loading-screen__error'>
      Przepraszamy wystąpił błąd.
      <br></br>
      Zapraszamy w innym terminie.
    </div> 
    : null; 

  const loading = (stateLoading || stateError) ?  
    <div className='loading-screen' >
      {loadingScreen}
      {errorScreen}
    </div>
    : null;
  
  return (
    <>
      {loading}
    </>
  );
};