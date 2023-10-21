import React, { useState } from 'react';
const useProgressiveImg = (lowQualitySrc: string, highQualitySrc: string) => {
  const [loading, setLoading] = useState(true);

  const [src, setSrc] = React.useState(lowQualitySrc);
  React.useEffect(() => {
    setSrc(lowQualitySrc);
    const img = new Image();
    img.src = highQualitySrc;
    img.onload = () => {
      setSrc(highQualitySrc);
      setLoading(false);
    };
  }, [lowQualitySrc, highQualitySrc]);
  return {
    src,
    blur: loading,
  };
};
export default useProgressiveImg;
