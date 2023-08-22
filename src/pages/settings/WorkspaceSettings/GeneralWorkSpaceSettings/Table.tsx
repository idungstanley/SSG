import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { cl } from '../../../../utils';
import { useEffect, useState } from 'react';
import { WorkSpaceSettingsRes } from '../../../../features/workspace/workspace.interfaces';
import { getWorkSpaceSettings } from '../../../../features/workspace/workspaceService';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { SimpleSectionHeading } from '../../../../components';
import notificationFrame from '../../../../assets/branding/notificationFrame.png';
import { Spinner } from '../../../../common';
import {
  setClockLimit,
  setClockStopReminder,
  setClockType,
  setClocktime
} from '../../../../features/settings/user/userSettingsSlice';

const minutesToMilliseconds = 60 * 1000;
const hoursToMilliseconds = 60 * 60 * 1000;

export default function WorkSpaceTable() {
  const { workSpaceSettings } = useAppSelector((state) => state.workspace);
  const { is_clock_time, clock_limit, clock_stop_reminder, clock_type } = useAppSelector((state) => state.userSetting);

  const { data: fetchedData, status } = getWorkSpaceSettings();

  const dispatch = useAppDispatch();

  const [getSettings, setGetSettings] = useState<WorkSpaceSettingsRes[] | undefined>([]);

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
      <Disclosure defaultOpen={false}>
        {({ open }) => (
          <div className="w-full">
            <Disclosure.Button className="w-full">
              <div className="bg-gray-200">
                <div className="flex">
                  <div className="py-6 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 w-2/4">
                    <div className="flex items-center space-x-2">
                      <ChevronRightIcon className={cl(open ? 'rotate-90 transform' : '', 'w-6 h-6')} />
                      <p className="uppercase" style={{ fontSize: '15px' }}>
                        Workspace Extra Settings
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Disclosure.Button>
            <Disclosure.Panel>
              {' '}
              <div className="bg-white p-4 w-full">
                <div className="my-3 flex justify-between ">
                  <div style={{ width: '48%' }}>
                    <h5 className="font-semibold" style={{ fontSize: '15px' }}>
                      Clocking Limit
                    </h5>
                    <select
                      name="Day"
                      className="h-10 rounded my w-full"
                      value={clock_limit}
                      onChange={(e) => dispatch(setClockLimit(Number(e.target.value)))}
                      style={{ fontSize: '15px' }}
                    >
                      <option value={1 * hoursToMilliseconds}>1 hour</option>
                      <option value={2 * hoursToMilliseconds}>2 hours</option>
                      <option value={3 * hoursToMilliseconds}>3 hour</option>
                      <option value={24 * hoursToMilliseconds}>1 day</option>
                    </select>
                  </div>
                  <div style={{ width: '48%' }}>
                    <h5 className="font-semibold" style={{ fontSize: '15px' }}>
                      Reminder Time
                    </h5>
                    <select
                      name="Time-format"
                      className="h-10 rounded my w-full"
                      value={clock_stop_reminder}
                      onChange={(e) => dispatch(setClockStopReminder(Number(e.target.value)))}
                      style={{ fontSize: '15px' }}
                    >
                      <option value={5 * minutesToMilliseconds}>5 minutes</option>
                      <option value={15 * minutesToMilliseconds}>15 minutes</option>
                      <option value={25 * minutesToMilliseconds}>25 minutes</option>
                      <option value={35 * minutesToMilliseconds}>35 minutes</option>
                    </select>
                  </div>
                </div>
                <div className="my-3 flex justify-between w-full">
                  <div style={{ width: '48%' }}>
                    <h5 className="font-semibold" style={{ fontSize: '15px' }}>
                      Clock Type
                    </h5>
                    <select
                      name="clock_time"
                      className="h-10 rounded my w-full"
                      value={clock_type}
                      onChange={(e) => dispatch(setClockType(e.target.value))}
                      style={{ fontSize: '15px' }}
                    >
                      <option value="d">Digital</option>
                      <option value="a">Analog</option>
                    </select>
                  </div>
                </div>
                <div className="my-3 flex space-x-1 items-center w-80">
                  <div style={{ width: '20%' }} className="flex items-center">
                    <label className="switch w-full">
                      <input
                        type="checkbox"
                        checked={is_clock_time ? true : false}
                        onClick={() => dispatch(setClocktime(is_clock_time === 1 ? 0 : 1))}
                      />
                      <div className={`slider ${is_clock_time === 1 ? 'checked' : ''}`}></div>
                    </label>
                  </div>
                  <span className="w-full">Show Toolbar Clock?</span>
                </div>
              </div>
            </Disclosure.Panel>
          </div>
        )}
      </Disclosure>
    </div>
  );
}
