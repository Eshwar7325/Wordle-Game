import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { name, password };

    if (password === confirmPassword) {
      axios.post("http://localhost:3000/users/signup", user)
        .then((response) => {
          toast.success(response.data)
          navigate('/login', { replace: true });
        })
        .catch((err) => {
          console.log("Error during signup", err);
          toast.error("Error during signup. Please try again.");
        })
    } else {
      toast.error("Passwords do not match");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-[400px] bg-purple-50 border-2 border-purple-800 shadow-xl rounded-2xl p-2">
        <h2 className="text-center mb-4 font-bold text-2xl">Sign Up</h2>
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
          <div className="mb-3">
            <input
              type="password"
              className="py-1 px-4 rounded-lg w-[90%] my-2 border border-black focus:outline-purple-600"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="custom-btn" onClick={handleSubmit}>Signup</button>
        </form>
        <div>
          <p className='p-2 text-[17px]'>Registered already? { }
            <Link to={"/login"} className='text-blue-600 hover:underline' >Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp
