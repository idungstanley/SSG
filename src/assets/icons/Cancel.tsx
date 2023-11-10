/* eslint-disable max-len */
import interactions from '../../utils/Constants/IconInteractions';

interface Props {
  active?: boolean;
  fixed?: boolean;
  dimensions?: { width?: number; height?: number };
}

export default function CancelIcon({ active = false, dimensions, fixed }: Props) {
  return (
    <svg
      width={dimensions?.width ?? '20'}
      height={dimensions?.height ?? '20'}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_472_854"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width={dimensions?.width ?? '20'}
        height={dimensions?.height ?? '20'}
      >
        <rect width={dimensions?.width ?? '20'} height={dimensions?.height ?? '20'} fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_472_854)">
        <path
          d="M10 10.774L12.5609 13.3349C12.6763 13.4503 12.804 13.5059 12.9439 13.5016C13.0839 13.4973 13.2142 13.4348 13.3349 13.3141C13.4557 13.1934 13.516 13.0644 13.516 12.9271C13.516 12.7898 13.4557 12.6611 13.3349 12.541L10.774 9.98958L13.3349 7.43819C13.4503 7.32341 13.5093 7.19604 13.512 7.05608C13.5147 6.91614 13.4557 6.78581 13.3349 6.66508C13.2142 6.54435 13.0852 6.48398 12.9479 6.48398C12.8106 6.48398 12.6816 6.54435 12.5609 6.66508L10 9.22598L7.43908 6.66508C7.32371 6.5497 7.19951 6.49067 7.0665 6.488C6.9335 6.48532 6.80664 6.54435 6.68592 6.66508C6.56518 6.78581 6.50481 6.91481 6.50481 7.05208C6.50481 7.18936 6.56458 7.31836 6.6841 7.43908L9.22598 10L6.66508 12.5609C6.54969 12.6763 6.49414 12.8005 6.49842 12.9335C6.50268 13.0665 6.56518 13.1934 6.68592 13.3141C6.80664 13.4348 6.93564 13.4952 7.07292 13.4952C7.21019 13.4952 7.3386 13.4354 7.45812 13.3159L10 10.774ZM10.0071 17.5833C8.96392 17.5833 7.98142 17.386 7.05965 16.9912C6.13785 16.5965 5.33103 16.0534 4.63919 15.3619C3.94733 14.6703 3.40394 13.8642 3.00904 12.9434C2.61414 12.0226 2.41669 11.0388 2.41669 9.99185C2.41669 8.94494 2.61405 7.96406 3.00877 7.04923C3.40349 6.13438 3.94662 5.33104 4.63815 4.63919C5.32969 3.94733 6.13585 3.40394 7.05662 3.00904C7.9774 2.61414 8.96124 2.41669 10.0081 2.41669C11.0551 2.41669 12.0359 2.61405 12.9508 3.00877C13.8656 3.40349 14.669 3.94662 15.3608 4.63815C16.0527 5.32969 16.5961 6.13422 16.991 7.05175C17.3859 7.96928 17.5833 8.94965 17.5833 9.99285C17.5833 11.0361 17.386 12.0186 16.9912 12.9404C16.5965 13.8621 16.0534 14.669 15.3619 15.3608C14.6703 16.0527 13.8658 16.5961 12.9482 16.991C12.0307 17.3859 11.0504 17.5833 10.0071 17.5833ZM10 16.5C11.8056 16.5 13.3403 15.8681 14.6042 14.6042C15.8681 13.3403 16.5 11.8056 16.5 10C16.5 8.19444 15.8681 6.65972 14.6042 5.39583C13.3403 4.13194 11.8056 3.5 10 3.5C8.19444 3.5 6.65972 4.13194 5.39583 5.39583C4.13194 6.65972 3.5 8.19444 3.5 10C3.5 11.8056 4.13194 13.3403 5.39583 14.6042C6.65972 15.8681 8.19444 16.5 10 16.5Z"
          fill={active && !fixed ? interactions.active : fixed && active ? '#FFFFFF' : interactions.default}
          fillOpacity="0.98"
        />
      </g>
    </svg>
  );
}
