import React from 'react';

export default function StatusIconComp({ color }: { color: string }) {
  return (
    <div>
      <svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0 0.45C0 0.201472 0.201472 0 0.45 0H4.95C5.19853 0 5.4 0.201472 5.4 0.45V6H0V0.45Z"
          fill={`${color}`}
        />
        <path
          d="M1.79999 2.45C1.79999 2.20147 2.00146 2 2.24999 2H6.74999C6.99852 2 7.19999 2.20147 7.19999 2.45V8H1.79999V2.45Z"
          fill={`${color}`}
        />
        <path d="M0 4.45C0 4.20147 0.201472 4 0.45 4H8.55C8.79853 4 9 4.20147 9 4.45V10H0V4.45Z" fill={`${color}`} />
      </svg>
    </div>
  );
}
