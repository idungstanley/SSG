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
import { TimeClockOptions } from '../timeClock/subtabs/TimeSubTab';
import { pilotOptions } from '../Tabs';

export default function HotKeys() {
  const dispatch = useDispatch();
  const [items, setItems] = useState<IColumn[] | null | undefined>(null);
  const [hotKeys, setHotKeys] = useState<IColumn[] | null | undefined>(null);

  const hotKeysTabs = [
    ...pilotOptions,
    ...DetailOptions,
    ...communicationOptions,
    ...ChecklistOptions,
    ...TimeClockOptions,
  ];

  const { showAddHotKeyDropdown, showRemoveHotKeyDropdown, showPilot, activeHotKeyTabId } =
    useAppSelector((state) => state.workspace);

  const allHotKeysInfo = hotKeysTabs.map((key, index) => {
    return {
      ...key,
      index: index + 1,
    };
  });

  const newHotKey = hotKeysTabs.map(({ name, isVisible }, index) => {
    return {
      name,
      isVisible,
      index: index + 1,
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

  const handleHotKey = (index: number | undefined) => {
    const filteredKeys = items?.map((key: IColumn) => {
      if (key.index === index) {
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

  const handleClick = (id: number | undefined, name: string) => {
    const findParentTabs = pilotOptions.find(keys=> keys.name === name);
    if(findParentTabs){
    dispatch(setActiveTabId(findParentTabs.id));
    dispatch(setActiveHotKeyId(id));
    }else{
    dispatch(setActiveTabId(0));
    dispatch(setActiveHotKeyId(id));
    }
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
            <div key={item.index}>
              <div
                className={`${showPilot && 'p-2'} ${item.index === activeHotKeyTabId && 'bg-green-500 rounded'}`}
                onClick={() => handleClick(item.index, item.name)}
              >
              <span className="flex w-4 h-4 text-sm cursor-pointer">
                {item.icon ? (
                  item.icon
                  ) : (
                    <img
                    src={(item as IColumn).source}
                    alt={item.name + ' icon'}
                    />
                    )}
                </span>
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
