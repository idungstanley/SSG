import React, { useRef, useState } from 'react';
import { Menu as HeadMenu } from '@headlessui/react';
import { useGetTeamMembers } from '../../../../features/settings/teamMembers/teamMemberService';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import AvatarWithInitials from '../../../avatar/AvatarWithInitials';
import { AiFillCheckCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import { setAssigneeIds, setFilterFields, setMeMode } from '../../../../features/task/taskSlice';
import { generateFilter } from '../Filter/lib/filterUtils';
import { EllipsisHorizontalIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import AssigneeIcon from '../../../../assets/icons/Assignee';
import { VerticalScroll } from '../../../ScrollableContainer/VerticalScroll';
import AvatarWithImage from '../../../avatar/AvatarWithImage';
import { Menu } from '@mui/material';
import ArrowDrop from '../../../../assets/icons/ArrowDrop';

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
  const [dropdownEl, setDropdownEl] = useState<null | HTMLElement>(null);

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
    <>
      <div
        className="flex items-center justify-center viewSettingsParent"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => setDropdownEl(e.currentTarget)}
      >
        <HeadMenu>
          <HeadMenu.Button className="flex items-center">
            <AssigneeIcon active={isAssignee && !meMode} width={20} />
            <span>Assignee</span>
            <ArrowDrop color={isAssignee && !meMode ? '#BF01FE' : '#424242'} />
          </HeadMenu.Button>
        </HeadMenu>
      </div>

      <Menu anchorEl={dropdownEl} open={!!dropdownEl} onClose={() => setDropdownEl(null)} style={{ marginTop: '10px' }}>
        <div className="w-72" key="filterByAssignModal">
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
                    {member.user.avatar_path ? (
                      <AvatarWithImage image_path={member.user.avatar_path} height="h-8" width="w-8" />
                    ) : (
                      <AvatarWithInitials
                        initials={member.user.initials}
                        textColor={'white'}
                        height="h-8"
                        width="w-8"
                        backgroundColour={member.user.color}
                        textSize={'8px'}
                      />
                    )}

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
        </div>
      </Menu>
    </>
  );
}
