import DropDownArrow from '../../../../../../../assets/icons/DropDownArrow';
import ShowTabsLabelToggle from '../../../../Tabs/components/ShowTabsLabelToggle';
import React, { useCallback, useState } from 'react';
import { IPilotTab } from '../../../../../../../types';
import { useAppDispatch, useAppSelector } from '../../../../../../../app/hooks';
import { setActiveFeatureButtonsIds, setActiveTabId } from '../../../../../../../features/workspace/workspaceSlice';
import { STORAGE_KEYS } from '../../../../../../../app/config/dimensions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useResolution from '../../../../../../../hooks/useResolution';
import { setUserSettingsKeys } from '../../../../../../../features/account/accountService';
import { VerticalScroll } from '../../../../../../ScrollableContainer/VerticalScroll';

interface DropDownProps {
  id: string;
  label: string;
  icon: JSX.Element;
  children: IPilotTab[];
}

interface ParentItemsListProps {
  dropdownConfig: DropDownProps[];
}

const featureButtonsFromLS = JSON.parse(localStorage.getItem(STORAGE_KEYS.HOT_KEYS) ?? '[]') as string[];

export default function ParentItemsList({ dropdownConfig }: ParentItemsListProps) {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const resolution = useResolution();
  const [openedNavItems, setOpenedNavItems] = useState<string[]>([]);
  const { activeTabId, activeFeatureButtonsIds } = useAppSelector((state) => state.workspace);
  const { userSettingsData } = useAppSelector((state) => state.account);

  const saveFeatureButtons = useMutation(setUserSettingsKeys, {
    onSuccess: () => {
      queryClient.invalidateQueries(['user-settings']);
    }
  });

  const ToggleOpenedNavItems = (item: DropDownProps) => {
    if (item.children.length > 0) {
      const itemId = item.id;
      if (openedNavItems.filter((item) => item == itemId).length > 0) {
        setOpenedNavItems(openedNavItems.filter((item) => item !== itemId));
      } else {
        setOpenedNavItems([...openedNavItems, itemId]);
      }
    }
  };

  const handleClick = useCallback(
    (tabId: string, dropdownConfigItem: DropDownProps) => {
      const isIncludes = activeFeatureButtonsIds.includes(tabId);

      if (dropdownConfigItem.children.length - activeFeatureButtonsIds.length < 4 && !isIncludes) {
        return false;
      }

      const newFeatureButtonsIds = isIncludes
        ? [...activeFeatureButtonsIds.filter((i) => i !== tabId)]
        : [...activeFeatureButtonsIds, tabId];

      dispatch(setActiveFeatureButtonsIds(newFeatureButtonsIds));
      saveFeatureButtons.mutateAsync({
        value: { ...userSettingsData, [STORAGE_KEYS.FEATURE_BUTTONS]: newFeatureButtonsIds },
        resolution
      });
      localStorage.setItem(STORAGE_KEYS.FEATURE_BUTTONS, JSON.stringify(newFeatureButtonsIds));

      const activeTab: string = activeTabId ?? '';

      if (!activeFeatureButtonsIds.includes(activeTab)) {
        const mainArray = dropdownConfigItem.children.filter((item) => !newFeatureButtonsIds.includes(item.id));
        dispatch(setActiveTabId(mainArray[0].id));
      }
    },
    [activeFeatureButtonsIds, featureButtonsFromLS]
  );

  return (
    <>
      <VerticalScroll style={{ margin: 0 }}>
        <div style={{ minHeight: '102px', maxHeight: '435px' }}>
          {dropdownConfig?.map((dropdownConfigItem) => (
            <>
              <div
                key={dropdownConfigItem.id}
                className="flex justify-between"
                style={{
                  paddingBottom:
                    dropdownConfigItem.id === 'compact_feature_button' && openedNavItems.length > 0 ? '20px' : 'auto'
                }}
              >
                <div
                  className="group flex items-center w-full text-xs text-gray-600 rounded cursor-pointer hover:bg-alsoit-gray-125 justify-between transition duration-500"
                  style={{
                    margin: '8px 0 -6px 6px',
                    padding: openedNavItems.length > 0 ? '5px 2px 5px 10px' : '5px 11px 5px 10px'
                  }}
                  onClick={() => ToggleOpenedNavItems(dropdownConfigItem)}
                >
                  <div
                    className="flex items-center relative"
                    style={{
                      paddingTop: '0'
                    }}
                  >
                    {dropdownConfigItem.icon && (
                      <div className="relative">
                        <p
                          className={`flex items-center justify-center w-5 h-5 transition duration-500 
                      ${openedNavItems.includes(dropdownConfigItem.id) ? 'opacity-40' : 'group-hover:opacity-40'}`}
                        >
                          {dropdownConfigItem.icon}
                        </p>
                        {dropdownConfigItem.children.length > 0 && (
                          <span
                            className={`absolute top-0 left-0 right-0 bottom-0 m-auto transition duration-500 flex justify-center items-center
                      ${
                        openedNavItems.includes(dropdownConfigItem.id)
                          ? 'opacity-100 rotate-90'
                          : 'opacity-0 group-hover:opacity-100'
                      }
                      `}
                          >
                            <DropDownArrow />
                          </span>
                        )}
                      </div>
                    )}
                    <p
                      className="font-medium alsoit-gray-300"
                      style={{
                        fontSize: '13px',
                        paddingLeft: '5px',
                        color: dropdownConfigItem.id == 'show_hide_hot_button' ? 'orange' : ''
                      }}
                    >
                      {dropdownConfigItem.label}
                    </p>
                  </div>
                  {dropdownConfigItem.id === 'compact_feature_button' ? (
                    <span style={{ paddingTop: '4px', paddingRight: '3px' }}>
                      <ShowTabsLabelToggle />
                    </span>
                  ) : (
                    <span style={{ paddingTop: '4px', paddingRight: '3px' }}>
                      <label className="switch pilot-modal-toggle" style={{ width: '20px', height: '10.53px' }}>
                        <input
                          className="inputShow"
                          type="checkbox"
                          checked={openedNavItems.includes(dropdownConfigItem.id)}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        />
                        <div
                          className={`slider ${openedNavItems.includes(dropdownConfigItem.id) ? 'checked' : ''}`}
                        ></div>
                      </label>
                    </span>
                  )}
                </div>
              </div>
              {openedNavItems.includes(dropdownConfigItem.id) && (
                <>
                  {dropdownConfigItem.children.map((child) => (
                    <div
                      key={child.id}
                      className="flex justify-between"
                      onClick={() => handleClick(child.id, dropdownConfigItem)}
                    >
                      <div
                        className="group flex items-center w-full text-xs text-gray-600 rounded cursor-pointer hover:bg-alsoit-gray-125 justify-between transition duration-500"
                        style={{
                          margin: '8px 0 -6px 6px',
                          padding: '5px 3px 5px 29px'
                        }}
                      >
                        <div
                          className="flex items-center relative"
                          style={{
                            paddingTop: '0'
                          }}
                        >
                          {dropdownConfigItem.icon && (
                            <p className="flex items-center justify-center w-5 h-5 group-hover:opacity-30 transition duration-500">
                              {child.icon}
                            </p>
                          )}
                          <p
                            className="font-medium alsoit-gray-300"
                            style={{
                              fontSize: '13px',
                              paddingLeft: '5px'
                            }}
                          >
                            {child.label}
                          </p>
                        </div>
                        <span style={{ paddingTop: '4px', paddingRight: '3px' }}>
                          <label className="switch pilot-modal-toggle" style={{ width: '20px', height: '10.53px' }}>
                            <input
                              className="inputShow"
                              type="checkbox"
                              checked={activeFeatureButtonsIds.includes(child.id)}
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            />
                            <div
                              className={`slider ${activeFeatureButtonsIds.includes(child.id) ? 'checked' : ''}`}
                            ></div>
                          </label>
                        </span>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </>
          ))}
        </div>
      </VerticalScroll>
    </>
  );
}
