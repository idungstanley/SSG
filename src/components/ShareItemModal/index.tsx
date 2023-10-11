import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setShowShareSideOver } from '../../features/general/slideOver/slideOverSlice';
import { cl } from '../../utils';
import ShareItem from './components/ShareItem';
import ShareLink from './components/ShareLink';

const tabs = [
  { name: 'Share selected item', id: 'share_selected_item' },
  { name: 'Create sharing link', id: 'create_sharing_link' }
];

export default function ShareItemModal() {
  const dispatch = useAppDispatch();

  const [selectedTabId, setSelectedTabId] = useState('share_selected_item');

  const { shareSideOver } = useAppSelector((state) => state.slideOver);
  const { type, show } = shareSideOver;
  const onClose = () => {
    dispatch(setShowShareSideOver({ show: false }));
  };

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none ring-0 focus:ring-0"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 mb-3">
                  Share {type}
                </Dialog.Title>

                <div className="w-full h-full flex flex-col items-center gap-3">
                  <nav className="flex space-x-4 w-full" aria-label="Tabs">
                    {tabs.map((tab) => (
                      <span
                        onClick={() => setSelectedTabId((prev) => (prev !== tab.id ? tab.id : prev))}
                        key={tab.name}
                        className={cl(
                          tab.id === selectedTabId
                            ? 'bg-indigo-100 text-indigo-700'
                            : 'text-gray-500 hover:text-gray-700 border',
                          'px-3 py-1.5 font-medium cursor-pointer text-sm rounded-md flex flex-grow justify-center'
                        )}
                        aria-current={tab.id === selectedTabId ? 'page' : undefined}
                      >
                        {tab.name}
                      </span>
                    ))}
                  </nav>

                  {selectedTabId === 'share_selected_item' ? <ShareItem /> : <ShareLink />}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
