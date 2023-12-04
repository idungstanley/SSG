import React from 'react';
import { PropertyIconProps } from './AltRouteIcon';

export default function ProgressBarIcon({ color }: PropertyIconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.5 8.875H4.8125C4.29473 8.875 3.875 9.29473 3.875 9.8125C3.875 10.3303 4.29473 10.75 4.8125 10.75H9.5C10.0178 10.75 10.4375 10.3303 10.4375 9.8125C10.4375 9.29473 10.0178 8.875 9.5 8.875Z"
        fill={color ? color : '#424242'}
        stroke={color ? color : '#424242'}
        strokeWidth="0.46875"
      />
      <path
        d="M16.0625 7H2.9375C2.41973 7 2 7.41973 2 7.9375V11.6875C2 12.2053 2.41973 12.625 2.9375 12.625H16.0625C16.5803 12.625 17 12.2053 17 11.6875V7.9375C17 7.41973 16.5803 7 16.0625 7Z"
        stroke={color ? color : '#424242'}
        strokeWidth="0.9375"
      />
    </svg>
  );
}
