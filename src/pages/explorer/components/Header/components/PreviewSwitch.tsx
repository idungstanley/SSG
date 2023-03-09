import React, { memo, useEffect } from 'react';
import { Switch } from '@headlessui/react';
import { cl } from '../../../../../utils';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { useGetUserSettingsKeys, useSetUserSettingsKeys } from '../../../../../features/account/accountService';
import { setAccountSettings } from '../../../../../features/account/accountSlice';

const showPreviewFromLS = localStorage.getItem('showPreview');

function PreviewSwitch() {
  const dispatch = useAppDispatch();

  const { mutate: onChangeKeys } = useSetUserSettingsKeys();

  // request will be send only of showPreview from localStorage is null
  const { data } = useGetUserSettingsKeys(!showPreviewFromLS);

  useEffect(() => {
    // if request sended, add values from it to localStorage and store
    if (data) {
      const value = JSON.parse(data?.value.showPreview || 'false') as boolean;
      dispatch(setAccountSettings({ ...settings, showPreview: value }));

      localStorage.setItem('showPreview', JSON.stringify(value));
    }
  }, [data]);

  const onSwitch = (value: boolean) => {
    // update backend, localStorage and store
    onChangeKeys({ showPreview: JSON.stringify(value) });

    localStorage.setItem('showPreview', JSON.stringify(value));

    dispatch(setAccountSettings({ ...settings, showPreview: value }));
  };

  const { settings } = useAppSelector((state) => state.account);

  const { showPreview } = settings;

  return (
    <Switch
      checked={showPreview}
      onChange={(e) => onSwitch(e)}
      className={cl(
        showPreview ? 'bg-gray-500' : 'bg-gray-200',
        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ring-0 focus:ring-0'
      )}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={cl(
          showPreview ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
        )}
      />
    </Switch>
  );
}

export default memo(PreviewSwitch);
