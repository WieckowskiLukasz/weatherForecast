import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
	dataLoading: boolean;
	error: boolean;
	handleDataLoaded: (value: boolean) => boolean;
}

export default function LoadingScreen({dataLoading, error, handleDataLoaded}: LoadingScreenProps) {
  const [stateLoading, setStateLoading] = useState(true);
  const [stateError, setStateError] = useState(false);

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