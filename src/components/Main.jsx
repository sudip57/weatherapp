import React, { useState,useEffect } from "react";
import Card from "./Card";
import Cardvertical from "./Cardvertical";
import TodayHighlight from "./TodayHighlight";
import DayForecast from "./DayForecast";
import Today from "./Today";

const Main = (props) => {
  function getCurrentTime12hr() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // 0 => 12

    const time12hr = `${hours}:${minutes} ${ampm}`;
    return time12hr;
  }
    function getLocalTime(timezoneOffsetInSeconds) {
    const nowUTC = new Date(Date.now() + new Date().getTimezoneOffset() * 60000); // convert to UTC
    const localTime = new Date(nowUTC.getTime() + timezoneOffsetInSeconds * 1000);
    return localTime.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }
  const { seven_day_forcast,curloc ,lat,lng,setcurloc,weatherData, curweatherData,Aqi,convertTimezone,unixToTime} = props;
  console.log('cur data inside main');
  const [curTime, setcurTime] = useState()
  const [sunset, setsunset] = useState()
  const [sunrise, setsunrise] = useState()
  useEffect(() => {
  if (curweatherData && curweatherData.timezone&&curweatherData.sys.sunset&&curweatherData.sys.sunrise) {
    const time = getLocalTime(curweatherData.timezone);
    setcurTime(time);
    setsunset(curweatherData.sys.sunset);
    setsunrise(curweatherData.sys.sunrise);
    }
  }, [curweatherData]);
  return (
    <div className="flex flex-col sm:flex sm:flex-row  sm:w-[calc(100%-100px)] items-center sm:justify-center">
      <div className="left h-[80%] sm:w-[40%] sm:h-[100%] curretnloc flex flex-col gap-2 ">
        <div className="w-full sm:h-1/2 rounded-2xl">
          <Today curloc={curloc} lat={lat} lng={lng} setcurloc={setcurloc} curweatherData={curweatherData} curTime={curTime}  sunset={sunset} sunrise={sunrise} convertTimezone={convertTimezone} unixToTime={unixToTime}  />
        </div>
        <div className="glassmorphism w-full h-1/2 rounded-2xl invisible sm:visible"></div>
      </div>
      <div className="right rounded-2xl flex flex-col mx-2 gap-2 w-[100%] sm:w-[60%] h-full">
        <TodayHighlight curweatherData={curweatherData} getLocalTime={getLocalTime} Aqi={Aqi} curTime={curTime}/>
        <DayForecast weatherData={weatherData}  seven_day_forcast={seven_day_forcast}/>
      </div>
    </div>
  );
};

export default Main;
