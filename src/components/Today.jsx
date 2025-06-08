import React from "react";
import { useState } from "react";
import { useEffect } from "react";
const Today = (props) => {
  const { curloc, lat, lng, setcurloc, weatherData } = props;
  //currentDate
  const [desc, setdesc] = useState("Loading...");

  useEffect(() => {
    if (weatherData) {
      setdesc(weatherData.list[0].weather[0].main);
    }
  }, [weatherData]);

  function getCurrentDayAndDate() {
    const now = new Date();

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];

    const day = days[now.getDay()]; // e.g., "Sunday"
    const date = String(now.getDate()).padStart(2, "0"); // e.g., "04"
    const month = months[now.getMonth()]; // e.g., "AUG"
    const year = now.getFullYear(); // e.g., 2025

    const formattedDate = `${date} ${month}, ${year}`; // e.g., "04 AUG, 2025"

    return { day, date: formattedDate };
  }

  // Example usage:
  const { day, date } = getCurrentDayAndDate();
  //Fetch Place Name with long and lat
  console.log(lat);
  console.log(lng);
  const fetchPlaceName = async (lat, lng) => {
    const apiKey = "6cfe7030e96e450ab12143c0f8abfa7f";
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      const place = data.results[0].formatted;
      return place;
    } catch (error) {
      console.error("Failed to fetch place name:", error);
    }
  };
  //Filter fetch loc
  function removePinFromAddress(rawAddress) {
    let cleaned = rawAddress.replace(/-\s*\d{6}/g, "");
    const parts = cleaned
      .split(",")
      .map((p) => p.trim())
      .filter((p) => !/^\d{6}$/.test(p));
    return parts;
  }
  //update loc
  async function updateCurloc() {
    const data = await fetchPlaceName(lat, lng);
    const list = removePinFromAddress(data);
    const newData = list[1] + ", " + list[2] + ", " + list[4];
    setcurloc(newData);
  }
  useEffect(() => {
    if (lat && lng) {
      updateCurloc();
    }
  }, [lat, lng]);

  return (
    <div className="h-full  -amber-100">
      <div className="currentloc flex justify-between m-5 roboto text-white">
        <div className="min-h-[30px] rounded-xl lightgray flex justify-center items-center  text-[15px] sm:text-xl">
          <p className="p-2 text-center">{curloc}</p>
        </div>
      </div>
      <div className="flex m-5 h-[70%] items-center sm:flex ">
        <div className="Day sm:text-2xl roboto text-white w-1/3">
          <p>{day}</p>
          <p>{date}</p>
        </div>
        <div className="w-[50%] overflow-hidden flex items-center justify-center">

          <img className="max-w-full max-h-full object-contain" src={`${desc}.png`} alt="" />
        </div>
        <div className="details sm:text-2xl flex flex-col justify-around items-end text-white w-1/3  h-[70%] sm:h-full py-2">
          <p>
            {weatherData
              ? weatherData.list[0].main.temp
              : console.log("loading")}
            °C
          </p>
          <div className="flex flex-col items-end  ">
            <div className="text-right">
              <p className="sm:text-[20px]">
              {weatherData
                ? weatherData.list[0].weather[0].description
                : console.log("loading")}
            </p>
            </div>
            <p className="sm:text-[13px] text-[10px] ">
              Feels like{" "}
              {weatherData
                ? weatherData.list[0].main.feels_like
                : console.log("loading")}
              °C
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Today;
