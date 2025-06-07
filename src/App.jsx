import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";

function App() {
  const [curloc, setcurloc] = useState();
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
function removePinFromAddress(rawAddress) {
  let cleaned = rawAddress.replace(/-\s*\d{6}/g, '');
  const parts = cleaned
    .split(',')
    .map(p => p.trim())
    .filter(p => !/^\d{6}$/.test(p)); 
  return parts;
}
  function getCurrentLoc() {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const data = await fetchPlaceName(
          position.coords.latitude,
          position.coords.longitude
        );
        const list = removePinFromAddress(data);
        const newData = list[1]+", "+list[2]+", "+list[4];
        setcurloc(newData);
        console.log(newData);
      },
      (error) => {
        console.log("Failed to fetch location", error);
      }
    );
  }

  useEffect(() => {
    getCurrentLoc();
  }, []);
  return (
    <>
      <div className="app">
        <Navbar />
        <main className="flex mx-5">
          <Sidebar />
          <Main curloc={curloc} />
        </main>
      </div>
    </>
  );
}

export default App;
