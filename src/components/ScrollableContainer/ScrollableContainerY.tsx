import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import React, { useState, useEffect, useRef, useCallback, ReactNode, HTMLAttributes } from 'react';
interface CustomScrollableContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const DEFAULT_THUMB_HEIGHT = 20;

export function ScrollableContainerY({ children, ...props }: CustomScrollableContainerProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const scrollThumbRef = useRef<HTMLDivElement>(null);
  const observer = useRef<ResizeObserver | null>(null);
  const [thumbHeight, setThumbHeight] = useState(DEFAULT_THUMB_HEIGHT);
  const [scrollStartPosition, setScrollStartPosition] = useState<number | null>(null);
  const [initialScrollTop, setInitialScrollTop] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);

  // If the content and the scrollbar track exist, use a ResizeObserver to adjust height of thumb and listen for scroll event to move the thumb
  function handleResize(ref: HTMLDivElement, trackSize: number) {
    const { clientHeight, scrollHeight } = ref;
    setThumbHeight(Math.max((clientHeight / scrollHeight) * trackSize, 20));
  }

  function handleScrollButton(direction: 'up' | 'down') {
    const { current } = contentRef;
    if (current) {
      const scrollAmount = direction === 'down' ? 200 : -200;
      current.scrollBy({ top: scrollAmount, behavior: 'smooth' });
    }
  }

  const handleTrackClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();
      const { current: trackCurrent } = scrollTrackRef;
      const { current: contentCurrent } = contentRef;
      if (trackCurrent && contentCurrent) {
        const { clientY } = e;
        const target = e.target as HTMLDivElement;
        const rect = target.getBoundingClientRect();
        const trackTop = rect.top;
        const thumbOffset = -(thumbHeight / 2);
        const clickRatio = (clientY - trackTop + thumbOffset) / trackCurrent.clientHeight;
        const scrollAmount = Math.floor(clickRatio * contentCurrent.scrollHeight);
        contentCurrent.scrollTo({
          top: scrollAmount,
          behavior: 'smooth'
        });
      }
    },
    [thumbHeight]
  );

  const handleThumbPosition = useCallback(() => {
    if (!contentRef.current || !scrollTrackRef.current || !scrollThumbRef.current) {
      return;
    }
    const { scrollTop: contentTop, scrollHeight: contentHeight } = contentRef.current;
    const { clientHeight: trackHeight } = scrollTrackRef.current;
    let newTop = (+contentTop / +contentHeight) * trackHeight;
    newTop = Math.min(newTop, trackHeight - thumbHeight);
    const thumb = scrollThumbRef.current;
    thumb.style.top = `${newTop}px`;
  }, []);

  const handleThumbMousedown = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();
      setScrollStartPosition(e.clientY);
      if (contentRef.current) setInitialScrollTop(contentRef.current.scrollTop);
      setIsDragging(true);
    },
    [isDragging]
  );

  const handleThumbMouseup = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (isDragging) {
        setIsDragging(false);
      }
    },
    [isDragging]
  );

  const handleThumbMousemove = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (isDragging && contentRef.current && scrollStartPosition) {
        const { scrollHeight: contentScrollHeight, offsetHeight: contentOffsetHeight } = contentRef.current;
        // Subtract the current mouse y position from where you started to get the pixel difference in mouse position. Multiply by ratio of visible content height to thumb height to scale up the difference for content scrolling.
        const deltaY = (e.clientY - scrollStartPosition) * (contentOffsetHeight / thumbHeight);
        const newScrollTop = Math.min(initialScrollTop + deltaY, contentScrollHeight - contentOffsetHeight);
        contentRef.current.scrollTop = newScrollTop;
      }
    },
    [isDragging, scrollStartPosition, thumbHeight]
  );

  useEffect(() => {
    if (contentRef.current && scrollTrackRef.current) {
      const ref = contentRef.current;
      const { clientHeight: trackSize } = scrollTrackRef.current;
      observer.current = new ResizeObserver(() => {
        handleResize(ref, trackSize);
      });
      observer.current.observe(ref);
      ref.addEventListener('scroll', handleThumbPosition);
      return () => {
        observer.current?.unobserve(ref);
        ref.removeEventListener('scroll', handleThumbPosition);
      };
    }
  }, []);

  // Listen for mouse events to handle scrolling by dragging the thumb
  useEffect(() => {
    document.addEventListener('mousemove', handleThumbMousemove);
    document.addEventListener('mouseup', handleThumbMouseup);
    document.addEventListener('mouseleave', handleThumbMouseup);
    return () => {
      document.removeEventListener('mousemove', handleThumbMousemove);
      document.removeEventListener('mouseup', handleThumbMouseup);
      document.removeEventListener('mouseleave', handleThumbMouseup);
    };
  }, [handleThumbMousemove, handleThumbMouseup]);

  // scroll buttons

  return (
    <div className="relative w-full pr-1 overflow-hidden flex">
      <div className="scrollbar-hide grow mr-1" ref={contentRef} {...props}>
        {children}
      </div>
      <div className="flex flex-col mt-2 w-4 items-center border-l group">
        <div />

        <div className="flex flex-col h-full items-center space-x-2">
          <div className="flex flex-col gap-1 bg-gray-100 rounded ml-2 opacity-0 group-hover:opacity-100">
            <button
              className="flex items-center justify-center w-3 h-3 bg-gray-200 rounded-full"
              onClick={() => handleScrollButton('up')}
            >
              <ChevronUpIcon className="w-2 h-2 text-gray-700" />
            </button>
            <button
              className="flex items-center justify-center w-3 h-3 bg-gray-200 rounded-full"
              onClick={() => handleScrollButton('down')}
            >
              <ChevronDownIcon className="w-2 h-2 text-gray-700" />
            </button>
          </div>

          <div className="relative flex flex-grow block w-2 items-center">
            <div
              className="absolute top-0 bottom-0 w-2 bg-transparent cursor-pointer rounded-xl"
              ref={scrollTrackRef}
              onClick={handleTrackClick}
            ></div>
            <div
              className="absolute w-2 bg-alsoit-gray-75 hover:bg-alsoit-gray-300 cursor-pointer rounded-xl"
              ref={scrollThumbRef}
              onMouseDown={handleThumbMousedown}
              style={{
                height: `${thumbHeight}px`,
                cursor: isDragging ? 'grabbing' : 'grab'
              }}
            ></div>
          </div>
          <div className="flex flex-col gap-1 bg-gray-100 rounded opacity-0 group-hover:opacity-100">
            <button
              className="flex items-center justify-center w-3 h-3 bg-gray-200 rounded-full"
              onClick={() => handleScrollButton('up')}
            >
              <ChevronUpIcon className="w-2 h-2 text-gray-700" />
            </button>
            <button
              className="flex items-center justify-center w-3 h-3 bg-gray-200 rounded-full"
              onClick={() => handleScrollButton('down')}
            >
              <ChevronDownIcon className="w-2 h-2 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
