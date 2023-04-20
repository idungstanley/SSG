import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Dayjs } from 'dayjs';
import { Fragment, useRef, useState } from 'react';
import SelectTypeListbox from './SelectTypeListbox';

interface CreateEventModal {
  show: boolean;
  setShow: VoidFunction;
  dayOff: { start: Dayjs; end: Dayjs } | null;
  onSubmit: ({ type, reason }: { type: { id: number; title: string }; reason: string }) => void;
}

const types = [
  {
    id: 1,
    title: 'Holiday'
  },
  {
    id: 2,
    title: 'Sick day'
  }
];

export default function CreateEventModal({ show, setShow, dayOff, onSubmit }: CreateEventModal) {
  const [type, setType] = useState(types[0]);
  const reasonRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (reasonRef.current) {
      const reason = reasonRef.current.value;
      onSubmit({ type, reason });

      setType(types[0]);
    }
  };

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setShow}>
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
              <Dialog.Panel
                as="form"
                onSubmit={handleSubmit}
                className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
              >
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={setShow}
                  >
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="sm:flex sm:items-start w-full">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      Book time off
                    </Dialog.Title>

                    {/* main */}
                    <div className="mt-2 p-2 w-full space-y-5">
                      {dayOff ? (
                        <div className="flex w-full justify-between items-center">
                          <p>
                            Starting{' '}
                            <span className="border rounded-md p-2 ml-2">{dayOff.start.format('DD.MM.YYYY')}</span>
                          </p>
                          <p>
                            Ending <span className="border rounded-md p-2 ml-2">{dayOff.end.format('DD MM YYYY')}</span>{' '}
                          </p>
                        </div>
                      ) : null}

                      <SelectTypeListbox setSelected={setType} value={type} values={types} />

                      <div>
                        <label htmlFor="reason" className="block text-sm font-medium leading-6 text-gray-900">
                          Reason
                        </label>
                        <div className="mt-1">
                          <input
                            required
                            min={2}
                            ref={reasonRef}
                            type="text"
                            id="reason"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Reason for time off..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* bottom actions */}
                <div className="mt-5 sm:mt-4 sm:flex gap-4 items-center">
                  <button
                    type="submit"
                    className="inline-flex left-0 border w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-gray-600 shadow-sm sm:ml-3 sm:w-auto"
                  >
                    Send request
                  </button>
                  {dayOff ? <p>Takes {dayOff.end.diff(dayOff.start, 'day') || 1} days from allowance</p> : null}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
