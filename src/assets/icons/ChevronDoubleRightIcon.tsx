import { DetailedHTMLProps, SVGAttributes } from 'react';

/* eslint-disable max-len */
type Props = DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement>;

export default function ChevronDoubleRightIcon({ ...props }: Props) {
  return (
    <svg {...props} viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.918839 9.37751C0.761688 9.22591 0.683112 9.03295 0.683112 8.79865C0.683112 8.56435 0.761688 8.3714 0.918839 8.21979L4.24045 4.99472L0.918839 1.76965C0.761688 1.61804 0.679684 1.4284 0.672826 1.20071C0.665397 0.97358 0.747401 0.777318 0.918839 0.61193C1.07599 0.460324 1.276 0.384521 1.51887 0.384521C1.76174 0.384521 1.96175 0.460324 2.1189 0.61193L6.06197 4.41586C6.14769 4.49856 6.20855 4.58814 6.24455 4.68462C6.27999 4.78109 6.2977 4.88446 6.2977 4.99472C6.2977 5.10498 6.27999 5.20835 6.24455 5.30482C6.20855 5.4013 6.14769 5.49089 6.06197 5.57358L2.1189 9.37751C1.96175 9.52912 1.76517 9.60823 1.52916 9.61484C1.29372 9.62201 1.09028 9.5429 0.918839 9.37751ZM6.57629 9.37751C6.41914 9.22591 6.34056 9.03295 6.34056 8.79865C6.34056 8.56435 6.41914 8.3714 6.57629 8.21979L9.89789 4.99472L6.57629 1.76965C6.41914 1.61804 6.33685 1.4284 6.32942 1.20071C6.32256 0.97358 6.40485 0.777318 6.57629 0.61193C6.73344 0.460324 6.93345 0.384521 7.17632 0.384521C7.41919 0.384521 7.6192 0.460324 7.77635 0.61193L11.7194 4.41586C11.8051 4.49856 11.8657 4.58814 11.9011 4.68462C11.9371 4.78109 11.9551 4.88446 11.9551 4.99472C11.9551 5.10498 11.9371 5.20835 11.9011 5.30482C11.8657 5.4013 11.8051 5.49089 11.7194 5.57358L7.77635 9.37751C7.6192 9.52912 7.4229 9.60823 7.18746 9.61484C6.95145 9.62201 6.74773 9.5429 6.57629 9.37751Z"
        fill="black"
        fillOpacity="0.65"
      />
    </svg>
  );
}
