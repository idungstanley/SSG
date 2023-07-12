import React from 'react';
import interactions from '../../utils/Constants/IconInteractions';

interface ArrowDownProps {
  active?: boolean;
}
function AssigneeIcon({ active = false }: ArrowDownProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Assignee">
        <mask
          id="mask0_10191_2921"
          style={{ maskType: 'alpha' }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="20"
          height="20"
        >
          <rect id="Bounding box" width="20" height="20" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_10191_2921)">
          <path
            id="group"
            // eslint-disable-next-line max-len
            d="M2.2946 16.0889C2.0804 16.0889 1.89418 16.0098 1.73593 15.8515C1.57767 15.6933 1.49854 15.5055 1.49854 15.2883V14.1646C1.49854 13.7274 1.61285 13.3438 1.84149 13.0137C2.07012 12.6835 2.36965 12.4317 2.74008 12.2582C3.50426 11.8847 4.3006 11.5965 5.12912 11.3935C5.95765 11.1905 6.85161 11.089 7.81102 11.089C8.77042 11.089 9.66438 11.194 10.4929 11.4039C11.3214 11.6138 12.1178 11.8986 12.882 12.2582C13.2524 12.4317 13.5519 12.6835 13.7805 13.0137C14.0092 13.3438 14.1235 13.7274 14.1235 14.1646V15.2883C14.1235 15.5055 14.0443 15.6933 13.8861 15.8515C13.7278 16.0098 13.5416 16.0889 13.3274 16.0889H2.2946ZM15.5289 16.0889C15.6173 15.9878 15.676 15.8684 15.705 15.7307C15.734 15.593 15.7485 15.4501 15.7485 15.3021V14.0505C15.7485 13.559 15.6284 13.0586 15.3883 12.549C15.1483 12.0395 14.7822 11.6073 14.2902 11.2524C14.8767 11.3358 15.4141 11.4648 15.9023 11.6395C16.3906 11.8141 16.87 12.0206 17.3406 12.2588C17.7845 12.4885 18.089 12.7627 18.2541 13.0814C18.4191 13.4001 18.5017 13.7857 18.5017 14.238V15.294C18.5017 15.5075 18.4225 15.6933 18.2643 15.8515C18.106 16.0098 17.9202 16.0889 17.7068 16.0889H15.5289ZM7.81102 9.72194C6.98117 9.72194 6.2876 9.44331 5.73031 8.88603C5.17301 8.32874 4.89437 7.63517 4.89437 6.80532C4.89437 5.97546 5.17301 5.28189 5.73031 4.72461C6.2876 4.16732 6.98117 3.88867 7.81102 3.88867C8.64086 3.88867 9.33443 4.16732 9.89172 4.72461C10.449 5.28189 10.7276 5.97546 10.7276 6.80532C10.7276 7.63517 10.449 8.32874 9.89172 8.88603C9.33443 9.44331 8.64086 9.72194 7.81102 9.72194ZM15.0065 6.80532C15.0065 7.63517 14.7278 8.32874 14.1705 8.88603C13.6132 9.44331 12.9216 9.72194 12.0958 9.72194C11.9978 9.72194 11.8588 9.70779 11.6788 9.67949C11.4988 9.65118 11.3617 9.62421 11.2677 9.59857C11.5825 9.20347 11.8281 8.76814 12.0046 8.29259C12.1811 7.81703 12.2693 7.32319 12.2693 6.81107C12.2693 6.29893 12.1793 5.80707 11.9993 5.33548C11.8193 4.8639 11.5754 4.42971 11.2677 4.0329C11.4013 3.99017 11.5418 3.95544 11.6892 3.92874C11.8366 3.90203 11.9726 3.88867 12.0971 3.88867C12.9221 3.88867 13.6132 4.16732 14.1705 4.72461C14.7278 5.28189 15.0065 5.97546 15.0065 6.80532ZM2.83185 14.7556H12.7902V14.1685C12.7902 13.998 12.7501 13.8552 12.67 13.7404C12.5899 13.6255 12.4622 13.5312 12.287 13.4575C11.6288 13.1456 10.9192 12.895 10.158 12.7059C9.39675 12.5168 8.61443 12.4223 7.81102 12.4223C7.0076 12.4223 6.22528 12.5134 5.46406 12.6955C4.70285 12.8777 3.99318 13.1317 3.33506 13.4575C3.15985 13.5312 3.03217 13.6255 2.95203 13.7404C2.87191 13.8552 2.83185 13.998 2.83185 14.1685V14.7556ZM7.81102 8.38865C8.26935 8.38865 8.64782 8.23935 8.94643 7.94073C9.24504 7.64212 9.39435 7.26365 9.39435 6.80532C9.39435 6.34699 9.24504 5.96851 8.94643 5.6699C8.64782 5.37129 8.26935 5.22198 7.81102 5.22198C7.35268 5.22198 6.97421 5.37129 6.6756 5.6699C6.37699 5.96851 6.22768 6.34699 6.22768 6.80532C6.22768 7.26365 6.37699 7.64212 6.6756 7.94073C6.97421 8.23935 7.35268 8.38865 7.81102 8.38865Z"
            fill={active ? interactions.active : interactions.default}
          />
        </g>
      </g>
    </svg>
  );
}

export default AssigneeIcon;