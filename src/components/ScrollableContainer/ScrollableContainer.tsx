import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import React, { useState, useEffect, useRef, useCallback, ReactNode, HTMLAttributes } from 'react';
import { useAppSelector } from '../../app/hooks';

interface CustomScrollableContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const DEFAULT_THUMB_WIDTH = 20;

export function ScrollableContainer({ children, ...props }: CustomScrollableContainerProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const scrollThumbRef = useRef<HTMLDivElement>(null);
  const observer = useRef<ResizeObserver | null>(null);
  const [thumbWidth, setThumbWidth] = useState(DEFAULT_THUMB_WIDTH);
  const [scrollStartPosition, setScrollStartPosition] = useState<number | null>(null);
  const [initialScrollTop, setInitialScrollTop] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleTrackClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();
      const { current: trackCurrent } = scrollTrackRef;
      const { current: contentCurrent } = contentRef;
      if (trackCurrent && contentCurrent) {
        const { clientX } = e;
        const target = e.target as HTMLDivElement;
        const rect = target.getBoundingClientRect();
        const trackTop = rect.left;
        const thumbOffset = -(thumbWidth / 2);
        const clickRatio = (clientX - trackTop + thumbOffset) / trackCurrent.clientWidth;
        const scrollAmount = Math.floor(clickRatio * contentCurrent.scrollWidth);
        contentCurrent.scrollTo({
          left: scrollAmount,
          behavior: 'smooth'
        });
      }
    },
    [thumbWidth]
  );

  const handleThumbPosition = useCallback(() => {
    if (!contentRef.current || !scrollTrackRef.current || !scrollThumbRef.current) {
      return;
    }
    const { scrollLeft: contentTop, scrollWidth: contentHeight } = contentRef.current;
    const { clientWidth: trackHeight } = scrollTrackRef.current;
    let newTop = (+contentTop / +contentHeight) * trackHeight;
    newTop = Math.min(newTop, trackHeight - thumbWidth);
    const thumb = scrollThumbRef.current;
    thumb.style.left = `${newTop}px`;
  }, []);

  const handleThumbMousedown = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    setScrollStartPosition(e.clientX);
    if (contentRef.current) setInitialScrollTop(contentRef.current.scrollLeft);
    setIsDragging(true);
  }, []);

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
        const { scrollWidth: contentScrollHeight, offsetWidth: contentOffsetHeight } = contentRef.current;

        const deltaY = (e.clientX - scrollStartPosition) * (contentOffsetHeight / thumbWidth);
        const newScrollTop = Math.min(initialScrollTop + deltaY, contentScrollHeight - contentOffsetHeight);

        contentRef.current.scrollLeft = newScrollTop;
      }
    },
    [isDragging, scrollStartPosition, thumbWidth]
  );

  // update size is pilot is visible / invisible
  const { show: showFullPilot } = useAppSelector((state) => state.slideOver.pilotSideOver);

  // If the content and the scrollbar track exist, use a ResizeObserver to adjust height of thumb and listen for scroll event to move the thumb
  useEffect(() => {
    const handleResize = (ref: HTMLDivElement, trackSize: number) => {
      const { clientWidth, scrollWidth } = ref;
      setThumbWidth(Math.max((clientWidth / scrollWidth) * trackSize, DEFAULT_THUMB_WIDTH));
    };

    const calculateThumbSize = () => {
      if (contentRef.current && scrollTrackRef.current) {
        const ref = contentRef.current;
        const { clientWidth: trackSize } = scrollTrackRef.current;
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
    };

    calculateThumbSize();

    window.addEventListener('resize', calculateThumbSize);

    return () => {
      window.removeEventListener('resize', calculateThumbSize);
    };
  }, [showFullPilot]);

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
  function handleScrollButton(direction: 'left' | 'right') {
    if (contentRef.current) {
      const width = contentRef.current.offsetWidth;
      const scrollAmount = direction === 'left' ? 0 : width;

      contentRef.current.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    }
  }

  return (
    <div className="relative w-full p-2 overflow-hidden">
      <div className="scrollbar-hide" ref={contentRef} {...props}>
        {children}
      </div>
      <div className="grid w-full grid-cols-2 mt-2">
        <div />

        <div className="flex items-center space-x-2">
          <div className="flex mr-2">
            <button
              className="flex items-center justify-center w-4 h-4 bg-gray-200 rounded-full"
              onClick={() => handleScrollButton('left')}
            >
              <ChevronLeftIcon className="w-3 h-3 text-gray-700" />
            </button>
            <button
              className="flex items-center justify-center w-4 h-4 bg-gray-200 rounded-full"
              onClick={() => handleScrollButton('right')}
            >
              <ChevronRightIcon className="w-3 h-3 text-gray-700" />
            </button>
          </div>

          <div className="relative flex-grow block w-full h-3">
            <div
              className="absolute top-0 bottom-0 w-full h-3 bg-transparent cursor-pointer rounded-xl"
              ref={scrollTrackRef}
              onClick={handleTrackClick}
            ></div>
            <div
              className="absolute h-3 bg-gray-400 cursor-pointer rounded-xl"
              ref={scrollThumbRef}
              onMouseDown={handleThumbMousedown}
              style={{
                width: `${thumbWidth}px`,
                cursor: isDragging ? 'grabbing' : 'grab'
              }}
            ></div>
          </div>
          <div className="flex gap-1 ml-2 bg-gray-100 rounded">
            <button
              className="flex items-center justify-center w-4 h-4 bg-gray-200 rounded-full"
              onClick={() => handleScrollButton('left')}
            >
              <ChevronLeftIcon className="w-3 h-3 text-gray-700" />
            </button>
            <button
              className="flex items-center justify-center w-4 h-4 bg-gray-200 rounded-full"
              onClick={() => handleScrollButton('right')}
            >
              <ChevronRightIcon className="w-3 h-3 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
