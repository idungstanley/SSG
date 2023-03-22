import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { AiOutlineTags } from 'react-icons/ai';
import { UseAssignTagService, UseGetAllTagsService } from '../../features/workspace/tags/tagService';
import { Spinner } from '../../common';
import CreateTag from './CreateTag';
import { dataProps } from '../Index/walletIndex/WalletIndex';
import { useAppSelector } from '../../app/hooks';
// import EditTagModal from "./EditTagModal";
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function TagModal() {
  const queryClient = useQueryClient();

  const { currentTaskIdForTag } = useAppSelector((state) => state.tag);
  //get all tags
  const { data: tagsData, status } = UseGetAllTagsService();

  if (status == 'loading') {
    <Spinner size={10} color={'blue'} />;
  }

  const assignTagMutation = useMutation(UseAssignTagService, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  });

  const handleAssignTag = async (tagId: string) => {
    await assignTagMutation.mutateAsync({
      tagId,
      currentTaskIdForTag
    });
  };

  return status == 'success' ? (
    <Menu as="div" className="group relative inline-block text-left">
      <div>
        <Menu.Button className="flex text-sm text-gray-400">
          <span className="cursor-pointer bg-white  border rounded flex justify-center align-center p-0.5 opacity-0 group-hover:opacity-100">
            <AiOutlineTags className="w-3  text-gray-500 " />
          </span>
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
            {tagsData?.data.tags.map((tags: dataProps) => (
              <Menu.Item key={tags.id}>
                {() => (
                  <div className="flex items-center hover:bg-gray-300 text-gray-600">
                    <button
                      type="button"
                      className="flex items-center px-4 py-2 text-sm  text-left space-x-2 w-11/12"
                      onClick={() => handleAssignTag(tags.id)}
                    >
                      <p>{tags.name}</p>
                    </button>
                    {/* <button onClick={() => <EditTagModal tagId={tags.id} />}>
                      <AiOutlineEllipsis className="text-sm" />
                    </button> */}
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
