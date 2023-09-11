import { DetailedHTMLProps, SVGAttributes } from 'react';
import ICONS_INTERACTIONS from '../../utils/Constants/IconInteractions';

/* eslint-disable max-len */

interface Dimensions {
  height: number;
  width: number;
}

interface Props extends DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement> {
  active?: boolean;
  dimensions?: Dimensions;
}

export function UtilityIcon({ active, dimensions, ...props }: Props) {
  return (
    <svg
      width={dimensions?.width ?? '20'}
      height={dimensions?.height ?? '20'}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.3 13.8L10.6182 13.4818L10.4864 13.35H10.3V13.8ZM13.8 10.3H13.35V10.4864L13.4818 10.6182L13.8 10.3ZM14.4 10.9L14.0818 11.2182L14.0818 11.2182L14.4 10.9ZM14.9847 11.4847L14.6665 11.8029V11.8029L14.9847 11.4847ZM15.0017 11.4784L14.5532 11.4425L14.5532 11.4425L15.0017 11.4784ZM15.1668 9.41483L14.7182 9.37895V9.37895L15.1668 9.41483ZM15.5177 8.73119L15.227 8.38766V8.38766L15.5177 8.73119ZM16.7907 8.24352C16.9804 8.08299 17.0041 7.79905 16.8435 7.60933C16.683 7.4196 16.3991 7.39594 16.2093 7.55648L16.7907 8.24352ZM10.3 13.35C8.61555 13.35 7.25002 11.9845 7.25002 10.3H6.35002C6.35002 12.4815 8.11849 14.25 10.3 14.25V13.35ZM7.25002 10.3C7.25002 8.61555 8.61555 7.25002 10.3 7.25002V6.35002C8.11849 6.35002 6.35002 8.11849 6.35002 10.3H7.25002ZM10.3 7.25002C11.9845 7.25002 13.35 8.61555 13.35 10.3H14.25C14.25 8.11849 12.4815 6.35002 10.3 6.35002V7.25002ZM9.98182 14.1182L11.1818 15.3182L11.8182 14.6818L10.6182 13.4818L9.98182 14.1182ZM13.4818 10.6182L14.0818 11.2182L14.7182 10.5818L14.1182 9.98182L13.4818 10.6182ZM14.0818 11.2182L14.6665 11.8029L15.3029 11.1665L14.7182 10.5818L14.0818 11.2182ZM15.4503 11.5143L15.6154 9.45072L14.7182 9.37895L14.5532 11.4425L15.4503 11.5143ZM15.8084 9.07471L16.7907 8.24352L16.2093 7.55648L15.227 8.38766L15.8084 9.07471ZM15.6154 9.45072C15.6271 9.30468 15.6965 9.16934 15.8084 9.07471L15.227 8.38766C14.9322 8.63714 14.749 8.99395 14.7182 9.37895L15.6154 9.45072ZM14.6665 11.8029C14.9439 12.0803 15.419 11.9054 15.4503 11.5143L14.5532 11.4425C14.5831 11.0684 15.0375 10.9011 15.3029 11.1665L14.6665 11.8029Z"
        fill={active ? ICONS_INTERACTIONS.active : ICONS_INTERACTIONS.default}
      />
      <path
        d="M11.5 15L10.5 15.5L8.84164 16.3292C8.41186 16.5441 7.95593 16.0881 8.17082 15.6584L8.27639 15.4472C8.39989 15.2002 8.29978 14.8999 8.05279 14.7764L6.72361 14.1118C6.58284 14.0414 6.41716 14.0414 6.27639 14.1118L4.91413 14.7929C4.68045 14.9098 4.3962 14.827 4.26178 14.603L3.20085 12.8348C3.08281 12.638 3.11381 12.3862 3.27605 12.224L4.35355 11.1464C4.44732 11.0527 4.5 10.9255 4.5 10.7929V8.76759C4.5 8.60042 4.41645 8.4443 4.27735 8.35157L3.39669 7.76446C3.17461 7.61641 3.10797 7.32005 3.24529 7.09118L4.26178 5.39703C4.3962 5.173 4.68045 5.09022 4.91413 5.20707L6.27639 5.8882C6.41716 5.95858 6.58284 5.95858 6.72361 5.8882L8.22361 5.1382C8.393 5.0535 8.5 4.88037 8.5 4.69098V3.5C8.5 3.22386 8.72386 3 9 3H11C11.2761 3 11.5 3.22386 11.5 3.5V4.69098C11.5 4.88037 11.607 5.0535 11.7764 5.1382L13.2207 5.86036C13.3916 5.9458 13.5963 5.92639 13.748 5.81032L14.7691 5.02955C15.0012 4.85205 15.3354 4.91056 15.4934 5.15635L16.7687 7.14014C16.9018 7.3473 16.8643 7.6206 16.6803 7.78422L16.1 8.3"
        stroke={active ? ICONS_INTERACTIONS.active : ICONS_INTERACTIONS.default}
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <path
        d="M11.0605 9.03209L11.3449 9.32003L11.0605 9.03209Z"
        stroke={active ? ICONS_INTERACTIONS.active : ICONS_INTERACTIONS.default}
      />
    </svg>
  );
}