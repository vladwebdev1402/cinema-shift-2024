import { useEffect, useState } from "react";

export const useTimer = (startTime: number) => {
    const [seconds, setSeconds] = useState(startTime)

    const resetTimer = (startTime: number) => {
      setSeconds(startTime);
    }

    useEffect(() => {
      const timer = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
      }, 1000)
  
      return () => clearInterval(timer)
    }, [seconds]);

    return {seconds, resetTimer};
}