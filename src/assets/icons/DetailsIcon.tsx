import ICONS_INTERACTIONS from '../../utils/Constants/IconInteractions';

/* eslint-disable max-len */
interface Props {
  active: boolean;
  dimensions?: {
    height: number;
    width: number;
  };
}

export default function DetailsIcon({ active = false, dimensions }: Props) {
  return (
    <svg
      width={dimensions?.width ?? '20'}
      height={dimensions?.height ?? '20'}
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_4795_21170)">
        <path
          d="M18.1284 0.692139H2.12842C1.02542 0.692139 0.128418 1.68881 0.128418 2.91436V18.4699C0.128418 19.6955 1.02542 20.6921 2.12842 20.6921H18.1284C19.2314 20.6921 20.1284 19.6955 20.1284 18.4699V2.91436C20.1284 1.68881 19.2314 0.692139 18.1284 0.692139ZM2.12842 18.4699V2.91436H18.1284L18.1304 18.4699H2.12842Z"
          fill={active ? ICONS_INTERACTIONS.active : ICONS_INTERACTIONS.default}
          fillOpacity="0.95"
        />
        <path
          d="M5.00098 6.33301H15.001V7.99967H5.00098V6.33301ZM5.00098 9.66634H15.001V11.333H5.00098V9.66634ZM5.00098 12.9997H10.001V14.6663H5.00098V12.9997Z"
          fill={active ? ICONS_INTERACTIONS.active : ICONS_INTERACTIONS.default}
          fillOpacity="0.95"
        />
      </g>
      <defs>
        <clipPath id="clip0_4795_21170">
          <rect
            width={dimensions?.width ?? '20'}
            height={dimensions?.height ?? '20'}
            fill={active ? ICONS_INTERACTIONS.active : ICONS_INTERACTIONS.default}
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
