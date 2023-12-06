import React from 'react';
import { PropertyIconProps } from './AltRouteIcon';

export default function DirectoryIcon({ color }: PropertyIconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.2884 4V16H5.61263C5.18493 16 4.77475 15.842 4.47233 15.5607C4.1699 15.2794 4 14.8978 4 14.5V5.5C4 5.10217 4.1699 4.72064 4.47233 4.43934C4.77475 4.15804 5.18493 4 5.61263 4H15.2884Z"
        stroke={color ? color : '#424242'}
        strokeWidth="1.00714"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.2884 12.9998H5.61263C5.18493 12.9998 4.77475 13.1578 4.47233 13.4391C4.1699 13.7204 4 14.1019 4 14.4998M7.22525 6.99976H12.0631"
        stroke={color ? color : '#424242'}
        strokeWidth="1.00714"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
