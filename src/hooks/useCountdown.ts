import { useEffect, useState } from "react";

// The weekly deal ends at the end of this Sunday (local time).
export function getEndOfWeek(now: Date = new Date()): Date {
  const end = new Date(now);
  const daysUntilSunday = (7 - now.getDay()) % 7; // Sunday is 0
  end.setDate(now.getDate() + daysUntilSunday);
  end.setHours(23, 59, 59, 999);
  return end;
}

function getTimeLeft(target: Date) {
  const secondsLeft = Math.max(0, Math.floor((target.getTime() - Date.now()) / 1000));
  return {
    days: Math.floor(secondsLeft / 86400),
    hours: Math.floor((secondsLeft % 86400) / 3600),
    minutes: Math.floor((secondsLeft % 3600) / 60),
    seconds: secondsLeft % 60,
  };
}

// Returns the time left until `target`, updated every second.
export function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target));

  useEffect(() => {
    const timerId = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(timerId);
  }, [target]);

  return timeLeft;
}
