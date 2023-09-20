import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import React, { useState, useEffect, useRef, useCallback, ReactNode, HTMLAttributes } from 'react';
import { useAppSelector } from '../../app/hooks';

interface CustomScrollableContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}
const DEFAULT_THUMB_WIDTH = 20;
const ARROWS_WRAPPER_HEIGHT = 27;

export function VerticalScroll({ children, ...props }: CustomScrollableContainerProps) {
  // update size is pilot is visible / invisible
  const { show: showFullPilot } = useAppSelector((state) => state.slideOver.pilotSideOver);
  const {
    showMore,
    currentItemId,
    activeTabId,
    activeSubDetailsTabId,
    activeSubTimeClockTabId,
    activeSubHubManagerTabId,
    activeSubCommunicationTabId,
    activeSubChecklistTabId,
    showTabLabel,
    isResize,
    activeItemId,
    activePlaceId
  } = useAppSelector((state) => state.workspace);

  const [thumbWidth, setThumbWidth] = useState(DEFAULT_THUMB_WIDTH);
  const [isThumbVisible, setIsThumbVisible] = useState(true);
  const [topPosition, setTopPosition] = useState<number>(-ARROWS_WRAPPER_HEIGHT);
  const [scrollStartPosition, setScrollStartPosition] = useState<number | null>(null);
  const [initialScrollTop, setInitialScrollTop] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const scrollThumbRef = useRef<HTMLDivElement>(null);
  const observer = useRef<ResizeObserver | null>(null);

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
        const thumbOffset = -(thumbWidth / 2);
        const clickRatio = (clientY - trackTop + thumbOffset) / trackCurrent.clientHeight;
        const scrollAmount = Math.floor(clickRatio * contentCurrent.scrollHeight);
        contentCurrent.scrollTo({
          top: scrollAmount,
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
    const { scrollTop: contentTop, scrollHeight: contentHeight } = contentRef.current;
    const { clientHeight: trackHeight } = scrollTrackRef.current;
    let newTop;
    newTop = (+contentTop / +contentHeight) * trackHeight;
    newTop = Math.min(newTop, trackHeight - thumbWidth) - ARROWS_WRAPPER_HEIGHT;
    setTopPosition(newTop);
    const thumb = scrollThumbRef.current;
    thumb.style.top = `${newTop}px`;
  }, []);

  const handleThumbMousedown = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    setScrollStartPosition(e.clientY);
    if (contentRef.current) setInitialScrollTop(contentRef.current.scrollTop);
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
        const { scrollHeight: contentHeight, offsetHeight: contentOffsetHeight } = contentRef.current;

        const delta = e.clientY - scrollStartPosition;
        const deltaY = delta * (contentOffsetHeight / thumbWidth);
        const newScroll = Math.min(initialScrollTop + deltaY, contentHeight - contentOffsetHeight);
        contentRef.current.scrollTop = newScroll;
      }
    },
    [isDragging, scrollStartPosition, thumbWidth]
  );

  const pilotFromLS = JSON.parse(localStorage.getItem('pilot') || '""') as {
    tabOrder: number[];
    showTabLabel: boolean;
  };
  const showTabLabelFromLS = !!pilotFromLS.showTabLabel;
  const initialActivePlaceId: number | null = (JSON.parse(localStorage.getItem('activePlaceIdLocale') as string) ||
    null) as number | null;

  // If the content and the scrollbar track exist, use a ResizeObserver to adjust height of thumb and listen for scroll event to move the thumb
  useEffect(() => {
    const handleResize = (ref: HTMLDivElement, trackSize: number) => {
      const { clientHeight, scrollHeight } = ref;
      const THUMB_HEIGHT = (clientHeight / scrollHeight) * trackSize;
      setThumbWidth(Math.max(THUMB_HEIGHT + 27, DEFAULT_THUMB_WIDTH));
      const showScrollHeight = scrollHeight - 10;

      setIsThumbVisible(showScrollHeight > clientHeight); // Check if the content height is greater than the track height
    };

    const calculateThumbSize = () => {
      if (contentRef.current && scrollTrackRef.current) {
        const ref = contentRef.current;
        const { clientHeight: trackHeight } = scrollTrackRef.current;
        observer.current = new ResizeObserver(() => {
          handleResize(ref, trackHeight);
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
  }, [
    showFullPilot,
    isResize,
    initialActivePlaceId,
    showTabLabel,
    showTabLabelFromLS,
    showMore,
    currentItemId,
    activeItemId,
    activePlaceId,
    activeTabId,
    activeSubDetailsTabId,
    activeSubTimeClockTabId,
    activeSubHubManagerTabId,
    activeSubCommunicationTabId,
    activeSubChecklistTabId
  ]);

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
  function handleScrollButton(direction: 'up' | 'down') {
    if (contentRef.current) {
      const height = contentRef.current.offsetHeight;
      const scrollAmount = direction === 'up' ? 0 : height;
      contentRef.current.scrollTo({ top: scrollAmount, behavior: 'smooth' });
    }
  }

  const renderScrollArrows = () => {
    return (
      <div className="flex z-10 gap-1.5 bg-alsoit-gray-50 bg-opacity-75 opacity-0 group-hover:opacity-100 rounded-md flex-col">
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
    );
  };

  return (
    <div className="relative flex w-full pr-1 overflow-hidden">
      <div className="mr-1 scrollbar-hide grow" ref={contentRef} {...props}>
        {children}
      </div>
      {isThumbVisible && (
        <div className="flex flex-col items-center w-4 mt-2 group">
          <div />
          <div className="flex flex-col items-center h-full mb-4">
            {renderScrollArrows()}
            <div className="relative flex items-center flex-grow block w-2">
              <div
                className="absolute top-0 w-2 bg-transparent cursor-pointer -bottom-7 rounded-xl"
                ref={scrollTrackRef}
                onClick={handleTrackClick}
              ></div>
              <div
                className="absolute bg-alsoit-gray-75 hover:bg-alsoit-gray-300 cursor-pointer rounded-xl w-2 hover:w-3 hover:-left-0.5"
                ref={scrollThumbRef}
                onMouseDown={handleThumbMousedown}
                style={{
                  height: `${thumbWidth}px`,
                  top: `${topPosition}px`,
                  cursor: isDragging ? 'grabbing' : 'grab'
                }}
              ></div>
            </div>
            {renderScrollArrows()}
          </div>
        </div>
      )}
    </div>
  );
}
