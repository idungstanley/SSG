import { Transition, Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import React, { Fragment, ReactNode } from 'react';

interface ModalProps {
  showModal: boolean;
  setShowModal: (i: boolean) => void;
  children: ReactNode;
  position?: string;
  width?: string;
}

export function Modal({ showModal, setShowModal, position = 'top-20 right-3', children, width = 'w-52' }: ModalProps) {
  const onClose = () => setShowModal(false);

  return (
    <Transition.Root show={showModal} as={Fragment}>
      <Dialog as="div" className="relative" style={{ zIndex: '20000' }} onClose={setShowModal}>
        <div className={`fixed z-10 ${position}`}>
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
              {showModal ? (
                <Dialog.Panel
                  className={`relative p-2 overflow-visible text-left transform bg-white border rounded-lg shadow-xl istransition-all ${width}`}
                >
                  {/* header */}
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={onClose}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>

                  {/* hotkeys list */}
                  {children}
                </Dialog.Panel>
              ) : (
                <></>
              )}
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
