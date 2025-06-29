import React from 'react';
import { Link } from 'react-router-dom';

// Tile component using Tailwind and color prop
function Tile({ letter, color }) {
  const base = "inline-block w-10 h-10 leading-10 text-center font-bold text-xl border-4 mr-1 mb-1 uppercase";
  const colorMap = {
    green: "bg-green-600 text-white border-green-600",
    yellow: "bg-yellow-500 text-white border-yellow-500",
    gray: "bg-gray-500 text-white border-gray-500",
    default: "bg-white text-black border-gray-400"
  };
  return (
    <span className={`${base} ${colorMap[color] || colorMap.default}`}>
      {letter}
    </span>
  );
}

export default function HowToPlay() {
  return (
    <div className='h-[70%] flex flex-col items-center justify-center mt-14 mx-auto py-4 px-2 '>
      <div className="flex flex-col justify-center items-center max-w-2xl">
        <Link to={"/second-page"} className='hidden md:block font-bold text-lg px-6 py-2 rounded-full border-2 border-purple-600 hover:bg-purple-100 hover:scale-105 transition duration-300 fixed right-[2%] lg:right-[8%] top-[10%]'>Continue to Play</Link>
    
        <h1 className="text-2xl md:text-4xl font-black m-2">How To Play</h1>
        <h2 className="text-lg md:text-2xl mb-2">Guess the Wordle in 6 tries.</h2>
        <ul className="list-disc pl-6 mb-4 text-sm md:text-lg flex flex-col items-start">
          <li>Each guess must be a valid 5-letter word.</li>
          <li>The color of the tiles will change to show how close your guess was to the word.</li>
        </ul>

        <div className="my-2 font-sans flex flex-col items-center">
          <span className="font-bold text-lg">Examples</span>

          {/* Example 1 */}
          <div className="flex mt-4">
            <Tile letter="W" color="green" />
            <Tile letter="E" />
            <Tile letter="A" />
            <Tile letter="R" />
            <Tile letter="Y" />
          </div>
          <div className="ml-1 my-1">
            <span className="font-bold">W</span>
            <span className=""> is in the word and in the correct spot.</span>
          </div>

          {/* Example 2 */}
          <div className="flex mt-4">
            <Tile letter="P" />
            <Tile letter="I" color="yellow" />
            <Tile letter="L" />
            <Tile letter="L" />
            <Tile letter="S" />
          </div>
          <div className="ml-1 my-1">
            <span className="font-bold">I</span>
            <span className=""> is in the word but in the wrong spot.</span>
          </div>

          {/* Example 3 */}
          <div className="flex mt-4">
            <Tile letter="V" />
            <Tile letter="A" />
            <Tile letter="G" />
            <Tile letter="U" color="gray" />
            <Tile letter="E" />
          </div>
          <div className="ml-1 my-1">
            <span className="font-bold">U</span>
            <span className=""> is not in the word in any spot.</span>
          </div>
        </div>

        <div className="mt-6 text-lg">
          A new puzzle is waiting for you. If you haven't done already, you can{' '}
          <Link to="/second-page" className="text-blue-600 underline">go</Link>
          {' '} and solve the puzzle.
        </div>
      </div>
      <Link to={"/second-page"} className='md:hidden font-bold w-[60%] text-lg px-6 py-2 rounded-full border-2 border-purple-600 hover:bg-purple-100 hover:scale-105 transition duration-300 sticky right-[8%] top-[10%] text-center'>Continue to Play</Link>
    
    </div>
  );
}