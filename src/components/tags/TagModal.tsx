import React, { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { AiOutlineTags, AiOutlineEllipsis } from 'react-icons/ai';
import { UseGetAllTagsService } from '../../features/workspace/workspaceService';
import { Spinner } from '../../common';
import CreateTag from './CreateTag';
import { useAppSelector } from '../../app/hooks';
import {
  UseAssignTagToTask,
  UseUnAssignTagFromTask,
} from '../../features/task/taskService';

export default function TagModal() {
  const [tagId, setTagId] = useState(null);
  const { currentTaskIdForTag, unAssignTadId } = useAppSelector(
    (state) => state.task
  );
  //get all tags
  const { data, status } = UseGetAllTagsService();

  const tagList = data?.data.tags;

  if (status == 'loading') {
    <Spinner size={10} color={'blue'} />;
  }

  const { data: assignTag } = UseAssignTagToTask({
    tagId,
    currentTaskIdForTag,
  });

  const { data: unAssignTag } = UseUnAssignTagFromTask({
    tagId: unAssignTadId,
    currentTaskIdForTag,
  });

  return status == 'success' ? (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex text-sm text-gray-400">
          <AiOutlineTags className="cursor-pointer" />
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
        <Menu.Items className="origin-top-right absolute z-20 mt-2 w-52 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
          <div>
            <CreateTag />
          </div>
          <div className="h-52 overflow-auto ">
            {tagList.map((tags) => (
              <Menu.Item key={tags.id}>
                {({ active }) => (
                  <div className="flex items-center hover:bg-gray-300 text-gray-600">
                    <button
                      type="button"
                      className="flex items-center px-4 py-2 text-sm  text-left space-x-2 w-11/12"
                      onClick={() => setTagId(tags.id)}
                    >
                      <p>{tags.name}</p>
                    </button>
                    <button>
                      <AiOutlineEllipsis className="text-sm" />
                    </button>
                  </div>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  ) : null;
}