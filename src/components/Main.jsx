import React from "react";
import Card from "./Card";
import Cardvertical from "./Cardvertical";
import TodayHighlight from "./TodayHighlight";
import DayForecast from "./DayForecast";
import Today from "./Today";

const Main = (props) => {
  const {curloc}=props;

  return (
    <div className="flex w-[calc(100%-100px)] h-[85vh] items-center">
      <div className="left  w-[40%] h-full curretnloc flex flex-col gap-2  ">
        <div className="gray w-full h-[50%] rounded-2xl">
          <Today curloc={curloc} />
        </div>
        <div className="gray w-full h-[50%]  rounded-2xl">2</div>
      </div>
      <div className="right rounded-2xl flex flex-col m-2 gap-2 w-[60%] h-full">
        <TodayHighlight />
        <DayForecast/>
      </div>
    </div>
  );
};

export default Main;
