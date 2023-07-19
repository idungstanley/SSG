import ICONS_INTERACTIONS from '../../utils/Constants/IconInteractions';

/* eslint-disable max-len */
interface Props {
  active?: boolean;
  dimensions?: {
    height: number;
    width: number;
  };
}

export default function ArrowLeft({ active, dimensions }: Props) {
  return (
    <svg
      width={dimensions?.width ?? '20'}
      height={dimensions?.height ?? '20'}
      viewBox="0 0 20 20"
      fill="none"
      rotate="-180deg"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_1504_788"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20"
      >
        <rect width="20" height="20" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_1504_788)">
        <path
          d="M12.008 5.76925C12.1565 5.91775 12.2307 6.078 12.2307 6.25C12.2307 6.422 12.1565 6.58225 12.008 6.73075L8.73874 10L12.008 13.2693C12.1565 13.4178 12.2307 13.578 12.2307 13.75C12.2307 13.922 12.1565 14.0823 12.008 14.2308C11.8595 14.3793 11.6992 14.4535 11.5272 14.4535C11.3552 14.4535 11.195 14.3793 11.0465 14.2308L7.38462 10.5689C7.29273 10.477 7.22729 10.3843 7.18831 10.2909C7.14931 10.1974 7.12981 10.1004 7.12981 10C7.12981 9.89957 7.14931 9.80262 7.18831 9.70915C7.22729 9.61566 7.29273 9.52298 7.38462 9.43111L11.0465 5.76925C11.195 5.62074 11.3552 5.54648 11.5272 5.54648C11.6992 5.54648 11.8595 5.62074 12.008 5.76925Z"
          fill={active ? ICONS_INTERACTIONS.active : ICONS_INTERACTIONS.default}
        />
      </g>
    </svg>
  );
}
