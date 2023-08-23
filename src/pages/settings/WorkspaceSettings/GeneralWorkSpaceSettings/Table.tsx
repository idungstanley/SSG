import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { cl } from '../../../../utils';
import { useEffect, useState } from 'react';
import { WorkSpaceSettingsRes } from '../../../../features/workspace/workspace.interfaces';
import { getWorkSpaceSettings, upDateWorkSpaceSettings } from '../../../../features/workspace/workspaceService';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { SimpleSectionHeading } from '../../../../components';
import notificationFrame from '../../../../assets/branding/notificationFrame.png';
import { Spinner } from '../../../../common';
import { setClockType, setClocktime } from '../../../../features/settings/user/userSettingsSlice';
import { UseUpdateUserSettings } from '../../../../features/settings/user/userSettingsServices';

const minutesToMilliseconds = 60 * 1000;
// const hoursToMilliseconds = 60 * 60 * 1000;

export default function WorkSpaceTable() {
  const { workSpaceSettings } = useAppSelector((state) => state.workspace);
  const { is_clock_time, clock_limit, clock_stop_reminder, clock_type, userData } = useAppSelector(
    (state) => state.userSetting
  );

  const { data: fetchedData, status } = getWorkSpaceSettings();
  const { mutateAsync, isError, error } = upDateWorkSpaceSettings();
  const { mutate } = UseUpdateUserSettings();

  const dispatch = useAppDispatch();

  const [getSettings, setGetSettings] = useState<WorkSpaceSettingsRes[] | undefined>([]);
  const [clockData, setClockData] = useState<{
    [key: string]: number | string;
  }>({
    stop_tracking_hours: clock_limit,
    clock_reminder: clock_stop_reminder
  });

  const handleChange = (key: string, value: string | number) => {
    mutateAsync({ key, value });
    setClockData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    mutate({
      is_clock_time,
      clock_type
    });
  };

  const validate = is_clock_time === userData?.is_clock_time && clock_type === userData?.clock_type;

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
    <div className="w-full bg-white border border-gray-300">
      <div
        className="flex items-center pl-5 mt-5 rounded-t-md"
        style={{ backgroundImage: `url(${notificationFrame})`, height: '122px' }}
      >
        <SimpleSectionHeading title="Workspace" description="Manage workspace settings" />
      </div>
      <Disclosure defaultOpen={true}>
        {({ open }) => (
          <div className="w-full">
            <Disclosure.Button className="w-full">
              <div className="bg-gray-200">
                <div className="flex">
                  <div className="w-2/4 py-6 pl-4 pr-3 text-sm font-semibold text-left text-gray-900 sm:pl-6">
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
                <div className="bg-white p-4 w-10/12 mx-auto">
                  {workSpaceSettings &&
                    workSpaceSettings.length &&
                    workSpaceSettings.map((setting: WorkSpaceSettingsRes) => {
                      return (
                        <div key={setting.key} className="w-full">
                          {(setting.key === 'duplicate_name' || setting.key === 'folder_uppercase') && (
                            <div className="my-3 flex space-x-1 items-center w-80">
                              <div style={{ width: '20%' }} className="flex items-center">
                                <label className="switch w-full">
                                  <input
                                    type="checkbox"
                                    checked={Number(setting.value) === 1 ? true : false}
                                    onChange={() => handleChange(setting.key, Number(setting.value) === 0 ? 1 : 0)}
                                  />
                                  <div className={`slider ${Number(setting.value) === 1 ? 'checked' : ''}`}></div>
                                </label>
                              </div>
                              <span className="w-full">{setting.name}</span>
                            </div>
                          )}
                          {setting.key === 'stop_tracking_hours' && (
                            <div className="my-3 flex flex-col space-y-2">
                              <div style={{ width: '48%' }}>
                                <h5 className="font-semibold" style={{ fontSize: '15px' }}>
                                  {setting.name}
                                </h5>
                                <select
                                  name="stop_tracking_hours"
                                  className="h-10 rounded my w-full"
                                  value={clockData[setting.key]}
                                  onChange={(e) => handleChange(setting.key, Number(e.target.value))}
                                >
                                  <option value={1}>{setting.value} hour</option>
                                  <option value={1}>1 hour</option>
                                  <option value={2}>2 hours</option>
                                  <option value={3}>3 hours</option>
                                  <option value={24}>1 day</option>
                                </select>
                              </div>
                              <div style={{ width: '48%' }}>
                                <h5 className="font-semibold" style={{ fontSize: '15px' }}>
                                  Reminder Time
                                </h5>
                                <select
                                  name="Time-format"
                                  className="h-10 rounded my w-full"
                                  value={clockData.clock_reminder}
                                >
                                  <option value={5 * minutesToMilliseconds}>5 minutes</option>
                                  <option value={15 * minutesToMilliseconds}>15 minutes</option>
                                  <option value={25 * minutesToMilliseconds}>25 minutes</option>
                                  <option value={35 * minutesToMilliseconds}>35 minutes</option>
                                </select>
                              </div>
                            </div>
                          )}
                          {setting.key === 'folder_separator' && (
                            <div className="my-3 flex justify-between ">
                              <div style={{ width: '48%' }}>
                                <h5 className="font-semibold" style={{ fontSize: '15px' }}>
                                  {setting.name}
                                </h5>
                                <select
                                  name="folder_separator"
                                  className="h-10 rounded my w-full"
                                  value={setting.value}
                                  onChange={(e) => handleChange(setting.key, e.target.value)}
                                >
                                  <option value={setting.value}>{setting.value}</option>
                                </select>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  <div className="my-3 flex justify-between w-full">
                    <div style={{ width: '48%' }}>
                      <h5 className="font-semibold" style={{ fontSize: '15px' }}>
                        Clock Type
                      </h5>
                      <select
                        name="clock_type"
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
                          checked={is_clock_time === 1 ? true : false}
                          onChange={() => dispatch(setClocktime(is_clock_time === 1 ? 0 : 1))}
                        />
                        <div className={`slider ${is_clock_time === 1 ? 'checked' : ''}`}></div>
                      </label>
                    </div>
                    <span className="w-full">Show Toolbar Clock?</span>
                  </div>
                </div>
              </Disclosure.Panel>
            )}
          </div>
        )}
      </Disclosure>
      <div className="flex w-7/12 justify-center my-2">
        <button
          className={
            validate
              ? 'border-2 border-alsoit-gray-75 text-alsoit-gray-75 font-bold text-alsoit-text-lg p-2 w-44'
              : 'border-2 border-alsoit-success text-alsoit-success font-bold text-alsoit-text-lg p-2 w-44'
          }
          disabled={validate}
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
}
