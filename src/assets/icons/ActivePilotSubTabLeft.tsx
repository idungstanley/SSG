/* eslint-disable max-len */
interface Props {
  color?: string;
}

export default function ActivePilotSubTabLeft({ color }: Props) {
  return (
    <svg width="7" height="8" viewBox="0 0 7 8" transform="scale(-1, 1)" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.200012 0C0.200012 5.38171 3.3464 7.62111 5.28534 7.95519H6.20001C5.95302 8.01367 5.6393 8.01618 5.28534 7.95519H5.00001H0.200012L0.200012 0Z"
        fill={color ? color : 'transparent'}
      />
    </svg>
  );
}
