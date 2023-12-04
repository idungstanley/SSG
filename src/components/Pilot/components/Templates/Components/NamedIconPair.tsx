import React from 'react';
import { FaCaretRight } from 'react-icons/fa';
import ToolTip from '../../../../Tooltip/Tooltip';

type NamedIconPairType = 'card' | 'property';

interface NamedIconPairProps {
  parentName: string;
  parentIcon: JSX.Element;
  childName: string;
  childIcon: JSX.Element;
  isLeadingIcon?: boolean;
  fadeOutColour?: boolean;
  color?: string;
  textColor?: string;
  iconColor?: string;
  type?: NamedIconPairType;
}

export default function NamedIconPair({
  parentIcon,
  parentName,
  isLeadingIcon = false,
  childIcon,
  childName,
  fadeOutColour,
  type = 'property',
  textColor,
  iconColor,
  color = 'text-white'
}: NamedIconPairProps) {
  return (
    <div
      className={`grid items-center justify-between gap-2 text-left cursor-pointer ${color}`}
      style={{
        width: `calc(100% - ${isLeadingIcon ? '45px' : '0'})`,
        gridTemplateColumns: '50% 43%'
      }}
    >
      {/* First Section */}
      <div className="flex items-center w-full gap-1">
        <div className={`flex items-center justify-center w-5 h-5 cursor-pointer ${textColor}`}>{parentIcon}</div>
        <ToolTip title={parentName}>
          <div
            className={`relative flex items-center overflow-hidden  ${
              type === 'card' && (fadeOutColour ? 'green fade-out' : 'orange fade-out')
            }`}
          >
            <div className={`overflow-hidden font-semibold ${textColor}`}>{parentName}</div>
          </div>
        </ToolTip>
      </div>
      <div className="flex items-center gap-1">
        {/* Arrow Icon */}
        <span className={`flex items-center w-4 h-4 ${iconColor}`}>
          <FaCaretRight />
        </span>
        {/* Second Section */}
        <div className="flex items-center w-full gap-1">
          <div className={`flex items-center justify-center w-5 h-5 cursor-pointer ${textColor}`}>{childIcon}</div>
          <ToolTip title={childName}>
            <div
              className={`relative flex items-center overflow-hidden  ${
                type === 'card' && (fadeOutColour ? 'green fade-out' : 'orange fade-out')
              }`}
            >
              <p className={`overflow-hidden font-semibold whitespace-nowrap ${textColor}`}>{childName}</p>
            </div>
          </ToolTip>
        </div>
      </div>
    </div>
  );
}
