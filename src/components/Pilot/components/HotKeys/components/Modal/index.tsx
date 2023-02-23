import { Transition, Dialog } from '@headlessui/react';
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/solid';
import React, { Fragment } from 'react';
import { IPilotTab } from '../../../../../../types';
import { cl } from '../../../../../../utils';

interface ModalProps {
  showModal: boolean;
  setShowModal: (i: boolean) => void;
  tabs: IPilotTab[];
  activeHotkeyIds: number[];
  setActiveHotkeyIds: (i: number[]) => void;
}

export function Modal({
  showModal,
  setShowModal,
  tabs,
  activeHotkeyIds,
  setActiveHotkeyIds,
}: ModalProps) {
  const onClose = () => setShowModal(false);

  const handleClick = (tabId: number) => {
    const isIncludes = activeHotkeyIds.includes(tabId);

    setActiveHotkeyIds(
      isIncludes
        ? [...activeHotkeyIds.filter((i) => i !== tabId)]
        : [...activeHotkeyIds, tabId]
    );
  };

  return (
    <Transition.Root show={showModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <div className="fixed top-20 right-3 z-10 overflow-y-auto">
          <div className="flex items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="w-52 relative bg-white p-2 border transform overflow-hidden rounded-lg text-left shadow-xl transition-all">
                {/* header */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>

                {/* hotkeys list */}
                <div className="flex items-start flex-col mt-4">
                  {tabs.map((tab) => (
                    <div
                      onClick={() => handleClick(tab.id)}
                      key={tab.id}
                      className={cl(
                        activeHotkeyIds.includes(tab.id) && 'font-semibold',
                        'relative flex gap-10 text-gray-500 items-center rounded-md justify-between py-1 px-2 hover:bg-gray-100 cursor-pointer w-full'
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={cl(
                            activeHotkeyIds.includes(tab.id) && 'text-black'
                          )}
                        >
                          {tab.icon}
                        </span>
                        <span className="block truncate">{tab.label}</span>
                      </div>

                      {activeHotkeyIds.includes(tab.id) && (
                        <CheckIcon className="h-4 w-4" aria-hidden="true" />
                      )}
                    </div>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
