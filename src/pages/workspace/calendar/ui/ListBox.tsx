import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';
import { cl } from '../../../../utils';

type Value = { id: string; title: string };

interface SelectTypeListboxProps<T> {
  value: T;
  values: T[];
  setSelected: (i: T) => void;
  title: string;
}

export default function ListBox<T extends Value>({ value, setSelected, values, title }: SelectTypeListboxProps<T>) {
  return (
    <Listbox value={value} onChange={setSelected}>
      {({ open }) => (
        <div>
          <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">{title}</Listbox.Label>
          <div className="relative mt-1">
            <Listbox.Button className="relative cursor-pointer w-full rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-600 sm:text-sm sm:leading-6">
              <span className="block truncate">{value.title}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
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
                {values.map((i) => (
                  <Listbox.Option
                    key={i.id}
                    className={({ active }) =>
                      cl(
                        active ? 'bg-primary-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={i}
                  >
                    {({ active }) => (
                      <>
                        <span className={cl(value ? 'font-semibold' : 'font-normal', 'block truncate')}>{i.title}</span>

                        {value === i ? (
                          <span
                            className={cl(
                              active ? 'text-white' : 'text-primary-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
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
        </div>
      )}
    </Listbox>
  );
}
