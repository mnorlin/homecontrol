import { useEffect } from "react";

export default function useScheduler(time, stateChangeFunction) {
  useEffect(() => {
    if (!time) {
      return;
    }

    const timeLeft = getTimeUntilHour(time);
    let intervalId = undefined;

    const timeoutId = setTimeout(() => {
      stateChangeFunction();
      intervalId = setInterval(() => {
        stateChangeFunction();
      }, 60 * 60 * 24 * 1000);
    }, timeLeft);

    return () => {
      if (intervalId !== undefined) {
        clearInterval(intervalId);
      }
      clearTimeout(timeoutId);
    };
  }, [time, stateChangeFunction]);
}

function getTimeUntilHour(time) {
  const t = new Date();
  t.setHours(time.split(":")[0]);
  t.setMinutes(time.split(":")[1]);
  t.setSeconds(0);
  t.setMilliseconds(0);

  const timeLeft = t.getTime() - new Date().getTime();

  return timeLeft > 0 ? timeLeft : timeLeft + 1000 * 60 * 60 * 24; // If time has passed, add 1 day
}
