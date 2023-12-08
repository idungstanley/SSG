/* eslint-disable max-len */
import React from 'react';

interface Props {
  color?: string;
}

export default function CommentsIcon({ color }: Props) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0_5490_52903" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
        <rect width="20" height="20" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_5490_52903)">
        <path
          d="M5.03139 14.5836L3.55308 16.0619C3.34205 16.2729 3.09979 16.3211 2.82629 16.2065C2.55277 16.0919 2.41602 15.8853 2.41602 15.5868V3.75674C2.41602 3.38163 2.54553 3.06456 2.80456 2.80553C3.06359 2.54651 3.38065 2.41699 3.75577 2.41699H16.2429C16.618 2.41699 16.9351 2.54651 17.1941 2.80553C17.4531 3.06456 17.5826 3.38163 17.5826 3.75674V13.2439C17.5826 13.619 17.4531 13.936 17.1941 14.1951C16.9351 14.4541 16.618 14.5836 16.2429 14.5836H5.03139ZM4.07629 13.5003H16.2429C16.307 13.5003 16.3658 13.4736 16.4192 13.4202C16.4726 13.3667 16.4993 13.308 16.4993 13.2439V3.75674C16.4993 3.69263 16.4726 3.63386 16.4192 3.58043C16.3658 3.52701 16.307 3.50031 16.2429 3.50031H3.75577C3.69165 3.50031 3.63288 3.52701 3.57945 3.58043C3.52604 3.63386 3.49933 3.69263 3.49933 3.75674V14.0773L4.07629 13.5003Z"
          fill={color ? color : '#424242'}
        />
      </g>
    </svg>
  );
}