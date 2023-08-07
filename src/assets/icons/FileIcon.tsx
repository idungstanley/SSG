import ICONS_INTERACTIONS from '../../utils/Constants/IconInteractions';

/* eslint-disable max-len */
interface Props {
  active: boolean;
  dimensions?: {
    height: number;
    width: number;
  };
}

export default function FileIcon({ active = false, dimensions }: Props) {
  return (
    <svg
      width={dimensions?.width ?? '20'}
      height={dimensions?.height ?? '20'}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_2016_6738"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width={dimensions?.width ?? '20'}
        height={dimensions?.height ?? '20'}
      >
        <rect width={dimensions?.width ?? '20'} height={dimensions?.height ?? '20'} fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_2016_6738)">
        <path
          d="M5.75052 17.5833C5.37519 17.5833 5.05905 17.4538 4.8021 17.1948C4.54516 16.9357 4.41669 16.6187 4.41669 16.2436V3.75644C4.41669 3.38133 4.5462 3.06426 4.80523 2.80523C5.06426 2.5462 5.38133 2.41669 5.75644 2.41669H11.6475C11.8236 2.41669 11.9932 2.44874 12.1562 2.51285C12.3192 2.57695 12.469 2.67738 12.6058 2.81413L15.1859 5.39421C15.3226 5.53097 15.423 5.68085 15.4871 5.84383C15.5513 6.00681 15.5833 6.17637 15.5833 6.35254V16.2436C15.5833 16.6187 15.4537 16.9357 15.1945 17.1948C14.9353 17.4538 14.6181 17.5833 14.2427 17.5833H5.75052ZM11.4167 5.91344V3.5H5.75644C5.69233 3.5 5.63356 3.52671 5.58012 3.58013C5.52671 3.63356 5.5 3.69233 5.5 3.75644V16.2436C5.5 16.3077 5.52671 16.3664 5.58012 16.4199C5.63356 16.4733 5.69233 16.5 5.75644 16.5H14.2436C14.3077 16.5 14.3664 16.4733 14.4199 16.4199C14.4733 16.3664 14.5 16.3077 14.5 16.2436V6.58331H12.0866C11.8954 6.58331 11.736 6.51944 11.6083 6.39171C11.4806 6.26399 11.4167 6.10456 11.4167 5.91344Z"
          fill="#FFFFFF"
        />
      </g>
    </svg>
  );
}
