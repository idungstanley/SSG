/* eslint-disable max-len */
import React from 'react';

interface Props {
  color?: string;
}

export default function ChatStar({ color }: Props) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0_5831_33003" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
        <rect width="20" height="20" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_5831_33003)">
        <path
          d="M7.31563 14.2304L9.98229 12.6471L12.6698 14.2304L11.9615 11.2304L14.274 9.25127L11.2115 8.98043L9.98229 6.12627L8.75313 8.98043L5.69062 9.25127L8.02396 11.2304L7.31563 14.2304ZM5.66983 16.4691L6.82206 11.6407L3 8.39231L8.01277 7.95643L9.98229 3.40039L11.9518 7.97727L16.9646 8.39231L13.1425 11.6407L14.2947 16.4691L9.98229 13.9083L5.66983 16.4691Z"
          fill={color ? color : '#424242'}
        />
      </g>
    </svg>
  );
}
