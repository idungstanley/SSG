import React from 'react';
import { RadioGroup } from '@headlessui/react';
import { cl } from '../../utils';

interface RadioGroupInPanelProps {
  selectedKey: string;
  options: { name: string; description: string; key: string | null }[];
  setSelected: (i: string) => void;
}

function RadioGroupInPanel({ options, selectedKey, setSelected }: RadioGroupInPanelProps) {
  return (
    <RadioGroup value={selectedKey} onChange={setSelected}>
      <div className="bg-white rounded-md -space-y-px">
        {options.map((option, optionIndex) => (
          <RadioGroup.Option
            key={option.key}
            value={option.key}
            className={({ checked }) =>
              cl(
                optionIndex === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                optionIndex === options.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
                checked ? 'bg-primary-50 border-primary-200 z-10' : 'border-gray-200',
                'relative border p-4 flex cursor-pointer focus:outline-none'
              )
            }
          >
            {({ active, checked }) => (
              <>
                <span
                  className={cl(
                    checked ? 'bg-primary-600 border-transparent' : 'bg-white border-gray-300',
                    active ? 'ring-2 ring-offset-2 ring-primary-500' : '',
                    'h-4 w-4 mt-0.5 cursor-pointer shrink-0 rounded-full border flex items-center justify-center'
                  )}
                  aria-hidden="true"
                >
                  <span className="rounded-full bg-white w-1.5 h-1.5" />
                </span>
                <span className="ml-3 flex flex-col">
                  <RadioGroup.Label
                    as="span"
                    className={cl(checked ? 'text-primary-900' : 'text-gray-900', 'block text-sm font-medium')}
                  >
                    {option.name}
                  </RadioGroup.Label>
                  <RadioGroup.Description
                    as="span"
                    className={cl(checked ? 'text-primary-700' : 'text-gray-500', 'block text-sm')}
                  >
                    {option.description}
                  </RadioGroup.Description>
                </span>
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}

export default RadioGroupInPanel;
