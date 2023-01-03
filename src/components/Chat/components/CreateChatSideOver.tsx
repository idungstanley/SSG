import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import Input from '../../input/Input';
import { useAppSelector } from '../../../app/hooks';
import { useCreateChat } from '../../../features/chat/chatService';

interface CreateChatSideOverProps {
  showSideOver: boolean;
  setShowSideOver: (i: boolean) => void;
}

export default function CreateChatSideOver({
  showSideOver,
  setShowSideOver,
}: CreateChatSideOverProps) {
  const [name, setName] = useState('');
  const { selectedItemId, selectedItemType } = useAppSelector(
    (state) => state.explorer
  );

  const { mutate: onCreate } = useCreateChat(selectedItemId);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedItemId && selectedItemType) {
      onCreate({
        id: selectedItemId,
        type: selectedItemType,
        name,
      });
    }

    setShowSideOver(false);
    setName('');
  };

  return (
    <Transition.Root show={showSideOver} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setShowSideOver}>
        <div className="fixed inset-0" />

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
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Panel title
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() => setShowSideOver(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      {/* Replace with your content */}
                      <form
                        onSubmit={(e) => handleSubmit(e)}
                        className="absolute inset-0 px-4 sm:px-6 flex flex-col gap-5"
                      >
                        {/* <div
                          className="h-full border-2 border-dashed border-gray-200"
                          aria-hidden="true"
                        /> */}
                        <Input
                          name="name"
                          value={name}
                          placeholder="enter chat name:"
                          onChange={(e) => setName(e.target.value)}
                        />
                        <button
                          type="submit"
                          className="inline-flex w-full items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Create
                        </button>
                      </form>
                      {/* /End replace */}
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
