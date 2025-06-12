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
    <div className="p-5 flex lg:justify-end justify-center">
      <div className="flex rounded-full  glassmorphism_inside w-full lg:w-[300px] justify-center items-center px-5 text-white border border-amber-50">
        <i className="fa-solid fa-magnifying-glass text-2xl text-emerald-600"></i>
        <input
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="flex justify-center items-center w-full rounded-full focus:outline-none border-0 text-white px-2 py-2"
          type="text"
          placeholder="Search your location"
        />
      </div>
    </div>
  );
};

export default Navbar;
