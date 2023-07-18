import React, { DetailedHTMLProps, SVGAttributes } from 'react';

type Props = DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement>;

export default function Effect({ ...props }: Props) {
  return (
    <div>
      <svg {...props} width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.59766 10.218L7.39766 5.41797" stroke="#919191" strokeWidth="0.72" strokeLinecap="round" />
        <path d="M8.59766 4.51758L10.0977 3.01758" stroke="#919191" strokeWidth="0.72" strokeLinecap="round" />
        <path d="M8.04773 6.61719L9.4961 8.16711" stroke="#919191" strokeWidth="0.72" strokeLinecap="round" />
        <path d="M4.44813 3.01758L5.89649 4.5675" stroke="#919191" strokeWidth="0.72" strokeLinecap="round" />
        <path d="M7.24493 3.91934L7.23574 1.79804" stroke="#919191" strokeWidth="0.72" strokeLinecap="round" />
        <path d="M9.19699 5.88469L11.3183 5.87332" stroke="#919191" strokeWidth="0.72" strokeLinecap="round" />
        <rect x="0.848828" y="0.05" width="11.9" height="11.9" rx="1.95" stroke="#B2B2B2" strokeWidth="0.1" />
      </svg>
    </div>
  );
}
