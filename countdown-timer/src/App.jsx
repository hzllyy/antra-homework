import './App.css';
import { useState, useEffect, useRef } from 'react';

export default function Countdown() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const initialTimeRef = useRef(0);

  // update time
  useEffect(() => {
    const total = minutes * 60 + seconds;
    setTimeLeft(total);
    initialTimeRef.current = total;
  }, [minutes, seconds]);

  // countdown
  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            clearInterval(timer);
            setIsRunning(false);
            return
          }
        }); 
      }, 1000)
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  // display values
  const displayMinutes = String(Math.floor(timeLeft/60)).padStart(2, "0");
  const displaySeconds = String(timeLeft % 60).padStart(2, "0");

  // handlers
  const handleStart = () => setIsRunning(true);
  // const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(initialTimeRef.current);
  };

  return (
    <>
      <h1>Countdown Timer</h1>
      <div className="input__fields">
        <input 
          type="number"
          min="0"
          value={minutes}
          onChange={(e) => setMinutes(Number(e.target.value))}
          disabled={isRunning}
        >
        </input>
        <span>Minutes</span>
        <input 
          type="number"
          min="0"
          value={seconds}
          onChange={(e) => setSeconds(Number(e.target.value))}
          disabled={isRunning}
        >
        </input>
        <span>Seconds</span>

        <button onClick={handleStart}>START</button>
      </div>

      <div className="buttons">
        <button onClick={() => setIsRunning((prev) => !prev)}>
          {isRunning ? "PAUSE" : "RESUME"}
        </button>
        <button onClick={handleReset}>RESET</button>
      </div>

      <h1>{displayMinutes}:{displaySeconds}</h1>
    </>
    
  )
}