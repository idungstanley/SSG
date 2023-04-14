import { DetailedHTMLProps, SVGAttributes } from 'react';

/* eslint-disable max-len */
type Props = DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement>;

export default function EditPageIcon({ ...props }: Props) {
  return (
    <svg {...props} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.55 5.59173V8.54989H13.575V6.29992V5.84992H13.125H8.8875V1.79998V1.34998H8.4375H1.875H1.425V1.79998V16.1998V16.6498H1.875H7.05V17.5498H1.875C1.47374 17.5498 1.14467 17.4174 0.862887 17.1469C0.580879 16.8761 0.45 16.5683 0.45 16.1998V1.79998C0.45 1.43148 0.580879 1.12364 0.862887 0.85292C1.14467 0.582411 1.47374 0.45 1.875 0.45H9.19396L14.55 5.59173ZM13.4062 11.8962L13.7632 12.2388L10.4707 15.3792L10.3312 15.5121V15.7048V16.6498V17.0998H10.7812H11.7656H11.9458L12.0762 16.9754L15.3974 13.8077L15.733 14.1298L12.1705 17.5498H9.825V15.3341L13.4062 11.8962ZM17.4305 12.5002L16.3828 13.506L15.7101 12.8602L15.3994 12.562L15.065 12.2409L14.7257 11.9152L14.056 11.2724L15.0773 10.292C15.1554 10.217 15.2579 10.1699 15.4219 10.1699C15.5858 10.1699 15.6883 10.217 15.7665 10.292L17.4305 11.8895C17.5073 11.9632 17.55 12.0528 17.55 12.1949C17.55 12.3369 17.5073 12.4265 17.4305 12.5002Z"
        stroke="black"
        strokeOpacity="0.65"
        strokeWidth="0.900001"
      />
    </svg>
  );
}