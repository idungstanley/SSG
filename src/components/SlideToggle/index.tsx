import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

interface ISlideToggleProps {
  fullCount: number;
  activeSlide?: number;
  setActiveSlide?: (index: number) => void;
}

export default function SlideToggle({ activeSlide = 1, fullCount, setActiveSlide }: ISlideToggleProps) {
  const [active, setActive] = useState<number>(activeSlide);

  useEffect(() => {
    if (active > 0) {
      setActiveSlide?.(active > fullCount ? fullCount : active <= 0 ? 1 : active);
    }
  }, [active]);

  useEffect(() => {
    setActive(activeSlide);
  }, [activeSlide]);

  return (
    <div className="flex flex-col items-center bg-gray-200" style={{ padding: '0 2px', borderRadius: '10px' }}>
      <button
        className="flex items-center justify-center w-3 h-3"
        onClick={() => setActive((prev) => (prev > 1 ? prev - 1 : 1))}
      >
        <ChevronLeftIcon className="w-2 h-2 text-gray-700" />
      </button>
      <input
        className="flex justify-center items-center text-center w-4 h-2 rounded-sm p-0 border-none no-control-num-input"
        style={{ fontSize: '8px' }}
        type="number"
        value={active}
        min={1}
        max={fullCount}
        onChange={(e) => setActive(Number(e.target.value !== '0' ? e.target.value : '1'))}
      />
      <p style={{ fontSize: '6px' }}>of</p>
      <div className="flex justify-center items-center w-4 h-2 bg-gray-300 rounded-sm" style={{ fontSize: '8px' }}>
        {fullCount}
      </div>
      <button
        className="flex items-center justify-center w-3 h-3"
        onClick={() => setActive((prev) => (prev < fullCount ? prev + 1 : fullCount))}
      >
        <ChevronRightIcon className="w-2 h-2 text-gray-700" />
      </button>
    </div>
  );
}
