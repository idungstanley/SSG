import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { PropTypes } from 'prop-types';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function SelectMenuTeamMembers({
  teamMembers,
  selectedData,
  setSelectedData,
  title,
}) {
  if (!teamMembers.length) {
    return null;
  }

  return (
    <Listbox value={selectedData} onChange={setSelectedData}>
      {({ open }) => (
        <div>
          <Listbox.Label className="block text-sm font-medium text-gray-700">
            {title}
          </Listbox.Label>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
              <span className="block truncate h-5">
                {selectedData ? selectedData.name : null}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
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
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {teamMembers.map((person) => (
                  <Listbox.Option
                    key={person.id}
                    className={({ active }) => classNames(
                      active ? 'text-white bg-indigo-600' : 'text-gray-900',
                      'relative cursor-default select-none py-2 pl-3 pr-9',
                    )}
                    value={person}
                  >
                    {({ selectedId }) => (
                      <span
                        className={classNames(
                          selectedId ? 'font-semibold' : 'font-normal',
                          'block truncate',
                        )}
                      >
                        {person.name}
                      </span>
                    )}
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

SelectMenuTeamMembers.defaultProps = {
  selectedData: null,
};

SelectMenuTeamMembers.propTypes = {
  teamMembers: PropTypes.array.isRequired,
  selectedData: PropTypes.object,
  title: PropTypes.string.isRequired,
  setSelectedData: PropTypes.func.isRequired,
};
