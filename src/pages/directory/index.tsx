import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from '../../common';
import FullScreenMessage from '../../components/CenterMessage/FullScreenMessage';
import PageWrapper from '../../components/PageWrapper';
import {
  useGetDirectoryTemplate,
  useGetDirectoryTemplates,
} from '../../features/directory/directoryService';
import { cl } from '../../utils';
import FieldItem from './components/FieldItem';
import PilotSection, { pilotConfig } from './components/PilotSection';
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
      <PilotSection templateId={selectedTemplateId} />
      <PageWrapper
        pilotConfig={pilotConfig}
        header={
          <div className="w-full border-b border-gray-200">
            <nav className="flex -mb-px space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <span
                  key={tab.id}
                  onClick={() => setActiveTabId(tab.id)}
                  className={cl(
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
        }
        additional={
          <>
            <CreateDirectorySideOver />
          </>
        }
      >
        <div className="flex flex-col items-start w-full h-full py-2">
          {/* status checking */}
          {templatesStatus === 'loading' ? (
            <div className="justify-center w-6 mx-auto mt-5">
              <Spinner size={8} color="#0F70B7" />
            </div>
          ) : templatesStatus === 'error' ? (
            <div className="w-full h-full">
              <FullScreenMessage
                title="Oops, an error occurred :("
                description="Please try again later."
              />
            </div>
          ) : null}

          {/* templates list */}
          {templates ? (
            !templates.length ? (
              <div className="w-full h-full">
                <FullScreenMessage
                  title="No records yet :("
                  description="Create one."
                />
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {templates.map((template) => (
                  <p
                    onClick={() =>
                      setSelectedTemplateId((prev) =>
                        prev === template.id ? null : template.id
                      )
                    }
                    key={template.id}
                    className={cl(
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
            <div className="justify-center w-6 mx-auto mt-5">
              <Spinner size={8} color="#0F70B7" />
            </div>
          ) : template && selectedTemplateId ? (
            <div className="flex flex-col mt-10">
              <h3 className="pb-2 text-lg font-medium leading-6 text-gray-900 uppercase border-b border-gray-200">
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

          {selectedTemplateId ? (
            <TemplateItems selectedTemplateId={selectedTemplateId} />
          ) : null}
        </div>
      </PageWrapper>
    </>
  );
}

export default Directory;
