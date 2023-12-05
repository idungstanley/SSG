/* eslint-disable max-len */
import React from 'react';
import { PropertyIconProps } from './AltRouteIcon';

export default function EmailIcon({ color }: PropertyIconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0_4980_220187" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
        <rect width="20" height="20" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_4980_220187)">
        <path
          d="M3.67373 16.25C3.22987 16.25 2.85395 16.096 2.54596 15.788C2.23798 15.48 2.08398 15.1041 2.08398 14.6602V5.33975C2.08398 4.89589 2.23798 4.51997 2.54596 4.21198C2.85395 3.90399 3.22987 3.75 3.67373 3.75H16.3275C16.7714 3.75 17.1473 3.90399 17.4553 4.21198C17.7633 4.51997 17.9173 4.89589 17.9173 5.33975V14.6602C17.9173 15.1041 17.7633 15.48 17.4553 15.788C17.1473 16.096 16.7714 16.25 16.3275 16.25H3.67373ZM16.584 6.36854L10.4252 10.2945C10.3622 10.33 10.2966 10.3616 10.2282 10.3894C10.1598 10.4172 10.084 10.431 10.0006 10.431C9.9173 10.431 9.84144 10.4189 9.77307 10.3946C9.70469 10.3703 9.63846 10.3365 9.57436 10.2932L3.4173 6.36854V14.6602C3.4173 14.735 3.44134 14.7964 3.48942 14.8445C3.53751 14.8926 3.59894 14.9166 3.67373 14.9166H16.3275C16.4023 14.9166 16.4638 14.8926 16.5118 14.8445C16.5599 14.7964 16.584 14.735 16.584 14.6602V6.36854ZM10.0006 9.20831L16.4974 5.08331H3.52467L10.0006 9.20831ZM3.4173 6.36854V6.55767V5.57169V5.59131V5.56921V6.56083V6.36854Z"
          fill={color ? color : '#424242'}
        />
      </g>
    </svg>
  );
}
