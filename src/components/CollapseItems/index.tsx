import React, { ReactNode, useState } from 'react';
import { cl } from '../../utils';
import ToolTip from '../Tooltip/Tooltip';
import CarretIcon from '../../assets/icons/CarretIcon';

interface collapseAllProps {
  children?: ReactNode;
  header: string;
  headerBg?: string;
  headerText?: string;
  headerTrailing?: ReactNode;
  menuButton?: ReactNode;
  headerIcon?: ReactNode;
  handleToggle: VoidFunction;
  open: boolean;
}

function CollapseItems({
  children,
  header,
  headerTrailing,
  menuButton,
  headerText,
  headerBg,
  headerIcon,
  handleToggle,
  open
}: collapseAllProps) {
  const [caretColor, setCaretColor] = useState(open ? '#B2B2B2' : '#FFFFFF');
  return (
    <div className="w-full my-1">
      <div className="w-full flex items-center justify-between text-alsoit-text-xi">
        <div
          className={cl('w-2/5 h-8 flex items-center gap-1 rounded-br-lg group', `${headerBg ?? 'bg-alsoit-gray-50'}`)}
          onClick={handleToggle}
        >
          <span className="w-6 ml-1 flex justify-center">
            {headerIcon ? (
              <div>{headerIcon}</div>
            ) : (
              <ToolTip title={`${open ? 'Close' : 'Open'} ${header}`} placement="top">
                <span
                  className={cl(
                    'cursor-pointer h-4 w-4  rounded-full flex justify-center items-center border border-white',
                    open ? 'bg-white hover:bg-transparent' : 'bg-transparent hover:bg-white -rotate-90 transform'
                  )}
                  onMouseEnter={() => setCaretColor(open ? '#FFFFFF' : '#B2B2B2')}
                  onMouseLeave={() => setCaretColor(open ? '#B2B2B2' : '#FFFFFF')}
                >
                  <CarretIcon color={caretColor} />
                </span>
              </ToolTip>
            )}
          </span>
          {/* <CollapseAllIcon />s */}
          <ToolTip title={header} placement="top">
            <h2
              className={cl(
                'text-alsoit-text-md uppercase font-bold mx-2 hover:text-alsoit-gray-200',
                `${headerText ?? 'text-alsoit-gray-300'}`
              )}
              onMouseEnter={() => setCaretColor('#626262')}
              onMouseLeave={() => setCaretColor(open ? '#B2B2B2' : '#FFFFFF')}
            >
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
