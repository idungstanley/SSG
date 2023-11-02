import dayjs from 'dayjs';
import { IEntries } from '../../../../features/task/interface.tasks';
import AvatarWithImage from '../../../avatar/AvatarWithImage';
import AvatarWithInitials from '../../../avatar/AvatarWithInitials';
import ThreeDotIcon from '../../../../assets/icons/ThreeDotIcon';
import { useState } from 'react';
import { TIME_INVENTORY_ACTIONS } from '../../../../utils/Constants/TimeClockConstants';
import { useDeleteTimeEntryMutation } from '../../../../features/task/taskService';
import EditIcon from '../../../../assets/icons/Edit';
import { BiDuplicate } from 'react-icons/bi';
import TrashIcon from '../../../../assets/icons/TrashIcon';
import RoundedCheckbox from '../../../Checkbox/RoundedCheckbox';
import { RealTimeIcon } from '../../../../assets/icons/RealTimeIcon';
import { ManualTimeIcon } from '../../../../assets/icons/ManualTimeIcon';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setTimeEntriesIdArr } from '../../../../features/task/taskSlice';

interface Props {
  timeEntry: IEntries;
  index: number;
}

export function TimeLogEntries({ timeEntry, index }: Props) {
  const dispatch = useAppDispatch();

  const { timeEntriesIdArr } = useAppSelector((state) => state.task);

  const { mutateAsync } = useDeleteTimeEntryMutation();

  const [dropDown, setDropDown] = useState<{ entryAction: boolean }>({ entryAction: false });

  const btnCheckFn = timeEntriesIdArr.includes(timeEntry.id);

  const entryActions = () => {
    return (
      <div className="absolute right-0 shadow-lg w-28 bg-white flex flex-col space-y-2">
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
              <TrashIcon />
            )}
            <span className="capitalize font-semibold">{action.name}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <tr key={index} className="h-12 flex items-center border-b cursor-pointer hover:bg-alsoit-purple-50 group bg-white">
      <td className="sticky left-0 bg-white group-hover:bg-alsoit-purple-50 z-20 flex items-center space-x-2.5 border-r w-[15rem] h-full">
        <div className="h-full w-4 bg-alsoit-gray-50 flex items-center mr-2">
          <RoundedCheckbox
            isChecked={btnCheckFn}
            onChange={() => dispatch(setTimeEntriesIdArr(Array.from(new Set([...timeEntriesIdArr, timeEntry.id]))))}
            styles="w-2 h-2 rounded-lg checked:bg-alsoit-purple-300 focus:bg-alsoit-purple-300 active:bg-alsoit-purple-300 invisible group-hover:visible"
          />
        </div>
        <div className="flex items-center space-x-2.5 h-full">
          {timeEntry.team_member.user.avatar_path ? (
            <AvatarWithImage image_path={timeEntry.team_member.user.avatar_path} height="h-6" width="w-6" />
          ) : (
            <AvatarWithInitials
              initials={timeEntry.team_member.user.initials}
              backgroundColour={timeEntry.team_member.user.color}
              width="w-6"
              height="h-6"
            />
          )}
          <span>{timeEntry.team_member.user.name}</span>
        </div>
      </td>
      <td className="w-20 border-r h-9 flex items-center justify-center text-alsoit-text-md text-center relative">
        {dayjs.duration(timeEntry.duration, 'seconds').format('HH:mm:ss')}
        <span className="absolute flex items-center space-x-1 top-0 right-0.5 bg-alsoit-gray-50 rounded-md px-1 capitalize text-alsoit-text-sm">
          {timeEntry.type === 'real' ? <RealTimeIcon className="w-3 h-3" /> : <ManualTimeIcon />}
          <span>{timeEntry.type === 'real' ? 'real time' : timeEntry.type}</span>
        </span>
      </td>
      <td className="w-20 text-alsoit-text-md text-center">{dayjs(timeEntry.start_date).format('ddd DD, MMM')}</td>
      <td className="w-20 flex items-center justify-center">-</td>
      <td className="w-20 text-alsoit-text-md text-center">{dayjs(timeEntry.end_date).format('ddd DD, MMM')}</td>
      <td className="w-20 flex items-center justify-center">-</td>
      <td className="invisible group-hover:visible relative">
        <ThreeDotIcon onClick={() => setDropDown((prev) => ({ ...prev, entryAction: !prev.entryAction }))} />
        {dropDown.entryAction && entryActions()}
      </td>
    </tr>
  );
}
