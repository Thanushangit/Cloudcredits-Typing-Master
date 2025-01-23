import React, { useState, useEffect } from "react";
import "./App.css";
import logo from './assets/logo.png';

const TypingSpeedTester = () => {
  const [text, setText] = useState("");
  const [targetText, setTargetText] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [difficulty, setDifficulty] = useState("");
  const [status, setStatus] = useState("");
  const [startTime, setStartTime] = useState(null); 
  const [wpm, setWpm] = useState(null); 

  // Custom sentences for difficulty levels
  const sentences = {
    easy: [
      "The cat sleeps peacefully on the mat near the door.",
      "I love programming because it challenges and sharpens my problem-solving skills.",
      "JavaScript is an amazing language for creating dynamic and interactive websites.",
      "The sun is shining brightly over the hills and the lake.",
      "My dog is playing happily outside with his favorite red ball.",
    ],
    medium: [
      "The quick brown fox jumped over the lazy dog and then ran into the forest, escaping from the chasing hunter.",
      "React is a JavaScript library for building user interfaces, enabling developers to create reusable components for scalable, efficient, and dynamic web applications.",
      "Coding is like solving puzzles, each challenge teaches you something new and enhances your problem-solving, analytical, and critical thinking skills.",
      "JavaScript is a versatile language for both frontend and backend development, supporting a wide range of modern frameworks and libraries for developers.",
      "Node.js allows JavaScript to run on the server-side as well, providing high performance, scalability, and efficient real-time application handling.",

    ],
    hard: [
      "Asynchronous programming in JavaScript allows for non-blocking operations, ensuring smooth performance by executing multiple tasks concurrently without halting the main thread or blocking other operations in the application.",
      "The global execution context and the call stack work together in JavaScript, managing function execution, memory allocation, and the order of operations for seamless and efficient runtime processing in programs.",
      "Closures in JavaScript can lead to memory leaks if not handled correctly, especially when functions retain references to variables no longer needed by the program, consuming excessive memory over time.",
      "Web development with the MERN stack involves MongoDB, Express, React, and Node.js, providing developers with a powerful, full-stack solution for creating robust, modern, and scalable web applications efficiently.",
      "Functional programming in JavaScript encourages immutability and pure functions, promoting cleaner, predictable code while minimizing side effects and enhancing testability, debugging, and maintainability in complex projects or applications.",

    ],
  };

  const startGame = (level) => {
    const timeMapping = { easy: 20, medium: 40, hard: 60 }; 
    const randomIndex = Math.floor(Math.random() * sentences[level].length);
    setTargetText(sentences[level][randomIndex].trim());
    setText("");
    setTimeLeft(timeMapping[level]);
    setIsStarted(true);
    setDifficulty(level);
    setStatus("");
    setStartTime(Date.now()); 
    setWpm(null); 
  };

  const handleTyping = (e) => {
    setText(e.target.value);
    if (e.target.value.trim() === targetText.trim()) {
      setStatus("win");
      setIsStarted(false);

    
      const timeElapsedInMinutes = (Date.now() - startTime) / 60000;
      const wordCount = targetText.trim().split(/\s+/).length;
      const calculatedWpm = Math.round(wordCount / timeElapsedInMinutes);
      setWpm(calculatedWpm);
    }
  };

  useEffect(() => {
    let timer = null;
    if (isStarted && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && isStarted) {
      setIsStarted(false);
      setStatus("lose");
    }
    return () => clearInterval(timer);
  }, [isStarted, timeLeft]);

  return (
    <div className="app">
      <nav className="navbar">
        <h1>Typing Master</h1>
        <div className="navbar-logo">
          <img src={logo} alt="logo" />
        </div>
      </nav>

      <div className="content">
        {!isStarted && status === "" && (
          <div className="banner">
            <h2>Welcome to Typing Master!</h2>
            <p>Improve your typing skills with fun challenges.</p>
            <button onClick={() => setDifficulty("select")}>Start</button>
          </div>
        )}

        {difficulty === "select" && !isStarted && (
          <div className="difficulty-selection">
            <h3>Select Difficulty</h3>
            <button onClick={() => startGame("easy")}>Easy</button>
            <button onClick={() => startGame("medium")}>Medium</button>
            <button onClick={() => startGame("hard")}>Hard</button>
          </div>
        )}

        {isStarted && (
          <div className="game">
            <div className="timer">
              <svg height="60" width="60">
                <circle
                  cx="30"
                  cy="30"
                  r="25"
                  stroke="green"
                  strokeWidth="4"
                  fill="none"
                />
                <text
                  x="30"
                  y="35"
                  textAnchor="middle"
                  fontSize="16"
                  fill="black"
                >
                  {timeLeft}s
                </text>
              </svg>
            </div>
            <p className="target-text">{targetText}</p>
            <textarea
            autoFocus
              value={text}
              onChange={handleTyping}
              rows="5"
              placeholder="Type here..."
            />
          </div>
        )}

        {status && (
          <div className="result">
            {status === "win" ? (
              <>
                <h2>🎉 You Win! 🎉</h2>
                <p>Your typing speed: <strong>{wpm} WPM</strong></p>
              </>
            ) : (
              <h2>Try Again!</h2>
            )}
            <button onClick={() => setDifficulty("select")}>Restart</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TypingSpeedTester;
