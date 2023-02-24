import React, { Fragment, ReactNode } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Dialog, Transition } from '@headlessui/react';
import { cl } from '../../utils';

interface SideOverProps {
  show: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  disableGapForChildren?: boolean;
}

export default function SideOver({
  show,
  onClose,
  title,
  children,
  disableGapForChildren = false,
}: SideOverProps) {
  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as="div"
        className="relative"
        style={{ zIndex: 101 }}
        onClose={onClose}
      >
        <div className="absolute inset-0" />

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
                  <div className="flex h-full pl-1.5 w-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="px-2 sm:px-3">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          {title}
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none ring-0 focus:ring-0"
                            onClick={onClose}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      className={cl(
                        'relative my-6 flex flex-col px-3 sm:px-3 h-full',
                        disableGapForChildren ? '' : 'gap-6'
                      )}
                    >
                      {children}
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
