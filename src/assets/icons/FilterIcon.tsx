import React from 'react';

interface iconProp {
  dimensions?: {
    width: string;
    height: string;
  };
}

/* eslint-disable max-len */
function FilterIcon({ dimensions }: iconProp) {
  return (
    <svg
      width={dimensions?.width ?? '14'}
      height={dimensions?.height ?? '14'}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.7883 13.6998C6.65076 13.6998 6.53488 13.6535 6.44065 13.5609C6.34641 13.4683 6.2993 13.3531 6.2993 13.2151V7.75168L0.626247 0.890181C0.533947 0.767098 0.520689 0.637931 0.586472 0.502681C0.652272 0.367431 0.759755 0.299805 0.908922 0.299805H13.0896C13.2388 0.299805 13.3463 0.367431 13.4121 0.502681C13.4779 0.637931 13.4646 0.767098 13.3723 0.890181L7.69925 7.75168V13.2151C7.69925 13.3531 7.65311 13.4683 7.56082 13.5609C7.46854 13.6535 7.35363 13.6998 7.2161 13.6998H6.7883ZM6.99927 6.54978L11.0493 1.59978H2.92427L6.99927 6.54978Z"
        fill="#424242"
      />
    </svg>
  );
}

export default FilterIcon;
