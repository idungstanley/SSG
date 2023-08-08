import React, { useState, useEffect } from 'react';

function useAdjustedHeight(subtractAmount: number) {
  const [adjustedHeight, setAdjustedHeight] = useState(0);

  useEffect(() => {
    const calculateAdjustedHeight = () => {
      const viewportHeight = window.innerHeight;
      const adjustedHeightValue = viewportHeight - subtractAmount;
      setAdjustedHeight(adjustedHeightValue);
    };

    // Initial calculation
    calculateAdjustedHeight();

    // Recalculate on window resize
    window.addEventListener('resize', calculateAdjustedHeight);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', calculateAdjustedHeight);
    };
  }, [subtractAmount]);

  return adjustedHeight;
}

export default useAdjustedHeight;
