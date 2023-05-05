import { useCallback, useRef, useState } from 'react';
import { cl } from '../utils';

interface UseResizeProps {
  dimensions: { min: number; max: number };
  storageKey: string;
  direction: 'XL' | 'YB' | 'XR';
  defaultSize?: number;
}

export function useResize({ dimensions, direction, defaultSize }: UseResizeProps) {
  const blockRef = useRef<HTMLDivElement>(null);
  const { min, max } = dimensions;
  const [size, setSize] = useState(defaultSize ?? min);

  const handleMouseMoveXR = useCallback((e: MouseEvent) => {
    if (blockRef.current) {
      const mouseX = e.clientX;
      const widthFromLeftToCurrentBlock = Math.round(blockRef.current.getBoundingClientRect().right);

      const currentBlockWidth = blockRef.current.offsetWidth;

      const newBlockWidth = widthFromLeftToCurrentBlock + mouseX - currentBlockWidth;

      const adjustedWidth = Math.max(min, Math.min(newBlockWidth, max));

      blockRef.current.style.width = `${adjustedWidth}px`;
    }
  }, []);

  const handleMouseMoveXL = useCallback((e: MouseEvent) => {
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

    const isXDirection = direction === 'XL' || direction === 'XR';

    if (blockRef.current) {
      const newSize = isXDirection ? blockRef.current.offsetWidth : blockRef.current.offsetHeight;
      const handleMouseMove =
        direction === 'XL' ? handleMouseMoveXL : direction === 'XR' ? handleMouseMoveXR : handleMouseMoveY;

      setSize(newSize);

      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);

      // add current size to localStorage
      // localStorage.setItem(storageKey, JSON.stringify(newSize));
    }
  }, []);

  const handleMouseDown = useCallback(() => {
    document.body.style.userSelect = 'none'; // disable selecting text

    const handleMouseMove =
      direction === 'XL' ? handleMouseMoveXL : direction === 'XR' ? handleMouseMoveXR : handleMouseMoveY;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, []);

  function Dividers() {
    const params = {
      XL: {
        root: 'top-0 w-2 -left-1 h-full',
        firstDivider: 'top-0 left-0 w-0.5 h-full',
        secondDivider: 'top-0 right-0 w-0.5 h-full'
      },
      YB: {
        root: 'h-2 -bottom-1 w-full right-0',
        firstDivider: 'top-0 left-0 h-0.5 w-full',
        secondDivider: ' bottom-0 left-0 h-0.5 w-full'
      },
      XR: {
        root: 'top-0 w-2 -right-1 h-full',
        firstDivider: 'top-0 left-0 w-0.5 h-full',
        secondDivider: 'top-0 right-0 w-0.5 h-full'
      }
    };

    return (
      <div
        style={{ cursor: 'col-resize' }}
        onMouseDown={handleMouseDown}
        className={cl('z-10 absolute group transition-all duration-200', params[direction].root)}
      >
        <div
          className={cl(
            size === max ? '' : 'group-hover:opacity-100',

            'absolute top-0 left-0 transition-all w-0.5 h-full opacity-0 bg-primary-300'
          )}
        />
        <div
          className={cl(
            size === min ? '' : 'group-hover:opacity-100',

            'absolute top-0 right-0 transition-all w-0.5 h-full opacity-0 bg-primary-300'
          )}
        />
      </div>
    );
  }

  return {
    blockRef, // for resizable element
    Dividers, // dragging border
    size
  };
}
