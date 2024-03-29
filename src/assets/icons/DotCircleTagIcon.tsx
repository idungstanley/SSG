import ICONS_INTERACTIONS from '../../utils/Constants/IconInteractions';
interface Props {
  active?: boolean;
  fixed?: boolean;
  dimensions?: {
    height?: number;
    width?: number;
  };
}
/* eslint-disable max-len */

export default function TagIcon({ active, dimensions, fixed }: Props) {
  return (
    <svg
      width={dimensions?.width ?? '20'}
      height={dimensions?.height ?? '20'}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.1944 14.7509C11.0628 14.8823 10.9041 14.948 10.7185 14.948C10.5329 14.948 10.3745 14.8823 10.2431 14.7509L5.80601 10.3139C5.74291 10.2481 5.69346 10.1728 5.65768 10.0878C5.6219 10.0028 5.60401 9.91798 5.60401 9.83324V6.19818C5.60401 6.01502 5.67034 5.85712 5.80298 5.72448C5.93562 5.59184 6.09352 5.52551 6.27668 5.52551H9.91173C9.9967 5.52551 10.0785 5.53989 10.157 5.56864C10.2355 5.59739 10.3095 5.64572 10.3789 5.71366L14.8195 10.1497C14.9542 10.2844 15.0223 10.4441 15.024 10.6288C15.0256 10.8136 14.9608 10.9716 14.8294 11.103L11.1944 14.7509ZM10.7165 14.2703L14.3538 10.6353L9.91396 6.19818H6.27668V9.83324L10.7165 14.2703ZM7.51796 8.08684C7.69747 8.08684 7.85024 8.02402 7.97628 7.89836C8.10232 7.77271 8.16534 7.62013 8.16534 7.44063C8.16534 7.26113 8.10251 7.10836 7.97686 6.98232C7.85121 6.85628 7.69863 6.79325 7.51913 6.79325C7.33963 6.79325 7.18686 6.85608 7.06081 6.98173C6.93477 7.10739 6.87175 7.25997 6.87175 7.43947C6.87175 7.61897 6.93458 7.77174 7.06023 7.89778C7.18589 8.02382 7.33846 8.08684 7.51796 8.08684Z"
        fill={active && !fixed ? ICONS_INTERACTIONS.active : active && fixed ? '#FFFFFF' : ICONS_INTERACTIONS.default}
      />
      <circle
        cx="9.99999"
        cy="9.99999"
        r="7.35"
        stroke={active && !fixed ? ICONS_INTERACTIONS.active : active && fixed ? '#FFFFFF' : ICONS_INTERACTIONS.default}
        strokeDasharray="1.57 1.57"
      />
    </svg>
  );
}
