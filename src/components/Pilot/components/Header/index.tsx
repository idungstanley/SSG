import { ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setShowPilotSideOver } from '../../../../features/general/slideOver/slideOverSlice';
import { cl } from '../../../../utils';
import Menu from '../HotKeys/components/Dropdown';
import { setActiveTabId } from '../../../../features/workspace/workspaceSlice';
import CompactIcon from '../../../../assets/icons/CompactIcon';
import { STORAGE_KEYS } from '../../../../app/config/dimensions';
import GroupIcon from '../../../../assets/icons/GroupIcon';

interface HeaderProps {
  isMinified: boolean;
  additionalNavItems?: ReactNode;
  children?: ReactNode;
  menu: ReactNode;
}

export default function Header({ menu, children, isMinified, additionalNavItems }: HeaderProps) {
  const dispatch = useAppDispatch();

  const { pilotSideOver } = useAppSelector((state) => state.slideOver);

  const togglePilot = () => {
    localStorage.setItem(STORAGE_KEYS.IS_PILOT_MINIFIED, JSON.stringify(isMinified));
    dispatch(setActiveTabId());
    dispatch(setShowPilotSideOver({ ...pilotSideOver, show: isMinified }));
  };

  return (
    <div
      className={cl(
        'w-full grid grid-cols-frAuto grid-rows-1 items-center bg-white',
        isMinified ? 'col-span-3 border-none' : 'col-span-1 border-b'
      )}
      style={{ height: isMinified ? '' : '50px' }}
    >
      {children}
      <div
        className={`relative flex items-center ${isMinified ? 'border-b' : ''}`}
        style={{ height: isMinified ? '50px' : undefined }}
      >
        {/* other components */}
        {additionalNavItems}

        <div
          className={cl(
            'relative flex items-center',
            isMinified ? 'justify-center w-full flex-wrap gap-1 flex-col' : 'flex-col'
          )}
        >
          {/* show / hide pilot toggle */}
          <button
            type="button"
            onClick={togglePilot}
            className="text-gray-400 flex justify-center items-center bg-alsoit-gray-125 hover:bg-alsoit-gray-50 transition duration-300"
            style={{
              margin: isMinified ? '0' : '7px 12px 2px 0',
              borderRadius: '3px',
              width: '20px',
              height: '20px'
            }}
          >
            {isMinified ? <CompactIcon /> : <GroupIcon />}
          </button>
          <div
            className="flex justify-center items-center bg-alsoit-gray-125 hover:bg-alsoit-gray-50 transition duration-300"
            style={{
              margin: isMinified ? '0' : '1px 12px 5px 0',
              borderRadius: '3px',
              width: '20px',
              height: '20px'
            }}
          >
            {menu}
          </div>
        </div>
      </div>
    </div>
  );
}

Header.Menu = Menu;
