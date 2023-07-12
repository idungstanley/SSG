import React, { Fragment, useRef } from 'react';
import { Menu, Transition } from '@headlessui/react';
import ArrowDownFilled from '../../../../assets/icons/ArrowDownFilled';
import { useGetTeamMembers } from '../../../../features/settings/teamMembers/teamMemberService';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import AvatarWithInitials from '../../../avatar/AvatarWithInitials';
import { AiFillCheckCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import { setFilterFields } from '../../../../features/task/taskSlice';
import { generateFilter } from '../Filter/lib/filterUtils';
import { EllipsisHorizontalIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import AssigneeIcon from '../../../../assets/icons/Assignee';

export default function FilterByAssigneeModal() {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const { data } = useGetTeamMembers({ page: 1, query: '' });
  const members = data?.data.team_members ?? [];
  const {
    filters: { fields: filters }
  } = useAppSelector((state) => state.task);

  const currentAssignees =
    (filters.find((i) => i.key === 'assignees')?.values as { id: string; value: string }[]) ?? [];

  const isAssignee = currentAssignees.length ? true : false;

  const onClickMember = (memberId: string, memberName: string) => {
    const isAssigneesInFilters = filters.find((i) => i.key === 'assignees');

    const newMemberObj = {
      value: memberName,
      id: memberId
    };

    if (isAssigneesInFilters) {
      const isMemberInAssignees = (isAssigneesInFilters.values as { id: string; value: string }[])
        .map((i) => i.id)
        .includes(memberId);

      // add member or remove if exists
      const newAssignees = isMemberInAssignees
        ? currentAssignees.filter((i) => i.id !== memberId)
        : [...currentAssignees, newMemberObj];

      if (newAssignees.length === 0) {
        // delete assignees filter if no one member
        dispatch(setFilterFields([...filters.filter((i) => i.key !== 'assignees')]));
      } else {
        dispatch(
          setFilterFields([
            ...filters.map((filter) => {
              if (filter.key === 'assignees') {
                // return { ...filter, values: [] };
                return { ...filter, values: [...newAssignees] };
              }

              return filter;
            })
          ])
        );
      }
    } else {
      // create assignees filter
      dispatch(setFilterFields([...filters, generateFilter('assignees', { initialValue: newMemberObj })]));
    }
  };

  return (
    <Menu as="div" className="group relative inline-block text-left">
      <div className="relative">
        <Menu.Button className="flex items-center">
          <AssigneeIcon active={isAssignee} />
          <span>Assignee</span>
          <ArrowDownFilled active={isAssignee} />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="fixed w-72 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-scroll"
          style={{ zIndex: 3 }}
        >
          <div className="relative text-gray-500 items-center flex w-full py-2 px-4">
            <MagnifyingGlassIcon className="w-5 h-5" />

            <input
              onChange={() => null}
              ref={inputRef}
              type="text"
              className="block w-full h-5 alsoit-radius text-alsoit-gray-300-lg border-0 ring-0 focus:ring-0 focus:outline-0 appearance-none text-alsoit-text-lg"
              placeholder="Search Assignee"
            />
            <EllipsisHorizontalIcon className="w-5 h-5" />
          </div>
          {members.map((member) => (
            <section
              className="flex items-center py-2 px-4 text-alsoit-text-md text-black text-left w-full justify-between cursor-pointer hover:bg-gray-200"
              key={member.id}
              onClick={() => onClickMember(member.id, member.user.name)}
            >
              <div className="flex space-x-3 items-center">
                <AvatarWithInitials
                  initials={member.user.initials}
                  textColor={'white'}
                  height="h-8"
                  width="w-8"
                  backgroundColour={member.color}
                  textSize={'8px'}
                />
                <div className="flex flex-col text-left">
                  <p className="capitalize text-alsoit-text-lg text-alsoit-gray-300">{member.user.name}</p>
                  <p className="text-alsoit-text-md">{member.user.email}</p>
                </div>
              </div>

              <button>
                {currentAssignees?.map((i) => i.id).includes(member.id) ? (
                  <AiFillCheckCircle />
                ) : (
                  <AiOutlineCheckCircle />
                )}
              </button>
            </section>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
