import { DetailedHTMLProps, SVGAttributes } from 'react';
import ICONS_INTERACTIONS from '../../utils/Constants/IconInteractions';

/* eslint-disable max-len */
interface Props extends DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement> {
  active?: boolean;
  dimensions?: {
    height: number;
    width: number;
  };
  color?: string;
}

export default function PlusCircle({ active, dimensions, color, ...props }: Props) {
  return (
    <svg
      width={dimensions?.width ?? '20'}
      height={dimensions?.height ?? '20'}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id="mask0_190_61718"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width={dimensions?.width ?? '20'}
        height={dimensions?.height ?? '20'}
      >
        <rect width={dimensions?.width ?? '20'} height={dimensions?.height ?? '20'} fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_190_61718)">
        <path
          d="M9.45835 10.5416V13.25C9.45835 13.4035 9.50987 13.5321 9.6129 13.6359C9.71592 13.7397 9.84359 13.7916 9.9959 13.7916C10.1482 13.7916 10.2772 13.7397 10.383 13.6359C10.4888 13.5321 10.5416 13.4035 10.5416 13.25V10.5416H13.25C13.4035 10.5416 13.5321 10.4901 13.6359 10.3871C13.7397 10.2841 13.7916 10.1564 13.7916 10.0041C13.7916 9.8518 13.7397 9.72276 13.6359 9.617C13.5321 9.51124 13.4035 9.45835 13.25 9.45835H10.5416V6.75C10.5416 6.59653 10.4901 6.46789 10.3871 6.36408C10.2841 6.26026 10.1564 6.20835 10.0041 6.20835C9.8518 6.20835 9.72276 6.26026 9.617 6.36408C9.51124 6.46789 9.45835 6.59653 9.45835 6.75V9.45835H6.75C6.59653 9.45835 6.46789 9.50987 6.36408 9.6129C6.26026 9.71592 6.20835 9.84359 6.20835 9.9959C6.20835 10.1482 6.26026 10.2772 6.36408 10.383C6.46789 10.4888 6.59653 10.5416 6.75 10.5416H9.45835ZM10.0071 17.5833C8.96392 17.5833 7.98142 17.386 7.05965 16.9912C6.13785 16.5965 5.33103 16.0534 4.63919 15.3619C3.94733 14.6703 3.40394 13.8642 3.00904 12.9434C2.61414 12.0226 2.41669 11.0388 2.41669 9.99185C2.41669 8.94494 2.61405 7.96406 3.00877 7.04923C3.40349 6.13438 3.94662 5.33104 4.63815 4.63919C5.32969 3.94733 6.13585 3.40394 7.05662 3.00904C7.9774 2.61414 8.96124 2.41669 10.0081 2.41669C11.0551 2.41669 12.0359 2.61405 12.9508 3.00877C13.8656 3.40349 14.669 3.94662 15.3608 4.63815C16.0527 5.32969 16.5961 6.13422 16.991 7.05175C17.3859 7.96928 17.5833 8.94965 17.5833 9.99285C17.5833 11.0361 17.386 12.0186 16.9912 12.9404C16.5965 13.8621 16.0534 14.669 15.3619 15.3608C14.6703 16.0527 13.8658 16.5961 12.9482 16.991C12.0307 17.3859 11.0504 17.5833 10.0071 17.5833ZM10 16.5C11.8056 16.5 13.3403 15.8681 14.6042 14.6042C15.8681 13.3403 16.5 11.8056 16.5 10C16.5 8.19444 15.8681 6.65972 14.6042 5.39583C13.3403 4.13194 11.8056 3.5 10 3.5C8.19444 3.5 6.65972 4.13194 5.39583 5.39583C4.13194 6.65972 3.5 8.19444 3.5 10C3.5 11.8056 4.13194 13.3403 5.39583 14.6042C6.65972 15.8681 8.19444 16.5 10 16.5Z"
          fill={active ? ICONS_INTERACTIONS.active : color && !active ? color : ICONS_INTERACTIONS.default}
        />
      </g>
    </svg>
  );
}
