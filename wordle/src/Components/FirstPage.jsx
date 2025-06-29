import React from 'react'
import { Link } from 'react-router-dom';
import wordle from '../assets/wordle.png';

const FirstPage = ({ isGuest, setisGuest }) => {
  const locale = 'en';
  const currentDate = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString(locale, options);

  return (
    <div className='text-center flex flex-col justify-center h-screen'>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='font-bold text-4xl p-4'>Welcome To Wordle</h1>
        <img src={wordle} alt="wordle" className='rounded-3xl' />
        <p className='text-xl p-1 font-medium'>Go ahead, add another</p>
        <p className='text-xl p-1 font-medium'>Day to your 1 streak.</p>
      </div>
      <span>
        <Link to={"/signup"}>
          <button className="custom-btn">SignUp</button>
        </Link>
        <Link to={"/login"}>
          <button className="custom-btn">Login</button>
        </Link>
        <Link to={"/second-page"}>
          <button className="custom-btn" onClick={() => setisGuest(isGuest = true)} >Guest</button>
        </Link>
      </span>
      <h2 className='p-2'>{formattedDate}</h2>
    </div>
  )
}

export default FirstPage
