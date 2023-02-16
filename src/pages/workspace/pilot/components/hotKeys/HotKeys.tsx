import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../../app/hooks';
import CustomDropdown, {
  IColumn,
} from '../../../tasks/dropdown/CustomDropdown';
import { communicationOptions } from '../communication/CommunicationSubTab';
import { DetailOptions } from '../details/DetailsSubTab';
import { pilotOptions } from '../Tabs';

export default function HotKeys() {
  const [items, setItems] = useState<IColumn[] | null>(null);
  // const [fakeState, setFakeState] = useState<number>(0);
  const [hotKeys, setHotKeys] = useState<IColumn[] | null | undefined>(null);
  const hotKeysTabs = [
    ...pilotOptions,
    ...DetailOptions,
    ...communicationOptions,
  ];
  const { showAddHotKeyDropdown, showRemoveHotKeyDropdown } = useAppSelector(
    (state) => state.workspace
  );
  const allHotKeysInfo = hotKeysTabs.map((key, index) => {
    return {
      ...key,
      id: (key.id = index + 1),
    };
  });
  const newHotKey = hotKeysTabs.map(({ name, isVisible }, index) => {
    return {
      name,
      isVisible,
      id: index + 1,
    };
  });

  useEffect(() => {
    const getKeysStorage = JSON.parse(localStorage.getItem('HotKeys') || '[]');
    if (getKeysStorage) {
      setItems(getKeysStorage);
    } else if (getKeysStorage === undefined || null) {
      setItems(newHotKey);
    } else {
      setItems(newHotKey);
    }
    setHotKeys(() => {
      const allVisibilityStatus: (boolean | undefined)[] | undefined =
        items?.map((item) => item.isVisible);
      return allHotKeysInfo.map((keys, i) => ({
        ...keys,
        isVisible: allVisibilityStatus
          ? allVisibilityStatus[i]
          : keys.isVisible,
      }));
    });
  }, []);

  const addHotkeys = hotKeys?.filter(
    (keys: IColumn) => keys.isVisible === false
  );

  const removeHotkeys = hotKeys?.filter(
    (keys: IColumn) => keys.isVisible === true
  );

  const handleClick = (id: number | undefined) => {
    // setFakeState((prev) => prev + 1);
    const filteredKeys = items?.map((key: IColumn) => {
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
      {removeHotkeys?.length != 0 ? (
        <div className="border-b border-gray-200 py-2 px-4 flex gap-3">
          {removeHotkeys?.map((item: IColumn) => (
            <div key={item.id}>
              <div
                className="flex text-sm w-4 h-4 cursor-pointer"
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
          title="Remove HotKeys"
          handleClick={handleClick}
        />
      )}
    </div>
  );
}
