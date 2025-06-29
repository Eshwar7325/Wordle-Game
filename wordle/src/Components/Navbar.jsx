import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({
    score,
    setScore,
    isLoggedIn,
    setisLoggedIn,
    username,
    isGuest
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const fetchScore = async () => {
            if (username && username !== 'Guest' && isLoggedIn) {
                try {
                    const res = await axios.get(`http://localhost:3000/getscore?name=${username}`);
                    setScore(res.data.score);
                } catch (error) {
                    console.error("Error fetching score:", error);
                    setScore(0);
                }
            }
        };

        fetchScore();
    }, [username, isLoggedIn, setScore]);

    const handleLogout = () => {
        setisLoggedIn(false);
        localStorage.removeItem("username");
        setIsMenuOpen(false); // Close menu on logout
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const closeMenu = () => {
        setIsMenuOpen(false);
    }

    return (
        <nav className='fixed top-0 w-full flex justify-between items-center py-2 px-3 md:px-8 bg-purple-500'>
            <Link to={isLoggedIn ? "/second-page" : "/"} className='flex justify-center items-center gap-2'>
                <img src="/icon.svg" alt="WG" className='w-[1.8rem] md:w-[2.5rem]' />
                <h1 className='font-bold text-2xl md:text-3xl'>Wordle</h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center">
                {isLoggedIn && (
                    <div className="flex items-center justify-center mr-4">
                        <span className="text-lg mx-3">Username: {username}</span>
                        <span className="text-lg">Score: {score}</span>
                    </div>
                )}
                {isLoggedIn ? (
                    <ul className="flex justify-center items-center">
                        <li>
                            <Link to={"/howtoplay"} className="bg-purple-100 border-2 px-3 py-[6px] mx-2 rounded-xl hover:border-purple-400">?</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/leaderboard'>
                                <button className="custom-btn">
                                    Leaderboard
                                </button>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/'>
                                <button className="custom-btn" onClick={handleLogout}>
                                    Logout
                                </button>
                            </Link>
                        </li>
                    </ul>
                ) : (
                    <div>
                        <Link to={"/login"}>
                            <button className="custom-btn">Login</button>
                        </Link>
                        <Link to={"/signup"}>
                            <button className="custom-btn">Signup</button>
                        </Link>
                    </div>
                )}
            </div>

            {/* Mobile Hamburger Button */}
            <button 
                className="md:hidden flex flex-col justify-center items-center w-8 h-8"
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
            </button>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full right-0 w-[60%] bg-purple-500 shadow-xl rounded-b-2xl">
                    <div className="px-4 py-6">
                        {isLoggedIn && (
                            <div className="text-center mb-4 pb-4 border-b border-purple-300">
                                <div className="text-lg text-white">Username: {username}</div>
                                <div className="text-lg text-white">Score: {score}</div>
                            </div>
                        )}
                        
                        {isLoggedIn ? (
                            <ul className="flex flex-col space-y-4">
                                <li className="text-center">
                                    <Link 
                                        to={"/howtoplay"} 
                                        className="bg-purple-100 border-2 px-3 py-[6px] rounded-xl hover:border-purple-400 text-purple-500"
                                        onClick={closeMenu}
                                    >
                                        How to Play
                                    </Link>
                                </li>
                                <li className="text-center">
                                    <Link to='/leaderboard' onClick={closeMenu}>
                                        <button className="custom-btn w-full">
                                            Leaderboard
                                        </button>
                                    </Link>
                                </li>
                                <li className="text-center">
                                    <Link to='/'>
                                        <button className="custom-btn w-full" onClick={handleLogout}>
                                            Logout
                                        </button>
                                    </Link>
                                </li>
                            </ul>
                        ) : (
                            <div className="flex flex-col space-y-4">
                                <Link to={"/login"} onClick={closeMenu}>
                                    <button className="custom-btn w-full">Login</button>
                                </Link>
                                <Link to={"/signup"} onClick={closeMenu}>
                                    <button className="custom-btn w-full">Signup</button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;