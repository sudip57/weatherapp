import React from "react";

const Cardvertical = () => {
  return (
    <div className="flex flex-col  items-center justify-between rounded-3xl gap-2 p-2 roboto text-white lightgray">
        <p className="title">Today</p>
        <img className="object-contain max-w-20" src="rainy.jpg" alt="" />
        <div className="temp">28C</div>
    </div>
  );
};

export default Cardvertical;
