import { DetailedHTMLProps, SVGAttributes } from 'react';

/* eslint-disable max-len */
interface Props extends DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement> {
  active?: boolean;
}

export function PoundsIcon({ active, ...props }: Props) {
  return (
    <svg {...props} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.068" y="0.068" width="16" height="16" rx="2.664" fill={active ? 'green' : 'white'} />
      <path
        d="M11.6045 5.37682C11.2979 4.8518 10.8254 4.44161 10.2603 4.20967C9.69513 3.97773 9.0687 3.93696 8.47784 4.09365C7.88698 4.25034 7.3646 4.59578 6.99144 5.07655C6.61829 5.55733 6.41514 6.14668 6.4134 6.75349V8.66475M6.4134 8.66475V9.99904C6.4134 10.3175 6.28592 10.6228 6.05899 10.848C5.83206 11.0731 5.52428 11.1996 5.20335 11.1996C5.09638 11.1996 4.99378 11.2418 4.91814 11.3168C4.8425 11.3919 4.8 11.4937 4.8 11.5998C4.8 11.7059 4.8425 11.8077 4.91814 11.8828C4.99378 11.9578 5.09638 12 5.20335 12H11.657M6.4134 8.66475H10.2603M6.4134 8.66475H5.66577H4.91814"
        stroke={active ? 'white' : '#424242'}
        strokeWidth="0.96"
        strokeLinecap="round"
      />
      <rect
        x="0.068"
        y="0.068"
        width="16"
        height="16"
        rx="2.596"
        stroke={active ? '#dedede' : '#424242'}
        strokeWidth="0.9"
      />
    </svg>
  );
}
