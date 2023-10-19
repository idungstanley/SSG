import React, { useEffect, useRef, useState } from 'react';
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
import ColorPallete from './ColorsPalets';

interface itemsType {
  id: string;
  title: string;
  icon: JSX.Element;
  handleClick: () => void;
  bg: string;
}

interface EditTagModalProps {
  tagId: string | null | undefined;
  taskId: string | null | undefined;
}

export default function EditTagModal({ tagId, taskId }: EditTagModalProps) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { showTagColorDialogueBox } = useAppSelector((state) => state.tag);
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const buttonElement = buttonRef.current;
    if (buttonElement && isOpen) {
      const buttonRect = buttonElement.getBoundingClientRect();

      // Calculate the top and left positions for the modal
      const top = buttonRect.bottom;
      const left = buttonRect.left;

      // Set the top and left positions for the modal
      const modalElement = document.getElementById('edit-tag-modal');
      if (modalElement) {
        modalElement.style.top = `${top}px`;
        modalElement.style.left = `${left}px`;
      }
    }
  }, [isOpen]);

  const deleteTagMutation = useMutation(UseDeleteTagsService, {
    onSuccess: () => {
      dispatch(setVisibility(false));
      queryClient.invalidateQueries(['task']);
    }
  });
  const EditTagOptions: itemsType[] = [
    {
      id: 'delete',
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
      id: 'rename',
      title: 'Rename',
      handleClick: () => {
        dispatch(setRenameTagId(tagId));
        dispatch(setCurrentTaskIdForTag(taskId));
      },
      icon: <HiOutlinePencil />,
      bg: 'blue'
    },
    {
      id: 'change_color',
      title: 'Change Color',
      handleClick: () => {
        dispatch(setShowTagColorDialogBox(!showTagColorDialogueBox));
        dispatch(setCurrentTagId(tagId));
      },
      icon: <BsDroplet />,
      bg: 'purple'
    }
  ];

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <div className="relative inline-block text-left">
        <button ref={buttonRef} type="button" onClick={openModal} className="flex text-sm font-bold">
          <AiOutlineEllipsis className="cursor-pointer" />
        </button>
      </div>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div
          id="edit-tag-modal"
          className="fixed z-20 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
        >
          {EditTagOptions.map((item) => (
            <div key={item.id}>
              {item.title !== 'Change Color' ? (
                <div className={`p-2 cursor-pointer hover:bg-${item.bg}-200`} onClick={item.handleClick}>
                  <div className="flex items-center space-x-2 text-xs text-gray-600">
                    {item.icon}
                    <p>{item.title}</p>
                  </div>
                </div>
              ) : (
                <div className="w-full">
                  <ColorPallete tag_id={tagId} />
                </div>
              )}
            </div>
          ))}
        </div>
      </Dialog>
    </>
  );
}
