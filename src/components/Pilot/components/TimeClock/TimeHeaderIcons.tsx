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
import { TeamMemberFilter } from './TeamMember';
import { useGetTimeEntriesMutation } from '../../../../features/task/taskService';

interface Props {
  fullContent?: boolean;
}

export function HeaderIcons({ fullContent }: Props) {
  const { nestedTimeEntityId, activeItemId, activeItemType } = useAppSelector((state) => state.workspace);
  const { currentTeamMemberId } = useAppSelector((state) => state.task);

  const { mutateAsync } = useGetTimeEntriesMutation();

  const [dropDown, setDropDown] = useState<{ show: boolean; filter: boolean; assignee: boolean; me: boolean }>({
    assignee: false,
    filter: false,
    me: false,
    show: false
  });

  useEffect(() => {
    if (nestedTimeEntityId) setDropDown((prev) => ({ ...prev, show: !prev.show }));
  }, [nestedTimeEntityId]);

  return (
    <div className="flex justify-end space-x-1 px-1.5">
      <div
        className="p-0.5 rounded-md gap-2 flex -space-x-1 items-center justify-between bg-white hover:bg-alsoit-purple-50 cursor-pointer relative"
        onClick={() => setDropDown((prev) => ({ ...prev, show: !prev.show }))}
      >
        <ShowIcon color="gray" className="w-4 h-4" />
        {dropDown.show && (
          <TabsDropDown
            styles="w-72 right-0 top-5 px-1.5"
            subStyles="left-1/3"
            header="customize this view"
            subHeader="main settings"
            closeModal={() => setDropDown((prev) => ({ ...prev, show: !prev.show }))}
          >
            <TimeShowDropDown />
          </TabsDropDown>
        )}
      </div>
      <div className="flex items-center p-1 bg-white rounded-md cursor-pointer hover:bg-alsoit-purple-50">
        <FilterListIcon active={false} color="orange" className="w-4 h-4" />
      </div>
      {fullContent && (
        <div className={'p-1 rounded-md flex items-center bg-white hover:bg-alsoit-purple-50 cursor-pointer'}>
          <Me
            active={false}
            className="w-4 h-4"
            onClick={() =>
              mutateAsync({
                itemId: activeItemId,
                trigger: activeItemType,
                include_filters: true,
                team_member_ids: currentTeamMemberId as string[]
              })
            }
          />
        </div>
      )}
      <div
        className={
          'relative p-0.5 rounded-md flex -space-x-1 items-center justify-between bg-white gap-2 hover:bg-alsoit-purple-50 cursor-pointer'
        }
        onClick={() => setDropDown((prev) => ({ ...prev, assignee: !prev.assignee }))}
      >
        <AssigneeIcon className="w-4 h-4" active={false} />
        <ArrowDownFilled dimensions={{ width: 6, height: 6 }} />
        {dropDown.assignee && (
          <TeamMemberFilter closeModal={() => setDropDown((prev) => ({ ...prev, assignee: !prev.assignee }))} />
        )}
      </div>
      <div className="flex items-center p-1 bg-white rounded-md cursor-pointer hover:bg-alsoit-purple-50">
        <SearchIcon className="w-4 h-4" color="orange" />
      </div>
    </div>
  );
}
