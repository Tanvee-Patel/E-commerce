import Form from '@/components/common/Form';
import { loginFormControlls } from '@/config';
import { loginUser } from '@/store/authSlice';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const initialstate = {
  email: '',
  password: '',
};

const Login = () => {
  const [formData, setFormData] = useState(initialstate);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();  // Get previous location
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated && user) {
      // Use the previous route if available, otherwise default
      const redirectPath = location.state?.from || (user.role === 'admin' ? '/admin/dashboard' : '/user/home');
      // console.log("Login useEffect Redirecting to:", redirectPath);
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, user, location, navigate]);

  
  async function onSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await dispatch(loginUser(formData)).unwrap();
      setIsLoading(false);

      if (data?.success) {
        toast.success('Login Successful');
        localStorage.setItem('user', JSON.stringify(data.user));

        // Redirect back to intended route or default
        const redirectPath = location.state?.from || (data.user.role === 'admin' ? '/admin/dashboard' : '/user/home');
        console.log("Login Successful - Redirecting to:", redirectPath);
        navigate(redirectPath, { replace: true });
      } else {
        toast.error(data?.message || 'Invalid Credentials');
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Login failed:', error);
      toast.error('An error occurred. Please try again.');
    }
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
