import React from 'react'

const Navbar = () => {
  return (
    <div className='m-5  flex justify-end'>
        <div className='flex rounded-full gray w-1/5 justify-center items-center px-5 text-gray-400'>
        <i className="fa-solid fa-magnifying-glass text-2xl"></i>
        <input className='flex justify-center items-center w-full rounded-full focus:outline-none border-0 text-white px-2 py-2'  type="text" placeholder='Search your location' />
        </div>
        <div className="mode gray rounded-full w-20 flex items-center justify-around px-2  mx-2">
            <i className="fa-regular fa-sun text-2xl text-gray-500"></i>
            <i className="fa-solid fa-moon text-2xl"></i>
            <div className="circle"></div>
        </div>
    </div>
   
  )
}

export default Navbar
