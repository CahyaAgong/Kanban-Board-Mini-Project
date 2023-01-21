import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import config from './../../config.js';

export default function Auth({ authToken, setAuthToken, onClose }) {
  const router = useRouter();

  const [isSignUp, setIsSignUp] = useState(false);

  const handleSignIn = async e => {
    e.preventDefault();

    const body = {
      email: e.target.email_signin.value,
      password: e.target.password_signin.value,
    };

    await axios
      .post(`${config.services.baseUrl}/auth/login`, body)
      .then(response => {
        let auth_token = response.data.auth_token;

        window.localStorage.setItem('token', auth_token);
        setAuthToken(auth_token);

        alert(`Success SignIn!`);
        router.reload(window.location.pathname);
      })
      .catch(err => {
        alert('error occured!', err);
      });
  };

  const handleSignUp = async e => {
    e.preventDefault();
    const body = {
      name: e.target.name_signup.value,
      email: e.target.email_signup.value,
      password: e.target.password_signup.value,
      password_confirmation: e.target.password_confirmation_signup.value,
    };

    await axios
      .post(`${config.services.baseUrl}/signup`, body)
      .then(res => {
        let auth_token = res.data.auth_token;

        window.localStorage.setItem('token', auth_token);
        setAuthToken(auth_token);

        alert(`${res.data.message}`);
        router.reload(window.location.pathname);
      })
      .catch(err => {
        alert('error occured!', err);
      });
  };

  return (
    <div className='flex flex-col p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-lg font-bold text-[#1D1F20]'>
          {!isSignUp ? 'Sign In' : 'Sign Up'}
        </h1>
        <span onClick={() => onClose()} className='cursor-pointer p-0'>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M18 6L6 18'
              stroke='#404040'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M6 6L18 18'
              stroke='#404040'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </span>
      </div>

      <form
        onSubmit={handleSignIn}
        method='post'
        className={isSignUp ? 'hidden' : 'block'}
      >
        <div className='flex flex-col mt-4'>
          <label htmlFor='' className='text-xs font-bold text-[#404040]'>
            Email
          </label>
          <input
            type='email'
            name='email_signin'
            className='px-4 py-2 border-2 border-[#E0E0E0] text-sm font-normal outline-none rounded-lg mt-2 -ml-1'
            placeholder='Type your Email'
            required
          />
        </div>

        <div className='flex flex-col mt-4'>
          <label htmlFor='' className='text-xs font-bold text-[#404040]'>
            Password
          </label>
          <input
            type='password'
            name='password_signin'
            className='px-4 py-2 border-2 border-[#E0E0E0] text-sm font-normal outline-none rounded-lg mt-2 -ml-1'
            placeholder='Type your Password'
            required
          />
        </div>

        <button className='text-sm font-bold text-white px-4 py-2 mt-3 self-center bg-[#01959F] rounded-lg'>
          Sign In
        </button>
      </form>

      <form onSubmit={handleSignUp} className={isSignUp ? 'block' : 'hidden'}>
        <div className='flex flex-col mt-4'>
          <label htmlFor='' className='text-xs font-bold text-[#404040]'>
            Name
          </label>
          <input
            type='text'
            name='name_signup'
            className='px-4 py-2 border-2 border-[#E0E0E0] text-sm font-normal outline-none rounded-lg mt-2 -ml-1'
            placeholder='Type your Name'
            required
          />
        </div>

        <div className='flex flex-col mt-4'>
          <label htmlFor='' className='text-xs font-bold text-[#404040]'>
            Email
          </label>
          <input
            type='email'
            name='email_signup'
            className='px-4 py-2 border-2 border-[#E0E0E0] text-sm font-normal outline-none rounded-lg mt-2 -ml-1'
            placeholder='Type your Email'
            required
          />
        </div>

        <div className='flex flex-col mt-4'>
          <label htmlFor='' className='text-xs font-bold text-[#404040]'>
            Password
          </label>
          <input
            type='password'
            name='password_signup'
            className='px-4 py-2 border-2 border-[#E0E0E0] text-sm font-normal outline-none rounded-lg mt-2 -ml-1'
            placeholder='Type your Password'
            required
          />
        </div>

        <div className='flex flex-col mt-4'>
          <label htmlFor='' className='text-xs font-bold text-[#404040]'>
            Password Confirmation
          </label>
          <input
            type='password'
            name='password_confirmation_signup'
            className='px-4 py-2 border-2 border-[#E0E0E0] text-sm font-normal outline-none rounded-lg mt-2 -ml-1'
            placeholder='Type your Password Confirmation'
            required
          />
        </div>

        <button className='text-sm font-bold text-white px-4 py-2 mt-3 self-center bg-[#01959F] rounded-lg'>
          Sign Up
        </button>
      </form>

      <p className='mt-2 text-sm font-semibold'>
        {!isSignUp ? 'Do not have account yet?' : 'Already Have Account?'}{' '}
        <span
          className='text-[#01959F] cursor-pointer'
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {!isSignUp ? 'Sign Up' : 'Sign In'}
        </span>
      </p>
    </div>
  );
}
