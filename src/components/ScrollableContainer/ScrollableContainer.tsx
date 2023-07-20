import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import React, { useState, useEffect, useRef, useCallback, ReactNode, HTMLAttributes } from 'react';
import { useAppSelector } from '../../app/hooks';

interface CustomScrollableContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  scrollDirection: 'x' | 'y';
}

const DEFAULT_THUMB_WIDTH = 20;

export function ScrollableContainer({ children, scrollDirection, ...props }: CustomScrollableContainerProps) {
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
        const { clientX, clientY } = e;
        const target = e.target as HTMLDivElement;
        const rect = target.getBoundingClientRect();
        const trackLeft = rect.left;
        const trackTop = rect.top;
        const thumbOffset = -(thumbWidth / 2);
        let clickRatio;
        if (scrollDirection === 'x') {
          clickRatio = (clientX - trackLeft + thumbOffset) / trackCurrent.clientWidth;
        } else {
          clickRatio = (clientY - trackTop + thumbOffset) / trackCurrent.clientHeight;
        }
        const scrollAmount = Math.floor(
          clickRatio * (scrollDirection === 'x' ? contentCurrent.scrollWidth : contentCurrent.scrollHeight)
        );
        if (scrollDirection === 'x') {
          contentCurrent.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
          });
        } else {
          contentCurrent.scrollTo({
            top: scrollAmount,
            behavior: 'smooth'
          });
        }
      }
    },
    [thumbWidth]
  );

  const handleThumbPosition = useCallback(() => {
    if (!contentRef.current || !scrollTrackRef.current || !scrollThumbRef.current) {
      return;
    }
    const {
      scrollLeft: contentLeft,
      scrollTop: contentTop,
      scrollWidth: contentWidth,
      scrollHeight: contentHeight
    } = contentRef.current;
    const { clientWidth: trackWidth, clientHeight: trackHeight } = scrollTrackRef.current;
    let newLeft, newTop;
    if (scrollDirection === 'x') {
      newLeft = (+contentLeft / +contentWidth) * trackWidth;
      newLeft = Math.min(newLeft, trackWidth - thumbWidth) - 35;
    } else {
      newTop = (+contentTop / +contentHeight) * trackHeight;
      newTop = Math.min(newTop, trackHeight - thumbWidth) - 27;
    }
    const thumb = scrollThumbRef.current;
    if (scrollDirection === 'x') {
      thumb.style.left = `${newLeft}px`;
    } else {
      thumb.style.top = `${newTop}px`;
    }
  }, []);

  const handleThumbMousedown = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    setScrollStartPosition(scrollDirection === 'x' ? e.clientX : e.clientY);
    if (contentRef.current)
      setInitialScrollTop(scrollDirection === 'x' ? contentRef.current.scrollLeft : contentRef.current.scrollTop);
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
        const {
          scrollWidth: contentWidth,
          scrollHeight: contentHeight,
          offsetWidth: contentOffsetWidth,
          offsetHeight: contentOffsetHeight
        } = contentRef.current;

        const delta = scrollDirection === 'x' ? e.clientX - scrollStartPosition : e.clientY - scrollStartPosition;
        let newScroll;
        if (scrollDirection === 'x') {
          const deltaX = delta * (contentOffsetWidth / thumbWidth);
          newScroll = Math.min(initialScrollTop + deltaX, contentWidth - contentOffsetWidth);
        } else {
          const deltaY = delta * (contentOffsetHeight / thumbWidth);
          newScroll = Math.min(initialScrollTop + deltaY, contentHeight - contentOffsetHeight);
        }

        if (scrollDirection === 'x') {
          contentRef.current.scrollLeft = newScroll;
        } else {
          contentRef.current.scrollTop = newScroll;
        }
      }
    },
    [isDragging, scrollStartPosition, thumbWidth]
  );

  // update size is pilot is visible / invisible
  const { show: showFullPilot } = useAppSelector((state) => state.slideOver.pilotSideOver);
  const { showMore, currentItemId, activeItemId, showHub, activePlaceId } = useAppSelector((state) => state.workspace);
  const { openedHubId } = useAppSelector((state) => state.hub);

  const initialActivePlaceId: number | null = (JSON.parse(localStorage.getItem('activePlaceIdLocale') as string) ||
    null) as number | null;

  // If the content and the scrollbar track exist, use a ResizeObserver to adjust height of thumb and listen for scroll event to move the thumb
  useEffect(() => {
    const handleResize = (ref: HTMLDivElement, trackSize: number) => {
      const { clientWidth, scrollWidth, clientHeight, scrollHeight } = ref;
      if (scrollDirection === 'x') {
        const THUMB_WIDTH = (clientWidth / scrollWidth) * trackSize;
        setThumbWidth(Math.max(THUMB_WIDTH + 65, DEFAULT_THUMB_WIDTH));
      } else {
        const THUMB_HEIGHT = (clientHeight / scrollHeight) * trackSize;
        setThumbWidth(Math.max(THUMB_HEIGHT + 27, DEFAULT_THUMB_WIDTH));
      }
    };

    const calculateThumbSize = () => {
      if (contentRef.current && scrollTrackRef.current) {
        const ref = contentRef.current;
        const { clientWidth: trackWidth, clientHeight: trackHeight } = scrollTrackRef.current;
        observer.current = new ResizeObserver(() => {
          handleResize(ref, scrollDirection === 'x' ? trackWidth : trackHeight);
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
  }, [showFullPilot, initialActivePlaceId, showHub, showMore, currentItemId, activeItemId, openedHubId, activePlaceId]);

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
  function handleScrollButton(direction: 'left' | 'right' | 'up' | 'down') {
    if (contentRef.current) {
      const width = contentRef.current.offsetWidth;
      const height = contentRef.current.offsetHeight;
      let scrollAmount;
      if (scrollDirection === 'x') {
        scrollAmount = direction === 'left' ? 0 : width;
      } else {
        scrollAmount = direction === 'up' ? 0 : height;
      }

      if (scrollDirection === 'x') {
        contentRef.current.scrollTo({ left: scrollAmount, behavior: 'smooth' });
      } else {
        contentRef.current.scrollTo({ top: scrollAmount, behavior: 'smooth' });
      }
    }
  }

  return (
    <div className={`relative w-full overflow-hidden ${scrollDirection === 'y' ? 'pr-1 flex' : 'p-2'}`}>
      <div className={`scrollbar-hide ${scrollDirection === 'y' ? 'grow mr-1' : ''}`} ref={contentRef} {...props}>
        {children}
      </div>
      <div
        className={` mt-2 group ${
          scrollDirection === 'y' ? 'flex flex-col w-4 items-center' : 'grid w-full grid-cols-2'
        }`}
      >
        <div />

        <div className={`flex items-center space-x-2 mb-4 ${scrollDirection === 'y' ? 'flex-col h-full' : 'flex-row'}`}>
          <div
            className={`flex z-10 gap-1.5 ml-2 bg-transparent opacity-0 group-hover:opacity-100 rounded-md ${
              scrollDirection === 'y' ? 'flex-col' : 'flex-row'
            }`}
          >
            <button
              className="flex items-center justify-center w-3 h-3 bg-gray-200 rounded-full"
              onClick={() => handleScrollButton(scrollDirection === 'y' ? 'up' : 'left')}
            >
              {scrollDirection === 'y' ? (
                <ChevronUpIcon className="w-2 h-2 text-gray-700" />
              ) : (
                <ChevronLeftIcon className="w-2 h-2 text-gray-700" />
              )}
            </button>
            <button
              className="flex items-center justify-center w-3 h-3 bg-gray-200 rounded-full"
              onClick={() => handleScrollButton(scrollDirection === 'y' ? 'down' : 'right')}
            >
              {scrollDirection === 'y' ? (
                <ChevronDownIcon className="w-2 h-2 text-gray-700" />
              ) : (
                <ChevronRightIcon className="w-2 h-2 text-gray-700" />
              )}
            </button>
          </div>
          <div
            className={`relative flex flex-grow block ${scrollDirection === 'y' ? 'w-3 items-center' : ' w-full h-3'}`}
          >
            <div
              className={`absolute top-0 -bottom-7 bg-transparent cursor-pointer rounded-xl ${
                scrollDirection === 'y' ? 'w-3' : ' w-full h-3 -right-12'
              }`}
              ref={scrollTrackRef}
              onClick={handleTrackClick}
            ></div>
            <div
              className={`absolute bg-alsoit-gray-75 hover:bg-alsoit-gray-300 cursor-pointer rounded-xl ${
                scrollDirection === 'y' ? 'w-3' : ' w-full h-3'
              }`}
              ref={scrollThumbRef}
              onMouseDown={handleThumbMousedown}
              style={{
                height: scrollDirection === 'y' ? `${thumbWidth}px` : '',
                width: scrollDirection === 'x' ? `${thumbWidth}px` : '',
                cursor: isDragging ? 'grabbing' : 'grab'
              }}
            ></div>
          </div>
          <div
            className={`flex z-10 gap-1.5 ml-2 bg-transparent opacity-0 group-hover:opacity-100 rounded-md ${
              scrollDirection === 'y' ? 'flex-col' : 'flex-row'
            }`}
          >
            <button
              className="flex items-center justify-center w-3 h-3 bg-gray-200 rounded-full"
              onClick={() => handleScrollButton(scrollDirection === 'y' ? 'up' : 'left')}
            >
              {scrollDirection === 'y' ? (
                <ChevronUpIcon className="w-2 h-2 text-gray-700" />
              ) : (
                <ChevronLeftIcon className="w-2 h-2 text-gray-700" />
              )}
            </button>
            <button
              className="flex items-center justify-center w-3 h-3 bg-gray-200 rounded-full"
              onClick={() => handleScrollButton(scrollDirection === 'y' ? 'down' : 'right')}
            >
              {scrollDirection === 'y' ? (
                <ChevronDownIcon className="w-2 h-2 text-gray-700" />
              ) : (
                <ChevronRightIcon className="w-2 h-2 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
