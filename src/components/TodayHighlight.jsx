import React from "react";
import Card from "./Card";
import { useState } from "react";
const TodayHighlight = (props) => {
  const { weatherData } = props;
  function convertUnixToTime(unixTime) {
    const date = new Date(unixTime * 1000);
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  }
  const sunrise = convertUnixToTime(weatherData?.city?.sunrise ?? null);
  const sunset = convertUnixToTime(weatherData?.city?.sunset ?? null);

  function Visibility() {
    const meters = weatherData
      ? weatherData.list[0].visibility
      : console.log("loading");
    if (typeof meters !== "number" || isNaN(meters)) {
      return "Invalid input";
    }
    return (meters / 1000).toFixed(2) + " km";
  }
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

  return (
    <div className="gray w-[100%] h-[60%] rounded-2xl flex flex-col">
      <div className="title roboto font-bold text-white text-2xl m-5">
        <h1>Today's Highlight</h1>
      </div>
      <div className="flex gap-3 mx-5 items-center">
        <div className="w-[50%] flex flex-col text-white gap-2">
          <div className="flex items-center flex  gap-2">
            <div className="wind lightgray w-40 h-30  rounded-2xl flex flex-col items-end justify-between p-4 roboto">
              <p className="1st entry">Wind Staus</p>
              <p className="2nd entry">
                <span className="font-bold">
                  {weatherData
                    ? weatherData.list[0].wind.speed
                    : console.log("loading")}
                </span>{" "}
                km/h
              </p>
              <p className="3rd entry">{getCurrentTime12hr()}</p>
            </div>
            <div className="humidity lightgray w-40 h-30  rounded-2xl flex flex-col items-end justify-between p-4 roboto">
              <p className="1st entry">Humidity</p>
              <p className="2nd entry">
                <span className="font-bold">
                  {weatherData
                    ? weatherData.list[0].main.humidity
                    : console.log("loading")}
                </span>{" "}
                %
              </p>
              <p className="3rd entry">{getCurrentTime12hr()}</p>
            </div>
          </div>
          <div className="flex items-center flex  gap-2">
            <div className="uvidnex lightgray w-40 h-30  rounded-2xl flex flex-col items-end justify-between p-4 roboto">
              <p className="1st entry">Wind Status</p>
              <p className="2nd entry">
                <span className="font-bold">7.90</span> km/h
              </p>
              <p className="3rd entry">9:00 AM</p>
            </div>
            <div className="visibility lightgray w-40 h-30  rounded-2xl flex flex-col items-end justify-between p-4 roboto">
              <p className="1st entry">Visibility</p>
              <p className="2nd entry">
                <span className="font-bold">{Visibility()}</span>
              </p>
              <p className="3rd entry">{getCurrentTime12hr()}</p>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2  ">
          <div className=" lightgray h-fit w-full rounded-2xl flex flex-wrap justify-between items-center p-4 roboto text-white">
            <div className="flex items-center justify-center">
              <img
              className="max-w-40 h-auto rounded-2xl object-cover"
              src="sunrise.jpg"
              alt=""
            />
            </div>
            
            <div>
              <p className="">Sunrise</p>
              <p className="font-bold text-2xl">{sunrise}</p>
            </div>
          </div>
          <div className=" lightgray w-full rounded-2xl flex flex-wrap justify-between items-center p-4 roboto text-white">
            <div className="flex items-center justify-center">
              <img
                className="max-w-40 max-h-full rounded-2xl object-contain"
                src="sunset.jpg"
                alt="Sunset"
              />
            </div>

            <div>
              <p className="">Sunset</p>
              <p className="font-bold text-2xl">{sunset}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayHighlight;
