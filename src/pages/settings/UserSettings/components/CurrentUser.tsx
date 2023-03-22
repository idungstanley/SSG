import React from 'react';
import { AvatarWithInitials } from '../../../../components';

export default function CurrentUser() {
  return (
    <div className="text-left ">
      <AvatarWithInitials
        initials="ND"
        height="h-20"
        width="w-20"
        roundedStyle="circular"
        backgroundColour={'green'}
        textSize="12px"
      />
      <p className="mt-3 font-extrabold text-left">Nicholas Diamond</p>
    </div>
  );
}
