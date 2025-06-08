import React from "react";
import { useState } from "react";
const Navbar = (props) => {
  const {coords,setCoords}=props;
  const [inputValue, setInputValue] = useState("");
  const [storedValue, setStoredValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  async function getLatLngFromCity(city) {
    const API_KEY = "6cfe7030e96e450ab12143c0f8abfa7f"; // Replace with your API key
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      city
    )}&key=${API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        setCoords({ lat, lng });
      } else {
        throw new Error("No results found");
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      throw error;
    }
  }
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setStoredValue(inputValue.trim());
      getLatLngFromCity(inputValue.trim());
      setInputValue("");
      console.log(coords.lat);
    }
  };
  console.log(storedValue);
  return (
    <div className="m-5  flex sm:justify-end justify-center">
      <div className="flex rounded-full gray sm:w-[300px] justify-center items-center px-5 text-gray-400">
        <i className="fa-solid fa-magnifying-glass text-2xl"></i>
        <input
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="flex justify-center items-center w-full rounded-full focus:outline-none border-0 text-white px-2 py-2"
          type="text"
          placeholder="Search your location"
        />
      </div>
      <div className="mode gray rounded-full w-20 flex items-center justify-around px-2  mx-2">
        <i className="fa-regular fa-sun text-2xl text-gray-500"></i>
        <i className="fa-solid fa-moon text-2xl"></i>
        <div className="circle"></div>
      </div>
    </div>
  );
};

export default Navbar;
