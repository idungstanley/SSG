import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BiTrash } from 'react-icons/bi';
import { AiOutlineEllipsis } from 'react-icons/ai';
import { HiOutlinePencil } from 'react-icons/hi';
import { BsDroplet } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { displayPrompt, setVisibility } from '../../features/general/prompt/promptSlice';
import { UseDeleteTagsService } from '../../features/workspace/tags/tagService';
import {
  setCurrentTagId,
  setCurrentTaskIdForTag,
  setRenameTagId,
  setShowTagColorDialogBox
} from '../../features/workspace/tags/tagSlice';

interface itemsType {
  id: number;
  title: string;
  icon: JSX.Element;
  handleClick: () => void;
  bg: string;
}

interface EditTagModalProps {
  tagId: string | null;
  taskId: string | null;
}

export default function EditTagModal({ tagId, taskId }: EditTagModalProps) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { showTagColorDialogueBox } = useAppSelector((state) => state.tag);

  const deleteTagMutation = useMutation(UseDeleteTagsService, {
    onSuccess: () => {
      dispatch(setVisibility(false));
      queryClient.invalidateQueries(['task']);
    }
  });
  const EditTagOptions: itemsType[] = [
    {
      id: 1,
      title: 'Delete',
      handleClick: () => {
        dispatch(
          displayPrompt('Delete Tag', 'Would you like delete this tag from the workspace?', [
            {
              label: 'Delete tag',
              style: 'danger',
              callback: () => {
                deleteTagMutation.mutateAsync({
                  trigger: 1,
                  tag_id: tagId
                });
              }
            },
            {
              label: 'Cancel',
              style: 'plain',
              callback: () => {
                dispatch(setVisibility(false));
              }
            }
          ])
        );
      },
      icon: <BiTrash />,
      bg: 'red'
    },
    {
      id: 2,
      title: 'Rename',
      handleClick: () => {
        dispatch(setRenameTagId(tagId));
        dispatch(setCurrentTaskIdForTag(taskId));
      },
      icon: <HiOutlinePencil />,
      bg: 'blue'
    },
    {
      id: 3,
      title: 'Change Color',
      handleClick: () => {
        dispatch(setShowTagColorDialogBox(!showTagColorDialogueBox));
        dispatch(setCurrentTagId(tagId));
      },
      icon: <BsDroplet />,
      bg: 'purple'
    }
  ];

  const [isOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <div className="relative inline-block text-left">
        <button type="button" onClick={openModal} className="flex text-sm font-bold">
          <AiOutlineEllipsis className="cursor-pointer" />
        </button>
      </div>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed -top-24 bottom-72 right-40 -left-40 flex items-center justify-center p-4">
          <Dialog.Panel className="absolute z-20 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none ">
            {EditTagOptions.map((item) => (
              <div key={item.id}>
                <div key={item.id}>
                  <div
                    className={`flex items-center cursor-pointer p-2 space-x-2 text-xs text-left text-gray-600 hover:bg-${item.bg}-200`}
                    onClick={item.handleClick}
                  >
                    {item.icon}
                    <p>{item.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
