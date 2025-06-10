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
  const [Aqi, setAqi] = useState({ value: "-", label: "", message: "" })
  useEffect(() => {
    setLat(coords.lat);
    setLng(coords.lng);
  }, [coords]);
  function interpretAQI(aqi) {
  const aqiLevels = {
    1: { value: 50, label: "Good", message: "Air quality is considered satisfactory." },
    2: { value: 100, label: "Fair", message: "Air quality is acceptable." },
    3: { value: 150, label: "Moderate", message: "Sensitive individuals may experience minor issues." },
    4: { value: 200, label: "Poor", message: "Everyone may begin to experience health effects." },
    5: { value: 300, label: "Very Poor", message: "Health warnings of emergency conditions." }
  };

  return aqiLevels[aqi] || { value: "-", label: "Unknown", message: "Invalid AQI value." };
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
      const aqiurl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lng}&appid=${wAPI}`
      const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${wAPI}`
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&units=metric&appid=${wAPI}`;
      try {
        const res = await fetch(url);
        const res2 = await fetch(url2);
        const res3 =await fetch(aqiurl);
        if (!res.ok||!res2.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const wapiData = await res.json();
        const curwapiData = await res2.json();
        const curAqi  = await res3.json();
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
      }, 5*60*3000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId); // cleanup
    };
  }, [lat, lng]);
  useEffect(() => {
    console.log("useeff weather");
    console.log(weatherData);
    console.log('getcurweatherdata')
    if(curweatherData){
    console.log(curweatherData.timezone);
    }
    console.log(Aqi)
  }, [weatherData,curweatherData,Aqi]);

  return (
    <>

        <div className={`app min-h-screen overflow-y-scroll w-full flex flex-col bg-cover bg-${weatherData?(weatherData.list[0].weather[0].main):"bg-amber-600"} `}>
          <Navbar coords={coords} setCoords={setCoords} />
          <main className="flex flex-col mx-5 sm:flex sm:flex-row h-[85vh]  my-2">
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
            />
          </main>
        </div>
    </>
  );
}

export default App;
