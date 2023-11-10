import { DetailedHTMLProps, SVGAttributes } from 'react';

/* eslint-disable max-len */
type Props = DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement>;

export function BespokeEntryIcon({ ...props }: Props) {
  return (
    <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 15.4233V4.84616V4.42308C4 4.18942 4.18942 4 4.42308 4H9.5C9.73366 4 9.92308 4.18942 9.92308 4.42308V6.53851H12.0385C12.2721 6.53851 12.4615 6.72792 12.4615 6.96159V9.07701H14.5769C14.8106 9.07701 15 9.26643 15 9.50009V15.4233C15 15.6569 14.8106 15.8464 14.5769 15.8464L4.42308 15.8464C4.18942 15.8464 4 15.657 4 15.4233Z"
        stroke="#FFFFFF"
        strokeWidth="1.1579"
      />
    </svg>
  );
}
