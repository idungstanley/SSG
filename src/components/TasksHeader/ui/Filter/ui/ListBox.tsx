import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { isString } from '../../../../../utils/typeGuards';
import { cl } from '../../../../../utils';

type Selected = string | string[] | 'none';

interface ListBoxProps {
  values: string[];
  selected: Selected;
  setSelected: (i: string) => void;
}

export function ListBox({ values, selected, setSelected }: ListBoxProps) {
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative">
        <Listbox.Button className="whitespace-nowrap capitalize relative w-full flex-grow cursor-pointer border shadow-sm rounded-lg bg-white py-2 pl-3 pr-10 text-left">
          {/* value */}
          <SelectedValue selected={selected} />

          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
          <Listbox.Options className="absolute left-0 z-10 mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {values.map((value, index) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  cl(
                    'relative cursor-default select-none py-2 pl-10 pr-4 w-full whitespace-nowrap',
                    active ? 'bg-primary-100 text-primary-900' : 'text-gray-900'
                  )
                }
                value={value}
              >
                <>
                  <span
                    className={cl(
                      'block whitespace-nowrap capitalize',
                      selected.includes(value) ? 'font-medium' : 'font-normal'
                    )}
                  >
                    {value}
                  </span>
                  {selected.includes(value) ? (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600">
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  ) : null}
                </>
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

const SELECT_KEY = 'Select filter';
const SELECT_OPTION = 'Select option';

function SelectedValue({ selected }: { selected: Selected }) {
  return (
    <>
      {isString(selected) ? (
        <span className="block">{selected === 'none' ? SELECT_KEY : selected}</span>
      ) : (
        <div className="flex items-center space-x-2">
          {selected.length === 0 ? (
            <p>{SELECT_OPTION}</p>
          ) : (
            selected.map((i) => (
              <span key={i} className="block">
                {i}
              </span>
            ))
          )}
        </div>
      )}
    </>
  );
}
