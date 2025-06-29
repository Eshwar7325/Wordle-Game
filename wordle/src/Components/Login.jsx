import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Login = ({ isLoggedIn, setisLoggedIn, username, setUsername, score, setScore }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { name, password };
    axios.post("http://localhost:3000/users/login", user)
      .then((response) => {
        if (response.data.pos) {
          localStorage.setItem("username", name);
          setisLoggedIn(true);
          setUsername(name);
          setScore(response.data.score);
          console.log(response.data.score);
          navigate("/second-page");
        } else {
          toast('Invalid Credentials!!!')
        }
      })
      .catch((err) => {
        console.log("Error during login", err);
        toast.error("Invalid Credentials!!!");
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-[400px] bg-purple-50 border-2 border-purple-800 shadow-xl rounded-2xl p-2" >
        <h2 className="text-center mb-4 font-bold text-2xl">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="py-1 px-4 rounded-lg w-[90%] my-2 border border-black focus:outline-purple-600"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="py-1 px-4 rounded-lg w-[90%] my-2 border border-black focus:outline-purple-600"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="custom-btn">Login</button>
        </form>
        <div>
          <p className='p-2 text-[17px]'>Don't have an account? { }
            <Link to={"/signup"} className='text-blue-600 hover:underline' >Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
