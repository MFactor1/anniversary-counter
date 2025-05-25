import { useEffect, useState } from 'react';

const useCountupSeconds = (year: number, month: number, day: number, hour: number, minute: number) => {
  const calculateTime = () => {
    const now = new Date();
    let startDate = new Date(year, month - 1, day, hour, minute, 0);

    const difference = now.getTime() - startDate.getTime();

    return Math.floor(difference / 1000);
  };

  const [time, setTime] = useState(calculateTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calculateTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return time;
};

export default useCountupSeconds;
