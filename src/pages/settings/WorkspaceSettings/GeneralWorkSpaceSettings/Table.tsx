import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { cl } from '../../../../utils';
import { useEffect, useState } from 'react';
import { WorkSpaceSettingsRes } from '../../../../features/workspace/workspace.interfaces';
import { getWorkSpaceSettings } from '../../../../features/workspace/workspaceService';
import { useAppSelector } from '../../../../app/hooks';
import { SimpleSectionHeading } from '../../../../components';
import notificationFrame from '../../../../assets/branding/notificationFrame.png';
import { Spinner } from '../../../../common';

export default function WorkSpaceTable() {
  const { workSpaceSettings } = useAppSelector((state) => state.workspace);

  const [getSettings, setGetSettings] = useState<WorkSpaceSettingsRes[] | undefined>([]);

  const { data: fetchedData, status } = getWorkSpaceSettings();

  useEffect(() => {
    if (workSpaceSettings) {
      if (!workSpaceSettings?.length && status === 'success') {
        setGetSettings(fetchedData?.data.workspace_settings);
      } else {
        setGetSettings(workSpaceSettings);
      }
    }
  }, [workSpaceSettings]);
  return (
    <div className="bg-white border border-gray-300 w-full">
      <div
        className="mt-5 flex items-center rounded-t-md pl-5"
        style={{ backgroundImage: `url(${notificationFrame})`, height: '122px' }}
      >
        <SimpleSectionHeading title="Notifications" description="Manage workspace settings" />
      </div>
      <Disclosure defaultOpen={true}>
        {({ open }) => (
          <div className="w-full">
            <Disclosure.Button className="w-full">
              <div className="bg-gray-200">
                <div className="flex">
                  <div className="py-6 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 w-2/4">
                    <div className="flex items-center space-x-2">
                      <ChevronRightIcon className={cl(open ? 'rotate-90 transform' : '', 'w-6 h-6')} />
                      <p className="uppercase" style={{ fontSize: '15px' }}>
                        {/* {category} */}
                        Workspace Settings
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Disclosure.Button>
            {status === 'loading' ? (
              <div className="flex items-center justify-center w-full h-full">
                <Spinner size={50} color="#0F70B7" />
              </div>
            ) : (
              <Disclosure.Panel>
                {' '}
                <div className="bg-white p-4 w-full">
                  {getSettings &&
                    getSettings.length &&
                    getSettings.map((setting: WorkSpaceSettingsRes) => {
                      return setting.value === 1 || setting.value === 0 ? (
                        <div key={setting.key} className="flex justify-between items-center w-full">
                          <div className="pl-10 py-3.5 text-left text-sm font-semibold text-gray-900 w-2/4">
                            {setting.name}
                          </div>
                          <div className="flex w-2/4 justify-around">
                            <div className="px-3 flex justify-center">
                              <input
                                checked={setting.value === 1}
                                className="h-5 w-5 cursor-pointer bg-gray-300 border-gray-500"
                                type="checkbox"
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div key={setting.key} className="flex justify-between items-center w-full">
                          <div className="pl-10 py-3.5 text-left text-sm font-semibold text-gray-900 w-2/4">
                            {setting.name}
                          </div>
                          <div className="flex w-2/4 justify-around items-center">
                            <div>{setting.value}</div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </Disclosure.Panel>
            )}
          </div>
        )}
      </Disclosure>
    </div>
  );
}
