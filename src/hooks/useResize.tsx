import { useCallback, useRef, useState } from 'react';
import { cl } from '../utils';

interface UseResizeProps {
  dimensions: { min: number; max: number };
  storageKey: string;
}

export function useResize({ dimensions, storageKey }: UseResizeProps) {
  const blockRef = useRef<HTMLDivElement>(null);
  const { min, max } = dimensions;
  const [width, setWidth] = useState(min);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (blockRef.current) {
      const mouseX = e.clientX;
      const widthFromLeftToCurrentBlock = Math.round(blockRef.current.getBoundingClientRect().left);

      const currentBlockWidth = blockRef.current.offsetWidth;

      const newBlockWidth = widthFromLeftToCurrentBlock - mouseX + currentBlockWidth;

      const adjustedWidth = Math.max(min, Math.min(newBlockWidth, max));

      blockRef.current.style.width = `${adjustedWidth}px`;
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    document.body.style.userSelect = ''; // enable selecting text
    if (blockRef.current) {
      setWidth(blockRef.current.offsetWidth);
    }
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);

    // add current width to localStorage
    if (blockRef.current) {
      localStorage.setItem(storageKey, JSON.stringify(blockRef.current.offsetWidth));
    }
  }, []);

  const handleMouseDown = useCallback(() => {
    document.body.style.userSelect = 'none'; // disable selecting text
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, []);

  function Dividers() {
    return (
      <div
        style={{ cursor: 'col-resize' }}
        onMouseDown={handleMouseDown}
        className="absolute group top-0 w-3 -left-1.5 h-full transition-all duration-200"
      >
        <div
          className={cl(
            width === max ? '' : 'group-hover:opacity-100',

            'absolute top-0 left-0 transition-all w-1 h-full opacity-0 bg-green-300'
          )}
        />
        <div
          className={cl(
            width === min ? '' : 'group-hover:opacity-100',

            'absolute top-0 right-0 transition-all w-1 h-full opacity-0 bg-green-300'
          )}
        />
      </div>
    );
  }

  return {
    blockRef, // for resizable element
    Dividers // dragging border
  };
}
