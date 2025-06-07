import React from "react";
import { useEffect } from "react";
const Today = (props) => {
  const  {curloc} = props;
  return (
    <div className="h-full">
      <div className="currentloc flex justify-between m-5 roboto text-white">
        <div className="min-h-[30px] rounded-xl lightgray flex justify-center items-center">
          <p className="p-2 text-center">{curloc}</p>
        </div>
        <div className="w-[40px] h-[30px] rounded-xl lightgray flex justify-center items-center">
          <p>C</p>
        </div>
      </div>
      <div className="flex m-5 h-[70%] ">
        <div className="Day text-2xl roboto text-white w-1/3">
          <p>Sunday</p>
          <p>04 Aug,2025</p>
        </div>
        <div className="flex  w-1/3 ">
          <img className="object-contain " src="rainy.jpg" alt="" />
        </div>
        <div className="details text-2xl flex flex-col justify-around items-end text-white w-1/3">
          <p>28c</p>
          <div className="flex flex-col items-end">
            <p className="text-[20px]">Heavy Rain</p>
            <p className="text-[13px]">Feels like 31</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Today;
