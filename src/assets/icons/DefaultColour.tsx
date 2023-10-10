import React from 'react';
import ICONS_INTERACTIONS from '../../utils/Constants/IconInteractions';

interface Props {
  active?: boolean;
  dimensions?: {
    height: number;
    width: number;
  };
  color?: string;
}

function DefaultColour({ active, dimensions, color }: Props) {
  return (
    <svg
      width={dimensions?.width ?? '16'}
      height={dimensions?.height ?? '17'}
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.1"
        y="0.975"
        width="15.8"
        height="15.8"
        rx="1.9"
        fill={active ? ICONS_INTERACTIONS.active : color && !active ? color : 'white'}
        stroke="#626262"
        strokeWidth="0.2"
      />
      <path d="M1.07031 1.80469L15 15.8755" stroke="#626262" strokeWidth="0.2" />
    </svg>
  );
}

export default DefaultColour;
