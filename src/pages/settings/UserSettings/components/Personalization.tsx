import React from 'react';
import ColorTheme from './ColorTheme';
import TwoFactorAuthentication from './TwoFactorAuthentication';
import Preferences from './Preferences';
import { IUserData } from '../../../../features/workspace/workspace.interfaces';
import { useAppSelector } from '../../../../app/hooks';
import { UseUpdateUserSettings } from '../../../../features/settings/user/userSettingsServices';
import Confirmation from './Modal/Confirmation';

interface dataProps {
  data: IUserData | undefined;
}

function Personalization({ data }: dataProps) {
  const {
    timezone,
    name,
    email,
    time_format,
    date_format,
    start_week,
    theme_color,
    userData,
    color,
    showConfirmationModal
  } = useAppSelector((state) => state.userSetting);
  const { mutate: onUserSettingsUpdate } = UseUpdateUserSettings();
  const handleSubmit = () => {
    onUserSettingsUpdate({
      name: name !== userData?.name ? name : undefined,
      theme_color: theme_color !== userData?.theme_color ? theme_color : undefined,
      email: email !== userData?.email ? email : undefined,
      start_week: start_week !== userData?.start_week ? start_week : undefined,
      date_format: date_format !== userData?.date_format ? date_format : undefined,
      timezone: timezone !== userData?.timezone ? timezone : undefined,
      time_format: time_format !== userData?.time_format ? time_format : undefined,
      color: color !== userData?.color ? color : undefined
    });
  };

  const isNewData =
    name === userData?.name &&
    email === userData?.email &&
    time_format === userData?.time_format &&
    date_format === userData?.date_format &&
    start_week === userData?.start_week &&
    theme_color === userData?.theme_color &&
    timezone === userData?.timezone &&
    color === userData?.color;

  return (
    <div className="w-full bg-white m-2 p-4 rounded-lg relative" style={{ maxHeight: '100vh' }}>
      <div className="bg-white w-full">
        <section className="my-2">
          <ColorTheme />
        </section>
        <section className="my-2 py-2">
          <TwoFactorAuthentication />
        </section>
        <section className="overflow-auto my-2" style={{ maxHeight: '40vh' }}>
          <Preferences />
        </section>
        <div
          className="w-full flex items-center py-1 justify-center absolute bg-white fixed bottom-3 right-0"
          style={{ height: '5vh' }}
        >
          {data?.theme_color !== null ? (
            <div>
              {!isNewData ? (
                <button
                  className="bottom-5 flex hover:bg-green-600 text-white font-bold py-2 px-6 rounded"
                  onClick={handleSubmit}
                  style={{ backgroundColor: `${data?.theme_color}` }}
                >
                  Save Changes
                </button>
              ) : (
                <button
                  className=" bottom-5 flex hover:bg-green-600 text-white font-bold py-2 px-6 rounded opacity-30"
                  style={{ backgroundColor: `${data?.theme_color}` }}
                >
                  Saved
                </button>
              )}
            </div>
          ) : (
            <div>
              {!isNewData ? (
                <button
                  className=" bottom-5 flex hover:bg-green-600 text-white font-bold py-2 px-6 rounded"
                  style={{ backgroundColor: '#FF00FC' }}
                  onClick={handleSubmit}
                >
                  Save Changes
                </button>
              ) : (
                <button
                  className=" bottom-5 flex hover:bg-green-600 text-white font-bold py-2 px-6 rounded opacity-30"
                  style={{ backgroundColor: '#FF00FC' }}
                >
                  Saved
                </button>
              )}
            </div>
          )}
        </div>
        {/* For the confirmation modal */}
        {showConfirmationModal && <Confirmation />}
      </div>
    </div>
  );
}

export default Personalization;
