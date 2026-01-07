import React from 'react'
import { Outlet } from 'react-router-dom'

function Navbar() {
  return (
    <> <div className='w-full  flex flex-col  items-center overflow-x-hidden'>
     <div className='bg-amber-500 w-full h-[50px] text-white'>Navbar</div>
    </div>
    <Outlet/>
    </>
   
  )
}

export default Navbar
