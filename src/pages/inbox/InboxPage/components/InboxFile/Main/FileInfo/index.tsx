import { Fragment } from 'react';
import { EyeIcon, InformationCircleIcon, ClockIcon, ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline';
import { Tab } from '@headlessui/react';
import Preview from './Preview';
import Details from './Details';
import Activity from './Activity';
import Comments from '../../../../../../../components/Comments/CommentsForPilot';
import { cl } from '../../../../../../../utils';
import { useAppSelector } from '../../../../../../../app/hooks';

const tabs = [
  {
    key: 'preview',
    name: 'Preview',
    icon: EyeIcon,
    current: true
  },
  {
    key: 'file-details',
    name: 'File details',
    icon: InformationCircleIcon,
    current: false
  },
  {
    key: 'activity',
    name: 'Activity',
    icon: ClockIcon,
    current: false
  },
  {
    key: 'comments',
    name: 'Comments',
    icon: ChatBubbleBottomCenterIcon,
    current: false
  }
];

function FileInfo() {
  const { selectedInboxFileId } = useAppSelector((state) => state.inbox);

  return (
    <div className="h-full flex-1">
      <div className="relative h-full">
        <div className="absolute inset-0 h-full w-full overflow-hidden flex-col">
          <div className="h-full flex-1">
            <div className="sm:hidden">
              <label htmlFor="tabs" className="sr-only">
                Select a tab
              </label>
              {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
              <select
                id="tabs"
                name="tabs"
                className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                defaultValue={tabs.find((tab) => tab.current)?.name}
              >
                {tabs.map((tab) => (
                  <option key={tab.name}>{tab.name}</option>
                ))}
              </select>
            </div>
            <div className="hidden sm:block h-full w-full">
              <Tab.Group as="div" className="h-full w-full flex flex-col">
                <Tab.List as="nav" className="flex space-x-8 px-6 border-b border-gray-200 w-full">
                  {tabs.map((tab) => (
                    <Tab key={tab.name}>
                      {({ selected }) => (
                        <div
                          className={cl(
                            selected
                              ? 'border-indigo-500 text-indigo-600'
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                            'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm'
                          )}
                        >
                          <tab.icon
                            className={cl(
                              selected ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500',
                              '-ml-0.5 mr-2 h-5 w-5'
                            )}
                            aria-hidden="true"
                          />
                          <span>{tab.name}</span>
                        </div>
                      )}
                    </Tab>
                  ))}
                </Tab.List>

                <div className="h-full flex-1">
                  <Tab.Panels as={Fragment}>
                    <Tab.Panel className="h-full">
                      <Preview />
                    </Tab.Panel>

                    <Tab.Panel className="h-full">
                      <Details />
                    </Tab.Panel>

                    <Tab.Panel className="h-full">
                      <Activity />
                    </Tab.Panel>

                    <Tab.Panel className="h-full p-4">{selectedInboxFileId ? <Comments /> : null}</Tab.Panel>
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

export default FileInfo;
