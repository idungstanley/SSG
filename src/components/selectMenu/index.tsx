import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { classNames } from '../../utils';

export interface ISelectedData {
  id: string;
  name: string;
  email?: string;
  accessLevel: string;
  type: 'member' | 'member-group';
}

interface SelectMenuTeamMembersProps {
  teamMembers: ISelectedData[];
  selectedData: ISelectedData | null;
  setSelectedData: (value: ISelectedData | null) => void;
  title: string;
  showEmail?: boolean;
}

export default function SelectMenuTeamMembers({
  teamMembers,
  selectedData,
  setSelectedData,
  title,
  showEmail,
}: SelectMenuTeamMembersProps) {
  if (!teamMembers.length) {
    return null;
  }

  return (
    <Listbox value={selectedData} onChange={(e) => setSelectedData(e)}>
      {({ open }) => (
        <div className="w-full">
          <Listbox.Label className="block text-sm font-medium text-gray-700">
            {title}
          </Listbox.Label>
          <div className="relative mt-1">
            <Listbox.Button className="relative z-10 w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-default focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
              <span className="block h-5 truncate">
                {selectedData ? selectedData.name : null}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                  />
                </svg>
              </span>
            </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {teamMembers.map((person) => (
                  <Listbox.Option
                    key={person.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'relative group cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={person}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-normal truncate">
                        {person.name}
                      </span>
                      {showEmail ? (
                        <span className="ml-2 group-hover:text-white truncate text-sm text-gray-500">
                          {person.email}
                        </span>
                      ) : null}
                    </div>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  );
}
