import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { classNames } from '../../utils';
import { useGetTeamMembers } from '../../features/settings/teamMembers/teamMemberService';
import AvatarWithInitials from '../avatar/AvatarWithInitials';
import { AiOutlineUserAdd } from 'react-icons/ai';
import {
  UseAssignTaskService,
  getOneTaskServices,
} from '../../features/task/taskService';
import { useAppSelector } from '../../app/hooks';
import { TrashIcon } from '@heroicons/react/24/outline';
import { setCurrTeamMemId } from '../../features/task/taskSlice';
import { useDispatch } from 'react-redux';

export default function AssignModal() {
  const dispatch = useDispatch();
  const { data } = useGetTeamMembers({
    page: 0,
    query: '',
  });

  const { toggleAssignCurrentTaskId, currTeamMemberId } = useAppSelector(
    (state) => state.task
  );

  console.log(toggleAssignCurrentTaskId);

  UseAssignTaskService({
    task_id: toggleAssignCurrentTaskId,
    team_member_id: currTeamMemberId,
  });

  const { data: getTaskAssignees } = getOneTaskServices({
    task_id: toggleAssignCurrentTaskId,
  });

  const assignedUser = getTaskAssignees?.data.task.assignees.map(
    ({ id }: { id: string }) => id
  );

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex text-sm text-gray-400">
          <AiOutlineUserAdd className="text-sm" />
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
        // show={sidebarSettings}
      >
        <Menu.Items className="origin-top-right absolute z-20 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none ">
          <div className="h-52 overflow-auto">
            {data?.data.team_members.map((i) => (
              <Menu.Item key={i.id}>
                {({ active }) => (
                  <button
                    type="button"
                    className={classNames(
                      active ? 'bg-gray-200' : '',
                      'flex items-center px-4 py-2 text-sm text-gray-600 text-left space-x-2 w-full'
                    )}
                  >
                    <div
                      className="relative flex items-center cursor-pointer  space-x-2"
                      onClick={() => dispatch(setCurrTeamMemId(i.id))}
                    >
                      <AvatarWithInitials
                        initials={i.initials}
                        backgroundColour={i.colour}
                        height="h-5"
                        width="w-5"
                      />
                      <p className="text-xs">
                        {i.user.name.toLocaleUpperCase()}
                      </p>
                      {assignedUser?.includes(i.id) ? (
                        <button
                          type="button"
                          // onClick={() => handleUnAssign(i.id)}
                        >
                          <TrashIcon className="h-4 w-4 text-gray-500 cursor-pointer" />
                        </button>
                      ) : null}
                    </div>
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
