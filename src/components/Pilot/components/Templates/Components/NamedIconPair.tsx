import React from 'react';
import { FaCaretRight } from 'react-icons/fa';
import ToolTip from '../../../../Tooltip/Tooltip';

interface NamedIconPairProps {
  parentName: string;
  parentIcon: JSX.Element;
  childName: string;
  childIcon: JSX.Element;
}

export default function NamedIconPair({ parentIcon, parentName, childIcon, childName }: NamedIconPairProps) {
  return (
    <div
      className="grid items-center justify-between gap-2 text-left text-white cursor-pointer"
      style={{ width: 'calc(100% - 45px)', gridTemplateColumns: '50% 20px 35%' }}
    >
      {/* First Section */}
      <div className="flex items-center w-full gap-1">
        <div className="flex items-center justify-center w-5 h-5 cursor-pointer">{parentIcon}</div>
        <ToolTip title={parentName}>
          <div className="font-semibold truncate">{parentName}</div>
        </ToolTip>
      </div>

      {/* Arrow Icon */}
      <span className="flex items-center w-4 h-4">
        <FaCaretRight />
      </span>

      {/* Second Section */}
      <div className="flex items-center w-full gap-1">
        <div className="flex items-center justify-center w-5 h-5 cursor-pointer">{childIcon}</div>
        <ToolTip title={childName}>
          <p className="font-semibold truncate">{childName}</p>
        </ToolTip>
      </div>
    </div>
  );
}
