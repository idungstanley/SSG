import React, { Fragment, useRef, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import ArrowDownFilled from '../../../../assets/icons/ArrowDownFilled';
import { useGetTeamMembers } from '../../../../features/settings/teamMembers/teamMemberService';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import AvatarWithInitials from '../../../avatar/AvatarWithInitials';
import { AiFillCheckCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import { setSubtasksFilters } from '../../../../features/task/taskSlice';
import { generateFilter } from '../Filter/lib/filterUtils';
import { EllipsisHorizontalIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import AssigneeIcon from '../../../../assets/icons/Assignee';
import { VerticalScroll } from '../../../ScrollableContainer/VerticalScroll';
import { ASSIGNEES, IAssigneesItem } from './AssigneeSplitSubtasks';

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

interface IFilterByAssigneeModalSplitSubtaskProps {
  isMeMode: boolean;
  parentId: string;
  isSplitSubtasks?: boolean;
}

export default function FilterByAssigneeModalSplitSubtask({
  isMeMode,
  parentId,
  isSplitSubtasks
}: IFilterByAssigneeModalSplitSubtaskProps) {
  const dispatch = useAppDispatch();

  const { subtasksfilters } = useAppSelector((state) => state.task);

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

  const currentAssignees = !isMeMode
    ? (subtasksfilters[parentId]?.fields?.find((i) => i.key === ASSIGNEES)?.values as IAssigneesItem[]) ?? []
    : [];

  const isAssignee = currentAssignees.length ? true : false;

  const clearAssignees = () => {
    return {
      ...subtasksfilters,
      [parentId]: {
        ...subtasksfilters[parentId],
        fields: subtasksfilters[parentId].fields.filter((field) => field.key !== ASSIGNEES)
      }
    };
  };

  const updateAssignees = (assigneesItems: IAssigneesItem[]) => {
    const updatedFields = subtasksfilters[parentId].fields.map((field) => {
      if (field.key === ASSIGNEES) {
        return {
          ...field,
          values: assigneesItems
        };
      }
      return field;
    });
    return {
      ...subtasksfilters,
      [parentId]: {
        ...subtasksfilters[parentId],
        fields: updatedFields
      }
    };
  };

  const createAssigneesFilter = (me: IAssigneesItem) => {
    const hasFields = subtasksfilters[parentId]?.fields;
    const newAssigneesField = generateFilter(ASSIGNEES, { initialValue: me });
    return {
      ...subtasksfilters,
      [parentId]: {
        ...subtasksfilters[parentId],
        fields: hasFields ? [...subtasksfilters[parentId].fields, newAssigneesField] : [newAssigneesField]
      }
    };
  };

  const onClickMember = (memberId: string, memberName: string) => {
    const isAssigneesInFilters = subtasksfilters[parentId]?.fields?.find((i) => i.key === ASSIGNEES);

    const newMemberObj = {
      value: memberName,
      id: memberId
    };

    if (isAssigneesInFilters) {
      const isMemberInAssignees = (isAssigneesInFilters.values as IAssigneesItem[]).map((i) => i.id).includes(memberId);

      // add member or remove if exists
      const newAssignees = isMemberInAssignees
        ? currentAssignees.filter((i) => i.id !== memberId)
        : [...currentAssignees, newMemberObj];

      if (newAssignees.length === 0) {
        // delete assignees filter if no one member
        dispatch(setSubtasksFilters(clearAssignees()));
      } else {
        dispatch(setSubtasksFilters(updateAssignees(newAssignees)));
      }
    } else {
      // create assignees filter
      dispatch(setSubtasksFilters(createAssigneesFilter(newMemberObj)));
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <Menu as="div" className="relative inline-block text-left group">
      <div className="relative">
        <Menu.Button className="flex items-center">
          <AssigneeIcon active={isAssignee && !isMeMode} width={21} height={21} />
          {!isSplitSubtasks ? (
            <>
              <span>Assignee</span>
              <ArrowDownFilled active={isAssignee && !isMeMode} />
            </>
          ) : null}
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
