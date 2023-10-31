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

export default function PinnedIcon({ active, dimensions, color }: Props) {
  return (
    <svg
      width={dimensions?.width ?? '14'}
      height={dimensions?.height ?? '13'}
      viewBox="0 0 14 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.58309 7.17757L9.40677 9.00128V10.0846H5.54142V14.4179L4.99977 14.9596L4.45813 14.4179V10.0846H0.592773V9.00128L2.41646 7.17757V1.50128H1.41646V0.417969H8.58309V1.50128H7.58309V7.17757Z"
        fill={active ? ICONS_INTERACTIONS.active : color && !active ? color : ICONS_INTERACTIONS.default}
      />
    </svg>
  );
}
