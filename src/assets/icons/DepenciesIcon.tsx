import { DetailedHTMLProps, SVGAttributes } from 'react';

/* eslint-disable max-len */
type Props = DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement>;

export function DependenciesIcon({ color, ...props }: Props) {
  return (
    <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.80002 11.2692V8.73077H14.2V11.2692H5.80002Z"
        stroke={color ?? '#FFFFFF'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 11.6923V14.2308H13.2667M13.2667 14.2308V15.5H17V12.9616H13.2667V13.5962V14.2308Z"
        stroke={color ?? '#FFFFFF'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.99998 8.30774V5.76927H6.73332M6.73332 5.76927V4.50004L3 4.50004L3 7.03851L6.73332 7.03851V6.40389V5.76927Z"
        stroke={color ?? '#FFFFFF'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
