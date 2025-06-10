import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";

function App() {
  const [curloc, setcurloc] = useState();
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [curweatherData, setcurweatherData] = useState(null);
  const [coords, setCoords] = useState({ lat, lng });
  const [seven_day_forcast, setseven_day_forcast] = useState([]);
  const [Aqi, setAqi] = useState({ value: "-", label: "", message: "" });
  const weatherBackgrounds = {
    Clear: "clearbackground.jpg",
    Clouds: "cloudbackground.gif",
    Dust: "Dust.jpg",
    Rain: "rainybackground.gif",
    Thunderstorm: "thunderstormbackground.gif",
    Haze: "Haze.jpg",
    Mist: "mist.jpg",
    Drizzle: "drizzle.jpg",
    Sand: "Sand.jpg",
    Snow: "Snow.jpg",
    Smoke: "Smoke.png",
  };
  function convertTimezone(offsetInSeconds) {
    const nowUTC = new Date(
      Date.now() + new Date().getTimezoneOffset() * 60000
    );
    const localTime = new Date(nowUTC.getTime() + offsetInSeconds * 1000);

    const hours = String(localTime.getHours()).padStart(2, "0");
    const minutes = String(localTime.getMinutes()).padStart(2, "0");
    console.log(hours);
    return `${hours}:${minutes}`;
  }
  function unixToTime(unixTimestamp) {
    // Convert Unix timestamp (in seconds) to milliseconds
    const date = new Date(unixTimestamp * 1000);

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    console.log(hours);
    return `${hours}:${minutes}`;
  }
  useEffect(() => {
    setLat(coords.lat);
    setLng(coords.lng);
  }, [coords]);
  function interpretAQI(aqi) {
    const aqiLevels = {
      1: {
        value: 50,
        label: "Good",
        message: "Air quality is considered satisfactory.",
      },
      2: { value: 100, label: "Fair", message: "Air quality is acceptable." },
      3: {
        value: 150,
        label: "Moderate",
        message: "Sensitive individuals may experience minor issues.",
      },
      4: {
        value: 200,
        label: "Poor",
        message: "Everyone may begin to experience health effects.",
      },
      5: {
        value: 300,
        label: "Very Poor",
        message: "Health warnings of emergency conditions.",
      },
    };

    return (
      aqiLevels[aqi] || {
        value: "-",
        label: "Unknown",
        message: "Invalid AQI value.",
      }
    );
  }
  function getCurrentLoc() {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      },
      (error) => {
        console.log("Failed to fetch location", error);
      }
    );
  }

  useEffect(() => {
    getCurrentLoc();
  }, []);

  useEffect(() => {
    let intervalId;
    async function getWeatherInfo() {
      const wAPI = import.meta.env.VITE_WEATHER_API;
      const aqiurl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lng}&appid=${wAPI}`;
      const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${wAPI}`;
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&units=metric&appid=${wAPI}`;
      try {
        const res = await fetch(url);
        const res2 = await fetch(url2);
        const res3 = await fetch(aqiurl);
        if (!res.ok || !res2.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const wapiData = await res.json();
        const curwapiData = await res2.json();
        const curAqi = await res3.json();
        setAqi(interpretAQI(curAqi.list[0].main.aqi));
        console.log("aqi");
        setWeatherData(wapiData);
        setcurweatherData(curwapiData);
        setseven_day_forcast(wapiData.list);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      }
    }
    if (lat && lng) {
      getWeatherInfo();
      intervalId = setInterval(() => {
        console.log("runnig");
        getWeatherInfo();
      }, 5 * 60 * 3000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId); // cleanup
    };
  }, [lat, lng]);
  useEffect(() => {
    console.log("useeff weather");
    console.log(weatherData);
    console.log("getcurweatherdata");
    if (curweatherData) {
      console.log(curweatherData.timezone);
    }
    console.log(Aqi);
  }, [weatherData, curweatherData, Aqi]);
  function Day_Night() {
    if (curweatherData)
      if (
        convertTimezone(curweatherData.timezone) <
          unixToTime(curweatherData.sys.sunrise) ||
        convertTimezone(curweatherData.timezone) >
          unixToTime(curweatherData.sys.sunset)
      ) {
        return false;
      } else {
        return true;
      }
  }
 function isDaytime(timezone, sunrise, sunset) {
  const currentUTC = Math.floor(Date.now() / 1000); // current time in UTC (seconds)

  // DO NOT add timezone here. Sunrise and sunset are already in UTC.
  return currentUTC >= sunrise && currentUTC < sunset;
}
  return (
    <>
      {curweatherData ? (
          <div
        className={`app min-h-screen overflow-y-scroll w-full flex flex-col`}
      >
        {curweatherData?.sys && curweatherData?.weather[0]?.main ? (
          isDaytime(
            curweatherData.timezone,
            curweatherData.sys.sunrise,
            curweatherData.sys.sunset
          ) ? (
            <div className="image-container">
              <img
                src={
                  weatherBackgrounds[curweatherData.weather[0].main] ||
                  "Clearbackground.jpg"
                }
                alt={curweatherData.weather[0].main}
              />
            </div>
          ) : (
            <div className="image-container">
              <img src="Night.jpg" alt="Night" />
            </div>
          )
        ) : (
          <p>Loading weather info...</p>
        )}
        <div className="absolute w-[100%] h-full">
          <Navbar
            coords={coords}
            setCoords={setCoords}
            className="z-1 absolute"
          />
          <main className="flex flex-col mx-5  sm:flex sm:flex-row h-[87vh] sm:h-[86%]  overflow-y-scroll sm:overflow-y-hidden rounded-2xl">
            <Sidebar />
            <Main
              curloc={curloc}
              lat={lat}
              lng={lng}
              setcurloc={setcurloc}
              weatherData={weatherData}
              curweatherData={curweatherData}
              seven_day_forcast={seven_day_forcast}
              Aqi={Aqi}
              convertTimezone={convertTimezone}
              unixToTime={unixToTime}
            />
          </main>
        </div>
      </div>
      ) : (
        <div className="loadingState h-full flex justify-center items-center">
          <i className="fa-solid fa-gear text-white"></i>
        </div>
      )}
    
    </>
  );
}

export default App;
