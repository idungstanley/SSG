import React, { ReactNode } from 'react';
import SubtractIcon from '../../assets/icons/propertyIcons/SubtractIcon';
import { cl } from '../../utils';

interface SubtractProps {
  children?: ReactNode;
  icon: JSX.Element;
  label: string;
  isActive: boolean;
  handleClick: (value: string) => void;
  height?: string;
  topPosition?: string;
  leftPosition?: string;
  hasChildren: boolean;
}

export default function SubtractWrapper({
  handleClick,
  isActive,
  height = 'h-8',
  label,
  icon,
  topPosition = 'top-0',
  leftPosition = 'left-0',
  hasChildren
}: SubtractProps) {
  return (
    <div
      className={`relative flex items-center justify-between w-full rounded cursor-pointer hover:bg-alsoit-gray-50 group ${
        isActive ? 'bg-alsoit-purple-50' : ''
      } ${height}`}
      onClick={() => handleClick(label)}
    >
      <div className="w-full px-2 pl-1">
        <button className="flex items-center justify-between w-full h-full">
          <div className="flex items-center gap-2">
            <div className="relative w-5 h-5 group-hover:bg-[#ffff] group-hover:bg-opacity-25 rounded">
              <span
                className={cl(
                  'flex items-center justify-center w-5 h-5 text-lg',
                  hasChildren && 'group-hover:opacity-25 group-hover:bg-opacity-25 group-hover:text-opacity-25'
                )}
              >
                {icon}
              </span>
              {hasChildren && (
                <div
                  className={`absolute flex items-center justify-center w-5 h-5  opacity-0 group-hover:opacity-100 ${topPosition} ${leftPosition} ${
                    isActive ? 'origin-center rotate-90' : ''
                  }`}
                >
                  <SubtractIcon />
                </div>
              )}
            </div>
            <p className="font-semibold truncate text-alsoit-gray-300-lg text-alsoit-text-lg">{label}</p>
          </div>
        </button>
      </div>
    </div>
  );
}
