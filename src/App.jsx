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
  const [coords, setCoords] = useState({lat,lng});
  const [seven_day_forcast, setseven_day_forcast] = useState([]);
  useEffect(() => {
    setLat(coords.lat)
    setLng(coords.lng)
  }, [coords]);
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
    async function getWeatherInfo() {
      const wAPI = "ea644d2e82b5bb751764a5dc3ac658e5";
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&units=metric&appid=${wAPI}`;
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const wapiData = await res.json();
        console.log(wapiData);
        setWeatherData(wapiData);
        setseven_day_forcast(wapiData.list);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      }
    }
    let intervalId;
    if (lat && lng) {
      getWeatherInfo();
      const intervalId = setInterval(() => {
      console.log("runnig")
      getWeatherInfo(); 
      }, 5*60*1000);
    }
     return () => {
    if (intervalId) clearInterval(intervalId); // cleanup
  };
  }, [lat, lng]);
  useEffect(() => {
    console.log("useeff weather");
    console.log(weatherData);
    console.log(seven_day_forcast);
  }, [weatherData]);
 
  return (
    <>
      <div className="app">
        <Navbar coords={coords} setCoords={setCoords} />
        <main className="flex mx-5">
          <Sidebar />
          <Main
            curloc={curloc}
            lat={lat}
            lng={lng}
            setcurloc={setcurloc}
            weatherData={weatherData}
            seven_day_forcast={seven_day_forcast}
          />
        </main>
      </div>
    </>
  );
}

export default App;
