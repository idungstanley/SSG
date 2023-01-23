import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { AvatarWithInitials } from '../../../../components';
import { useGetTeamMembers } from '../../../../features/settings/teamMembers/teamMemberService';
import { useAppSelector } from '../../../../app/hooks';
import { setCurrTeamMemId } from '../../../../features/task/taskSlice';
import { useDispatch } from 'react-redux';
import { UseAssignTaskService } from '../../../../features/task/taskService';

export default function AssignTask() {
  const dispatch = useDispatch();
  const { data } = useGetTeamMembers({
    page: 0,
    query: '',
  });
  const { current_task_id, currTeamMemberId } = useAppSelector(
    (state) => state.task
  );

  const { data: value } = UseAssignTaskService({
    task_id: current_task_id,
    team_member_id: currTeamMemberId,
  });

  console.log(value);
  return (
    <div className="">
      <section className="absolute top-10 z-20 -mt-12 w-60 rounded-md shadow-lg bg-gray-100">
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
              className="space-x-2 hover:bg-gray-300 p-3 "
              key={item?.id}
            >
              <div className="flex items-center justify-between cursor-pointer">
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
                  <p className="text-xs">
                    {item.user.name.toLocaleUpperCase()}
                  </p>
                </div>
              </div>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
