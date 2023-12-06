import React, { ReactNode, useState } from 'react';
import { cl } from '../../utils';
import ToolTip from '../Tooltip/Tooltip';
import CollapseIcon from '../Views/ui/collapseIcon/CollapseIcon';

interface collapseAllProps {
  children?: ReactNode;
  header: string;
  headerBg?: string;
  headerText?: string;
  headerTrailing?: ReactNode;
  menuButton?: ReactNode;
  headerIcon?: ReactNode;
}

function CollapseItems({
  children,
  header,
  headerTrailing,
  menuButton,
  headerText,
  headerBg,
  headerIcon
}: collapseAllProps) {
  const [open, setOpen] = useState(true);
  return (
    <div className="w-full my-1">
      <div className="flex items-center justify-between w-full text-alsoit-text-xi">
        <div
          className={cl(
            'w-2/5 h-8 flex items-center justify-cente gap-1 rounded-br-lg group',
            `${headerBg ?? 'bg-alsoit-gray-50'}`
          )}
          onClick={() => setOpen(!open)}
        >
          <span className="flex justify-center w-6 ml-1">
            {headerIcon ? (
              <div>{headerIcon}</div>
            ) : (
              <ToolTip title={`${open ? 'Close' : 'Open'} ${header}`} placement="top">
                <span className={cl('cursor-pointer', !open && '-rotate-90 transform')}>
                  <CollapseIcon active={false} iconColor="rgb(244 244 244)" color="#424242" />
                </span>
              </ToolTip>
            )}
          </span>
          {/* <CollapseAllIcon />s */}
          <ToolTip title={header} placement="top">
            <h2 className={cl('text-alsoit-text-md uppercase font-bold', `${headerText ?? 'text-alsoit-gray-300'}`)}>
              {header}
            </h2>
          </ToolTip>
          <ToolTip title="More calendar options" placement="right">
            <button className="opacity-0 group-hover:opacity-100">{menuButton}</button>
          </ToolTip>
        </div>
        <div className="flex items-center w-3/5 h-8 border-t-2 border-alsoit-gray-50">{headerTrailing}</div>
      </div>
      {open && <div> {children}</div>}
    </div>
  );
}

export default CollapseItems;
