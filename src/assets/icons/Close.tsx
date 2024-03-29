import ICONS_INTERACTIONS from '../../utils/Constants/IconInteractions';

interface Props {
  active: boolean;
  width?: string;
  height?: string;
}

export default function Close({ active = false, width = '20', height = '20' }: Props) {
  return (
    <svg width={width} height={height} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask
        id="mask0_190_61850"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20"
      >
        <rect width="20" height="20" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_190_61850)">
        <path
          d="M10 10.9407L5.83492 15.1058C5.70565 15.235 5.55368 15.2975 5.379 15.2933C5.20433 15.289 5.04969 15.2195 4.91508 15.0849C4.78046 14.9503 4.71314 14.7935 4.71314 14.6146C4.71314 14.4356 4.78046 14.2789 4.91508 14.1443L9.05931 10L4.89425 5.83492C4.76497 5.70565 4.70247 5.55021 4.70675 5.36858C4.71101 5.18697 4.78046 5.02886 4.91508 4.89425C5.04969 4.75963 5.20647 4.69231 5.38542 4.69231C5.56436 4.69231 5.72114 4.75963 5.85575 4.89425L10 9.05931L14.1651 4.89425C14.2943 4.76497 14.4498
           4.699 14.6314 4.69633C14.813 4.69365 14.9711 4.75963 15.1057 4.89425C15.2404 5.02886 15.3077 5.18564 15.3077 5.36458C15.3077 5.54353 15.2404 5.70031 15.1057 5.83492L10.9407 10L15.1057 14.1651C15.235 14.2943 15.301 14.4463 15.3037 14.621C15.3063 14.7957 15.2404 14.9503 15.1057 15.0849C14.9711 15.2195 14.8144 15.2869 14.6354 15.2869C14.4565 15.2869 14.2997 15.2195 14.1651 15.0849L10 10.9407Z"
          fill={active ? ICONS_INTERACTIONS.active : ICONS_INTERACTIONS.default}
        />
      </g>
    </svg>
  );
}
