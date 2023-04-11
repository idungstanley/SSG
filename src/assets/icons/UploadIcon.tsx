import { DetailedHTMLProps, SVGAttributes } from 'react';

/* eslint-disable max-len */
type Props = DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement>;

export default function UploadIcon({ ...props }: Props) {
  return (
    <svg {...props} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.25 17.9998C1.63125 17.9998 1.10175 17.7797 0.6615 17.3394C0.2205 16.8984 0 16.3686 0 15.7498V12.3748H2.25V15.7498H15.75V12.3748H18V15.7498C18 16.3686 17.7799 16.8984 17.3396 17.3394C16.8986 17.7797 16.3687 17.9998 15.75 17.9998H2.25ZM9 13.4998L3.375 7.8749L4.95 6.24367L7.875 9.16864V0H10.125V9.16864L13.05 6.24367L14.625 7.8749L9 13.4998Z"
        fill="black"
        fillOpacity="0.6"
      />
    </svg>
  );
}
