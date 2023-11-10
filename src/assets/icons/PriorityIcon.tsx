import { DetailedHTMLProps, SVGAttributes } from 'react';

/* eslint-disable max-len */
type Props = DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement>;

export function PriorityIcon({ ...props }: Props) {
  return (
    <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask
        id="mask0_379_683"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20"
      >
        <rect width="20" height="20" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_379_683)">
        <path
          d="M4.37502 18.125V2.52083C4.37502 2.33316 4.43914 2.17861 4.56739 2.05716C4.69564 1.93573 4.85456 1.87502 5.04414 1.87502C5.23372 1.87502 5.39181 1.9389 5.51841 2.06668C5.64501 2.19445 5.70831 2.35277 5.70831 2.54166V3.54168H16.024C16.3168 3.54168 16.5371 3.65781 16.6851 3.89008C16.833 4.12236 16.8568 4.37161 16.7564 4.63783L15.609 7.52083L16.7564 10.4038C16.8568 10.6701 16.833 10.9193 16.6851 11.1516C16.5371 11.3838 16.3168 11.5 16.024 11.5H5.70831V18.125L4.37502 18.125ZM5.70831 10.1667H15.2212L14.1619 7.52083L15.2212 4.87497H5.70831V10.1667Z"
          fill="#FFFFFF"
        />
      </g>
    </svg>
  );
}
