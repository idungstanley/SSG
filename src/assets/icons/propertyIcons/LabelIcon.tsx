import React from 'react';
import { PropertyIconProps } from './AltRouteIcon';

export default function LabelIcon({ color }: PropertyIconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5 7.46667V4.65C5 4.29101 5.29102 4 5.65 4H15.1833C15.5423 4 15.8333 4.29102 15.8333 4.65V10.5V15.731C15.8333 16.2609 15.2335 16.5681 14.8035 16.2585L10.4167 13.1L6.0298 16.2585C5.59984 16.5681 5 16.2609 5 15.731V12.2333V7.46667ZM5 7.46667H15.3344"
        stroke={color ? color : '#424242'}
        strokeWidth="1.08342"
      />
    </svg>
  );
}
