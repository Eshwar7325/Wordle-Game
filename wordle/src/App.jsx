import { use, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import Login from './Components/Login';
import SignUp from './Components/Signup'
import FirstPage from './Components/FirstPage'
import SecondPage from './Components/SecondPage'
import LeaderBoard from './Components/LeaderBoard'
import Navbar from './Components/Navbar';
import { Flip, ToastContainer } from 'react-toastify';
import HowToPlay from './Components/HowToPlay';

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(() => {
    return localStorage.getItem("username") ? true : false;
  });
  const [isGuest, setisGuest] = useState(false);
  const [username, setUsername] = useState(() => localStorage.getItem("username") || 'Guest');
  const [score, setScore] = useState(0);

  return (
    <Router>
      <Navbar score={score} setScore={setScore} isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} username={username} isGuest={isGuest} />
      <div className='text-center'>
        <Routes>
          <Route path="/" element={<FirstPage isGuest={isGuest} setisGuest={setisGuest} />} />
          <Route path="/login" element={<Login score={score} setScore={setScore} isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} username={username} setUsername={setUsername} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/second-page" element={<SecondPage score={score} setScore={setScore} isLoggedIn={isLoggedIn} isGuest={isGuest} username={username} />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path="/howtoplay" element={<HowToPlay />} />
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Flip}
      />
    </Router>
  )
}

export default App
