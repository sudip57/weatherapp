import React from "react";
import { useState } from "react";
import { useEffect } from "react";
const Today = (props) => {
  const {
    curloc,
    lat,
    lng,
    setcurloc,
    curweatherData,
    curTime,
    sunrise,
    sunset,
    convertTimezone,
    unixToTime,
  } = props;
  console.log("cur data inside today");
  console.log(convertTimezone(curweatherData.timezone))
  console.log(unixToTime(sunrise))
  console.log(unixToTime(sunset))
  //currentDate
  const [desc, setdesc] = useState("Loading...");
 function timeToMinutes(timeStr) {
  if (typeof timeStr !== "string" || !timeStr.includes(" ")) {
    console.error("Invalid time string:", timeStr);
    return null;
  }

  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (isNaN(hours) || isNaN(minutes)) {
    console.error("Invalid time format:", timeStr);
    return null;
  }

  if (modifier === "PM" && hours !== 12) {
    hours += 12;
  }
  if (modifier === "AM" && hours === 12) {
    hours = 0;
  }

  return hours * 60 + minutes;
}

function isDay(currentTime, sunrise, sunset) {
  const currentMinutes = timeToMinutes(currentTime);
  const sunriseMinutes = timeToMinutes(sunrise);
  const sunsetMinutes = timeToMinutes(sunset);

  return currentMinutes >= sunriseMinutes && currentMinutes < sunsetMinutes;
}
  useEffect(() => {
    if (curweatherData && sunset && sunrise) {
        if (!isDay(convertTimezone(curweatherData.timezone,unixToTime(sunrise),unixToTime(sunset)))) {
          if (curweatherData.weather[0].main == "Clear") {
            setdesc("Moon");
          } else {
            setdesc(curweatherData.weather[0].main);
          }
        } else {
          console.log("not working...............")
          setdesc(curweatherData.weather[0].main);
        }
      }
  }, [curweatherData, sunset, sunrise]);
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
    <div className="h-full glassmorphism  rounded-2xl">
      <div className="currentloc flex justify-between m-5 roboto text-white">
        <div className="glassmorphism_inside min-h-[30px] rounded-xl flex justify-center text-[15px] lg:text-xl">
          <div className="flex items-center my-2 mx-2 gap-2 ">
            <i className="text-teal-500 fa-solid fa-location-dot"></i>
            <p className="text-left ">{curloc}</p>
          </div>
        </div>
      </div>
      <div className="flex m-5 h-[70%] lg:flex ">
        <div className="Day lg:text-2xl roboto text-amber-300 w-1/3">
          <p>{day}</p>
          <p>{date}</p>
        </div>
        <div className="w-[50%] overflow-hidden flex items-center justify-center">
          <img
            className="max-w-full max-h-full object-contain"
            src={`${desc}.png`}
            alt=""
          />
        </div>
        <div className="details lg:text-2xl flex flex-col justify-around items-end w-1/3  h-[70%] lg:h-full py-2">
          <p className="text-orange-300 font-bold ">
            {curweatherData ? curweatherData.main.temp : console.log("loading")}
            °C
          </p>
          <div className="flex flex-col items-end py-5">
            <div className="text-right">
              <p className="lg:text-[20px] text-cyan-200">
                {curweatherData
                  ? curweatherData.weather[0].description
                  : console.log("loading")}
              </p>
            </div>
            <p className="lg:text-[14px] text-[10px] text-right text-rose-500 ">
              Feels like{" "}
              {curweatherData
                ? curweatherData.main.feels_like
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
