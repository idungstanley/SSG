import React from 'react';
import { FaCaretRight } from 'react-icons/fa';
import ToolTip from '../../../../Tooltip/Tooltip';
import BlurEffect from '../../../../BlurEffect';

interface NamedIconPairProps {
  parentName: string;
  parentIcon?: JSX.Element;
  childName: string;
  childIcon?: JSX.Element;
  isLeadingIcon?: boolean;
  color?: string;
  textColor?: string;
  iconColor?: string;
  backgroundImage?: string;
}

export default function NamedIconPair({
  parentIcon,
  parentName,
  isLeadingIcon = false,
  childIcon,
  childName,
  textColor,
  iconColor,
  color = 'text-white',
  backgroundImage = 'linear-gradient(to right, transparent , white)'
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
        {parentIcon && (
          <div className={`flex items-center justify-center w-5 h-5 cursor-pointer ${textColor}`}>{parentIcon}</div>
        )}
        <ToolTip title={parentName}>
          <div className="relative flex items-center overflow-hidden">
            <BlurEffect backgroundImage={backgroundImage} top="0" right="0" bottom="0" width="10px" height="" left="" />
            <div
              className={`overflow-hidden whitespace-nowrap  ${textColor}`}
              style={{ fontSize: '11px', fontWeight: '600', lineHeight: '13.2px' }}
            >
              {parentName}
            </div>
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
          {childIcon && (
            <div className={`flex items-center justify-center w-5 h-5 cursor-pointer ${textColor}`}>{childIcon}</div>
          )}
          <ToolTip title={childName}>
            <div className="relative flex items-center overflow-hidden">
              <BlurEffect
                backgroundImage={backgroundImage}
                top="0"
                right="0"
                bottom="0"
                width="10px"
                height=""
                left=""
              />
              <p
                className={`overflow-hidden whitespace-nowrap  ${textColor}`}
                style={{ fontSize: '11px', fontWeight: '600', lineHeight: '13.2px' }}
              >
                {childName}
              </p>
            </div>
          </ToolTip>
        </div>
      </div>
    </div>
  );
}
