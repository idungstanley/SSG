import React, { Fragment } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setVisibility } from '../../../features/general/prompt/promptSlice';
import { Dialog, Transition } from '@headlessui/react';
import StatusIconComp from '../../../assets/icons/StatusIconComp';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import SelectDropdown from '../../input/SelectInput';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export interface matchedStatusProps {
  id: string | null;
  name: string;
}

export default function MatchStatusPopUp() {
  const dispatch = useAppDispatch();
  const { show, title, body, options, matchData } = useAppSelector((state) => state.prompt);
  const setShow = (state: boolean) => {
    dispatch(setVisibility(state));
  };

  interface optionsProps {
    label: string | null;
    style: string | null;
    callback: () => void;
  }
  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={setShow}>
        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                <div className="flex-col sm:flex sm:items-center">
                  <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon className="w-6 h-6 text-red-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-center text-gray-900">
                      {title}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-center text-gray-500">{body}</p>
                    </div>
                  </div>
                </div>
              </div>
              {matchData && (
                <div className="flex flex-col gap-2 px-4">
                  {matchData.map((matchItem, index) => (
                    <div key={index} className="px-6">
                      <div className="grid grid-cols-3 gap-8">
                        <span className="flex items-center gap-2">
                          <StatusIconComp color={matchItem.color as string} />
                          <span>{matchItem.name}</span>
                        </span>
                        <span className="flex gap-4 items-center">
                          <p>MOVE TO</p>
                          <HiOutlineArrowNarrowRight />
                        </span>
                        <SelectDropdown options={matchData} index={index} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                {options.map((option: optionsProps) => (
                  <div key={option.label}>
                    {option.style === 'plain' && (
                      <button
                        type="button"
                        className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={option.callback}
                      >
                        {option.label}
                      </button>
                    )}
                    {option.style === 'danger' && (
                      <button
                        type="button"
                        className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={option.callback}
                      >
                        {option.label}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
