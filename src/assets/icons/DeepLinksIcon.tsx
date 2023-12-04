/* eslint-disable max-len */
interface Props {
  color?: string;
}

export default function DeepLinksIcon({ color }: Props) {
  return (
    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0_4990_6969" maskUnits="userSpaceOnUse" x="0" y="0" width="21" height="20">
        <rect x="0.5" width="20" height="20" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_4990_6969)">
        <path
          d="M6.53212 13.6154C5.53187 13.6154 4.67925 13.2624 3.97425 12.5566C3.26925 11.8508 2.91675 10.9972 2.91675 9.99575C2.91675 8.99432 3.26925 8.14211 3.97425 7.43912C4.67925 6.73614 5.53187 6.38464 6.53212 6.38464H8.79814C8.95162 6.38464 9.08026 6.43616 9.18406 6.53918C9.28788 6.64221 9.33979 6.76988 9.33979 6.92219C9.33979 7.07449 9.28788 7.20353 9.18406 7.30929C9.08026 7.41505 8.95162 7.46793 8.79814 7.46793H6.53116C5.83201 7.46793 5.23537 7.715 4.74125 8.20912C4.24712 8.70325 4.00006 9.30021 4.00006 10C4.00006 10.6998 4.24712 11.2967 4.74125 11.7909C5.23537 12.285 5.83201 12.5321 6.53116 12.5321H8.79814C8.95162 12.5321 9.08026 12.5836 9.18406 12.6866C9.28788 12.7896 9.33979 12.9173 9.33979 13.0696C9.33979 13.2219 9.28788 13.3509 9.18406 13.4567C9.08026 13.5625 8.95162 13.6154 8.79814 13.6154H6.53212ZM8.25596 10.5416C8.10272 10.5416 7.97316 10.4901 7.86727 10.3871C7.76137 10.2841 7.70842 10.1564 7.70842 10.0041C7.70842 9.8518 7.76024 9.72276 7.86389 9.617C7.96755 9.51123 8.09599 9.45835 8.24923 9.45835H12.7442C12.8974 9.45835 13.027 9.50987 13.1329 9.61289C13.2388 9.71592 13.2917 9.84359 13.2917 9.99589C13.2917 10.1482 13.2399 10.2772 13.1362 10.383C13.0326 10.4888 12.9041 10.5416 12.7509 10.5416H8.25596ZM12.202 13.6154C12.0485 13.6154 11.9199 13.5638 11.8161 13.4608C11.7122 13.3578 11.6603 13.2301 11.6603 13.0778C11.6603 12.9255 11.7122 12.7965 11.8161 12.6907C11.9199 12.5849 12.0485 12.5321 12.202 12.5321H14.469C15.1681 12.5321 15.7647 12.285 16.2589 11.7909C16.753 11.2967 17.0001 10.6998 17.0001 10C17.0001 9.30021 16.753 8.70325 16.2589 8.20912C15.7647 7.715 15.1681 7.46793 14.469 7.46793H12.202C12.0485 7.46793 11.9199 7.41642 11.8161 7.31339C11.7122 7.21037 11.6603 7.0827 11.6603 6.93039C11.6603 6.77809 11.7122 6.64905 11.8161 6.54329C11.9199 6.43753 12.0485 6.38464 12.202 6.38464H14.468C15.4682 6.38464 16.3209 6.73755 17.0259 7.44337C17.7309 8.14921 18.0834 9.00283 18.0834 10.0042C18.0834 11.0057 17.7309 11.8579 17.0259 12.5609C16.3209 13.2639 15.4682 13.6154 14.468 13.6154H12.202Z"
          fill={color ? color : '#424242'}
        />
      </g>
    </svg>
  );
}