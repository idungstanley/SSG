import { AiOutlineSearch } from 'react-icons/ai';
import React from 'react';
import { AvatarWithInitials, StatusDot } from '../../../../../components';
import { useGetTeamMembers } from '../../../../../features/settings/teamMembers/teamMemberService';
import { setCurrTeamMemId } from '../../../../../features/task/taskSlice';
import { useDispatch } from 'react-redux';
import { AddWatcherService } from '../../../../../features/task/taskService';

import { useAppSelector } from '../../../../../app/hooks';

interface DropdownProps {
  taskId: string | undefined;
}

export default function Dropdown({ taskId }: DropdownProps) {
  const dispatch = useDispatch();

  const { data } = useGetTeamMembers({
    page: 0,
    query: '',
  });

  const currTeamMemberId: string | null = useAppSelector(
    (state) => state.task.currTeamMemberId
  );
  const watcherList = useAppSelector((state) => state.task.watchersData);
  console.log({ watcherList });
  AddWatcherService({
    query: [currTeamMemberId, taskId],
  });

  return (
    <div className="">
      <section className="absolute -left-56 top-10 z-10 -mt-3 w-60 rounded-md shadow-lg bg-gray-100">
        <div className="text-xs">
          <section className="flex relative w-full ">
            <AiOutlineSearch className="h-5 w-5 absolute right-3 top-3" />
            <input
              type="text"
              placeholder="Search..."
              className="p-2 w-full border-0 focus:outline-none"
            />
          </section>
          <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
          <section className="p-3">
            <p>People</p>
          </section>
          {data?.data.team_members.map((item) => (
            <section
              className="flex justify-between items-center space-x-2 hover:bg-gray-300 p-3 "
              key={item?.id}
              onClick={() => dispatch(setCurrTeamMemId(item.id))}
            >
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <AvatarWithInitials
                    initials={item.initials}
                    backgroundColour={item.colour}
                    height="h-5"
                    width="w-5"
                  />

                  {item.id == currTeamMemberId ? (
                    <div className="absolute -top-3 left-1">
                      <StatusDot
                        size={2.5}
                        colour="#4ADE80"
                        ringSize={2}
                        top={true}
                      />
                    </div>
                  ) : null}
                </div>
                <p className="text-xs">{item.user.name.toLocaleUpperCase()}</p>
              </div>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
