import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../../../app/hooks';
import {
  setActiveHotKeyId,
  setActiveTabId,
} from '../../../../../features/workspace/workspaceSlice';
import CustomDropdown, {
  IColumn,
} from '../../../tasks/dropdown/CustomDropdown';
import { communicationOptions } from '../communication/CommunicationSubTab';
import { DetailOptions } from '../details/DetailsSubTab';
import { ChecklistOptions } from '../checklist/subtabs/ChecklistSubtab';

export default function HotKeys() {
  const dispatch = useDispatch();
  const [items, setItems] = useState<IColumn[] | null | undefined>(null);
  const [hotKeys, setHotKeys] = useState<IColumn[] | null | undefined>(null);
  const hotKeysTabs = [
    ...DetailOptions,
    ...communicationOptions,
    ...ChecklistOptions,
  ];
  const { showAddHotKeyDropdown, showRemoveHotKeyDropdown, showPilot } = useAppSelector(
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
  }, [items]);

  useEffect(() => {
    const lsData = localStorage.getItem('HotKeys');
    if (lsData) {
      const getKeysStorage = JSON.parse(lsData);
      setItems(getKeysStorage);
    } else {
      setItems(newHotKey);
    }
  }, []);

  const addHotkeys = hotKeys?.filter(
    (keys: IColumn) => keys.isVisible === false
  );

  const removeHotkeys = hotKeys?.filter(
    (keys: IColumn) => keys.isVisible === true
  );

  const handleHotKey = (id: number | undefined) => {
    const filteredKeys = items?.map((key: IColumn) => {
      if (key.id === id) {
        return {
          ...key,
          isVisible: !key.isVisible,
        };
      }
      return key;
    });
    setItems(filteredKeys);
    localStorage.setItem('HotKeys', JSON.stringify(filteredKeys));
  };

  const handleClick = (id: number) => {
    dispatch(setActiveTabId(0));
    dispatch(setActiveHotKeyId(id));
  };

  return (
    <div className="">
      {removeHotkeys?.length != 0 ? (
        <div
          className={`border-b border-gray-200 py-2 px-4 flex gap-3 ${
            showPilot ? 'flex-row' : 'flex-col'
          }`}
        >
          {removeHotkeys?.map((item: IColumn) => (
            <div key={item.id}>
              <div
                className="flex text-sm w-4 h-4 cursor-pointer"
                onClick={() => handleClick(item.id)}
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
          handleClick={handleHotKey}
        />
      )}
      {showRemoveHotKeyDropdown && (
        <CustomDropdown
          listItems={removeHotkeys}
          title="Remove HotKeys"
          handleClick={handleHotKey}
        />
      )}
    </div>
  );
}
