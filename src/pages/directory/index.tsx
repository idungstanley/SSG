import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from '../../common';
import FullScreenMessage from '../../components/CenterMessage/FullScreenMessage';
import { useGetDirectoryTemplates } from '../../features/directory/directoryService';
import { classNames } from '../../utils';
import Sidebar from '../workspace/sidebar/Sidebar';
import CreateDirectorySideOver from './components/SideOvers/CreateDirectorySideOver';

const tabs = [
  {
    id: 1,
    label: 'Directory',
  },
  {
    id: 2,
    label: 'New',
  },
];

function Directory() {
  const { directoryId } = useParams();
  const [activeTabId, setActiveTabId] = useState(1);

  const { data: templates, status } = useGetDirectoryTemplates(directoryId);

  return (
    <>
      <Sidebar />
      <div className="ml-80">
        {/* nav */}
        <div className="border-b border-gray-200 w-full h-full">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <span
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={classNames(
                  tab.id === activeTabId
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                )}
                aria-current={tab.id === activeTabId ? 'page' : undefined}
              >
                {tab.label}
              </span>
            ))}
          </nav>
        </div>

        {/* status checking */}
        {status === 'loading' ? (
          <div className="mx-auto w-6 mt-5 justify-center">
            <Spinner size={8} color="#0F70B7" />
          </div>
        ) : status === 'error' ? (
          <FullScreenMessage
            title="Oops, an error occurred :("
            description="Please try again later."
          />
        ) : null}

        {/* templates list */}
        {templates ? (
          !templates.length ? (
            <FullScreenMessage
              title="No records yet :("
              description="Create one."
            />
          ) : (
            <div className="flex gap-2 items-center">
              {templates.map((template) => (
                <p key={template.id} className="p-2 underline cursor-pointer">
                  {template.name}
                </p>
              ))}
            </div>
          )
        ) : null}
      </div>
      <CreateDirectorySideOver />
    </>
  );
}

export default Directory;
