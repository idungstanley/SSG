import React from 'react';

interface iconProps {
  color?: string;
  dimenions?: {
    width: string;
    height: string;
  };
}

export default function TaskIcon({ color = 'black', dimenions }: iconProps) {
  return (
    <svg
      width={dimenions?.width ?? '13'}
      height={dimenions?.height ?? '13'}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.86728 3H18.75M1.25 2.75L2.1142 3.75L4.27469 1.25M1.25 10.25L2.1142 11.25L4.27469 8.75M1.25 17.75L2.1142 18.75L4.27469 16.25M6.86728 10.5H18.75M6.86728 18H18.75"
        stroke={color}
        strokeOpacity="0.65"
        strokeWidth="1.64062"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
