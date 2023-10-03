import { ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setShowPilotSideOver } from '../../../../features/general/slideOver/slideOverSlice';
import { cl } from '../../../../utils';
import Menu from '../HotKeys/components/Dropdown';
import { setActiveTabId } from '../../../../features/workspace/workspaceSlice';
import CompactIcon from '../../../../assets/icons/CompactIcon';
import ExpandIcon from '../../../../assets/icons/ExpandIcon';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setUserSettingsKeys } from '../../../../features/account/accountService';
import useResolution from '../../../../hooks/useResolution';
import { STORAGE_KEYS } from '../../../../app/config/dimensions';

interface HeaderProps {
  isMinified: boolean;
  additionalNavItems?: ReactNode;
  children?: ReactNode;
  menu: ReactNode;
}

export default function Header({ menu, children, isMinified, additionalNavItems }: HeaderProps) {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const resolution = useResolution();

  const { pilotSideOver } = useAppSelector((state) => state.slideOver);
  const { userSettingsData } = useAppSelector((state) => state.account);

  const postIsPilotMinified = useMutation(setUserSettingsKeys, {
    onSuccess: () => {
      queryClient.invalidateQueries(['user-settings']);
    }
  });

  const togglePilot = () => {
    postIsPilotMinified.mutateAsync({
      value: { ...userSettingsData, isPilotMinified: isMinified },
      resolution: resolution
    });
    localStorage.setItem(STORAGE_KEYS.IS_PILOT_MINIFIED, JSON.stringify(isMinified));
    dispatch(setActiveTabId());
    dispatch(setShowPilotSideOver({ ...pilotSideOver, show: isMinified }));
  };

  return (
    <div
      className={cl(
        'w-full grid grid-cols-frAuto grid-rows-1 items-center',
        isMinified ? 'col-span-3 border-none' : 'p-2 col-span-1 border-b'
      )}
      style={{ height: isMinified ? '' : '50px' }}
    >
      {children}
      <div
        className={`relative flex items-center gap-3 ${isMinified ? 'border-b' : ''}`}
        style={{ height: isMinified ? '50px' : undefined }}
      >
        {/* other components */}
        {additionalNavItems}

        <div
          className={cl(
            'relative flex items-center',
            isMinified ? 'justify-center w-full flex-col-reverse gap-2' : 'border-l pl-1 flex-col divide-y'
          )}
        >
          {menu}
          {/* show / hide pilot toggle */}
          <button type="button" onClick={togglePilot} className="text-gray-400">
            {isMinified ? <CompactIcon /> : <ExpandIcon />}
          </button>
        </div>
      </div>
    </div>
  );
}

Header.Menu = Menu;
