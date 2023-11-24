interface PriorityProps {
  fill?: string;
}
export default function Priority({ fill = '#A5A5A5' }: PriorityProps) {
  /* eslint-disable max-len */
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask
        id="mask0_573_676"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20"
      >
        <rect width="20" height="20" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_573_676)">
        <path
          d="M4.375 18.125V2.52083C4.375 2.33317 4.43912 2.17861 4.56737 2.05717C4.69562 1.93574 4.85454 1.87502 5.04412 1.87502C5.23371 1.87502 5.3918 1.93891 5.5184 2.06669C5.64499 2.19445 5.70829 2.35278 5.70829 2.54167V3.54169H16.024C16.3167 3.54169 16.5371 3.65782 16.6851 3.89008C16.833 4.12236 16.8568 4.37161 16.7564 4.63783L15.6089 7.52083L16.7564 10.4038C16.8568 10.6701 16.833 10.9193 16.6851 11.1516C16.5371 11.3838 16.3167 11.5 16.024 11.5H5.70829V18.125L4.375 18.125Z"
          fill={fill}
        />
      </g>
    </svg>
  );
}
