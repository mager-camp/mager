import { useState, useEffect, useRef } from "react";

export function useCountdownTo(targetDate) {
  const getRemaining = () => {
    if (!targetDate) return 0;
    return Math.max(0, Math.floor((new Date(targetDate) - Date.now()) / 1000));
  };

  const [remaining, setRemaining] = useState(getRemaining);
  const intervalRef = useRef(null);

  useEffect(() => {
    setRemaining(getRemaining());
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const r = getRemaining();
      setRemaining(r);
      if (r <= 0) clearInterval(intervalRef.current);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [targetDate]);

  const hours   = Math.floor(remaining / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const seconds = remaining % 60;

  return {
    display: `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`,
    isFinished: remaining === 0,
  };
}