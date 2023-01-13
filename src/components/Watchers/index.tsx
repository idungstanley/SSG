import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setShowWatchersSideOver } from '../../features/general/slideOver/slideOverSlice';
import List from './components/List';
import AddNew from './components/AddNew';

export default function Watchers() {
  const dispatch = useAppDispatch();
  const { watchersSideOver } = useAppSelector((state) => state.slideOver);
  const onClose = () => dispatch(setShowWatchersSideOver({ show: false }));

  const item =
    watchersSideOver?.type && watchersSideOver?.id
      ? { type: watchersSideOver.type, id: watchersSideOver.id }
      : null;

  return (
    <Transition.Root show={watchersSideOver.show} as={Fragment}>
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
                          Watchers
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
                      {item ? (
                        <>
                          <AddNew item={item} />
                          <List item={item} />
                        </>
                      ) : null}
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
