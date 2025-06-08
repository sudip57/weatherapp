import React from "react";
import Card from "./Card";
import Cardvertical from "./Cardvertical";
import TodayHighlight from "./TodayHighlight";
import DayForecast from "./DayForecast";
import Today from "./Today";

const Main = (props) => {
  const { seven_day_forcast,curloc ,lat,lng,setcurloc,weatherData} = props;

  return (
    <div className="flex flex-col  sm:overflow-visible sm:flex sm:flex-row  sm:w-[calc(100%-100px)] h-[85vh] items-center ">
      <div className="left h-auto sm:w-[40%] sm:h-full curretnloc flex flex-col gap-2 ">
        <div className="gray w-full sm:h-[50%] rounded-2xl">
          <Today curloc={curloc} lat={lat} lng={lng} setcurloc={setcurloc} weatherData={weatherData} />
        </div>
        <div className="gray w-full hidden sm:h-[50%] rounded-2xl"></div>
      </div>
      <div className="right rounded-2xl flex flex-col m-2 gap-2 w-[100%] sm:w-[60%] h-full ">
        <TodayHighlight weatherData={weatherData} />
        <DayForecast weatherData={weatherData}  seven_day_forcast={seven_day_forcast}/>
      </div>
    </div>
  );
};

export default Main;
