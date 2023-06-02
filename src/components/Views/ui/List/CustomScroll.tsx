import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useRef } from 'react';

interface CustomScrollbarProps {
  children: React.ReactNode;
}

function CustomScrollbar({ children }: CustomScrollbarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    if (contentRef.current && thumbRef.current && scrollAreaRef.current) {
      const contentWidth = contentRef.current.getBoundingClientRect().width;
      const scrollAreaWidth = scrollAreaRef.current.offsetWidth;
      const thumbWidth = (scrollAreaWidth / contentWidth) * scrollAreaWidth;

      thumbRef.current.style.width = `${thumbWidth}px`;
    }
  }, []);

  const updateThumbPosition = () => {
    if (contentRef.current && thumbRef.current && scrollAreaRef.current && scrollRef.current) {
      const scrollAreaWidth = scrollAreaRef.current.offsetWidth;
      const scrollWidth = scrollRef.current.scrollWidth;
      const thumbWidth = thumbRef.current.offsetWidth;

      const maxScrollLeft = scrollWidth - scrollAreaWidth;
      const scrollPercentage = (scrollRef.current.scrollLeft / maxScrollLeft) * 100;
      const thumbPosition = (scrollAreaWidth - thumbWidth) * (scrollPercentage / 100);

      thumbRef.current.style.transform = `translateX(${thumbPosition}px)`;
    }
  };

  const handleScroll = () => {
    updateThumbPosition();
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const handleThumbMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (thumbRef.current) {
      event.preventDefault();
      isDragging.current = true;
      thumbRef.current.classList.add('dragging');
      document.addEventListener('mousemove', handleThumbMouseMove);
      document.addEventListener('mouseup', handleThumbMouseUp);
    }
  };

  const handleThumbMouseMove = (event: MouseEvent) => {
    if (isDragging.current && scrollRef.current && thumbRef.current && scrollAreaRef.current) {
      const scrollAreaWidth = scrollAreaRef.current.offsetWidth;
      const scrollWidth = scrollRef.current.scrollWidth;
      const thumbWidth = thumbRef.current.offsetWidth;

      const maxScrollLeft = scrollWidth - scrollAreaWidth;
      const offsetX = event.clientX - thumbRef.current.getBoundingClientRect().left;
      const thumbPosition = Math.max(0, Math.min(scrollAreaWidth - thumbWidth, offsetX));

      const scrollPercentage = (thumbPosition / (scrollAreaWidth - thumbWidth)) * 100;
      const scrollLeft = (maxScrollLeft * scrollPercentage) / 100;

      scrollRef.current.scrollLeft = scrollLeft;
      updateThumbPosition();
    }
  };

  const handleThumbMouseUp = () => {
    if (isDragging.current && thumbRef.current) {
      isDragging.current = false;
      thumbRef.current.classList.remove('dragging');
      document.removeEventListener('mousemove', handleThumbMouseMove);
      document.removeEventListener('mouseup', handleThumbMouseUp);
    }
  };

  const handleScrollToStart = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: 0,
        behavior: 'smooth'
      });
    }
  };

  const handleScrollToEnd = () => {
    if (scrollRef.current && contentRef.current) {
      const contentWidth = contentRef.current.getBoundingClientRect().width;
      scrollRef.current.scrollTo({
        left: contentWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative pl-6 overflow-hidden p-2">
      <div className="overflow-x-auto scrollbar-hide" ref={scrollRef}>
        <div className="w-full" ref={contentRef}>
          {children}
        </div>
      </div>

      <div className="w-full grid grid-cols-2 mt-2">
        <div></div>

        <div className="w-full flex items-center space-x-2">
          <button
            className="w-4 h-4 flex items-center bg-gray-200 justify-center rounded-full"
            onClick={handleScrollToStart}
          >
            <ChevronLeftIcon className="w-3 h-3 text-gray-700" />
          </button>

          {/* scrollbar */}
          <div ref={scrollAreaRef} className="flex-grow h-3 w-full bg-transparent rounded-xl">
            {/* thumb */}
            <div
              ref={thumbRef}
              className="h-full bg-gray-400 rounded-xl cursor-pointer"
              onMouseDown={handleThumbMouseDown}
            ></div>
          </div>

          <button
            className="w-4 h-4 flex items-center bg-gray-200 justify-center rounded-full"
            onClick={handleScrollToEnd}
          >
            <ChevronRightIcon className="w-3 h-3 text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomScrollbar;
