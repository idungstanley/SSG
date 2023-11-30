/* eslint-disable max-len */
import React from 'react';

interface Props {
  color?: string;
}

export default function DropdownArrowIcon({ color }: Props) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0_5394_82173" maskUnits="userSpaceOnUse" x="0" y="0" width="10" height="10">
        <rect x="10" width="10" height="10" transform="rotate(90 10 0)" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_5394_82173)">
        <path
          d="M2.62505 3.62507C2.70841 3.54169 2.79837 3.5 2.89492 3.5C2.99148 3.5 3.08143 3.54169 3.16479 3.62507L5 5.4605L6.83521 3.62507C6.91857 3.54169 7.00852 3.5 7.10508 3.5C7.20163 3.5 7.29159 3.54169 7.37495 3.62507C7.45832 3.70844 7.5 3.79841 7.5 3.89498C7.5 3.99154 7.45832 4.08151 7.37495 4.16488L5.31935 6.22074C5.26778 6.27233 5.21575 6.30907 5.16327 6.33096C5.1108 6.35285 5.05638 6.3638 5 6.3638C4.94362 6.3638 4.8892 6.35285 4.83673 6.33096C4.78425 6.30907 4.73222 6.27233 4.68065 6.22074L2.62505 4.16488C2.54168 4.08151 2.5 3.99154 2.5 3.89498C2.5 3.79841 2.54168 3.70844 2.62505 3.62507Z"
          fill={color ? color : '#424242'}
        />
      </g>
    </svg>
  );
}
