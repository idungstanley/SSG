import { useAppSelector } from '../../../../app/hooks';
import TaskMenu from '../../../../pages/workspace/tasks/component/taskMenu/TaskMenu';
import { Assignee } from '../Assignee/Assignee';
import { ChangeView } from '../ChangeView/ChangeView';
import { FilterDropdown } from '../Filter/FilterDropdown';
import { Search } from '../Search/Search';
import { Sort } from '../Sort/Sort';
import ListSettingsModal from '../listSettings/ListSettingsModal';
import { ReactNode, useEffect, useState } from 'react';
import TimeClockInsightsIcon from '../../../../assets/icons/TimeClockInsightsIcon';
import { ChangeViewInsights } from '../ChangeViewInsights/ChangeViewInsights';
import AutoSaveIcon from '../../../../assets/icons/AutoSaveIcon';
import ProtectViewIcon from '../../../../assets/icons/ProtectViewIcon';
import EveryoneIcon from '../../../../assets/icons/EveryoneIcon';
import MeIcon from '../../../../assets/icons/MeIcon';
import ResetIcon from '../../../../assets/icons/ResetIcon';
import ExportIcon from '../../../../assets/icons/ExportIcon';
import PrivateViewIcon from '../../../../assets/icons/PrivateViewIcon';

interface IHeader {
  isInsights?: boolean;
}

export function Header({ isInsights }: IHeader) {
  const { selectedTasksArray } = useAppSelector((state) => state.task);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (selectedTasksArray.length) {
      setIsVisible(true);
    } else {
      setTimeout(() => {
        setIsVisible(false);
      }, 900);
    }
  }, [selectedTasksArray]);

  const items = [
    {
      label: 'AutoSave View',
      icon: <AutoSaveIcon />
    },
    {
      label: 'Protect View',
      icon: <ProtectViewIcon />
    },
    {
      label: 'Private View',
      icon: <PrivateViewIcon />
    },
    {
      label: 'Default for everyone',
      icon: <EveryoneIcon />
    },
    {
      label: 'Default to ME Mode',
      icon: <MeIcon />
    },
    {
      label: 'Reset view to defaults',
      icon: <ResetIcon />
    },
    {
      label: 'Export',
      icon: <ExportIcon />
    }
  ];

  const renderChangeView = () => {
    if (isInsights) {
      return (
        <div className="flex items-center">
          <div className="flex items-center px-5" style={{ minWidth: '230px' }}>
            <TimeClockInsightsIcon />
            <span className="ml-2">Time Clock</span>
          </div>
          <ChangeViewInsights />
        </div>
      );
    } else {
      return <ChangeView />;
    }
  };

  return (
    <>
      <section
        className="flex items-center justify-between w-full header-scrollbar-hide scrollbar-hide overflow-y-hidden overflow-x-scroll p-4 border-b"
        style={{ height: '50px' }}
      >
        <div className="flex items-center">{renderChangeView()}</div>
        <div className="flex items-center justify-end">
          <Sort />
          <FilterDropdown />
          <Assignee />
          {isInsights ? <Search placeholder="Search Insights" /> : <Search />}
          <ListSettingsModal
            itemsArray={
              items as [
                {
                  label: 'string';
                  icon?: ReactNode;
                }
              ]
            }
          />
        </div>
      </section>

      <div className={`z-50 w-full overflow-hidden relative ${isVisible ? 'transition-height' : 'h-0'}`}>
        <div className="w-12/12">
          <TaskMenu />
        </div>
      </div>
    </>
  );
}
