import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (

    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-white via-gray-100 to-gray-50 px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24">
      <div className="w-full bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 bg-white/60 border border-gray-300 rounded-xl text-center p-3 pb-14 shadow-lg">
        <h1 className="text-6xl sm:text-4xl font-extrabold text-gray-900 drop-shadow-lg">Welcome, shopper!</h1>
        <p className="text-gray-700 mt-4 mb-6 text-base sm:text-lg">Your futuristic shopping awaits.</p>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;