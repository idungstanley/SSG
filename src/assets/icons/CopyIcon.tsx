import { DetailedHTMLProps, SVGAttributes } from 'react';

/* eslint-disable max-len */
type Props = DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement>;

export default function EditPageIcon({ ...props }: Props) {
  return (
    <svg {...props} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.8125 9.93012V11.5735C12.8125 12.0094 12.6051 12.4274 12.2359 12.7356C11.8667 13.0438 11.3659 13.2169 10.8438 13.2169H2.96875C2.44661 13.2169 1.94585 13.0438 1.57663 12.7356C1.20742 12.4274 1 12.0094 1 11.5735V2.53477C1 2.09891 1.20742 1.6809 1.57663 1.3727C1.94585 1.0645 2.44661 0.891357 2.96875 0.891357H4.9375"
        stroke="black"
        strokeOpacity="0.65"
        strokeWidth="1.39638"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
