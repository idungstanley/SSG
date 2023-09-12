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

export function SortIcon({ active, dimensions, ...props }: Props) {
  return (
    <svg
      width={dimensions?.width ?? '21'}
      height={dimensions?.width ?? '20'}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        cx="10.9282"
        cy="9.99997"
        r="7"
        stroke={active ? ICONS_INTERACTIONS.active : ICONS_INTERACTIONS.default}
        strokeWidth="0.875"
      />
      <path
        d="M10.872 13.9603L13.0045 11.838C13.0752 11.7673 13.1572 11.7311 13.2506 11.7294C13.344 11.7277 13.4277 11.7639 13.5019 11.838C13.576 11.9122 13.6131 11.9942 13.6131 12.0841C13.6131 12.174 13.576 12.2561 13.5019 12.3302L11.3693 14.4576C11.23 14.597 11.0642 14.6666 10.872 14.6666C10.6798 14.6666 10.514 14.597 10.3746 14.4576L8.24723 12.3302C8.17652 12.2595 8.14168 12.1783 8.14271 12.0867C8.14374 11.9951 8.18132 11.9122 8.25546 11.838C8.3296 11.7639 8.41163 11.7277 8.50156 11.7294C8.59149 11.7311 8.67352 11.7673 8.74765 11.838L10.872 13.9603ZM10.872 6.03968L8.73426 8.16707C8.66356 8.23778 8.58153 8.27485 8.48817 8.27829C8.39481 8.28172 8.31106 8.24465 8.23692 8.16707C8.16279 8.09294 8.12658 8.01091 8.12829 7.92098C8.13001 7.83106 8.16793 7.74903 8.24208 7.67489L10.3746 5.54234C10.514 5.40299 10.6798 5.33331 10.872 5.33331C11.0642 5.33331 11.23 5.40299 11.3693 5.54234L13.5019 7.67489C13.5726 7.74559 13.6096 7.82454 13.6131 7.91172C13.6165 7.9989 13.5811 8.07955 13.507 8.15369C13.4329 8.23126 13.35 8.26834 13.2583 8.2649C13.1667 8.26146 13.0838 8.22439 13.0097 8.15369L10.872 6.03968Z"
        fill={active ? ICONS_INTERACTIONS.active : ICONS_INTERACTIONS.default}
      />
    </svg>
  );
}
