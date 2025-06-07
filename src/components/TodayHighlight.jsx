import React from 'react'
import Card from './Card'

const TodayHighlight = () => {
  return (

      <div className="gray w-[100%] h-[60%] rounded-2xl flex flex-col">
          <div className="title roboto font-bold text-white text-2xl m-5">
            <h1>Today's Highlight</h1>
          </div>
          <div className='flex gap-3 mx-5'>
          <div className="w-[50%] flex flex-col text-white gap-2">
            <div className="flex items-center flex  gap-2">
              <Card />
              <Card />
            </div>
            <div className="flex items-center flex  gap-2">
              <Card />
              <Card />
            </div>
          </div>
          <div className='w-full flex flex-col gap-2'>
            <div className=' lightgray h-[50%] w-full rounded-2xl flex justify-between items-center p-4 roboto text-white'>
                <img className='object-contain max-w-[60px]' src="rainy.jpg" alt="" />
                <div >
                    <p className=''>Sunrise</p>
                    <p className='font-bold text-2xl'>4:50 AM</p>
                </div>
            </div>
            <div className=' lightgray h-[50%] w-full rounded-2xl flex justify-between items-center p-4 roboto text-white'>
                <img className='object-contain max-w-[60px]' src="rainy.jpg" alt="" />
                <div >
                    <p className=''>Sunset</p>
                    <p className='font-bold text-2xl'>6:50 PM</p>
                </div>
            </div>
          </div>
          </div>
        </div>
  )
}

export default TodayHighlight
