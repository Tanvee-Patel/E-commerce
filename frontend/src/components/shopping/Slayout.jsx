import React from 'react'
import { Outlet } from 'react-router-dom'
import SHeader from './SHeader'
import SFooter from './SFooter'

const Slayout = () => {
  return (
    <div className='flex flex-col bg-white text-gray-800 overflow-hidden'>
      <SHeader/>
       <main className='flex flex-col w-full'>
         <Outlet/>
      </main>
      <SFooter/>
    </div>
  )
}

export default Slayout