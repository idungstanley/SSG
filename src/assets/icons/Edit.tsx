import ICONS_INTERACTIONS from '../../utils/Constants/IconInteractions';

/* eslint-disable max-len */
interface Props {
  active: boolean;
  dimensions?: {
    height: number;
    width: number;
  };
}

export default function EditIcon({ active, dimensions }: Props) {
  return (
    <svg
      width={dimensions?.width ?? '20'}
      height={dimensions?.height ?? '20'}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_916_753"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width={dimensions?.width ?? '20'}
        height={dimensions?.height ?? '20'}
      >
        <rect width={dimensions?.width ?? '20'} height={dimensions?.height ?? '20'} fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_916_753)">
        <path
          d="M4.3782 15.75H5.47114L13 8.22111L11.9071 7.12815L4.3782 14.657V15.75ZM15.8189 7.31728L12.8189 4.3013L13.7676 3.35259C14.0347 3.08551 14.3504 2.95197 14.7147 2.95197C15.079 2.95197 15.3947 3.08551 15.6618 3.35259L16.7756 4.46636C17.0288 4.71956 17.1527 5.03792 17.1474 5.42147C17.142 5.80501 17.0128 6.12337 16.7596 6.37657L15.8189 7.31728ZM3.83976 17.0833C3.62502 17.0833 3.43886 17.0045 3.28128 16.8469C3.1237 16.6893 3.04491 16.5032 3.04491 16.2884V14.3974C3.04491 14.297 3.06307 14.2014 3.09939 14.1106C3.13571 14.0198 3.19286 13.9354 3.27086 13.8574L11.8943 5.23397L14.8942 8.23392L6.2708 16.8573C6.19282 16.9353 6.10842 16.9925 6.01762 17.0288C5.9268 17.0651 5.83117 17.0833 5.73074 17.0833H3.83976Z"
          fill={active ? ICONS_INTERACTIONS.active : ICONS_INTERACTIONS.default}
        />
      </g>
    </svg>
  );
}
