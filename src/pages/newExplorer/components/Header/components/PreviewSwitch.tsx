import React, { memo, useEffect } from 'react';
import { Switch } from '@headlessui/react';
import { classNames } from '../../../../../utils';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import {
  useGetUserSettingsKeys,
  useSetUserSettingsKeys,
} from '../../../../../features/account/accountService';
import { setAccountSettings } from '../../../../../features/account/accountSlice';

const showPreviewFromLS = localStorage.getItem('showPreview');

function PreviewSwitch() {
  const dispatch = useAppDispatch();

  const { mutate: onChangeKeys } = useSetUserSettingsKeys();

  const { data } = useGetUserSettingsKeys(!showPreviewFromLS);

  useEffect(() => {
    if (data) {
      const value = JSON.parse(data?.value.showPreview || 'false');
      dispatch(setAccountSettings({ ...settings, showPreview: value }));

      localStorage.setItem('showPreview', JSON.stringify(value));
    }
  }, [data]);

  const { settings } = useAppSelector((state) => state.account);

  const onSwitch = (value: boolean) => {
    onChangeKeys({ showPreview: JSON.stringify(value) });

    localStorage.setItem('showPreview', JSON.stringify(value));

    dispatch(setAccountSettings({ ...settings, showPreview: value }));
  };

  const { showPreview } = settings;

  return (
    <Switch
      checked={showPreview}
      onChange={(e) => onSwitch(e)}
      className={classNames(
        showPreview ? 'bg-gray-500' : 'bg-gray-200',
        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ring-0 focus:ring-0'
      )}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={classNames(
          showPreview ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
        )}
      />
    </Switch>
  );
}

export default memo(PreviewSwitch);
