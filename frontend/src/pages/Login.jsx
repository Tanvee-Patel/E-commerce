import Form from '@/components/common/Form';
import { loginFormControlls } from '@/config';
import { loginUser } from '@/store/authSlice';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const initialstate = {
  email: '',
  password: '',
};

const Login = () => {
  const [formData, setFormData] = useState(initialstate);
  const [isLoading, setIsLoading] = useState(false);  // Add loading state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    setIsLoading(true);  // Set loading state to true when submitting

    dispatch(loginUser(formData))
      .then((data) => {
        setIsLoading(false);  // Set loading state to false once done

        if (data?.payload?.success) {
          toast.success('Login Successful');
          
          // Access the user from the response payload
          const user = data.payload.user; // Assuming the API sends this back
          const token = data.payload.token; // Assuming the token is returned

          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', token);

          // Navigate based on the user role
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
        setIsLoading(false);  // Set loading state to false in case of error
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
