  export const getDayOfWeek = (propsDate, timezone = 0) =>{
    const timestamp = propsDate + timezone + offsetUTC();
    const date = new Date(timestamp*1000);
    const days = ['Niedziela','Poniedziałek','Wtorek','Środa','Czwartek','Piątek','Sobota'];
    const dayOfWeek = days[date.getDay()];
    return(dayOfWeek);
  };

  export const getHour = (propsDate, timezone = 0) =>{
    const timestamp = propsDate + timezone + offsetUTC();
    const date = new Date(timestamp * 1000);
    let hours = date.getHours();
    if(hours < 10) hours = '0' + hours;
    const minutes = "0" + date.getMinutes();
    const formattedTime = hours + ':' + minutes;
    return(formattedTime);
  };

  export const cookieExpires = () =>{
    let date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    return(date.toUTCString());
  };

  const offsetUTC = () =>{
    const date = new Date();
    const offset = date.getTimezoneOffset();
    const offsetSeconds = offset * 60;
    return offsetSeconds;
  };

