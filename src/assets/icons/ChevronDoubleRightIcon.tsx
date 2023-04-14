import { DetailedHTMLProps, SVGAttributes } from 'react';

/* eslint-disable max-len */
type Props = DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement>;

export default function ChevronDoubleRightIcon({ ...props }: Props) {
  return (
    <svg {...props} viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="20" height="20" transform="translate(0.75)" fill="white" />
      <path
        d="M3.91884 14.3775C3.76169 14.2259 3.68311 14.033 3.68311 13.7987C3.68311 13.5644 3.76169 13.3714 3.91884 13.2198L7.24045 9.99472L3.91884 6.76965C3.76169 6.61804 3.67968 6.4284 3.67283 6.20071C3.6654 5.97358 3.7474 5.77732 3.91884 5.61193C4.07599 5.46032 4.276 5.38452 4.51887 5.38452C4.76174 5.38452 4.96175 5.46032 5.1189 5.61193L9.06197 9.41586C9.14769 9.49856 9.20855 9.58814 9.24456 9.68462C9.27999 9.78109 9.2977 9.88446 9.2977 9.99472C9.2977 10.105 9.27999 10.2083 9.24456 10.3048C9.20855 10.4013 9.14769 10.4909 9.06197 10.5736L5.1189 14.3775C4.96175 14.5291 4.76517 14.6082 4.52916 14.6148C4.29372 14.622 4.09028 14.5429 3.91884 14.3775ZM9.57629 14.3775C9.41914 14.2259 9.34056 14.033 9.34056 13.7987C9.34056 13.5644 9.41914 13.3714 9.57629 13.2198L12.8979 9.99472L9.57629 6.76965C9.41914 6.61804 9.33685 6.4284 9.32942 6.20071C9.32256 5.97358 9.40485 5.77732 9.57629 5.61193C9.73344 5.46032 9.93345 5.38452 10.1763 5.38452C10.4192 5.38452 10.6192 5.46032 10.7764 5.61193L14.7194 9.41586C14.8051 9.49856 14.8657 9.58814 14.9011 9.68462C14.9371 9.78109 14.9551 9.88446 14.9551 9.99472C14.9551 10.105 14.9371 10.2083 14.9011 10.3048C14.8657 10.4013 14.8051 10.4909 14.7194 10.5736L10.7764 14.3775C10.6192 14.5291 10.4229 14.6082 10.1875 14.6148C9.95145 14.622 9.74773 14.5429 9.57629 14.3775Z"
        fill="black"
        fillOpacity="0.65"
      />
      <line
        x1="0.692308"
        y1="-0.692308"
        x2="8.53846"
        y2="-0.692308"
        transform="matrix(-8.396e-05 -1 1 -5.37274e-05 17.7759 14.6155)"
        stroke="black"
        strokeOpacity="0.65"
        strokeWidth="1.38462"
        strokeLinecap="round"
      />
    </svg>
  );
}