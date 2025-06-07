import React from 'react'

const Card = () => {
  return (
    <div className='lightgray w-40 h-30  rounded-2xl flex flex-col items-end justify-between p-4 roboto' >
      <p className='1st entry'>Wind Status</p>
      <p className='2nd entry'><span className='font-bold'>7.90</span> km/h</p>
      <p className='3rd entry'>9:00 AM</p>
    </div>
  )}

export default Card
