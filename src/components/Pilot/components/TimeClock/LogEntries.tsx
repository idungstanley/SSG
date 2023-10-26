import dayjs from 'dayjs';
import { IEntries } from '../../../../features/task/interface.tasks';
import ToolTip from '../../../Tooltip/Tooltip';
import AvatarWithImage from '../../../avatar/AvatarWithImage';
import AvatarWithInitials from '../../../avatar/AvatarWithInitials';
import ThreeDotIcon from '../../../../assets/icons/ThreeDotIcon';
import { useState } from 'react';
import { TabsDropDown } from './TabsDropDown';
import { TIME_INVENTORY_ACTIONS } from '../../../../utils/Constants/TimeClockConstants';
import EditIcon from '../../../../assets/icons/Edit';
import { BiDuplicate } from 'react-icons/bi';
import TrashIcon from '../../../../assets/icons/delete';
import { useDeleteTimeEntryMutation } from '../../../../features/task/taskService';

interface Props {
  timeEntry: IEntries;
  index: number;
}

export function TimeLogEntries({ timeEntry, index }: Props) {
  const { mutateAsync } = useDeleteTimeEntryMutation();

  const [dropDown, setDropDown] = useState<{ entryAction: boolean }>({ entryAction: false });

  const entryActions = () => {
    return (
      <div className="flex flex-col space-y-2">
        {TIME_INVENTORY_ACTIONS.map((action, index) => (
          <div
            key={index}
            className="flex w-full space-x-2 cursor-pointer py-1.5 hover:bg-alsoit-purple-50 rounded-md px-1"
            onClick={() => action.value === 'delete' && mutateAsync(timeEntry.id)}
          >
            {action.value === 'edit' ? (
              <EditIcon active dimensions={{ width: 18, height: 18 }} />
            ) : action.value === 'duplicate' ? (
              <BiDuplicate className="w-4 h-4" />
            ) : (
              <TrashIcon active dimensions={{ width: 18, height: 18 }} />
            )}
            <span className="capitalize font-semibold">{action.name}</span>
          </div>
        ))}
      </div>
    );
  };
  return (
    <div className={`flex items-center w-full relative group ${index % 2 === 0 ? 'bg-alsoit-gray-50' : 'bg-white'}`}>
      <div className="flex items-center space-x-14">
        {/* User Avatar */}
        <ToolTip title={timeEntry.team_member.user.name}>
          <div className="py-1.5 w-14 flex justify-center">
            {timeEntry.team_member.user.avatar_path ? (
              <AvatarWithImage
                image_path={timeEntry.team_member.user.avatar_path}
                height="h-7"
                width="w-7"
                roundedStyle="circular"
              />
            ) : (
              <ToolTip title={timeEntry.team_member.user.name}>
                <AvatarWithInitials
                  initials={timeEntry.team_member.user.initials}
                  height="h-7"
                  width="w-7"
                  textSize="7px"
                  backgroundColour={timeEntry.team_member.user.color}
                />
              </ToolTip>
            )}
          </div>
        </ToolTip>
        {/* Duration */}
        <div className="py-1.5 w-14 text-alsoit-text-sm text-center tracking-wide relative">
          <div
            className={`absolute text-alsoit-text-sm capitalize -top-0.5 -left-9 font-light px-0.5 ${
              index % 2 === 0 ? 'bg-white' : 'bg-alsoit-gray-50'
            } rounded-md`}
          >
            {timeEntry.type === 'real' ? 'real time' : timeEntry.type}
          </div>
          {dayjs.duration(timeEntry.duration, 'seconds').format('HH:mm:ss')}
        </div>
      </div>
      <div className={`flex justify-around space-x-9 h-10 ${index % 2 === 0 ? 'bg-alsoit-gray-50' : 'bg-white'}`}>
        {/* Start Date */}
        <div className="py-1.5 w-40 text-alsoit-text-sm flex justify-center items-center">
          {dayjs(timeEntry.start_date).format('ddd DD, MMM')}
        </div>
        {/* single label */}
        <div className="py-1.5 w-40 flex justify-center items-center gapFixes">-</div>
        {/* End Date */}
        <div className="py-1.5 w-40 flex justify-center items-center text-alsoit-text-sm gapFixes">
          {dayjs(timeEntry.end_date).format('ddd DD, MMM')}
        </div>
        {/* tags */}
        <div className="py-1.5 w-40 flex justify-center items-center gapFixes">-</div>
      </div>
      <div className="absolute right-2 invisible group-hover:visible">
        <ThreeDotIcon
          className="w-4 h-4 cursor-pointer"
          onClick={() => setDropDown((prev) => ({ ...prev, entryAction: !prev.entryAction }))}
        />
      </div>
      {dropDown.entryAction && (
        <TabsDropDown
          closeModal={() => setDropDown((prev) => ({ ...prev, entryAction: !prev.entryAction }))}
          header="more options"
          subHeader="field settings"
          styles="w-44 right-2 top-7"
        >
          {entryActions()}
        </TabsDropDown>
      )}
    </div>
  );
}
