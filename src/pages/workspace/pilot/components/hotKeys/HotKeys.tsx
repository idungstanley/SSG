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
    ...pilotOptions,
    ...DetailOptions,
    ...communicationOptions,
  ];
  const { showAddHotKeyDropdown, showRemoveHotKeyDropdown } = useAppSelector(
    (state) => state.workspace
  );
  const newHotKey = hotKeysTabs.map(({ name, isVisible }, index) => {
    return {
      name,
      isVisible,
      id: index + 1,
    };
  });
  localStorage.setItem('HotKeys', JSON.stringify(newHotKey));
  // const getKeysStorage = JSON.parse(localStorage.getItem('HotKeys') || '');
  const addHotkeys = newHotKey.filter(
    (keys: IColumn) => keys.isVisible === false
  );
  const removeHotkeys = newHotKey.filter(
    (keys: IColumn) => keys.isVisible === true
  );
  const handleClick = (id: number | undefined) => {
    // const filteredName = getKeysStorage.filter((key: IColumn) => key.id === id);
    const filteredKeys = newHotKey.map((key: IColumn) => {
      if (key.id === id) {
        return {
          ...key,
          isVisible: !key.isVisible,
        };
      }
      return key;
    });
    localStorage.setItem('HotKeys', JSON.stringify(filteredKeys));
  };
  return (
    <div className="">
      {removeHotkeys.length != 0 ? (
        <div className="border-b border-gray-200 py-2 px-4 flex gap-3">
          {removeHotkeys.map((item: IColumn) => (
            <div key={item.id}>
              <div
                className="flex text-sm w-4 h-4"
                // onClick={() => console.log('stan has clicked on ' + item.name)}
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
