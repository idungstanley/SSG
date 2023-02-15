import React from 'react';
import { useAppSelector } from '../../../../../app/hooks';
import CustomDropdown, {
  IColumn,
} from '../../../tasks/dropdown/CustomDropdown';
import { communicationOptions } from '../communication/CommunicationSubTab';
import { DetailOptions } from '../details/DetailsSubTab';
import { pilotOptions } from '../Tabs';

export default function HotKeys() {
  const hotKeysTabs = [
    ...DetailOptions,
    ...communicationOptions,
    ...pilotOptions,
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
  const getKeysStorage = JSON.parse(localStorage.getItem('HotKeys') || '');
  const addHotkeys = newHotKey.filter((keys) => keys.isVisible === false);
  const removeHotkeys = newHotKey.filter((keys) => keys.isVisible === true);
  const handleClick = (id: number | undefined) => {
    const filteredName = getKeysStorage.filter((key: IColumn) => key.id === id);
    console.log(filteredName);
  };
  return (
    <div className="">
      {removeHotkeys.length != 0 ? (
        <div className="border-b border-gray-200 py-2 px-4 flex gap-3">
          {removeHotkeys.map((item) => (
            <div key={item.id}>
              <div
                className="flex text-sm w-4 h-4"
                onClick={() => console.log('stan has clicked on ' + item.name)}
              >
                {item.icon ? (
                  item.icon
                ) : (
                  <img
                    src={(item as IColumn).source}
                    alt={item.name + ' icon'}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {showAddHotKeyDropdown && (
        <CustomDropdown
          listItems={addHotkeys}
          title="Add HotKeys"
          handleClick={handleClick}
        />
      )}
      {showRemoveHotKeyDropdown && (
        <CustomDropdown
          listItems={removeHotkeys}
          title="Add HotKeys"
          handleClick={handleClick}
        />
      )}
    </div>
  );
}
