import { DetailedHTMLProps, SVGAttributes } from 'react';

/* eslint-disable max-len */
type Props = DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement>;

export default function CancelIcon({ ...props }: Props | undefined) {
  return (
    <svg {...props} width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.299755 4.75067L2.68864 7.84125C2.72715 7.89104 2.77492 7.93101 2.82866 7.95841C2.88241 7.98581 2.94087 8 3.00003 8C3.05919 8 3.11765 7.98581 3.1714 7.95841C3.22514 7.93101 3.27291 7.89104 3.31142 7.84125L5.7003 4.75067C5.92829 4.45567 5.73927 4 5.38892 4L0.610457 4C0.260105 4 0.0710859 4.45567 0.299755 4.75067Z"
        fill="black"
        fillOpacity="0.35"
      />
    </svg>
  );
}
