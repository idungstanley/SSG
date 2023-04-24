import { Menu, Transition } from '@headlessui/react';
import { ChevronLeftIcon, ChevronRightIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import { Fragment, useMemo, useState } from 'react';
import { cl } from '../../../../../utils';
import { getMonth } from '../../lib/getDaysInYear';
import Month from '../Month';

const members = [
  {
    id: '1',
    user: {
      id: '1',
      name: 'Snanislau'
    },
    daysOff: [
      {
        id: '1',
        start: '2023-04-19',
        end: '2023-04-23',
        type: 'sick leave',
        reason: 'Blah blah blah'
      },
      {
        id: '2',
        start: '2023-04-25',
        end: '2023-04-26',
        type: 'holiday',
        reason: 'Blah blah blah blah'
      }
    ]
  },
  {
    id: '2',
    user: {
      id: '2',
      name: 'John'
    },
    daysOff: [
      {
        id: '1',
        start: '2023-04-28',
        end: '2023-04-29',
        type: 'sick leave',
        reason: 'Blah blah blah'
      },
      {
        id: '2',
        start: '2023-05-01',
        end: '2023-05-01',
        type: 'sick leave',
        reason: 'Blah blah blah'
      }
    ]
  }
];

const activeUserId = '1';

const currentDate = dayjs();

export default function WallchartPage() {
  const [daysOff, setDaysOff] = useState(members);
  const [selectedMonth, setSelectedMonth] = useState(currentDate);
  const month = useMemo(() => getMonth(currentDate.year(), currentDate.month()), []);

  const handleEvent = () => {
    console.log(setDaysOff);
  };

  return (
    <>
      <section className="flex items-center justify-between p-4">
        <div></div>

        {/* action */}
        <div className="hidden md:ml-4 md:flex md:items-center">
          <div className="ml-6 h-6 w-px bg-gray-300" />
          <button
            type="button"
            className="ml-6 rounded-md  bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            Add event
          </button>
        </div>
      </section>

      <>
        {/* <h2 className="text-base font-semibold leading-6 text-gray-900">Team members</h2> */}
        <div className="px-4 grid grid-cols-2">
          <div>
            <div className="grid grid-cols-1 gap-4">
              {members.map((person) => (
                <div
                  key={person.id}
                  className={cl(
                    activeUserId === person.user.id
                      ? 'border-primary-300 bg-primary-50 hover:border-primary-400'
                      : 'border-gray-300 bg-white hover:border-gray-400',
                    'relative flex items-center space-x-3 rounded-lg border px-6 py-5 shadow-sm '
                  )}
                >
                  <div className="flex-shrink-0">
                    <img className="h-10 w-10 rounded-full" alt="image" />
                  </div>
                  <div className="min-w-0 flex-1 focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900">{person.user.name}</p>
                    <p className="truncate text-sm text-gray-500">lorderetik@gmail.com</p>
                  </div>

                  <Menu
                    as="div"
                    className="absolute right-0 top-6 xl:relative xl:right-auto xl:top-auto xl:self-center"
                  >
                    <div>
                      <Menu.Button className="-m-2 flex items-center rounded-full p-2 text-gray-500 hover:text-gray-600">
                        <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={cl(
                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                  'block px-4 py-2 text-sm'
                                )}
                              >
                                Edit
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={cl(
                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                  'block px-4 py-2 text-sm'
                                )}
                              >
                                Cancel
                              </a>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 text-center lg:mt-9 flex flex-col items-center justify-center">
            <div>
              {/* change month */}
              <div className="flex items-center text-gray-900">
                <button
                  onClick={() => setSelectedMonth(selectedMonth.subtract(1, 'month'))}
                  type="button"
                  className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <div className="flex-auto text-sm font-semibold">{selectedMonth.format('MMMM')}</div>
                <button
                  onClick={() => setSelectedMonth(selectedMonth.add(1, 'month'))}
                  type="button"
                  className={cl(
                    currentDate.isSame(selectedMonth, 'month')
                      ? 'text-primary-400 hover:text-primary-500'
                      : 'text-gray-400 hover:text-gray-500',
                    '-m-1.5 flex flex-none items-center justify-center p-1.5'
                  )}
                >
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <Month daysOff={daysOff} handleEvent={handleEvent} month={month} />

              <button
                type="button"
                className="mt-8 w-full rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                Add event
              </button>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
