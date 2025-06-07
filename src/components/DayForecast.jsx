import React from "react";
import Card from "./Card";
import Cardvertical from "./Cardvertical";

const DayForecast = () => {
  return (
    <div className="gray w-[100%] h-[40%] rounded-2xl overflow-hidden">
      <div className="title">
        <h1 className="roboto font-bold text-2xl text-white mx-4 my-2">
          10 Day Forecast
        </h1>
      </div>
      <div className="weekly flex mx-4 gap-4 overflow-x-scroll  min-w-[60%] h-[75%] rounded-xl py-2">
        <Cardvertical />
        <Cardvertical />
        <Cardvertical />
        <Cardvertical />
        <Cardvertical />
        <Cardvertical />
        <Cardvertical />
        <Cardvertical />
        <Cardvertical />
        <Cardvertical />
        <Cardvertical />
      </div>
    </div>
  );
};

export default DayForecast;
