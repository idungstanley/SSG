import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { AvatarWithInitials } from '../../../../components';
import { useGetTeamMembers } from '../../../../features/settings/teamMembers/teamMemberService';

export default function AssignTask() {
  const { data } = useGetTeamMembers({
    page: 0,
    query: '',
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
              className="space-x-2 hover:bg-gray-300 p-3 "
              key={item?.id}
            >
              <div className="flex items-center justify-between ">
                <div
                  className="relative flex items-center cursor-pointer  space-x-2"
                  // onClick={() => dispatch(setCurrTeamMemId(item.id))}
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
