import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function LeaderBoard() {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await axios.get('http://localhost:3000/leaderboard');
                setLeaderboardData(response.data); // Assuming the response data is an array of player objects
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
                console.log(err);
            }
        };

        fetchLeaderboard();
    }, []);

    if (loading) {
        return <div className="container mt-20"><h2 className="text-center mb-4">Loading...</h2></div>;
    }

    if (error) {
        return <div className="container mt-20"><h2 className="text-center mb-4">Error loading leaderboard</h2></div>;
    }

    return (
        <div className="flex justify-center items-center flex-col">
            <div className="container mt-20 flex flex-col items-center">
                <Link to={"/second-page"} className='media hidden lg:block font-bold text-lg px-6 py-2 rounded-full border-2 border-purple-600 hover:bg-purple-100 hover:scale-105 transition duration-300 lg:fixed right-[8%] top-[10%]'>Continue to Play</Link>
                <h2 className="text-center mb-4 font-bold text-2xl">Leaderboard</h2>
                <table className="table-auto w-[85%] rounded-md overflow-hidden mb-10">
                    <thead className='bg-purple-800 text-white'>
                        <tr>
                            <th className='py-2 border border-purple-100' scope="col">Rank</th>
                            <th className='py-2 border border-purple-100' scope="col">Name</th>
                            <th className='py-2 border border-purple-100' scope="col">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboardData.map((player, index) => (
                            <tr key={player._id || index}>
                                <th className='py-2 border border-purple-100 text-center' scope="row">{index + 1}</th>
                                <td className='py-2 border border-purple-100 text-center'>{player.name}</td>
                                <td className='py-2 border border-purple-100 text-center'>{player.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Link to={"/second-page"} className='lg:hidden font-bold text-lg px-6 py-2 rounded-full border-2 border-purple-600 hover:bg-purple-100 hover:scale-105 transition duration-300 md:fixed right-[2%] lg:right-[8%] top-[10%]'>Continue to Play</Link>
        </div>
    );
}

export default LeaderBoard;