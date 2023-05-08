import { DetailedHTMLProps, SVGAttributes } from 'react';

/* eslint-disable max-len */
type Props = DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement>;

export default function WallchartIcon({ ...props }: Props) {
  return (
    <svg {...props} width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 17V4L4 7L9 0L14 4H18V17H0ZM5 14L9 8.5L16 13.95V6H13.3L9.4 2.875L4.45 9.825L2 8V11.6L5 14Z"
        fill="black"
        fillOpacity="0.65"
      />
    </svg>
  );
}
