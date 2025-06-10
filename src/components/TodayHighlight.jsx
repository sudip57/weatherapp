import React from "react";
import Card from "./Card";
import { useState } from "react";
const TodayHighlight = (props) => {
  const {curweatherData,Aqi,curTime} = props;
  console.log('inside')
  function convertUnixToTime(unixTime) {
    const date = new Date(unixTime * 1000);
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  }
  const sunrise = convertUnixToTime(curweatherData?.sys?.sunrise ?? null);
  const sunset = convertUnixToTime(curweatherData?.sys?.sunset ?? null);
 
  function Visibility() {
    const meters = curweatherData
      ? curweatherData.visibility
      : console.log("loading");
    if (typeof meters !== "number" || isNaN(meters)) {
      return "00";
    }
    return (meters / 1000).toFixed(2) + " km";
  }
  function convertMpsToKmph(mps) {
  return (mps * 3.6).toFixed(2); 
}
  

  return (
    <div className="glassmorphism w-[100%] h-[70%] rounded-2xl flex flex-col">
      <div className="title roboto font-bold text-white text-2xl m-5">
        <h1>Today's Highlight</h1>
      </div>
      <div className="flex flex-col sm:flex sm:flex-row gap-3 sm:gap-3 mx-1 sm:mx-5 items-center sm:w-[95%] sm:h-[70%]  sm:overflow-visible rounded-2xl px-2 py-3">
        <div className="statuscard w-full sm:w-[50%] sm:h-[100%] flex flex-col text-white gap-4">
          <div className="flex justify-center items-center max-h-[50%]  gap-2 ">
            <div className="wind glassmorphism_inside  w-[50%] h-full sm:w-40 sm:h-30 rounded-2xl flex flex-col items-end justify-between p-4 roboto">
              <p className="1st entry">Wind Staus</p>
              <p className="2nd entry">
                <span className="font-bold">
                  {curweatherData
                    ? convertMpsToKmph(curweatherData.wind.speed)
                    : console.log("loading")}
                </span>{" "}
                km/h
              </p>
              <p className="3rd entry">{curTime}</p>
            </div>
            <div className="humidity  glassmorphism_inside w-[50%] h-full sm:w-40 sm:h-30 rounded-2xl flex flex-col items-end justify-between p-4 roboto">
              <p className="1st entry">Humidity</p>
              <p className="2nd entry">
                <span className="font-bold">
                  {curweatherData
                    ? curweatherData.main.humidity
                    : console.log("loading")}
                </span>{" "}
                %
              </p>
              <p className="3rd entry">{curTime}</p>
            </div>
          </div>
          <div className=" flex items-center gap-2 h-[50%] justify-center">
            <div className="uvidnex glassmorphism_inside w-[50%] h-full sm:w-40 sm:h-30  rounded-2xl flex flex-col items-end justify-between p-4 roboto ">
              <p className="1st entry">AQI</p>
              <p className="2nd entry">
                <span className="font-bold">{Aqi.value}</span>
              </p>
              <p className="3rd entry">{Aqi.label}</p>
            </div>
            <div className="visibility  glassmorphism_inside w-[50%] h-full sm:w-40 sm:h-30 rounded-2xl flex flex-col items-end justify-between p-4 roboto">
              <p className="1st entry">Visibility</p>
              <p className="2nd entry">
                <span className="font-bold">{Visibility()}</span>
              </p>
              <p className="3rd entry">{curTime}</p>
            </div>
          </div>
        </div>
        <div className="w-full h-full flex flex-col gap-2  ">
          <div className="tab h-[50%]  glassmorphism_inside w-full rounded-2xl flex flex-wrap justify-between items-center p-4 roboto text-white">
            <div className="imgcontainer w-[100px] h-[80%] overflow-hidden flex items-center justify-center">
              <img
                className="max-w-full max-h-full object-contain rounded-xl"
                src="sunrise.jpg"
                alt=""
              />
            </div>

            <div className="suninfo">
              <p className="">Sunrise</p>
              <p className="suntime font-bold text-2xl">{sunrise}</p>
            </div>
          </div>
          <div className="tab h-[50%]  glassmorphism_inside w-full rounded-2xl flex flex-wrap justify-between items-center p-4 roboto text-white">
            <div className="imgcontainer w-[100px] h-[80%] overflow-hidden flex items-center justify-center ">
              <img
                className="max-w-full max-h-full object-contain rounded-xl"
                src="sunset.jpg"
                alt="Sunset"
              />
            </div>

            <div className="suninfo">
              <p className="">Sunset</p>
              <p className="suntime font-bold text-2xl">{sunset}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayHighlight;
