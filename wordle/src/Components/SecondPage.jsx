import React, { useState, useRef, useEffect } from 'react'
import { toast } from 'react-toastify';
import SignUp from './Signup';
import axios from 'axios';

const SecondPage = ({ isLoggedIn, isGuest, username, score, setScore }) => {
  const [inputValues, setInputValues] = useState(Array(30).fill(""));
  const [solved, setSolved] = useState(false);
  const [word, setWord] = useState("");
  const [clue, setClue] = useState(""); // Add state for clue
  const inputRefs = useRef([]);
  const [focusedIndex, setFocusedIndex] = useState(null);
  const [swit, setSwit] = useState("");
  const [user] = useState(username);

  useEffect(() => {
    const fetchWord = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/getword?name=${user}`);
        setWord(res.data.word.toUpperCase()); // Ensure data is in UpperCase if needed
        setClue(res.data.clue); // Set the clue from response
      } catch (error) {
        console.error("Error Fetching word: ", error);
      }
    };

    fetchWord();
  }, [user, solved, swit, isGuest]);

  useEffect(() => {
    if (solved) {
      const handleSolved = async () => {
        try {
          await axios.post(`http://localhost:3000/users/${user}/solved`, { word });
          // Fetch updated score after marking word as solved
          const scoreRes = await axios.get(`http://localhost:3000/getscore?name=${user}`);
          setScore(scoreRes.data.score);
        } catch (error) {
          console.error("Error during adding word or fetching score: ", error.response ? error.response.data : error.message);
        }
      };

      handleSolved();

      setInputValues(Array(30).fill(""));
      inputRefs.current.forEach((input) => {
        if (input)
          input.style.backgroundColor = 'white';
      });
      setSolved(false);

       // Focus on first input after reset
      setTimeout(() => {
        if (inputRefs.current[1]) {
          inputRefs.current[1].focus();
          setFocusedIndex(1);
        }
      }, 100);
    }
  }, [solved, user, word]);


  function onSubmit() {
    if (focusedIndex === null) {
      console.log("No input is currently focused.");
      return;
    }

    const row = Math.floor((focusedIndex - 1) / 5);
    let rowFilled = true;

    for (let col = 0; col < 5; col++) {
      const inputIndex = row * 5 + col + 1;
      const input = inputRefs.current[inputIndex];
      if (!input || input.value.trim() === "") {
        rowFilled = false;
        break;
      }
    }

    if (rowFilled) {
      let start = row * 5 + 1;
      let end = (row + 1) * 5;
      let correctCount = 0;

      for (let i = start; i <= end; i++) {
        const input = inputRefs.current[i];
        if (word.includes(input.value)) {
          if (word[i - start] === input.value) {
            input.style.backgroundColor = 'green';
            correctCount++;
          } else {
            input.style.backgroundColor = 'yellow';
          }
        } else {
          input.style.backgroundColor = 'grey';
        }
      }

      if (correctCount === 5) {
        setSolved(true);
        toast.success("You have successfully guessed the word");

        // Focus on first input after successful guess
        setTimeout(() => {
          if (inputRefs.current[1]) {
            inputRefs.current[1].focus();
            setFocusedIndex(1);
          }
        }, 100);

      } else if (correctCount !== 5 && end === 30) {
        setTimeout(() => {
          setInputValues(Array(30).fill(""));
          inputRefs.current.forEach((input) => {
            if (input)
              input.style.backgroundColor = 'white';
          });

          toast.error("Better Luck next time!! The word was " + word);
          setSwit(!swit);

          // Focus on first input after game over
          if (inputRefs.current[1]) {
            inputRefs.current[1].focus();
            setFocusedIndex(1);
          }
        }, 2000);
      } else {
        // Move to next row if game continues
        if (end + 1 < inputRefs.current.length) {
          inputRefs.current[end + 1].focus();
          setFocusedIndex(end + 1);
        }
      }
    } else {
      toast.error(`Row ${row + 1} is not filled.`);
    }
  }

  function handleKeyDown(e, index) {
    if (e.key.length === 1) {
      e.preventDefault();
      const newValues = [...inputValues];
      newValues[index - 1] = e.key.toUpperCase();
      setInputValues(newValues);

      const nextIndex = index + 1;
      if (index % 5 !== 0 && nextIndex < inputRefs.current.length) {
        inputRefs.current[nextIndex]?.focus();
        setFocusedIndex(nextIndex);
      }
    } else if (e.key === "Backspace") {
      e.preventDefault();
      const newValues = [...inputValues];
      newValues[index - 1] = "";
      setInputValues(newValues);

      const prevIndex = index - 1;
      if (prevIndex >= 0 && prevIndex % 5 !== 0) {
        inputRefs.current[prevIndex]?.focus();
        setFocusedIndex(prevIndex);
      }
    }
  }

  const inputs = [];
  for (let i = 1; i <= 30; i++) {
    inputs.push(
      <input
        key={i}
        ref={(el) => (inputRefs.current[i] = el)}
        value={inputValues[i - 1]}
        onChange={() => { }}
        onKeyDown={(e) => handleKeyDown(e, i)}
        onFocus={() => setFocusedIndex(i)}
        className='w-[60px] h-[60px] text-center border border-black text-black'
      />
    );
  }

  return ((isLoggedIn || isGuest) &&
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        {/* Display the clue */}
        {clue && (
          <div className="mb-6 p-4 bg-blue-100 rounded-lg shadow-md max-w-md">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Clue:</h3>
            <p className="text-gray-700 text-center italic">{clue}</p>
          </div>
        )}

        <div className="grid grid-cols-5 gap-2" style={{ gridAutoRows: '60px' }}>
          {inputs}
        </div>
        <div className="mt-3">
          <button
            className="custom-btn"
            onClick={onSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default SecondPage;