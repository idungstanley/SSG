/* eslint-disable max-len */
import { DetailedHTMLProps, SVGAttributes } from 'react';
import interactions from '../../utils/Constants/IconInteractions';

interface ArrowUpProps extends DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement> {
  active?: boolean;
}

export default function ArrowUp({ active = false, ...props }: ArrowUpProps) {
  return (
    <svg {...props} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask
        id="mask0_982_788"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20"
      >
        <rect x="0" y="0" width="20" height="20" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_982_788)">
        <path
          d="M5.76925 12.6474C5.91775 12.7959 6.078 12.8702 6.25 12.8702C6.422 12.8702 6.58225 12.7959 6.73075 12.6474L10 9.37816L13.2693 12.6474C13.4178 12.7959 13.578 12.8702 13.75 12.8702C13.922 12.8702 14.0823 12.7959 14.2308 12.6474C14.3793 12.4989 14.4535 12.3387 14.4535 12.1667C14.4535 11.9947 14.3793 11.8344 14.2308 11.6859L10.5689 8.02409C10.477 7.93219 10.3843 7.86664 10.2909 7.82765C10.1974 7.78866 10.1004 7.76915 10 7.76915C9.89957 7.76915 9.80262 7.78866 9.70915 7.82765C9.61566 7.86664 9.52298 7.93219 9.43111 8.02409L5.76925 11.6859C5.62074 11.8344 5.54648 11.9947 5.76925 12.6474Z"
          fill={active ? interactions.active : 'white'}
        />
      </g>
    </svg>
  );
}
