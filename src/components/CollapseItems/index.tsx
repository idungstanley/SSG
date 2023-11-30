import React, { ReactNode, useState } from 'react';
import CollapseIcon from '../Views/ui/collapseIcon/CollapseIcon';
import { cl } from '../../utils';
import ToolTip from '../Tooltip/Tooltip';

interface collapseAllProps {
  children?: ReactNode;
  header: string;
  headerBg?: string;
  headerText?: string;
  headerTrailing?: ReactNode;
  menuButton?: ReactNode;
}

function CollapseItems({ children, header, headerTrailing, menuButton, headerText, headerBg }: collapseAllProps) {
  const [open, setOpen] = useState(true);
  return (
    <div className="w-full my-1">
      <div className="w-full flex items-center justify-between text-alsoit-text-xi">
        <div
          className={cl(
            ' w-2/5 h-8 flex items-center justify-cente gap-1 rounded-br-lg group',
            `${headerBg ?? 'bg-alsoit-gray-50'}`
          )}
          onClick={() => setOpen(!open)}
        >
          <span className="w-6 ml-2 flex justify-center">
            <ToolTip title={`${open ? 'Close' : 'Open'} ${header}`} placement="top">
              <span className={cl('cursor-pointer', !open && '-rotate-90 transform')}>
                <CollapseIcon active={false} iconColor="rgb(244 244 244)" color="#424242" />
              </span>
            </ToolTip>
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

        <div className="border-t-2 border-alsoit-gray-50 h-8 w-3/5 flex items-center">{headerTrailing}</div>
      </div>
      {open && <div> {children}</div>}
    </div>
  );
}

export default CollapseItems;
