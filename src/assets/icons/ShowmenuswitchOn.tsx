import React from 'react';
import { ACTIVE_BUTTON, DEFAULT_BUTTON } from '../../utils/Constants/ButtonInteractions';

export default function ShowmenuswitchOn({ isActive }: { isActive: boolean }) {
  const style = isActive ? ACTIVE_BUTTON : DEFAULT_BUTTON;
  return (
    <div>
      <svg width="17" height="10" viewBox="0 0 17 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.925781" y="0.5" width="15" height="9" rx="4.5" stroke={style.color} />
        <circle cx="11.9258" cy="4.99805" r="2" stroke={style.color} />
      </svg>
    </div>
  );
}
