import Form from '@/components/common/Form';
import { loginFormControlls } from '@/config';
import { loginUser } from '@/store/authSlice';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const initialstate = {
  email: '',
  password: '',
};

const Login = () => {
  const [formData, setFormData] = useState(initialstate);
  const [isLoading, setIsLoading] = useState(false);  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state)=> state.auth.user);
  const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated)

  useEffect(()=>{
    if(isAuthenticated){
      if(user?.role === 'admin'){
        navigate('/admin/dashboard');
      } else {
        navigate('/user/home')
      }
    }
  },[isAuthenticated, user, navigate])

  function onSubmit(e) {
    e.preventDefault();
    setIsLoading(true);  

    dispatch(loginUser(formData))
      .then((data) => {
        setIsLoading(false);  

        if (data?.payload?.success) {
          toast.success('Login Successful');
        
          const user = data.payload.user; 
          localStorage.setItem('user', JSON.stringify(user));

          if (user?.role === 'admin') {
            navigate('/admin/dashboard');
          } else {
            navigate('/user/home');
          }
        } else {
          toast.error('Invalid Credentials');
        }
      })
      .catch((error) => {
        setIsLoading(false);  
        console.error('Login failed:', error);
        toast.error('An error occurred. Please try again');
      });
  }

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>
          Login to your account
        </h1>
        <p className='mt-2'>
          Don't have an account?
          <Link className='font-medium ml-2 text-primary hover:underline' to='/auth/register'>
            Register
          </Link>
        </p>
      </div>
      <Form
        formControlls={loginFormControlls}
        buttonText={isLoading ? 'Logging in...' : 'Login'}  // Change button text when loading
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};


export default Login;
