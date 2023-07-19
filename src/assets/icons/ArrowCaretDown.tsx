import ICONS_INTERACTIONS from '../../utils/Constants/IconInteractions';

/* eslint-disable max-len */
interface Props {
  active: boolean;
  dimensions?: {
    height: number;
    width: number;
  };
}

export default function ArrowCaretDown({ active, dimensions }: Props) {
  return (
    <svg
      width={dimensions?.width ?? '20'}
      height={dimensions?.height ?? '20'}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_176_1260"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20"
      >
        <rect width="20" height="20" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_176_1260)">
        <path
          d="M9.52403 11.4102L8.09132 9.97756C7.86698 9.7532 7.81169 9.49252 7.92547 9.19552C8.03925 8.89851 8.26014 8.75 8.58814 8.75H11.5064C11.8205 8.75 12.0345 8.89851 12.1482 9.19552C12.262 9.49252 12.2067 9.7532 11.9824 9.97756L10.5497 11.4102C10.477 11.4829 10.3958 11.5382 10.3061 11.5761C10.2163 11.6141 10.1266 11.633 10.0368 11.633C9.94711 11.633 9.85737 11.6141 9.76762 11.5761C9.67788 11.5382 9.59669 11.4829 9.52403 11.4102Z"
          fill={active ? ICONS_INTERACTIONS.active : ICONS_INTERACTIONS.default}
        />
      </g>
    </svg>
  );
}
