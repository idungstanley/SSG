import ICONS_INTERACTIONS from '../../utils/Constants/IconInteractions';

/* eslint-disable max-len */
interface Props {
  active: boolean;
  dimensions?: {
    height: number;
    width: number;
  };
}

export default function LeftPanelOpen({ active, dimensions }: Props) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask
        id="mask0_2040_6789"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width={dimensions?.width ?? '20'}
        height={dimensions?.height ?? '20'}
      >
        <rect width={dimensions?.width ?? '20'} height={dimensions?.height ?? '20'} fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_2040_6789)">
        <path
          d="M10.4599 7.09458V12.9054L13.6234 10L10.4599 7.09458ZM4.65227 16.5833C4.31115 16.5833 4.01994 16.4627 3.77865 16.2214C3.53734 15.9801 3.41669 15.6889 3.41669 15.3477V4.65227C3.41669 4.31115 3.53734 4.01994 3.77865 3.77865C4.01994 3.53734 4.31115 3.41669 4.65227 3.41669H15.3477C15.6889 3.41669 15.9801 3.53734 16.2214 3.77865C16.4627 4.01994 16.5833 4.31115 16.5833 4.65227V15.3477C16.5833 15.6889 16.4627 15.9801 16.2214 16.2214C15.9801 16.4627 15.6889 16.5833 15.3477 16.5833H4.65227ZM7 15.5V4.5H4.75644C4.69233 4.5 4.63355 4.52671 4.58012 4.58013C4.52671 4.63356 4.5 4.69233 4.5 4.75644V15.2436C4.5 15.3077 4.52671 15.3664 4.58012 15.4199C4.63355 15.4733 4.69233 15.5 4.75644 15.5H7ZM8.08331 15.5H15.2436C15.3077 15.5 15.3664 15.4733 15.4199 15.4199C15.4733 15.3664 15.5 15.3077 15.5 15.2436V4.75644C15.5 4.69233 15.4733 4.63356 15.4199 4.58013C15.3664 4.52671 15.3077 4.5 15.2436 4.5H8.08331V15.5Z"
          fill={active ? ICONS_INTERACTIONS.active : ICONS_INTERACTIONS.default}
        />
      </g>
    </svg>
  );
}
