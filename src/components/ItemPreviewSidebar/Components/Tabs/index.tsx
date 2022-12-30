import React, { Fragment } from 'react';
// eslint-disable-next-line no-unused-vars
import {
  UserGroupIcon,
  LockClosedIcon,
  ClockIcon,
} from '@heroicons/react/outline';
import { Tab } from '@headlessui/react';
import People from './People';
import Activity from './Activity';
import { classNames } from "../../../../utils";

interface tabsType {
  key: string
  name: string
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  current: boolean
}

const tabs: tabsType[] = [
  {
    key: 'people',
    name: 'People',
    icon: UserGroupIcon,
    current: true,
  },
  {
    key: 'permissions',
    name: 'Permissions',
    icon: LockClosedIcon,
    current: false,
  },
  {
    key: 'activity',
    name: 'Activity',
    icon: ClockIcon,
    current: false,
  },
];

function Tabs() {
  return (
    <div className="flex-1 h-full">
      <div className="relative h-full">
        <div className="absolute inset-0 flex-col w-full h-full overflow-hidden">
          <div className="flex-1 h-full">
            <div className="sm:hidden">
              <label htmlFor="tabs" className="sr-only">
                Select a tab
              </label>
              {/* Use an 'onChange' listener to redirect the user to the selected tab URL. */}
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
            <div className="hidden w-full h-full sm:block">
              <Tab.Group as="div" className="flex flex-col w-full h-full">
                <Tab.List
                  as="nav"
                  className="flex w-full space-x-8 border-b border-gray-200"
                >
                  {tabs.map((tab) => (
                    <Tab key={tab.name}>
                      {({ selected }) => (
                        <div
                          className={classNames(
                            selected
                              ? 'border-indigo-500 text-indigo-600'
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                            'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm',
                          )}
                        >
                          <tab.icon
                            className={classNames(
                              selected
                                ? 'text-indigo-500'
                                : 'text-gray-400 group-hover:text-gray-500',
                              '-ml-0.5 mr-2 h-5 w-5',
                            )}
                            aria-hidden="true"
                          />
                          <span>{tab.name}</span>
                        </div>
                      )}
                    </Tab>
                  ))}
                </Tab.List>

                <div className="flex-1 h-full">
                  <Tab.Panels as={Fragment}>
                    <Tab.Panel className="h-full">
                      <People />
                    </Tab.Panel>

                    <Tab.Panel className="h-full">
                      <p>Permissions</p>
                    </Tab.Panel>

                    <Tab.Panel className="h-full">
                      <Activity />
                    </Tab.Panel>
                  </Tab.Panels>
                </div>
              </Tab.Group>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tabs;
