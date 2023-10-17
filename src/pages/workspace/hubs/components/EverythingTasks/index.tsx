import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cl } from '../../../../../utils';
import EverythingIcon from '../../../../../assets/icons/EverythingIcon';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { setActiveItem } from '../../../../../features/workspace/workspaceSlice';
import ActiveBackground from '../../../../../components/tasks/Component/ActiveBackground';
import ActiveBarIdentification from '../../../../../components/tasks/Component/ActiveBarIdentification';

function EverythingTasks() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { showSidebar } = useAppSelector((state) => state.account);

  const handleLoadAllTasks = () => {
    navigate('everything', {
      replace: true
    });
    dispatch(
      setActiveItem({
        activeItemId: '',
        activeItemType: '',
        activeItemName: 'Everything page'
      })
    );
  };

  return (
    <div
      className={cl(
        !showSidebar ? 'overflow-x-hidden w-12 pl-5' : 'pl-6',
        'relative flex items-center justify-between hover:bg-gray-100'
      )}
    >
      <ActiveBackground showBgColor={location.pathname.includes('everything')} />
      <ActiveBarIdentification showBar={location.pathname.includes('everything')} />
      <div
        className="flex items-center content-center self-center gap-6 py-2 cursor-pointer"
        style={{ zIndex: 1 }}
        onClick={handleLoadAllTasks}
      >
        <EverythingIcon color={location.pathname.includes('everything') ? '#BF01FE' : undefined} />
        <p
          className={`block text-xs tracking-wider capitalize truncate ${
            location.pathname.includes('everything') ? 'text-alsoit-purple-300' : ''
          }`}
        >
          Everything
        </p>
      </div>
    </div>
  );
}

export default EverythingTasks;
