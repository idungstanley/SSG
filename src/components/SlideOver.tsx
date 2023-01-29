import React, { Fragment, ReactNode } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Button from './Button';
import { useAppSelector } from '../app/hooks';

interface SlideOverProps {
  show: boolean;
  onClose: () => void;
  body: ReactNode;
  headerTitle: string;
  headerDescription?: string;
  footerButtons?: ReactNode;
}

function SlideOver({
  show,
  onClose,
  headerTitle,
  headerDescription,
  body,
  footerButtons,
}: SlideOverProps) {
  return (
    <Transition.Root show={show} as={Fragment}>
      {onClose ? (
        <Dialog
          as="div"
          className="fixed inset-0 z-40 overflow-hidden"
          onClose={onClose}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-300"
              enterFrom="opacity-100"
              enterTo="opacity-100"
              leave="ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="absolute inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300 sm:duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300 sm:duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="w-screen max-w-2xl">
                  <div className="flex flex-col h-full overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1">
                      {/* Header */}
                      <div className="px-4 py-6 bg-gray-50 sm:px-6">
                        <div className="flex items-start justify-between space-x-3">
                          <div className="space-y-1">
                            <Dialog.Title className="text-lg font-medium text-gray-900">
                              {headerTitle}
                            </Dialog.Title>
                            {headerDescription && (
                              <p className="text-sm text-gray-500">
                                {headerDescription}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center h-7">
                            <button
                              type="button"
                              className="text-gray-400 hover:text-gray-500"
                              onClick={onClose}
                            >
                              <span className="sr-only">Close</span>
                              <XMarkIcon
                                className="w-6 h-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Body */}
                      <div>{body}</div>
                    </div>

                    {/* Footer / Action buttons */}
                    <div className="flex-shrink-0 px-4 py-5 border-t border-gray-200 sm:px-6">
                      <div className="flex justify-end space-x-3">
                        <Button
                          buttonStyle="white"
                          onClick={onClose}
                          loading={false}
                          label="Close"
                          width={20}
                        />
                        {footerButtons}
                      </div>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      ) : null}
    </Transition.Root>
  );
}

export default SlideOver;
