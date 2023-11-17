/* eslint-disable max-len */
import React from 'react';

interface IGanttIconProps {
  color?: string;
}

export default function GanttIcon({ color }: IGanttIconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="#424242" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.3875 4.5H7.925C7.56026 4.5 7.25253 4.7441 7.15625 5.07784C7.05998 4.7441 6.75225 4.5 6.3875 4.5ZM11.075 4.5H12.6125C12.2478 4.5 11.94 4.7441 11.8438 5.07785C11.7475 4.7441 11.4397 4.5 11.075 4.5ZM12.6125 15.5H11.075C11.4397 15.5 11.7475 15.2559 11.8438 14.9222C11.94 15.2559 12.2478 15.5 12.6125 15.5ZM7.925 15.5H6.3875C6.75225 15.5 7.05998 15.2559 7.15625 14.9222C7.25253 15.2559 7.56026 15.5 7.925 15.5Z"
        stroke={color ? color : '#424242'}
        strokeLinejoin="round"
      />
    </svg>
  );
}
