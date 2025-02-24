import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex min-h-screen w-full">
      <div className="lg:block w-1/2 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-12">
        <div className="text-center text-primary-foreground max-w-md space-y-6">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">
            Welcome to Ecommerce App
          </h1>
          <p className="text-xl text-gray-700">
            Shop your favorite products, fast and easy!
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-white sm:px-8">
        <div className="w-full space-y-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;