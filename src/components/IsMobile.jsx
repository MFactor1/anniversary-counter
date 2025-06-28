import { useState, useEffect} from 'react';

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isDeviceMobile = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);

    const handleResize = () => {
      setIsMobile(isDeviceMobile && window.innerWidth < 1900);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

