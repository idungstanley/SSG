import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import React, { useEffect, useRef } from 'react';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';

export default function ProgressBar() {
  const progressBarRef = useRef<LoadingBarRef>(null);
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  useEffect(() => {
    if (isFetching !== 0 || isMutating !== 0) {
      progressBarRef.current?.staticStart();
      progressBarRef.current?.continuousStart(65, 500);
    } else {
      progressBarRef.current?.complete();
    }
  }, [isFetching, isMutating]);

  return (
    <LoadingBar
      color="#EF4444"
      height={2.5}
      waitingTime={100}
      loaderSpeed={250}
      ref={progressBarRef}
    />
  );
}
