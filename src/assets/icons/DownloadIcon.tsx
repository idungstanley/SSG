import { DetailedHTMLProps, SVGAttributes } from 'react';

/* eslint-disable max-len */
type Props = DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement>;

export default function DownloadIcon({ ...props }: Props) {
  return (
    <svg {...props} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.99998 11.163C7.87946 11.163 7.76312 11.1396 7.65095 11.0928C7.53877 11.046 7.42755 10.9675 7.3173 10.8573L4.1577 7.69769C3.98592 7.52589 3.89843 7.33518 3.89523 7.12556C3.89201 6.91596 3.9795 6.72206 4.1577 6.54386C4.3359 6.36566 4.5266 6.27816 4.7298 6.28136C4.933 6.28456 5.12371 6.37526 5.30193 6.55346L7.2 8.45156V1.12651C7.2 0.913697 7.28013 0.727163 7.44037 0.566913C7.60063 0.406663 7.78716 0.326538 7.99998 0.326538C8.21279 0.326538 8.39933 0.406663 8.55958 0.566913C8.71982 0.727163 8.79995 0.913697 8.79995 1.12651V8.45156L10.698 6.55346C10.8698 6.38168 11.0589 6.29258 11.2653 6.28616C11.4717 6.27976 11.6641 6.36566 11.8422 6.54386C12.0205 6.72206 12.1096 6.91436 12.1096 7.12076C12.1096 7.32716 12.0205 7.51947 11.8422 7.69769L8.68265 10.8573C8.5724 10.9675 8.46118 11.046 8.349 11.0928C8.23683 11.1396 8.12049 11.163 7.99998 11.163ZM2.4077 15.4996C1.86923 15.4996 1.41667 15.3162 1.05 14.9496C0.683333 14.5829 0.5 14.1303 0.5 13.5919V11.7996C0.5 11.5867 0.580133 11.4002 0.7404 11.24C0.90065 11.0797 1.08718 10.9996 1.3 10.9996C1.51282 10.9996 1.69935 11.0797 1.8596 11.24C2.01985 11.4002 2.09997 11.5867 2.09997 11.7996V13.5919C2.09997 13.6688 2.13202 13.7393 2.19612 13.8034C2.26024 13.8675 2.33077 13.8996 2.4077 13.8996H13.5922C13.6692 13.8996 13.7397 13.8675 13.8038 13.8034C13.8679 13.7393 13.9 13.6688 13.9 13.5919V11.7996C13.9 11.5867 13.9801 11.4002 14.1404 11.24C14.3006 11.0797 14.4871 10.9996 14.7 10.9996C14.9128 10.9996 15.0993 11.0797 15.2596 11.24C15.4198 11.4002 15.5 11.5867 15.5 11.7996V13.5919C15.5 14.1303 15.3166 14.5829 14.95 14.9496C14.5833 15.3162 14.1307 15.4996 13.5922 15.4996H2.4077Z"
        fill="orange"
      />
    </svg>
  );
}
