/* eslint-disable max-len */
import React from 'react';
import { PropertyIconProps } from './AltRouteIcon';

export default function IdGeneratorIcon({ color }: PropertyIconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0_5967_48458" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
        <rect width="20" height="20" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_5967_48458)">
        <path
          d="M4.10331 11.2439V12.6362C4.10331 12.6991 4.1295 12.7567 4.18188 12.8091C4.23428 12.8615 4.29191 12.8877 4.35478 12.8877H16.5997C16.6625 12.8877 16.7202 12.8615 16.7726 12.8091C16.8249 12.7567 16.8511 12.6991 16.8511 12.6362V11.2439H4.10331ZM4.35478 3H16.5997C16.9623 3 17.2719 3.12832 17.5285 3.38495C17.7851 3.64156 17.9134 3.95117 17.9134 4.31376V12.6362C17.9134 12.9988 17.7851 13.3084 17.5285 13.565C17.2719 13.8217 16.9623 13.95 16.5997 13.95H12.979V16.3307C12.979 16.5989 12.8627 16.7946 12.6301 16.9177C12.3975 17.0408 12.1718 17.0258 11.9528 16.8729L10.8465 16.0824C10.7364 16.0112 10.6137 15.9756 10.4787 15.9756C10.3436 15.9756 10.22 16.0112 10.1079 16.0824L9.00162 16.8729C8.78267 17.0258 8.55691 17.0408 8.32433 16.9177C8.09175 16.7946 7.97546 16.5989 7.97546 16.3307V13.95H4.35478C3.99219 13.95 3.68258 13.8217 3.42596 13.565C3.16933 13.3084 3.04102 12.9988 3.04102 12.6362V4.31376C3.04102 3.95117 3.16933 3.64156 3.42596 3.38495C3.68258 3.12832 3.99219 3 4.35478 3ZM4.10331 9.62845H16.8511V4.31376C16.8511 4.25089 16.8249 4.19326 16.7726 4.14086C16.7202 4.08848 16.6625 4.06229 16.5997 4.06229H4.35478C4.29191 4.06229 4.23428 4.08848 4.18188 4.14086C4.1295 4.19326 4.10331 4.25089 4.10331 4.31376V9.62845ZM4.10331 12.6362V4.06229H4.35478C4.29191 4.06229 4.23428 4.08848 4.18188 4.14086C4.1295 4.19326 4.10331 4.25089 4.10331 4.31376V12.6362C4.10331 12.6991 4.1295 12.7567 4.18188 12.8091C4.23428 12.8615 4.29191 12.8877 4.35478 12.8877H4.10331V12.6362Z"
          fill={color ? color : '#424242'}
        />
      </g>
    </svg>
  );
}
