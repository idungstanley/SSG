import ICONS_INTERACTIONS from '../../utils/Constants/IconInteractions';

/* eslint-disable max-len */
interface Props {
  active: boolean;
  dimensions?: {
    height: number;
    width: number;
  };
}

export default function ArrowCaretUp({ active, dimensions }: Props) {
  return (
    <svg
      width={dimensions?.width ?? '20'}
      height={dimensions?.height ?? '20'}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_1561_989"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width={dimensions?.width ?? '20'}
        height={dimensions?.height ?? '20'}
      >
        <rect
          x="20"
          y="20"
          width={dimensions?.width ?? '20'}
          height={dimensions?.height ?? '20'}
          transform="rotate(-180 20 20)"
          fill="#D9D9D9"
        />
      </mask>
      <g mask="url(#mask0_1561_989)">
        <path
          d="M14.5505 12.3277C14.402 12.4762 14.2417 12.5505 14.0697 12.5505C13.8977 12.5505 13.7375 12.4762 13.589 12.3277L10.3197 9.05848L7.05047 12.3277C6.90197 12.4762 6.74172 12.5505 6.56972 12.5505C6.39772 12.5505 6.23747 12.4762 6.08897 12.3277C5.94045 12.1792 5.8662 12.019 5.8662 11.847C5.8662 11.675 5.94045 11.5147 6.08897 11.3662L9.75082 7.70435C9.8427 7.61246 9.93538 7.54702 10.0289 7.50804C10.1223 7.46904 10.2193 7.44954 10.3197 7.44954C10.4201 7.44954 10.5171 7.46904 10.6106 7.50804C10.7041 7.54702 10.7967 7.61246 10.8886 7.70435L14.5505 11.3662C14.699 11.5147 14.7732 11.675 14.7732 11.847C14.7732 12.019 14.699 12.1792 14.5505 12.3277Z"
          fill={active ? ICONS_INTERACTIONS.active : ICONS_INTERACTIONS.default}
        />
      </g>
    </svg>
  );
}
