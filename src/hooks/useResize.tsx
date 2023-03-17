import { useCallback, useRef, useState } from 'react';
import { cl } from '../utils';

interface UseResizeProps {
  dimensions: { min: number; max: number };
  storageKey: string;
  direction: 'X' | 'Y';
}

export function useResize({ dimensions, storageKey, direction }: UseResizeProps) {
  const blockRef = useRef<HTMLDivElement>(null);
  const { min, max } = dimensions;
  const [size, setSize] = useState(min);

  const handleMouseMoveX = useCallback((e: MouseEvent) => {
    if (blockRef.current) {
      const mouseX = e.clientX;
      const widthFromLeftToCurrentBlock = Math.round(blockRef.current.getBoundingClientRect().left);

      const currentBlockWidth = blockRef.current.offsetWidth;

      const newBlockWidth = widthFromLeftToCurrentBlock - mouseX + currentBlockWidth;

      const adjustedWidth = Math.max(min, Math.min(newBlockWidth, max));

      blockRef.current.style.width = `${adjustedWidth}px`;
    }
  }, []);

  const handleMouseMoveY = useCallback((e: MouseEvent) => {
    if (blockRef.current) {
      const mouseY = e.clientY;
      const heightFromTopToCurrentBlock = Math.round(blockRef.current.getBoundingClientRect().top);

      const newBlockHeight = mouseY - heightFromTopToCurrentBlock;

      const adjustedHeight = Math.max(min, Math.min(newBlockHeight, max));

      blockRef.current.style.height = `${adjustedHeight}px`;
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    document.body.style.userSelect = ''; // enable selecting text

    if (blockRef.current) {
      const newSize = direction === 'X' ? blockRef.current.offsetWidth : blockRef.current.offsetHeight;
      const handleMouseMove = direction === 'X' ? handleMouseMoveX : handleMouseMoveY;

      setSize(newSize);

      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);

      // add current size to localStorage
      localStorage.setItem(storageKey, JSON.stringify(newSize));
    }
  }, []);

  const handleMouseDown = useCallback(() => {
    document.body.style.userSelect = 'none'; // disable selecting text

    const handleMouseMove = direction === 'X' ? handleMouseMoveX : handleMouseMoveY;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, []);

  function DividersY() {
    return (
      <div
        style={{ cursor: 'row-resize' }}
        onMouseDown={handleMouseDown}
        className="z-10 absolute group h-3 -bottom-1.5 w-full right-0 transition-all duration-200"
      >
        <div
          className={cl(
            size === min ? '' : 'group-hover:opacity-100',

            'absolute top-0 left-0 transition-all h-0.5 w-full opacity-0 bg-green-300'
          )}
        />
        <div
          className={cl(
            size === max ? '' : 'group-hover:opacity-100',

            'absolute bottom-0 left-0 transition-all h-0.5 w-full opacity-0 bg-green-300'
          )}
        />
      </div>
    );
  }

  function DividersX() {
    return (
      <div
        style={{ cursor: 'col-resize' }}
        onMouseDown={handleMouseDown}
        className="absolute group top-0 w-3 -left-1.5 h-full transition-all duration-200"
      >
        <div
          className={cl(
            size === max ? '' : 'group-hover:opacity-100',

            'absolute top-0 left-0 transition-all w-0.5 h-full opacity-0 bg-green-300'
          )}
        />
        <div
          className={cl(
            size === min ? '' : 'group-hover:opacity-100',

            'absolute top-0 right-0 transition-all w-0.5 h-full opacity-0 bg-green-300'
          )}
        />
      </div>
    );
  }

  return {
    blockRef, // for resizable element
    Dividers: direction === 'X' ? DividersX : DividersY // dragging border
  };
}
