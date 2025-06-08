import React from "react";
import Card from "./Card";
import Cardvertical from "./Cardvertical";
import TodayHighlight from "./TodayHighlight";
import DayForecast from "./DayForecast";
import Today from "./Today";

const Main = (props) => {
  const { seven_day_forcast,curloc ,lat,lng,setcurloc,weatherData} = props;

  return (
    <div className="flex flex-col  sm:flex sm:flex-row  sm:w-[calc(100%-100px)] items-center sm:justify-center">
      <div className="left h-[80%] sm:w-[40%] sm:h-[100%] curretnloc flex flex-col gap-2 ">
        <div className="w-full sm:h-1/2 rounded-2xl">
          <Today curloc={curloc} lat={lat} lng={lng} setcurloc={setcurloc} weatherData={weatherData} />
        </div>
        <div className="glassmorphism w-full h-1/2 rounded-2xl invisible sm:visible"></div>
      </div>
      <div className="right rounded-2xl flex flex-col mx-2 gap-2 w-[100%] sm:w-[60%] h-full">
        <TodayHighlight weatherData={weatherData} />
        <DayForecast weatherData={weatherData}  seven_day_forcast={seven_day_forcast}/>
      </div>
    </div>
  );
};

export default Main;
