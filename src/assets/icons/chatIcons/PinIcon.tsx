/* eslint-disable max-len */
import React from 'react';

interface Props {
  color?: string;
}

export default function PinIcon({ color }: Props) {
  return (
    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0_5805_32436" maskUnits="userSpaceOnUse" x="0" y="0" width="21" height="20">
        <rect x="0.5" width="20" height="20" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_5805_32436)">
        <path
          d="M13.0841 10.1766L14.9078 12.0003V13.0836H11.0424V17.4169L10.5008 17.9586L9.9591 17.4169V13.0836H6.09375V12.0003L7.91744 10.1766V4.50031H6.91744V3.41699H14.0841V4.50031H13.0841V10.1766ZM7.62575 12.0003H13.3758L12.0008 10.6253V4.50031H9.00075V10.6253L7.62575 12.0003Z"
          fill={color ? color : 'white'}
        />
      </g>
    </svg>
  );
}
