import ICONS_INTERACTIONS from '../../utils/Constants/IconInteractions';

/* eslint-disable max-len */
interface Props {
  active?: boolean;
  dimensions?: {
    height: number;
    width: number;
  };
}

export function ClockIcon({ active, dimensions }: Props) {
  return (
    <svg
      width={dimensions?.width ?? '20'}
      height={dimensions?.height ?? '20'}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_343_850"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width={dimensions?.width ?? '20'}
        height={dimensions?.height ?? '20'}
      >
        <rect width={dimensions?.width ?? '20'} height={dimensions?.height ?? '20'} fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_343_850)">
        <path
          d="M9.99408 17.5833C8.95844 17.5833 7.97987 17.386 7.05835 16.9912C6.13683 16.5965 5.33023 16.0534 4.63856 15.3619C3.9469 14.6703 3.40367 13.8642 3.00887 12.9434C2.61408 12.0226 2.41669 11.0388 2.41669 9.99185C2.41669 8.94494 2.61405 7.96406 3.00877 7.04923C3.40349 6.13438 3.94662 5.33104 4.63815 4.63919C5.32969 3.94733 6.13585 3.40394 7.05662 3.00904C7.9774 2.61414 8.96124 2.41669 10.0081 2.41669C11.0551 2.41669 12.0359 2.61408 12.9508 3.00888C13.8656 3.40367 14.669 3.9469 15.3608 4.63856C16.0527 5.33023 16.5961 6.13335 16.991 7.04794C17.3859 7.96251 17.5833 8.94653 17.5833 10C17.5833 10.375 17.5563 10.7431 17.5024 11.1042C17.4484 11.4653 17.3702 11.8194 17.2676 12.1667C17.1159 12.0502 16.9554 11.9565 16.786 11.8854C16.6167 11.8144 16.4402 11.7703 16.2564 11.7532C16.3472 11.4658 16.4105 11.1775 16.4463 10.8881C16.4821 10.5988 16.5 10.3028 16.5 10C16.5 8.19444 15.8681 6.65972 14.6042 5.39583C13.3403 4.13194 11.8056 3.5 10 3.5C8.19444 3.5 6.65972 4.13194 5.39583 5.39583C4.13194 6.65972 3.5 8.19444 3.5 10C3.5 11.8056 4.13194 13.3403 5.39583 14.6042C6.65972 15.8681 8.19444 16.5 10 16.5C10.7436 16.5 11.4449 16.3867 12.1039 16.1602C12.7629 15.9337 13.3688 15.6089 13.9215 15.1859C14.0091 15.3579 14.1154 15.5059 14.2404 15.6298C14.3654 15.7537 14.5085 15.8632 14.6699 15.9583C14.0254 16.4695 13.3076 16.8682 12.5164 17.1542C11.7253 17.4403 10.8845 17.5833 9.99408 17.5833ZM15.8826 14.7916C15.6617 14.7916 15.4741 14.7154 15.3197 14.5629C15.1653 14.4104 15.0881 14.2237 15.0881 14.0028C15.0881 13.7819 15.1644 13.5943 15.3169 13.4399C15.4694 13.2855 15.6561 13.2084 15.877 13.2084C16.0979 13.2084 16.2855 13.2846 16.4399 13.4371C16.5943 13.5896 16.6715 13.7763 16.6715 13.9972C16.6715 14.2181 16.5952 14.4057 16.4427 14.5601C16.2902 14.7145 16.1035 14.7916 15.8826 14.7916ZM10.5416 9.45513L13.3263 12.2398C13.4464 12.3599 13.5043 12.4899 13.5 12.6298C13.4957 12.7698 13.4332 12.9001 13.3125 13.0208C13.1918 13.1416 13.0628 13.2019 12.9255 13.2019C12.7882 13.2019 12.6587 13.1405 12.5369 13.0176L9.66348 10.125C9.59937 10.0609 9.54915 9.98979 9.51283 9.91171C9.47651 9.83362 9.45835 9.74553 9.45835 9.64744V5.54165C9.45835 5.38819 9.50987 5.25955 9.6129 5.15573C9.71592 5.05191 9.84359 5 9.9959 5C10.1482 5 10.2772 5.05191 10.383 5.15573C10.4888 5.25955 10.5416 5.38819 10.5416 5.54165V9.45513Z"
          fill={active ? ICONS_INTERACTIONS.active : ICONS_INTERACTIONS.default}
        />
      </g>
    </svg>
  );
}