import React, { Fragment, useRef, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import ArrowDownFilled from '../../../../assets/icons/ArrowDownFilled';
import { useGetTeamMembers } from '../../../../features/settings/teamMembers/teamMemberService';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import AvatarWithInitials from '../../../avatar/AvatarWithInitials';
import { AiFillCheckCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import { setAssigneeIds, setFilterFields, setMeMode } from '../../../../features/task/taskSlice';
import { generateFilter } from '../Filter/lib/filterUtils';
import { EllipsisHorizontalIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import AssigneeIcon from '../../../../assets/icons/Assignee';
import { VerticalScroll } from '../../../ScrollableContainer/VerticalScroll';

const unassigned = {
  color: '#626262',
  id: 'ns',
  name: 'Unassigned',
  is_active: false,
  invited_at: '',
  user: {
    color: '#626262',
    name: 'Unassigned',
    id: 'ns',
    email: '',
    initials: 'NA',
    avatar_path: null
  },
  role: {
    key: 'ns',
    name: 'ns'
  },
  initials: 'NA',
  colour: '#626262'
};

export default function FilterByAssigneeModal() {
  const dispatch = useAppDispatch();

  const {
    filters: { fields: filters },
    meMode,
    assigneeIds
  } = useAppSelector((state) => state.task);

  const [searchValue, setSearchValue] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);

  // Rest of the code...
  const { data } = useGetTeamMembers({ page: 1, query: '' });
  const members = data?.data.team_members ?? [];
  const allMembers = [unassigned, ...members];
  // Filter the members based on the search value
  const filteredMembers = allMembers.filter((member) =>
    member.user.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const currentAssignees = !meMode
    ? (filters.find((i) => i.key === 'assignees')?.values as { id: string; value: string }[]) ?? []
    : [];

  const isAssignee = currentAssignees.length ? true : false;

  const onClickMember = (memberId: string, memberName: string) => {
    dispatch(setMeMode(false));
    dispatch(setAssigneeIds([]));
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
    if (assigneeIds.includes(memberId)) {
      dispatch(setAssigneeIds(assigneeIds.filter((id) => id !== memberId)));
    } else {
      dispatch(setAssigneeIds([...assigneeIds, memberId]));
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <Menu as="div" className="relative inline-block text-left group">
      <div className="relative">
        <Menu.Button className="flex items-center">
          <AssigneeIcon active={isAssignee && !meMode} />
          <span>Assignee</span>
          <ArrowDownFilled active={isAssignee && !meMode} />
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
          className="fixed mt-2 overflow-scroll origin-top-right bg-white rounded-md shadow-lg w-72 ring-1 ring-black ring-opacity-5 focus:outline-none"
          style={{ zIndex: 3 }}
        >
          <div className="container px-4 py-2 mx-auto">
            <div className="relative flex items-center w-full text-gray-500">
              <MagnifyingGlassIcon className="w-5 h-5" />
              <input
                onChange={handleSearchChange}
                value={searchValue}
                ref={inputRef}
                type="text"
                className="block w-full h-5 pl-8 border-0 appearance-none alsoit-radius text-alsoit-gray-300-lg ring-0 focus:ring-0 focus:outline-0 text-alsoit-text-lg"
                placeholder="Search Assignee"
              />
              <EllipsisHorizontalIcon className="absolute w-5 h-5 right-4" />
            </div>
          </div>
          <VerticalScroll>
            <div style={{ maxHeight: '340px' }}>
              {filteredMembers.map((member) => (
                <section
                  className="flex items-center justify-between w-full px-4 py-2 text-left text-black cursor-pointer text-alsoit-text-md hover:bg-gray-200"
                  key={member.id}
                  onClick={() => onClickMember(member.id, member.user.name)}
                >
                  <div className="flex items-center space-x-3">
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
            </div>
          </VerticalScroll>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
