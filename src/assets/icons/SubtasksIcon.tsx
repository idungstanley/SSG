import { DetailedHTMLProps, SVGAttributes } from 'react';

/* eslint-disable max-len */
type Props = DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement>;

export default function SubtasksIcon({ ...props }: Props) {
  return (
    <svg {...props} width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.6626 1.25L7.6626 3.5" stroke="black" strokeOpacity="0.3" strokeWidth="0.45" strokeLinecap="round" />
      <path d="M6.5 2.41211H8.75" stroke="black" strokeOpacity="0.3" strokeWidth="0.45" strokeLinecap="round" />
      <g clipPath="url(#clip0_8435_128505)">
        <path
          d="M5 7.475H5.225V7.25V6.9125H9.275V8.7125H5.225V7.8125V7.5875H5H4.1V6.125V5.9H3.875H2.975V5V4.775H2.75H1.85V3.3125V3.0875H1.625H0.725V1.2875H5.3375V3.0875H2.1875H1.9625V3.3125V4.4375V4.6625H2.1875H2.75H2.975V4.4375V4.1H7.025V5.9H4.4375H4.2125V6.125V7.25V7.475H4.4375H5Z"
          stroke="black"
          strokeOpacity="0.3"
          strokeWidth="0.45"
        />
      </g>
      <defs>
        <clipPath id="clip0_8435_128505">
          <rect width="9" height="9" fill="white" transform="translate(0.5 0.5)" />
        </clipPath>
      </defs>
    </svg>
  );
}
