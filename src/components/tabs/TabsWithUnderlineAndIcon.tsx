import React from 'react';
import {
  CreditCardIcon, OfficeBuildingIcon, UserIcon, UsersIcon,
} from '@heroicons/react/solid';
import { classNames } from "../../utils";



interface tabArrayType {
  name: string
  href: string
  current: boolean
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}

const tabs: tabArrayType[] = [
  {
    name: 'My Account', href: '#', icon: UserIcon, current: false,
  },
  {
    name: 'Company', href: '#', icon: OfficeBuildingIcon, current: false,
  },
  {
    name: 'Team Members', href: '#', icon: UsersIcon, current: true,
  },
  {
    name: 'Billing', href: '#', icon: CreditCardIcon, current: false,
  },
];

export default function Example() {
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          defaultValue={tabs?.find((tab) => tab?.current)?.name}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <a
                key={tab.name}
                href={tab.href}
                className={classNames(
                  tab.current
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm',
                )}
                aria-current={tab.current ? 'page' : undefined}
              >
                <tab.icon
                  className={classNames(
                    tab.current ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500',
                    '-ml-0.5 mr-2 h-5 w-5',
                  )}
                  aria-hidden="true"
                />
                <span>{tab.name}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
