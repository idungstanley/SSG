import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import React, { useState, useEffect, useRef, useCallback, ReactNode, HTMLAttributes } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setGroupScrollSettings } from '../../features/general/slideOver/slideOverSlice';

interface CustomScrollableContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}
const DEFAULT_THUMB_WIDTH = 20;
const ARROWS_WRAPPER_WIDTH = 27;

export function HorizontalScroll({ children, ...props }: CustomScrollableContainerProps) {
  const dispatch = useAppDispatch();

  // update size is pilot is visible / invisible
  const { show: showFullPilot } = useAppSelector((state) => state.slideOver.pilotSideOver);
  const { tasks, subtasks } = useAppSelector((state) => state.task);
  const {
    showMore,
    currentItemId,
    activeTabId,
    activeSubDetailsTabId,
    activeSubTimeClockTabId,
    activeSubHubManagerTabId,
    activeSubCommunicationTabId,
    showTabLabel,
    isResize,
    activeItemId,
    activePlaceId
  } = useAppSelector((state) => state.workspace);
  const { sidebarWidth, pilotWidth, extendedBarWidth } = useAppSelector((state) => state.account);

  const [thumbWidth, setThumbWidth] = useState(DEFAULT_THUMB_WIDTH);
  const [isThumbVisible, setIsThumbVisible] = useState(true);
  const [leftPosition, setLeftPosition] = useState<number>(-ARROWS_WRAPPER_WIDTH);
  const [scrollStartPosition, setScrollStartPosition] = useState<number | null>(null);
  const [initialScrollTop, setInitialScrollTop] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const observer = useRef<ResizeObserver | null>(null);

  const handleTrackClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
      const { current: trackCurrent } = scrollTrackRef;
      const { current: contentCurrent } = contentRef;
      if (trackCurrent && contentCurrent) {
        const { clientX } = e;
        const target = e.target as HTMLDivElement;
        const rect = target.getBoundingClientRect();
        const trackLeft = rect.left;
        const thumbOffset = -(thumbWidth / 2);
        const clickRatio = (clientX - trackLeft + thumbOffset) / trackCurrent.clientWidth;
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
    if (!contentRef.current || !scrollTrackRef.current) {
      return;
    }
    const { scrollLeft: contentLeft, scrollWidth: contentWidth } = contentRef.current;
    const { clientWidth: trackWidth } = scrollTrackRef.current;
    let newLeft;
    newLeft = (+contentLeft / +contentWidth) * trackWidth;
    newLeft = Math.min(newLeft, trackWidth - thumbWidth) - ARROWS_WRAPPER_WIDTH;
    setLeftPosition(newLeft);
  }, []);

  const handleThumbMousedown = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setScrollStartPosition(e.clientX);
    if (contentRef.current) setInitialScrollTop(contentRef.current.scrollLeft);
    setIsDragging(true);
  }, []);

  const handleThumbMouseup = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      if (isDragging) {
        setIsDragging(false);
      }
    },
    [isDragging]
  );

  const handleThumbMousemove = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      if (isDragging && contentRef.current && scrollStartPosition) {
        const { scrollWidth: contentWidth, offsetWidth: contentOffsetWidth } = contentRef.current;

        const delta = e.clientX - scrollStartPosition;
        const deltaX = delta * (contentOffsetWidth / thumbWidth);
        const newScroll = Math.min(initialScrollTop + deltaX, contentWidth - contentOffsetWidth);

        contentRef.current.scrollLeft = newScroll;
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
      const { clientWidth, scrollWidth } = ref;
      const THUMB_WIDTH = (clientWidth / scrollWidth) * trackSize;
      setThumbWidth(Math.max(THUMB_WIDTH + 65, DEFAULT_THUMB_WIDTH));
      setIsThumbVisible(scrollWidth > clientWidth); // Check if the content width is greater than the track width
      dispatch(
        setGroupScrollSettings({
          offsetWidth: ref.offsetWidth,
          scrollLeft: ref.scrollLeft,
          scrollWidth: ref.scrollWidth,
          clientWidth: ref.clientWidth,
          thumbWidth: Math.max(THUMB_WIDTH + 65, DEFAULT_THUMB_WIDTH)
        })
      );
    };

    const calculateThumbSize = () => {
      if (contentRef.current && scrollTrackRef.current) {
        const ref = contentRef.current;
        const { clientWidth: trackWidth } = scrollTrackRef.current;

        observer.current = new ResizeObserver(() => {
          handleResize(ref, trackWidth);
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
    tasks,
    subtasks,
    thumbWidth,
    sidebarWidth,
    pilotWidth,
    extendedBarWidth
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
  function handleScrollButton(direction: 'left' | 'right') {
    if (contentRef.current) {
      const width = contentRef.current.offsetWidth;
      const scrollAmount = direction === 'left' ? 0 : width;
      contentRef.current.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    }
  }

  const renderScrollArrows = () => {
    return (
      <div className="flex z-10 gap-1.5 bg-alsoit-gray-50 bg-opacity-75 opacity-0 group-hover:opacity-100 rounded-md flex-row ml-2">
        <button
          className="flex items-center justify-center w-3 h-3 bg-gray-200 rounded-full"
          onClick={() => handleScrollButton('left')}
        >
          <ChevronLeftIcon className="w-2 h-2 text-gray-700" />
        </button>
        <button
          className="flex items-center justify-center w-3 h-3 bg-gray-200 rounded-full"
          onClick={() => handleScrollButton('right')}
        >
          <ChevronRightIcon className="w-2 h-2 text-gray-700" />
        </button>
      </div>
    );
  };

  return (
    <>
      <div className="relative w-full p-1 overflow-hidden">
        <div className="scrollbar-hide" ref={contentRef} {...props}>
          {children}
        </div>
      </div>
      {isThumbVisible && (
        <div className="sticky bottom-0 z-10 grid w-full grid-cols-2 pr-2 group">
          <div />
          <div className="flex flex-row items-center mb-1 space-x-2">
            {renderScrollArrows()}
            <div className="relative flex flex-grow w-full h-2">
              <div
                className="absolute top-0 w-full h-2 bg-transparent cursor-pointer -bottom-7 rounded-xl -right-12"
                ref={scrollTrackRef}
                onClick={handleTrackClick}
              ></div>
              <div
                className="absolute bg-alsoit-gray-75 hover:bg-alsoit-gray-300 cursor-pointer rounded-xl w-full h-2 hover:h-3 hover:-top-0.5"
                onMouseDown={handleThumbMousedown}
                style={{
                  width: `${thumbWidth}px`,
                  left: `${leftPosition}px`,
                  cursor: isDragging ? 'grabbing' : 'grab'
                }}
              ></div>
            </div>
            {renderScrollArrows()}
          </div>
        </div>
      )}
    </>
  );
}
