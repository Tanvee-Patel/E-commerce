import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './store/authSlice';
import Layout from './pages/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Layouts from './components/admin/Layouts';
import Adashboard from './pages/admin/Adashboard';
import Afeatures from './pages/admin/Afeatures';
import Aorders from './pages/admin/Aorders';
import Aproducts from './pages/admin/Aproducts';
import Slayout from './components/shopping/Slayout';
import Home from './pages/shopping/Home';
import Listing from './pages/shopping/Listing';
import Checkout from './pages/shopping/Checkout';
import Account from './pages/shopping/Account';
import CheckAuth from './components/common/CheckAuth';
import { Toaster } from 'react-hot-toast';
import { Skeleton } from './components/ui/skeleton';
import Search from './pages/shopping/Search';

function App() {
  const { isAuthenticated, user, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-[800px] bg-black h-[600px] rounded-full" />

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        {/* Public Routes */}
        <Route
          path='/'
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}>

            </CheckAuth>}
        />
        <Route path="/auth" element={<Layout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Protected Routes - Admin */}
        <Route path="/admin" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><Layouts /></CheckAuth>}>
          <Route path="dashboard" element={<Adashboard />} />
          <Route path="features" element={<Afeatures />} />
          <Route path="orders" element={<Aorders />} />
          <Route path="products" element={<Aproducts />} />
        </Route>

        {/* Protected Routes - User */}
        <Route path="/user" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><Slayout /></CheckAuth>}>
          <Route path="home" element={<Home />} />
          <Route path="listing" element={<Listing />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="account" element={<Account />} />
          <Route path="search" element={<Search />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
