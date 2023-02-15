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
  const addHotkeys = newHotKey.filter((keys) => keys.isVisible === false);
  const removeHotkeys = newHotKey.filter((keys) => keys.isVisible === true);
  return (
    <div className="">
      {removeHotkeys.length != 0 ? (
        <div className="border-b border-gray-200 py-2 px-4">
          {removeHotkeys.map((item) => (
            <div key={item.id}>
              <div className="flex text-sm w-4 h-4 gap-3">
                {item.icon ? (
                  item.icon
                ) : (
                  <img
                    src={item.source}
                    alt={item.name ? item.name : item.label + ' icon'}
                  />
                )}
                {/* <span>{item.label ? item.label : (item as IColumn).name}</span> */}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {showAddHotKeyDropdown && (
        <CustomDropdown listItems={addHotkeys} title="Add HotKeys" />
      )}
      {showRemoveHotKeyDropdown && (
        <CustomDropdown listItems={removeHotkeys} title="Add HotKeys" />
      )}
    </div>
  );
}
