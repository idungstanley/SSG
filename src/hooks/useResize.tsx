import { useCallback, useRef, useState } from 'react';
import { cl } from '../utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setIsResize } from '../features/workspace/workspaceSlice';
import { setUserSettingsData, setUserSettingsKeys } from '../features/account/accountService';
import useResolution from './useResolution';

interface UseResizeProps {
  dimensions: { min: number; max: number };
  storageKey: string;
  direction: 'XL' | 'YB' | 'XR';
  defaultSize?: number;
  apiKey?: string;
}

export function useResize({ dimensions, direction, defaultSize, storageKey, apiKey }: UseResizeProps) {
  const blockRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const resolution = useResolution();

  const { min, max } = dimensions;

  const { userSettingsData } = useAppSelector((state) => state.account);

  const [size, setSize] = useState(defaultSize ?? min);
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [isMouseUp, setIsMouseUp] = useState<boolean>(false);

  const updateAdjustWidth = useMutation(setUserSettingsKeys, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['user-settings']);
    }
  });

  const handleMouseMoveXR = useCallback((e: MouseEvent) => {
    if (blockRef.current) {
      setIsDrag(true);
      dispatch(setIsResize(true));
      const mouseX = e.clientX;
      const widthFromLeftToCurrentBlock = Math.round(blockRef.current.getBoundingClientRect().right);

      const currentBlockWidth = blockRef.current.offsetWidth;

      const newBlockWidth =
        widthFromLeftToCurrentBlock -
        (widthFromLeftToCurrentBlock - currentBlockWidth) -
        (widthFromLeftToCurrentBlock - mouseX);

      const adjustedWidth = Math.max(min, Math.min(newBlockWidth, max));

      blockRef.current.style.width = `${adjustedWidth}px`;
    }
  }, []);

  const handleMouseMoveXL = useCallback((e: MouseEvent) => {
    if (blockRef.current) {
      setIsDrag(true);
      dispatch(setIsResize(true));
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
      setIsDrag(true);
      dispatch(setIsResize(true));
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

      setIsMouseUp(true);
      setSize(newSize);

      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);

      // save to backend
      updateAdjustWidth.mutateAsync({
        value: { ...userSettingsData, [storageKey]: newSize },
        resolution
      });

      // add current size to localStorage
      localStorage.setItem(storageKey, JSON.stringify(newSize));

      console.log(newSize, 'size from function');
      setIsDrag(false);
      dispatch(setIsResize(false));
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
        root: 'top-0 w-2 -left-1.5 h-full',
        firstDivider: 'top-0 left-0.5 w-0.5 h-full',
        secondDivider: 'top-0 right-0 w-0.5 h-full'
      },
      YB: {
        root: 'h-2 -bottom-1 w-full right-0',
        firstDivider: 'top-0 left-0 h-0.5 w-full',
        secondDivider: ' bottom-0 left-0 h-0.5 w-full'
      },
      XR: {
        root: 'top-0 w-2 -right-0.5 h-full',
        firstDivider: 'top-0 left-0 w-0.5 h-full',
        secondDivider: 'top-0 right-0 w-0.5 h-full'
      }
    };

    // console.log(isMouseUp);
    // setUserSettingsData(isMouseUp, apiKey as string, { ...userSettingsData, [storageKey]: size }, resolution);

    return (
      <div
        style={{ cursor: 'col-resize' }}
        onMouseDown={handleMouseDown}
        className={cl('z-10 absolute group transition-all duration-200', params[direction].root)}
      >
        <div
          className={cl(
            size === max ? '' : 'group-hover:opacity-100',

            'absolute top-0 transition-all w-0.5 h-full opacity-0 bg-primary-300'
          )}
          style={{ left: '3px' }}
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
    size,
    isDrag,
    isMouseUp
  };
}
