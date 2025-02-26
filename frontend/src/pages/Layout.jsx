import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    // <div className="flex min-h-screen w-full">
    //   <div className="lg:block w-1/2 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-12">
    //     <div className="text-center text-primary-foreground max-w-md space-y-6">
    //       <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">
    //         Welcome to Ecommerce App
    //       </h1>
    //       <p className="text-xl text-gray-700">
    //         Shop your favorite products, fast and easy!
    //       </p>
    //     </div>
    //   </div>

    //   <div className="flex-1 flex items-center justify-center bg-white sm:px-8">
    //     <div className="w-full space-y-8">
    //       <Outlet />
    //     </div>
    //   </div>
    // </div>
   
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-white via-gray-100 to-gray-50 px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 overflow-hidden">

    <div className="w-full max-w-6xl bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 bg-white/60 backdrop-blur-lg border border-gray-300 rounded-xl text-center p-3 pb-14 shadow-lg">
      <h1 className="text-6xl sm:text-4xl font-extrabold text-gray-900 drop-shadow-lg">Welcome, shopper!</h1>
      <p className="text-gray-700 mt-4 mb-6 text-base sm:text-lg">Your futuristic shopping awaits.</p>
      <Outlet />
    </div>
  </div>
  );
};

export default Layout;