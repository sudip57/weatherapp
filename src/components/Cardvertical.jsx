import React from "react";

const Cardvertical = (props) => {
  const{item} = props;

  function getDayLabel(dateStr) {
  const inputDate = new Date(dateStr);
  const today = new Date();
  const isToday =
    inputDate.getFullYear() === today.getFullYear() &&
    inputDate.getMonth() === today.getMonth() &&
    inputDate.getDate() === today.getDate();
  if (isToday) return "Today";
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[inputDate.getDay()];
  }
  function convertTo12HourFormat(time24) {
  const [hourStr, minuteStr] = time24.split(":");
  let hour = parseInt(hourStr, 10);
  const minute = minuteStr;
  const ampm = hour >= 12 ? "PM" : "AM";

  hour = hour % 12;
  hour = hour ? hour : 12; // 0 => 12

  return `${hour}:${minute} ${ampm}`;
}
  return (
    <div className="flex flex-col min-w-[120px]  sm:min-w-[100px] max-h-[95%]  items-center justify-between rounded-3xl gap-2 p-2 roboto text-white  glassmorphism_inside">
        <p className="title text-amber-500 font-bold">{getDayLabel(item.dt_txt)}</p>
        <p>{convertTo12HourFormat(item.dt_txt.split(' ')[1])}</p>
        <div className="overflow-hidden flex items-center justify-center rounded-xl">
               <img className="object-contain max-w-full max-h-full object-contain" src={`${item.weather[0].main}.png`} alt="" />
        </div>
        <div className="temp text-red-400 font-bold">{item.main.temp}°C</div>
    </div>
  );
};

export default Cardvertical;
