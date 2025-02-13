import { useEffect, useState } from 'react';

const useCountdown = (month: number, day: number, hour: number, minute: number) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    let targetDate = new Date(now.getFullYear(), month - 1, day, hour, minute, 0);

    if (now > targetDate && (targetDate.getFullYear() == now.getFullYear() && targetDate.getMonth() == now.getMonth() && targetDate.getDate() == now.getDate())) {
      targetDate = now;
    } else if (now > targetDate) {
      targetDate = new Date(now.getFullYear() + 1, month - 1, day, 0, 0, 0);
    }

    const difference = targetDate.getTime() - now.getTime();

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return timeLeft;
};

export default useCountdown;
