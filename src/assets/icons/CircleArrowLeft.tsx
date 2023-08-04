import ICONS_INTERACTIONS from '../../utils/Constants/IconInteractions';

/* eslint-disable max-len */
interface Props {
  active: boolean;
  dimensions?: {
    height: number;
    width: number;
  };
}

export default function CircleArrowLeft({ active, dimensions }: Props) {
  return (
    <svg
      width={dimensions?.width ?? '20'}
      height={dimensions?.height ?? '20'}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_2099_277"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20"
      >
        <rect width="20" height="20" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_2099_277)">
        <path
          d="M9.37015 10.5416H12.256C12.4077 10.5416 12.535 10.4901 12.6376 10.3871C12.7403 10.2841 12.7916 10.1564 12.7916 10.0041C12.7916 9.8518 12.7403 9.72276 12.6376 9.617C12.535 9.51124 12.4077 9.45835 12.256 9.45835H9.37015L10.3974 8.43108C10.5128 8.31749 10.5705 8.19026 10.5705 8.04942C10.5705 7.90857 10.5128 7.78046 10.3974 7.66508C10.282 7.5497 10.1539 7.492 10.0131 7.492C9.87225 7.492 9.74503 7.5497 9.63142 7.66508L7.75835 9.53813C7.62352 9.67297 7.5561 9.82819 7.5561 10.0038C7.5561 10.1794 7.62448 10.333 7.76123 10.4647L9.63142 12.3349C9.74681 12.4503 9.87447 12.5032 10.0144 12.4936C10.1544 12.484 10.282 12.4215 10.3974 12.3061C10.5128 12.1907 10.5705 12.0626 10.5705 11.9218C10.5705 11.7809 10.5128 11.6537 10.3974 11.5401L9.37015 10.5416ZM10.0071 17.5833C8.96392 17.5833 7.98142 17.386 7.05965 16.9912C6.13785 16.5965 5.33103 16.0534 4.63919 15.3619C3.94733 14.6703 3.40394 13.8642 3.00904 12.9434C2.61414 12.0226 2.41669 11.0388 2.41669 9.99185C2.41669 8.94494 2.61405 7.96406 3.00877 7.04923C3.40349 6.13438 3.94662 5.33104 4.63815 4.63919C5.32969 3.94733 6.13585 3.40394 7.05662 3.00904C7.9774 2.61414 8.96124 2.41669 10.0081 2.41669C11.0551 2.41669 12.0359 2.61405 12.9508 3.00877C13.8656 3.40349 14.669 3.94662 15.3608 4.63815C16.0527 5.32969 16.5961 6.13422 16.991 7.05175C17.3859 7.96928 17.5833 8.94965 17.5833 9.99285C17.5833 11.0361 17.386 12.0186 16.9912 12.9404C16.5965 13.8621 16.0534 14.669 15.3619 15.3608C14.6703 16.0527 13.8658 16.5961 12.9482 16.991C12.0307 17.3859 11.0504 17.5833 10.0071 17.5833ZM10 16.5C11.8056 16.5 13.3403 15.8681 14.6042 14.6042C15.8681 13.3403 16.5 11.8056 16.5 10C16.5 8.19444 15.8681 6.65972 14.6042 5.39583C13.3403 4.13194 11.8056 3.5 10 3.5C8.19444 3.5 6.65972 4.13194 5.39583 5.39583C4.13194 6.65972 3.5 8.19444 3.5 10C3.5 11.8056 4.13194 13.3403 5.39583 14.6042C6.65972 15.8681 8.19444 16.5 10 16.5Z"
          fill={active ? ICONS_INTERACTIONS.active : ICONS_INTERACTIONS.default}
        />
      </g>
    </svg>
  );
}