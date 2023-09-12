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

export function ScreenRecordIcon({ active, dimensions, ...props }: Props) {
  return (
    <svg
      width={dimensions?.width ?? '20'}
      height={dimensions?.height ?? '20'}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.3333 5.83334H4.66665C4.20641 5.83334 3.83331 6.20644 3.83331 6.66668V13.3333C3.83331 13.7936 4.20641 14.1667 4.66665 14.1667H14.3333C14.7935 14.1667 15.1666 13.7936 15.1666 13.3333V6.66668C15.1666 6.20644 14.7936 5.83334 14.3333 5.83334Z"
        stroke={active ? ICONS_INTERACTIONS.active : ICONS_INTERACTIONS.default}
        strokeWidth="0.833333"
        strokeLinejoin="round"
      />
      <path
        d="M13.8333 4.16666H15.6667C16.1269 4.16666 16.5 4.53975 16.5 4.99999V7.49999"
        stroke={active ? ICONS_INTERACTIONS.active : ICONS_INTERACTIONS.default}
        strokeWidth="0.833333"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 12.5V15C16.5 15.4602 16.1269 15.8333 15.6667 15.8333H13.8333"
        stroke={active ? ICONS_INTERACTIONS.active : ICONS_INTERACTIONS.default}
        strokeWidth="0.833333"
        strokeLinejoin="round"
      />
      <path
        d="M5.16667 4.16666H3.33333C2.8731 4.16666 2.5 4.53975 2.5 4.99999V7.49999"
        stroke={active ? ICONS_INTERACTIONS.active : ICONS_INTERACTIONS.default}
        strokeWidth="0.833333"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 12.5V15C2.5 15.4602 2.8731 15.8333 3.33333 15.8333H5.16667"
        stroke={active ? ICONS_INTERACTIONS.active : ICONS_INTERACTIONS.default}
        strokeWidth="0.833333"
        strokeLinejoin="round"
      />
    </svg>
  );
}
