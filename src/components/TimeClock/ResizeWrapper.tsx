import React, { useRef, useState } from 'react';
import './resizeWrapper.css';
import { useAppDispatch } from '../../app/hooks';
import { setUpdatePosition } from '../../features/insights/insightsSlice';

interface IResizeWrapperProps {
  children: React.ReactNode;
  positions: { x: number; y: number };
}

const TOP_LEFT = 'top-left';
const TOP_RIGHT = 'top-right';
const BOTTOM_LEFT = 'bottom-left';
const BOTTOM_RIGHT = 'bottom-right';

export default function ResizeWrapper({ children, positions }: IResizeWrapperProps) {
  const dispatch = useAppDispatch();

  const [isDragging, setIsDragging] = useState(false);
  const [isShowDots, setShowDots] = useState(false);
  const [startMousePosition, setStartMousePosition] = useState({ x: 0, y: 0 });
  const [startSize, setStartSize] = useState({ width: 0, height: 0 });
  const [startPosition, setStartPosition] = useState({ left: 0, top: 0 });

  const wrapperRef = useRef<HTMLDivElement>(null);
  const topLeftRef = useRef(null);
  const topRightRef = useRef(null);
  const bottomLeftRef = useRef(null);
  const bottomRightRef = useRef(null);
  const minimum_size = 20;

  const handlePointerDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    dispatch(setUpdatePosition(true));
    if (wrapperRef.current) {
      const original_width = parseFloat(
        getComputedStyle(wrapperRef.current, null).getPropertyValue('width').replace('px', '')
      );
      const original_height = parseFloat(
        getComputedStyle(wrapperRef.current, null).getPropertyValue('height').replace('px', '')
      );
      setStartMousePosition({ x: e.pageX, y: e.pageY });
      setStartSize({ width: original_width, height: original_height });
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    dispatch(setUpdatePosition(false));
    if (wrapperRef.current) {
      setStartPosition({
        left: Number(wrapperRef.current.style.left.replace('px', '')),
        top: Number(wrapperRef.current.style.top.replace('px', ''))
      });
    }
  };

  const handlePointerMove = (e: React.MouseEvent<HTMLDivElement>, activeCorner: string) => {
    if (isDragging && wrapperRef.current) {
      const element = wrapperRef.current;

      if (activeCorner === BOTTOM_RIGHT) {
        const width = startSize.width + (e.pageX - startMousePosition.x);
        const height = startSize.height + (e.pageY - startMousePosition.y);
        if (width > minimum_size) {
          element.style.width = width + 'px';
        }
        if (height > minimum_size) {
          element.style.height = height + 'px';
        }
      } else if (activeCorner === BOTTOM_LEFT) {
        const width = startSize.width - (e.pageX - startMousePosition.x);
        const height = startSize.height + (e.pageY - startMousePosition.y);
        if (height > minimum_size) {
          element.style.height = height + 'px';
        }
        if (width > minimum_size) {
          element.style.width = width + 'px';
          element.style.left = startPosition.left + (e.pageX - startMousePosition.x) + 'px';
        }
      } else if (activeCorner === TOP_RIGHT) {
        const width = startSize.width + (e.pageX - startMousePosition.x);
        const height = startSize.height - (e.pageY - startMousePosition.y);
        if (width > minimum_size) {
          element.style.width = width + 'px';
        }
        if (height > minimum_size) {
          element.style.height = height + 'px';
          element.style.top = startPosition.top + (e.pageY - startMousePosition.y) + 'px';
        }
      } else {
        const width = startSize.width - (e.pageX - startMousePosition.x);
        const height = startSize.height - (e.pageY - startMousePosition.y);
        if (width > minimum_size) {
          element.style.width = width + 'px';
          element.style.left = startPosition.left + (e.pageX - startMousePosition.x) + 'px';
        }
        if (height > minimum_size) {
          element.style.height = height + 'px';
          element.style.top = startPosition.top + (e.pageY - startMousePosition.y) + 'px';
        }
      }
    }
  };

  return (
    <div
      className="relative"
      ref={wrapperRef}
      style={{
        width: '330px',
        height: '200px',
        transform: `translateX(${positions.x}px) translateY(${positions.y}px)`
      }}
      onMouseEnter={() => setShowDots(true)}
      onMouseLeave={() => setShowDots(false)}
    >
      {isShowDots ? (
        <>
          <div
            className="resizer top-left"
            ref={topLeftRef}
            onMouseDown={(e) => handlePointerDown(e)}
            onMouseUp={handlePointerUp}
            onMouseMove={(e) => handlePointerMove(e, TOP_LEFT)}
          />
          <div
            className="resizer top-right"
            ref={topRightRef}
            onMouseDown={(e) => handlePointerDown(e)}
            onMouseUp={handlePointerUp}
            onMouseMove={(e) => handlePointerMove(e, TOP_RIGHT)}
          />
          <div
            className="resizer bottom-left"
            ref={bottomLeftRef}
            onMouseDown={(e) => handlePointerDown(e)}
            onMouseUp={handlePointerUp}
            onMouseMove={(e) => handlePointerMove(e, BOTTOM_LEFT)}
          />
          <div
            className="resizer bottom-right"
            ref={bottomRightRef}
            onMouseDown={(e) => handlePointerDown(e)}
            onMouseUp={handlePointerUp}
            onMouseMove={(e) => handlePointerMove(e, BOTTOM_RIGHT)}
          />
        </>
      ) : null}
      {children}
    </div>
  );
}
