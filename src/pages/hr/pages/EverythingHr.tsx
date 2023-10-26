import EverythingIcon from '../../../assets/icons/EverythingIcon';
import React from 'react';

export default function EverythingHr() {
  return (
    <div className="flex w-full h-full items-center justify-center" style={{ color: 'orange' }}>
      <div className="flex">
        <EverythingIcon color={location.pathname.includes('everything-hr') ? '#BF01FE' : undefined} />
        <h2 className="pl-2">IN PROGRESS</h2>
      </div>
    </div>
  );
}
