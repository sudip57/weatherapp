import React from "react";
import Card from "./Card";
import Cardvertical from "./Cardvertical";
import { useState } from "react";
const DayForecast = (props) => {
  const { weatherData, seven_day_forcast } = props;
  return (
    <div className="glassmorphism w-[100%] h-[40%] rounded-2xl overflow-hidden">
      <div className="title">
        <h1 className="roboto font-bold text-2xl text-white mx-4 my-2">
          5 Day Forecast (Every 3 Hours)
        </h1>
      </div>
      <div className="weekly flex mx-4 gap-4 overflow-x-scroll  min-w-[60%] h-[75%] rounded-xl py-2">
        {seven_day_forcast.map((item, itemIndex) => {
          return <Cardvertical {...props} item={item} itemIndex={itemIndex} />;
        })}
      </div>
    </div>
  );
};

export default DayForecast;
