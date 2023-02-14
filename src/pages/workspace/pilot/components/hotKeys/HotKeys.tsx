import React from 'react';
import { useAppSelector } from '../../../../../app/hooks';
import CustomDropdown from '../../../tasks/dropdown/CustomDropdown';
import { ChecklistOptions } from '../checklist/subtabs/ChecklistSubtab';
import { communicationOptions } from '../communication/CommunicationSubTab';
import { DetailOptions } from '../details/DetailsSubTab';
import { pilotOptions } from '../Tabs';

export default function HotKeys() {
  const hotKeysTabs = [
    ...DetailOptions,
    ...communicationOptions,
    ...pilotOptions,
    ...ChecklistOptions,
  ];
  const { showAddHotKeyDropdown, showRemoveHotKeyDropdown } = useAppSelector(
    (state) => state.workspace
  );
  const newHotKey = hotKeysTabs.map((keys, index) => {
    return {
      ...keys,
      id: (keys.id = index + 1),
    };
  });
  localStorage.setItem('HotKeys', JSON.stringify(newHotKey));
  // const getHotKeys = JSON.parse(localStorage.getItem('HotKeys'));
  // console.log(getHotKeys);
  const addHotkeys = newHotKey.filter((keys) => keys.isVisible === false);
  const removeHotkeys = newHotKey.filter((keys) => keys.isVisible === true);
  return (
    <div>
      {removeHotkeys.length != 0 ? <div></div> : null}

      {showAddHotKeyDropdown && (
        <CustomDropdown listItems={addHotkeys} title="Add HotKeys" />
      )}
      {showRemoveHotKeyDropdown && (
        <CustomDropdown listItems={removeHotkeys} title="Add HotKeys" />
      )}
    </div>
  );
}
