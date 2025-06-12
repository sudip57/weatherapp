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
  const [localsunrise, setlocalsunrise] = useState()
  const [localsunset, setlocalsunset] = useState()
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
  const nowUTC = new Date(Date.now() + new Date().getTimezoneOffset() * 60000);
  const localTime = new Date(nowUTC.getTime() + offsetInSeconds * 1000);

  let hours = localTime.getHours();
  const minutes = String(localTime.getMinutes()).padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // Convert hour '0' to '12'
  hours = String(hours).padStart(2, "0");

  return `${hours}:${minutes} ${ampm}`;
}
function unixToTime(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  hours = String(hours).padStart(2, "0");

  return `${hours}:${minutes} ${ampm}`;
}
  useEffect(() => {
    setLat(coords.lat);
    setLng(coords.lng);
  }, [coords]);
  const offsetMap = {
    "-18000": "America/New_York", // UTC−5 (EST, winter)
    "-14400": "America/New_York", // UTC−4 (EDT, summer)
    "-21600": "America/Chicago",
    "-25200": "America/Denver",
    "-28800": "America/Los_Angeles",
    19800: "Asia/Kolkata",
    0: "UTC",
    3600: "Europe/London",
    7200: "Europe/Berlin",
    32400: "Asia/Tokyo",
    28800: "Asia/Shanghai",
  };
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
  async function getSunriseSunset(lat, lon, timezone) {
    const url = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&date=today&formatted=0`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status !== "OK") {
        throw new Error("Failed to get data from Sunrise-Sunset API");
      }

      const { sunrise, sunset } = data.results;

      // Convert UTC to local time
      const sunriseLocal = new Date(sunrise).toLocaleTimeString("en-US", {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
      });

      const sunsetLocal = new Date(sunset).toLocaleTimeString("en-US", {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
      });

      console.log(`📍 Location: ${lat}, ${lon}`);
      console.log(`🌅 Sunrise: ${sunriseLocal}`);
      console.log(`🌇 Sunset: ${sunsetLocal}`);

      return { sunrise: sunriseLocal, sunset: sunsetLocal };
    } catch (error) {
      console.error("Error fetching sunrise/sunset:", error);
      return null;
    }
  }
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
  if (lat && lng && curweatherData?.timezone !== undefined) {
    const fetchSunInfo = async () => {
      const suninfo = await getSunriseSunset(lat, lng, offsetMap[curweatherData.timezone]);
      setlocalsunrise(suninfo.sunrise)
      setlocalsunset(suninfo.sunset)
    };
    fetchSunInfo(); 
    console.log("🌍 Fetching sun info...");
  }
}, [lat, lng, curweatherData?.timezone]);

  useEffect(() => {
    console.log("useeff weather");
    console.log(weatherData);
    console.log("getcurweatherdata");
    if (curweatherData) {
      console.log(curweatherData.timezone);
    }
    console.log(Aqi);
  }, [weatherData, curweatherData, Aqi]);
function isDaytime(sunrise, sunset, timezone) {
  const now = new Date();

  // Get current time in the target timezone
  const currentTimeStr = now.toLocaleTimeString("en-US", {
    timeZone: timezone,
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  const to24HourDate = (timeStr) => {
    const today = new Date().toLocaleDateString("en-CA", { timeZone: timezone }); // YYYY-MM-DD
    return new Date(`${today} ${timeStr}`);
  };

  const currentTime = to24HourDate(currentTimeStr);
  const sunriseTime = to24HourDate(sunrise);
  const sunsetTime = to24HourDate(sunset);
  console.log(currentTime)
  console.log(sunriseTime)
  console.log(sunsetTime)
  if(currentTime >= sunriseTime && currentTime <= sunsetTime){
    return true;
  }
  return false;
}

  return (
    <>
      {curweatherData ? (
        <div
          className={`app min-h-screen overflow-y-scroll w-full flex flex-col`}
        >
          {curweatherData?.sys && curweatherData?.weather[0]?.main ? (
           isDaytime(localsunrise,localsunset,offsetMap[curweatherData.timeZone]) ? (
              <div className="image-container">
                <img
                  src={
                    // weatherBackgrounds[curweatherData.weather[0].main] ||
                    "Clearbackground.png"
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
            <main className="flex flex-col mx-5  lg:flex lg:flex-row h-[87vh] lg:h-[86%]  overflow-y-scroll lg:overflow-y-hidden rounded-2xl">
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
                localsunrise={localsunrise}
                localsunset={localsunset}
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
