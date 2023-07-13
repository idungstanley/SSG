import { DetailedHTMLProps, SVGAttributes } from 'react';

/* eslint-disable max-len */
type Props = DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement>;

export default function ArrowCaretUp({ ...props }: Props | undefined) {
  return (
    <svg {...props} width="7" height="6" viewBox="0 0 7 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.03109 0.75C3.22354 0.416666 3.70466 0.416667 3.89711 0.75L6.9282 6H0L3.03109 0.75Z" fill="#424242" />
    </svg>
  );
}
