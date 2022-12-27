import React, { Fragment, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import Button from './Button';

interface SlideOverProps {
  show: boolean
  onClose: () => void;
  body: ReactNode,
  headerTitle: string,
  headerDescription?: string,
  footerButtons?: ReactNode,
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
      {onClose ? <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden z-40"
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
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16">
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
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
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
                        <div className="h-7 flex items-center">
                          <button
                            type="button"
                            className="text-gray-400 hover:text-gray-500"

                            onClick={onClose}
                          >
                            <span className="sr-only">Close</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Body */}
                    <div>{body}</div>
                  </div>

                  {/* Footer / Action buttons */}
                  <div className="flex-shrink-0 px-4 border-t border-gray-200 py-5 sm:px-6">
                    <div className="space-x-3 flex justify-end">
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
      </Dialog> : null}
    </Transition.Root>
  );
}

SlideOver.defaultProps = {
  onClose: null,
  headerDescription: null,
  footerButtons: null,
};

SlideOver.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  body: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  headerTitle: PropTypes.string.isRequired,
  headerDescription: PropTypes.string,
  footerButtons: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default SlideOver;
