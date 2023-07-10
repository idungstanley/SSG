import { DetailedHTMLProps, SVGAttributes } from 'react';

/* eslint-disable max-len */
type Props = DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement>;

export default function ArrowCaretDown({ ...props }: Props | undefined) {
  return (
    <svg {...props} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask
        id="mask0_982_788"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20"
      >
        <rect x="20" width="20" height="20" transform="rotate(90 20 0)" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_982_788)">
        <path
          d="M5.76925 7.35259C5.91775 7.20408 6.078 7.12982 6.25 7.12982C6.422 7.12982 6.58225 7.20408 6.73075 7.35259L10 10.6218L13.2693 7.35259C13.4178 7.20408 13.578 7.12982 13.75 7.12982C13.922 7.12982 14.0823 7.20408 14.2308 7.35259C14.3793 7.50109 14.4535 7.66134 14.4535 7.83334C14.4535 8.00534 14.3793 8.16559 14.2308 8.31409L10.5689 11.9759C10.477 12.0678 10.3843 12.1333 10.2909 12.1723C10.1974 12.2113 10.1004 12.2308 10 12.2308C9.89957 12.2308 9.80262 12.2113 9.70915 12.1723C9.61566 12.1333 9.52298 12.0678 9.43111 11.9759L5.76925 8.31409C5.62074 8.16559 5.54648 8.00534 5.54648 7.83334C5.54648 7.66134 5.62074 7.50109 5.76925 7.35259Z"
          fill="#424242"
        />
      </g>
    </svg>
  );
}
