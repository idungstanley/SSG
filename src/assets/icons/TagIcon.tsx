import { DetailedHTMLProps, SVGAttributes } from 'react';
import ICONS_INTERACTIONS from '../../utils/Constants/IconInteractions';

/* eslint-disable max-len */

interface Dimensions {
  height: number;
  width: number;
}

interface Props extends DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement> {
  active?: boolean;
  dimensions?: Dimensions;
}

export default function TagIcon({ active, dimensions, ...props }: Props) {
  return (
    <svg
      {...props}
      width={dimensions?.width ?? '21'}
      height={dimensions?.height ?? '20'}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.068" y="0.068" width="16" height="16" rx="2.596" fill={active ? '#F9E6FF' : 'white'} />
      <path
        d="M7.97657 4H4.46316C4.20736 4 4 4.20736 4 4.46316V7.97657C4 8.09941 4.0488 8.21722 4.13566 8.30408L8.30408 12.4725C8.48495 12.6534 8.77821 12.6534 8.95908 12.4725L12.4725 8.95908C12.6534 8.77821 12.6534 8.48495 12.4725 8.30408L8.30408 4.13566C8.21722 4.0488 8.09941 4 7.97657 4Z"
        stroke={active ? ICONS_INTERACTIONS.active : '#424242'}
        strokeWidth="0.926316"
      />
      <circle cx="5.52711" cy="5.52868" r="0.602105" fill={active ? 'white' : '#424242'} />
      <rect
        x="0.068"
        y="0.068"
        width="16"
        height="16"
        rx="2.596"
        stroke={active ? ICONS_INTERACTIONS.active : '#424242'}
        strokeWidth="0.136"
      />
    </svg>
  );
}
