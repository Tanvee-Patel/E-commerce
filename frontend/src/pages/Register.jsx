import Form from '@/components/common/Form'
import { registerFormControlls } from '@/config'
import { registerUser } from '@/store/authSlice'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const initialstate = {
  username : '',
  email : '',
  password : ''
}

const Register = () => {

  const [formData, setFormData] = useState(initialstate)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function onSubmit(e) {
    e.preventDefault();

    try {
      const data = await dispatch(registerUser(formData));
      if (data?.payload?.success) {
        toast.success('Account created successfully!');
        toast.custom(
        <div className="px-4 py-2 bg-green-500 text-white rounded-md text-sm text-center font-bold">
          Redirecting to login...
        </div>,
        {duration: 3000});
        navigate('/auth/login');
      } else {
        toast.error('Registration failed! Please try again.');
      }
    } catch (error) {
      toast.error('An unexpected error occurred.');
      console.error(error);
    }
  } 

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Create new account</h1>
        <p className='mt-2'>Already have an account
          <Link className='font-medium ml-2 text-primary hover:underline' to='/auth/login'>Login</Link>
        </p>
      </div>
      <Form 
      formControlls={registerFormControlls}
      buttonText={'Sign Up'}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
      />
    </div>
  )
}

export default Register