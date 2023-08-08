import { useState, useEffect } from 'react';
import { useAppSelector } from '../app/hooks';

function useAdjustedHeight(subtractAmount: number) {
  const [adjustedHeight, setAdjustedHeight] = useState(0);
  const {
    activePlaceId,
    activeTabId,
    activeSubDetailsTabId,
    activeSubTimeClockTabId,
    activeSubHubManagerTabId,
    activeSubCommunicationTabId,
    activeSubChecklistTabId
  } = useAppSelector((state) => state.workspace);

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
  }, [
    subtractAmount,
    activePlaceId,
    activeTabId,
    activeSubDetailsTabId,
    activeSubTimeClockTabId,
    activeSubHubManagerTabId,
    activeSubCommunicationTabId,
    activeSubChecklistTabId
  ]);

  return adjustedHeight;
}

export default useAdjustedHeight;
