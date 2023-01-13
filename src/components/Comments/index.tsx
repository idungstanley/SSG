import React, { Fragment, useState } from 'react';
import {
  useCreateItemComment,
  useDeleteItemComment,
  useEditItemComment,
  useGetItemComments,
} from '../../features/general/commentsService';
import Form from './components/Form';
import List from './components/List';
import Dropdown from './components/Dropdown';
import { selectedUserType } from './components/componentType';
import { mentionTeamMemberInMessageReg } from '../../regex';
import { Dialog, Transition } from '@headlessui/react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setShowCommentsSideOver } from '../../features/general/slideOver/slideOverSlice';
import { XIcon } from '@heroicons/react/outline';

export default function Comments() {
  const { commentsSideOver } = useAppSelector((state) => state.slideOver);
  const dispatch = useAppDispatch();
  const { type, id, show } = commentsSideOver;

  const [message, setMessage] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<selectedUserType[]>([]);
  const onClose = () => dispatch(setShowCommentsSideOver({ show: false }));

  const [editId, setEditId] = useState<null | string>(null);

  const { mutate: sendComment } = useCreateItemComment(id);
  const { mutate: editComment } = useEditItemComment(id);
  const { mutate: deleteComment } = useDeleteItemComment(id);

  const { status, data } = useGetItemComments({
    type,
    id,
  });

  const handleSubmit = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (message.length > 2) {
      if (editId) {
        editComment({
          id: editId,
          message,
        });
        setEditId(null);
      } else {
        const messageWithUserIds = `${message} ${selectedUsers.map(
          (user) => `@[${user.id}] `
        )}`;

        sendComment({
          message: messageWithUserIds,
          type: type || 'file',
          id: id || '',
        });
      }
      setMessage('');
      setSelectedUsers([]);
    }
  };

  const onDelete = (id: string) => {
    deleteComment({
      id,
    });
  };

  const onEdit = (id: string, value: string, user: selectedUserType[]) => {
    setMessage(value.replaceAll(mentionTeamMemberInMessageReg, ''));
    setEditId(id);
    setSelectedUsers([...user]);
  };

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <div className="absolute inset-0 top-20" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 top-20 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-2 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Comments
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none ring-0 focus:ring-0"
                            onClick={onClose}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex flex-col gap-6 px-4 sm:px-6 h-full">
                      <Form
                        setMessage={setMessage}
                        handleSubmit={handleSubmit}
                        message={message}
                        setShowDropdown={setShowDropdown}
                      />
                      <Dropdown
                        show={showDropdown}
                        setShowDropdown={setShowDropdown}
                        setSelectedUsers={setSelectedUsers}
                        selectedUsers={selectedUsers}
                      />
                      <List
                        status={status}
                        comments={data}
                        onEdit={onEdit}
                        onDelete={onDelete}
                      />
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
