import { useEffect, useState } from 'react';
import ArrowDownFilled from '../../../../assets/icons/ArrowDownFilled';
import AssigneeIcon from '../../../../assets/icons/Assignee';
import { FilterListIcon } from '../../../../assets/icons/FilterListIcon';
import Me from '../../../../assets/icons/Me';
import SearchIcon from '../../../../assets/icons/SearchIcon';
import ShowIcon from '../../../../assets/icons/ShowIcon';
import { TabsDropDown } from './TabsDropDown';
import { TimeShowDropDown } from './TimeShowDropDown';
import { useAppSelector } from '../../../../app/hooks';
import { ITimeEntriesRes } from '../../../../features/task/interface.tasks';
import { TeamMemberFilter } from './TeamMember';

interface Props {
  timeData?: ITimeEntriesRes;
}

export function HeaderIcons({ timeData }: Props) {
  const { nestedTimeEntityId } = useAppSelector((state) => state.workspace);

  const [dropDown, setDropDown] = useState<{ show: boolean; filter: boolean; assignee: boolean; me: boolean }>({
    assignee: false,
    filter: false,
    me: false,
    show: false
  });

  // const { data: getTaskTimeEntries } = GetTimeEntriesService({
  //   itemId: activeItemId,
  //   trigger: activeItemType === EntityType.subHub ? EntityType.hub : activeItemType,
  //   page,
  //   include_filters: true
  // });

  useEffect(() => {
    if (nestedTimeEntityId) setDropDown((prev) => ({ ...prev, show: !prev.show }));
  }, [nestedTimeEntityId]);

  return (
    <div className="flex justify-end space-x-0.5 px-1.5">
      <div
        className="p-0.5 rounded-md flex items-center justify-between bg-white hover:bg-alsoit-purple-50 cursor-pointer relative"
        onClick={() => setDropDown((prev) => ({ ...prev, show: !prev.show }))}
      >
        <ShowIcon color="gray" className="w-4 h-4" />
        <ArrowDownFilled className="w-4 h-4" />
        {dropDown.show && (
          <TabsDropDown
            styles="w-72 right-0 top-5 px-1.5"
            subStyles="left-1/3"
            header="customize this view"
            subHeader="main settings"
          >
            <TimeShowDropDown />
          </TabsDropDown>
        )}
      </div>
      <div className="p-1 rounded-md flex items-center bg-white hover:bg-alsoit-purple-50 cursor-pointer">
        <FilterListIcon active={false} className="w-4 h-4" />
      </div>
      <div className={'p-1 rounded-md flex items-center bg-white hover:bg-alsoit-purple-50 cursor-pointer '}>
        <Me active={false} className="w-4 h-4" />
      </div>
      <div
        className={
          'relative p-1 rounded-md flex items-center justify-between bg-white hover:bg-alsoit-purple-50 cursor-pointer '
        }
        onClick={() => setDropDown((prev) => ({ ...prev, assignee: !prev.assignee }))}
      >
        <AssigneeIcon className="w-4 h-4" active={false} />
        <ArrowDownFilled className="w-4 h-4" />
        {dropDown.assignee && <TeamMemberFilter timeData={timeData?.data.time_entries} />}
      </div>
      <div className="p-1 rounded-md flex items-center bg-white hover:bg-alsoit-purple-50 cursor-pointer">
        <SearchIcon className="w-4 h-4" />
      </div>
    </div>
  );
}
