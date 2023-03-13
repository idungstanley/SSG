import { Transition, Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import React, { Fragment, ReactNode } from 'react';

interface ModalProps {
  showModal: boolean;
  setShowModal: (i: boolean) => void;
  children: ReactNode;
}

export function Modal({ showModal, setShowModal, children }: ModalProps) {
  const onClose = () => setShowModal(false);

  return (
    <Transition.Root show={showModal} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setShowModal}>
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
              {showModal ? (
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
