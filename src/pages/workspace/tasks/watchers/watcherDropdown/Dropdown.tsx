import { AiOutlineSearch } from 'react-icons/ai';
import React from 'react';
import { AvatarWithInitials, StatusDot } from '../../../../../components';
import { useGetTeamMembers } from '../../../../../features/settings/teamMembers/teamMemberService';
import { setCurrTeamMemId, setRmWatcher } from '../../../../../features/task/taskSlice';
import { useDispatch } from 'react-redux';
import { AddWatcherService, RemoveWatcherService } from '../../../../../features/task/taskService';
import { useAppSelector } from '../../../../../app/hooks';
import { TrashIcon } from '@heroicons/react/24/outline';

interface DropdownProps {
  taskId: string | undefined;
}

export default function Dropdown({ taskId }: DropdownProps) {
  const dispatch = useDispatch();

  const { data } = useGetTeamMembers({
    page: 0,
    query: ''
  });

  const currTeamMemberId = useAppSelector((state) => state.task.currTeamMemberId);
  const currTeamMemberDelId = useAppSelector((state) => state.task.removeWatcherId);

  const watcherList = useAppSelector((state) => state.task.watchersData[0]);

  AddWatcherService({
    query: [currTeamMemberId, taskId]
  });

  const { status } = RemoveWatcherService({
    query: [currTeamMemberDelId, taskId]
  });

  if (status === 'success') {
    dispatch(setRmWatcher(null));
  }
  return (
    <div className="">
      <section className="absolute -left-56 top-10 z-10 -mt-3 w-60 rounded-md shadow-lg bg-gray-100">
        <div className="text-xs">
          <section className="flex relative w-full ">
            <AiOutlineSearch className="h-5 w-5 absolute right-3 top-3" />
            <input type="text" placeholder="Search..." className="p-2 w-full border-0 focus:outline-none" />
          </section>
          <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
          <section className="p-3">
            <p>People</p>
          </section>
          {data?.data.team_members.map((item) => (
            <section className="space-x-2 hover:bg-gray-300 p-3 " key={item?.id}>
              <div className="flex items-center justify-between ">
                <div
                  className="relative flex items-center cursor-pointer  space-x-2"
                  onClick={() => dispatch(setCurrTeamMemId(item.id))}
                >
                  <AvatarWithInitials
                    initials={item.initials}
                    backgroundColour={item.colour}
                    height="h-5"
                    width="w-5"
                  />

                  {watcherList.includes(item.id) ? (
                    <div className="absolute -top-4 left-0">
                      <StatusDot size={2.5} colour="#4ADE80" ringSize={2} top={true} />
                    </div>
                  ) : null}
                  <p className="text-xs">{item.user.name.toLocaleUpperCase()}</p>
                </div>

                {watcherList.includes(item.id) ? (
                  <button type="button" onClick={() => dispatch(setRmWatcher(item.id))}>
                    <TrashIcon className="h-4 w-4 text-gray-500 cursor-pointer" />
                  </button>
                ) : null}
              </div>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
