import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface ListBoxProps {
  values: string[];
  selected: string | string[];
  setSelected: (i: string) => void;
}

const isString = (i: string | string[]): i is string => typeof i === 'string';

export function ListBox({ values, selected, setSelected }: ListBoxProps) {
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full flex-grow cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left">
          {isString(selected) ? (
            <span className="block truncate">{selected}</span>
          ) : (
            <div className="flex items-center">
              {selected.map((i) => (
                <span key={i} className="block truncate">
                  {i}
                </span>
              ))}
            </div>
          )}

          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
          <Listbox.Options className="absolute left-0 z-10 mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {values.map((value, personIdx) => (
              <Listbox.Option
                key={personIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 w-full whitespace-nowrap ${
                    active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                  }`
                }
                value={value}
              >
                {({ selected }) => (
                  <>
                    <span className={`block whitespace-nowrap ${selected ? 'font-medium' : 'font-normal'}`}>
                      {value}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
