import { useState, useEffect, useRef } from "react";

/**
 * Countdown timer dari durationSeconds ke 0.
 * Returns { hours, minutes, seconds, isFinished }
 */
export function useCountdown(durationSeconds) {
  const [remaining, setRemaining] = useState(durationSeconds);
  const intervalRef = useRef(null);

  useEffect(() => {
    setRemaining(durationSeconds);
  }, [durationSeconds]);

  useEffect(() => {
    if (remaining <= 0) return;

    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const hours   = Math.floor(remaining / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const seconds = remaining % 60;

  return {
    hours,
    minutes,
    seconds,
    display: `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`,
    isFinished: remaining === 0,
  };
}