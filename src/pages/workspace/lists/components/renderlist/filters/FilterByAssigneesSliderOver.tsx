import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../../../../app/hooks';
import { Dialog, Transition } from '@headlessui/react';
import { RxDoubleArrowRight } from 'react-icons/rx';
import { setShowFilterByAssigneeSlideOver } from '../../../../../../features/general/slideOver/slideOverSlice';
import AvatarWithInitials from '../../../../../../components/avatar/AvatarWithInitials';
import { AiOutlineCheckCircle } from 'react-icons/ai';

export default function FilterByAssigneesSliderOver() {
  const dispatch = useDispatch();

  const { showFilterByAssigneeSlideOver } = useAppSelector((state) => state.slideOver);
  const onClose = () => dispatch(setShowFilterByAssigneeSlideOver(false));
  return (
    <Transition.Root show={!!showFilterByAssigneeSlideOver} as={Fragment}>
      <Dialog as="div" className="relative z-10 border-2 border-gray-500" onClose={onClose}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0  overflow-hidden">
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
                <Dialog.Panel className="pointer-events-auto w-80 mt-10 border-2 border-gray-200 max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg ">
                          <p className="text-gray-900">Assignees</p>
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white cursor-pointer text-gray-400 hover:text-gray-500 focus:outline-none ring-0 focus:ring-0"
                            onClick={onClose}
                          >
                            <span className="sr-only">Close panel</span>
                            <button className="text-purple-300 text-lg">
                              <RxDoubleArrowRight />
                            </button>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      <input type="text" placeholder="Search" className="w-full" />

                      <section>
                        <div id="header" className="flex justify-between items-center mt-5">
                          <p>Assignees</p>
                          <p>Select all</p>
                        </div>

                        <div className="flex justify-between">
                          <AvatarWithInitials
                            initials={'ND'}
                            textColor={'white'}
                            height="h-8"
                            width="w-8"
                            backgroundColour={'blue'}
                            textSize={'8px'}
                          />
                          <div>
                            <p>Nicholas Diamond</p>
                            <p>3 tasks</p>
                          </div>
                          <button>
                            <AiOutlineCheckCircle />
                          </button>
                        </div>
                      </section>
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
