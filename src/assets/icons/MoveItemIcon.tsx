import ICONS_INTERACTIONS from '../../utils/Constants/IconInteractions';

/* eslint-disable max-len */
interface Props {
  active: boolean;
  dimensions?: {
    height: number;
    width: number;
  };
}

export default function MoveItemIcon({ active = false, dimensions }: Props) {
  return (
    <svg
      width={dimensions?.width ?? '16'}
      height={dimensions?.height ?? '14'}
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.8654 7.54158H4.89423C4.74075 7.54158 4.61211 7.49007 4.50829 7.38704C4.40447 7.28402 4.35256 7.15635 4.35256 7.00404C4.35256 6.85174 4.40447 6.7227 4.50829 6.61694C4.61211 6.51118 4.74075 6.45829 4.89423 6.45829H13.8654L12.8346 5.42754C12.7216 5.31447 12.6624 5.18529 12.657 5.04C12.6517 4.89471 12.7055 4.76437 12.8184 4.64898C12.9416 4.53361 13.0731 4.47725 13.2131 4.47992C13.353 4.48258 13.4804 4.54134 13.5953 4.65619L15.4751 6.53602C15.6113 6.67223 15.6794 6.82813 15.6794 7.00373C15.6794 7.17933 15.6111 7.33297 15.4743 7.46467L13.5952 9.34379C13.4858 9.45322 13.3632 9.50714 13.2275 9.50554C13.0918 9.50393 12.9624 9.44544 12.8392 9.33006C12.7263 9.21468 12.6712 9.08567 12.6739 8.94304C12.6765 8.80042 12.7352 8.67172 12.85 8.55694L13.8654 7.54158ZM1.90064 13.5833C1.53221 13.5833 1.21682 13.4521 0.954455 13.1897C0.692094 12.9273 0.560913 12.6119 0.560913 12.2435V1.75638C0.560913 1.38795 0.692094 1.07255 0.954455 0.81019C1.21682 0.547815 1.53221 0.416626 1.90064 0.416626H9.38779C9.75622 0.416626 10.0716 0.547815 10.334 0.81019C10.5963 1.07255 10.7275 1.38795 10.7275 1.75638V4.09611C10.7275 4.24956 10.676 4.3782 10.573 4.48202C10.4699 4.58584 10.3423 4.63775 10.19 4.63775C10.0377 4.63775 9.90864 4.58584 9.80287 4.48202C9.69711 4.3782 9.64423 4.24956 9.64423 4.09611V1.75638C9.64423 1.68159 9.62018 1.62015 9.5721 1.57206C9.52402 1.52398 9.46258 1.49994 9.38779 1.49994H1.90064C1.82585 1.49994 1.76441 1.52398 1.71633 1.57206C1.66826 1.62015 1.64423 1.68159 1.64423 1.75638V12.2435C1.64423 12.3183 1.66826 12.3797 1.71633 12.4278C1.76441 12.4759 1.82585 12.4999 1.90064 12.4999H9.38779C9.46258 12.4999 9.52402 12.4759 9.5721 12.4278C9.62018 12.3797 9.64423 12.3183 9.64423 12.2435V9.90377C9.64423 9.75031 9.69574 9.62168 9.79877 9.51786C9.90179 9.41404 10.0295 9.36213 10.1818 9.36213C10.3341 9.36213 10.4631 9.41404 10.5689 9.51786C10.6746 9.62168 10.7275 9.75031 10.7275 9.90377V12.2435C10.7275 12.6119 10.5963 12.9273 10.334 13.1897C10.0716 13.4521 9.75622 13.5833 9.38779 13.5833H1.90064Z"
        fill={active ? ICONS_INTERACTIONS.active : ICONS_INTERACTIONS.default}
      />
    </svg>
  );
}