import { DetailedHTMLProps, SVGAttributes } from 'react';

/* eslint-disable max-len */
type Props = DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement>;

export default function EditPageIcon({ ...props }: Props) {
  return (
    <svg {...props} viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect transform="translate(0 0.782959)" fill="white" />
      <path
        d="M7.9375 6.42637V16.2868C7.9375 16.7227 8.14492 17.1407 8.51413 17.4489C8.88335 17.7571 9.38411 17.9303 9.90625 17.9303H17.7812C18.3034 17.9303 18.8042 17.7571 19.1734 17.4489C19.5426 17.1407 19.75 16.7227 19.75 16.2868V9.09034C19.75 8.87141 19.6975 8.65468 19.5958 8.4529C19.494 8.25112 19.345 8.06834 19.1574 7.9153L15.8942 5.25133C15.5264 4.95113 15.0325 4.78301 14.518 4.78296H9.90625C9.38411 4.78296 8.88335 4.9561 8.51413 5.2643C8.14492 5.5725 7.9375 5.99051 7.9375 6.42637V6.42637Z"
        stroke="black"
        strokeOpacity="0.65"
        strokeWidth="1.39638"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.8125 17.9301V19.5735C15.8125 20.0094 15.6051 20.4274 15.2359 20.7356C14.8667 21.0438 14.3659 21.2169 13.8438 21.2169H5.96875C5.44661 21.2169 4.94585 21.0438 4.57663 20.7356C4.20742 20.4274 4 20.0094 4 19.5735V10.5348C4 10.0989 4.20742 9.6809 4.57663 9.3727C4.94585 9.0645 5.44661 8.89136 5.96875 8.89136H7.9375"
        stroke="black"
        strokeOpacity="0.65"
        strokeWidth="1.39638"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
