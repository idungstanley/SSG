import { BsPower } from 'react-icons/bs';
import { useAppSelector } from '../../../../app/hooks';
import TaskMenu from '../../../../pages/workspace/tasks/component/taskMenu/TaskMenu';
import { Assignee } from '../Assignee/Assignee';
import { ChangeView } from '../ChangeView/ChangeView';
import { FilterDropdown } from '../Filter/FilterDropdown';
import { Search } from '../Search/Search';
import { Sort } from '../Sort/Sort';
import ListSettingsModal from '../listSettings/ListSettingsModal';
import { AiOutlineHome, AiOutlineSave, AiOutlineUser } from 'react-icons/ai';
import { ReactNode } from 'react';
import { MdOutlinePrivacyTip } from 'react-icons/md';
import { BiLock } from 'react-icons/bi';
import { HiDownload } from 'react-icons/hi';
import TimeClockInsightsIcon from '../../../../assets/icons/TimeClockInsightsIcon';
import { ChangeViewInsights } from '../ChangeViewInsights/ChangeViewInsights';

interface IHeader {
  isInsights?: boolean;
}

export function Header({ isInsights }: IHeader) {
  const { selectedTasksArray } = useAppSelector((state) => state.task);

  const items = [
    {
      label: 'AutoSave View',
      icon: <AiOutlineSave />
    },
    {
      label: 'Protect View',
      icon: <MdOutlinePrivacyTip />
    },
    {
      label: 'Private View',
      icon: <BiLock />
    },
    {
      label: 'Default for everyone',
      icon: <AiOutlineHome />
    },
    {
      label: 'Default to ME Mode',
      icon: <AiOutlineUser />
    },
    {
      label: 'Reset view to defaults',
      icon: <BsPower />
    },
    {
      label: 'Export',
      icon: <HiDownload />
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
      <section className="flex items-center justify-between w-full p-1 border-b" style={{ height: '50px' }}>
        <div className="flex items-center">{renderChangeView()}</div>
        <div className="flex items-center justify-end">
          <Sort />
          <FilterDropdown />
          <Assignee />
          {isInsights ? <Search placeholder="Search Insights" /> : <Search />}
          <p>
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
          </p>
        </div>
      </section>
      {selectedTasksArray.length > 0 && (
        <div className="z-50 w-full">
          <span className="transition duration-300 ease-in-out w-12/12 ">
            <TaskMenu />
          </span>
        </div>
      )}
    </>
  );
}
