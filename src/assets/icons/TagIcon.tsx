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
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.1226 14.7509C11.991 14.8823 11.8323 14.948 11.6467 14.948C11.4612 14.948 11.3027 14.8823 11.1713 14.7509L6.73422 10.3139C6.67112 10.2481 6.62168 10.1728 6.5859 10.0878C6.55012 10.0028 6.53223 9.91798 6.53223 9.83324V6.19818C6.53223 6.01502 6.59855 5.85712 6.7312 5.72448C6.86384 5.59184 7.02173 5.52551 7.20489 5.52551H10.8399C10.9249 5.52551 11.0067 5.53989 11.0852 5.56864C11.1638 5.59739 11.2377 5.64572 11.3071 5.71366L15.7477 10.1497C15.8824 10.2844 15.9505 10.4441 15.9522 10.6288C15.9539 10.8136 15.889 10.9716 15.7577 11.103L12.1226 14.7509ZM11.6447 14.2703L15.282 10.6353L10.8422 6.19818H7.20489V9.83324L11.6447 14.2703ZM8.44618 8.08684C8.62568 8.08684 8.77845 8.02402 8.90449 7.89836C9.03054 7.77271 9.09356 7.62013 9.09356 7.44063C9.09356 7.26113 9.03073 7.10836 8.90508 6.98232C8.77942 6.85628 8.62685 6.79325 8.44734 6.79325C8.26784 6.79325 8.11507 6.85608 7.98903 6.98173C7.86299 7.10739 7.79997 7.25997 7.79997 7.43947C7.79997 7.61897 7.86279 7.77174 7.98845 7.89778C8.1141 8.02382 8.26668 8.08684 8.44618 8.08684Z"
        fill={active ? ICONS_INTERACTIONS.active : ICONS_INTERACTIONS.default}
      />
      <circle cx="10.9282" cy="9.99999" r="7.35" stroke="#424242" strokeDasharray="1.57 1.57" />
    </svg>
  );
}
