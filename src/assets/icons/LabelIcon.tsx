import { DetailedHTMLProps, SVGAttributes } from 'react';
import ICONS_INTERACTIONS from '../../utils/Constants/IconInteractions';

/* eslint-disable max-len */
interface Props extends DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement> {
  active?: boolean;
}

export function LabelIcon({ active, ...props }: Props) {
  return (
    <svg {...props} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.068" y="0.068" width="16" height="16" rx="2.596" fill={active ? '#F9E6FF' : 'white'} />
      <path
        d="M4.66562 6.13333V4.4C4.66562 4.17909 4.84471 4 5.06562 4H10.9323C11.1532 4 11.3323 4.17909 11.3323 4.4V8V11.2191C11.3323 11.5451 10.9632 11.7342 10.6986 11.5437L7.99895 9.6L5.29934 11.5437C5.03475 11.7342 4.66562 11.5451 4.66562 11.2191V9.06667V6.13333ZM4.66562 6.13333H11.0253"
        stroke={active ? ICONS_INTERACTIONS.active : ICONS_INTERACTIONS.default}
        strokeWidth="0.666719"
      />
      <rect
        x="0.068"
        y="0.068"
        width="16"
        height="16"
        rx="2.596"
        stroke={active ? ICONS_INTERACTIONS.active : ICONS_INTERACTIONS.default}
        strokeWidth="0.136"
      />
    </svg>
  );
}
