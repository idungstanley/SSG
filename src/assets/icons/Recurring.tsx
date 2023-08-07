import ICONS_INTERACTIONS from '../../utils/Constants/IconInteractions';

/* eslint-disable max-len */
interface Props {
  active: boolean;
  dimensions?: {
    height: number;
    width: number;
  };
}

export default function RecurringIcon({ active, dimensions }: Props) {
  return (
    <svg
      width={dimensions?.width ?? '20'}
      height={dimensions?.height ?? '20'}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_2069_6814"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width={dimensions?.width ?? '20'}
        height={dimensions?.height ?? '20'}
      >
        <rect height={dimensions?.height ?? '20'} width={dimensions?.width ?? '20'} fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_2069_6814)">
        <path
          d="M7.80769 15.7211L7.03367 14.9471L8.4856 13.5112C6.74628 13.3274 5.29997 12.9035 4.14667 12.2396C2.99335 11.5756 2.41669 10.8291 2.41669 10C2.41669 9.0171 3.15707 8.17415 4.63783 7.47117C6.1186 6.76818 7.90599 6.41669 10 6.41669C12.094 6.41669 13.8814 6.76818 15.3622 7.47117C16.8429 8.17415 17.5833 9.0171 17.5833 10C17.5833 10.7051 17.1699 11.3598 16.3429 11.9639C15.516 12.5681 14.4017 13.0053 13 13.2756V12.1667C14 11.9306 14.8333 11.6076 15.5 11.1979C16.1667 10.7882 16.5 10.3889 16.5 10C16.5 9.34508 15.8264 8.76469 14.4792 8.25881C13.1319 7.75294 11.6389 7.5 10 7.5C8.375 7.5 6.88542 7.75641 5.53125 8.26923C4.17708 8.78205 3.5 9.35897 3.5 10C3.5 10.5043 4.00134 10.9992 5.00402 11.4848C6.0067 11.9704 7.13197 12.2815 8.37983 12.4183L7.03367 11.0721L7.80769 10.2981L10.5192 13.0096L7.80769 15.7211Z"
          fill={active ? ICONS_INTERACTIONS.active : ICONS_INTERACTIONS.default}
        />
      </g>
    </svg>
  );
}
