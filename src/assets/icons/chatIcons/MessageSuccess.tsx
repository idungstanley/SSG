/* eslint-disable max-len */
import React from 'react';

interface Props {
  color?: string;
}

export default function MessageSuccess({ color }: Props) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.19922 9.9002L7.19922 12.7002L13.1992 6.7002"
        stroke={color ? color : '#0559D6'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.69922 12.2007L9.79923 13.3008L15.7992 7.30078"
        stroke={color ? color : '#0559D6'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
