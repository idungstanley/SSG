import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from '../../common';
import FullScreenMessage from '../../components/CenterMessage/FullScreenMessage';
import {
  useGetDirectoryTemplate,
  useGetDirectoryTemplates,
} from '../../features/directory/directoryService';
import { classNames } from '../../utils';
import FieldItem from './components/FieldItem';
import CreateDirectorySideOver from './components/SideOvers/CreateDirectorySideOver';
import TemplateItems from './components/TemplateItems';

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

  const [selectedTemplateId, setSelectedTemplateId] = useState<null | string>(
    null
  );

  const { data: templates, status: templatesStatus } =
    useGetDirectoryTemplates(directoryId);

  const { data: template, status: templateStatus } =
    useGetDirectoryTemplate(selectedTemplateId);

  return (
    <>
      <div className="w-full h-full">
        {/* nav */}
        <div className="border-b border-gray-200 w-full">
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

        <div className="flex flex-col items-start py-2 mr-96">
          {/* status checking */}
          {templatesStatus === 'loading' ? (
            <div className="mx-auto w-6 mt-5 justify-center">
              <Spinner size={8} color="#0F70B7" />
            </div>
          ) : templatesStatus === 'error' ? (
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
              <div className="flex gap-3 flex-col">
                {templates.map((template) => (
                  <p
                    onClick={() =>
                      setSelectedTemplateId((prev) =>
                        prev === template.id ? null : template.id
                      )
                    }
                    key={template.id}
                    className={classNames(
                      'border p-2 rounded-xl cursor-pointer text-black border-gray-700 hover:border-black',
                      selectedTemplateId === template.id ? 'bg-indigo-200' : ''
                    )}
                  >
                    {template.name}
                  </p>
                ))}
              </div>
            )
          ) : null}

          {/* template fields list */}
          {selectedTemplateId && templateStatus === 'loading' ? (
            <div className="mx-auto w-6 mt-5 justify-center">
              <Spinner size={8} color="#0F70B7" />
            </div>
          ) : template && selectedTemplateId ? (
            <div className="mt-10 flex flex-col">
              <h3 className="text-lg font-medium uppercase leading-6 text-gray-900 border-b border-gray-200 pb-2">
                {template.name}
              </h3>

              <div className="flex flex-col space-y-4 divide-y divide-gray-200">
                {template.fields.map((field) => (
                  <FieldItem
                    key={field.id}
                    selectedTemplateId={selectedTemplateId}
                    fieldData={field}
                  />
                ))}
                <FieldItem selectedTemplateId={selectedTemplateId} />
              </div>
            </div>
          ) : null}
        </div>

        {selectedTemplateId ? (
          <TemplateItems selectedTemplateId={selectedTemplateId} />
        ) : null}
      </div>

      <CreateDirectorySideOver />
    </>
  );
}

export default Directory;
