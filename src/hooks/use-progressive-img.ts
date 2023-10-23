import { useEffect, useState } from 'react';
const useProgressiveImg = (highQualitySrc: string, lowQualitySrc?: string) => {
  const [loading, setLoading] = useState(true);

  const [src, setSrc] = useState(lowQualitySrc ?? highQualitySrc);
  useEffect(() => {
    if (lowQualitySrc) {
      setSrc(lowQualitySrc);
      const img = new Image();
      img.src = highQualitySrc;
      img.onload = () => {
        setSrc(highQualitySrc);
        setLoading(false);
      };
    } else {
      setSrc(highQualitySrc);
      const img = new Image();
      img.src = highQualitySrc;
      img.onload = () => {
        setLoading(false);
      };
    }

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [lowQualitySrc, highQualitySrc]);
  return {
    src,
    blur: loading,
  };
};
export default useProgressiveImg;
