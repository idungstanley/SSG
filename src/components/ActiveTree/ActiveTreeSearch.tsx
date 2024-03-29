import React, { useState, useEffect } from 'react';
import { BiRightArrowCircle } from 'react-icons/bi';
import { CiSearch } from 'react-icons/ci';
import { EntityType } from '../../utils/EntityTypes/EntityType';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setActiveSubHubManagerTabId, setActiveTabId, setShowOverlay } from '../../features/workspace/workspaceSlice';
import { getHub, getSubMenu, setSubDropdownMenu, setshowMenuDropdown } from '../../features/hubs/hubSlice';
import { Hub } from '../../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';
import ActiveTreeDataFormater from './ActiveTreeDataFormater';
import { useGetAllHubs, useGetActiveHubChildren } from '../../features/hubs/hubService';
import { useParams } from 'react-router';
import CreateTree from '../../pages/workspace/hubs/components/ActiveTree/CreateTree';
import { setFilteredResults } from '../../features/search/searchSlice';
import { IHub } from '../../features/hubs/hubs.interfaces';
import { pilotTabs } from '../../app/constants/pilotTabs';
import { TIME_TABS } from '../../utils/Constants/TimeClockConstants';
import { OPTIONS_WITH_AVAILABLE_LISTS } from '../../pages/workspace/tasks/component/taskMenu/TaskMenu';

interface ActiveTreeSearchProps {
  closeDropdown?: React.Dispatch<React.SetStateAction<boolean>>;
  option?: string;
  checklistId?: string;
}

export default function ActiveTreeSearch({ closeDropdown, option, checklistId }: ActiveTreeSearchProps) {
  const dispatch = useAppDispatch();
  const { hubId } = useParams();

  const { selectedTreeDetails, entityToCreate, hub } = useAppSelector((state) => state.hub);

  const [hubs, setHubs] = useState<Hub[]>(hub.length ? hub : []);
  const [toggleTree, setToggleTree] = useState<boolean>(false);
  const [newHubId, setNewHubId] = useState<string>('');

  const { data: allHubs } = useGetAllHubs();
  const { data: allHubTree } = useGetActiveHubChildren({ hub_id: newHubId || hubId, hubs: allHubs?.hubs as IHub[] });

  useEffect(() => {
    if (allHubTree?.tree.length && allHubs && hubs.length) {
      const currentHubId = allHubTree.tree[0].parent_id || hubId;
      const currentItem = hubs.find((item) => item.id === currentHubId);
      if (!currentItem?.children) {
        setHubs(() => [...CreateTree(allHubTree.tree, currentHubId as string, hubs as Hub[])]);
      }
    }
  }, [allHubTree, allHubs, hubs]);

  useEffect(() => {
    if (allHubs && !hubs.length) {
      const incoming = {
        hubs: allHubs.hubs ? [...allHubs.hubs] : []
      };

      setHubs([...incoming.hubs] as Hub[]);
    }
  }, [allHubs]);

  useEffect(() => {
    if (hubs && hubs.length) {
      dispatch(setFilteredResults(hubs));
      dispatch(getHub(hubs));
    }
  }, [hubs, allHubs]);

  useEffect(() => {
    if (OPTIONS_WITH_AVAILABLE_LISTS.includes(option as string) || option === TIME_TABS.nestedEntities) {
      setToggleTree(true);
    }
  }, []);

  const handleOpenNewHub = (id: string) => {
    setNewHubId(id);
  };

  const fetchAndToggle = () => {
    setToggleTree((prev) => !prev);
  };

  const directToPilot = () => {
    dispatch(setActiveTabId(pilotTabs.ENTITY_MANAGER));
    dispatch(setShowOverlay(true));
    if (entityToCreate === EntityType.hub || entityToCreate === EntityType.subHub) {
      dispatch(setActiveSubHubManagerTabId(pilotTabs.CREATE_HUB));
    } else if (entityToCreate === EntityType.wallet || entityToCreate === EntityType.subWallet) {
      dispatch(setActiveSubHubManagerTabId(pilotTabs.CREATE_WALLET));
    } else if (entityToCreate === EntityType.list) {
      dispatch(setActiveSubHubManagerTabId(pilotTabs.CREATE_LIST));
    }
    dispatch(
      getSubMenu({
        SubMenuId: null,
        SubMenuType: null
      })
    );
    closeDropdown?.(false);
    dispatch(setSubDropdownMenu(false));
    dispatch(setshowMenuDropdown({ showMenuDropdown: null, showMenuDropdownType: null }));
  };

  return (
    <div className="relative">
      {!OPTIONS_WITH_AVAILABLE_LISTS.includes(option as string) &&
        option !== TIME_TABS.nestedEntities &&
        option !== pilotTabs.CREATE_TASK && (
          <button
            type="button"
            className="relative flex items-center w-full p-1 px-1 mt-2 mb-1 transition duration-300 rounded-md cursor-pointer group"
          >
            <div
              className="absolute flex items-center justify-between w-auto w-full tracking-wider grow left-2"
              style={{ fontSize: '13px' }}
            >
              <div className="flex items-center justify-between" onClick={() => fetchAndToggle()}>
                <CiSearch className="mr-2 text-lg hover:text-fuchsia-500" />
                <p className="whitespace-nowrap">
                  {selectedTreeDetails.name ? selectedTreeDetails.name : 'Choose Location'}
                </p>
              </div>
              <BiRightArrowCircle className="mr-6 text-lg hover:text-fuchsia-500" onClick={() => directToPilot()} />
            </div>
            <input
              className="w-full h-8 pl-3 text-xs border-gray-400 rounded-2xl group-hover:border-fuchsia-500 group-hover:text-primary-400"
              disabled
              type="text"
            />
          </button>
        )}
      {toggleTree && (
        <ActiveTreeDataFormater
          data={hubs}
          openNewHub={handleOpenNewHub}
          setToggleTree={setToggleTree}
          option={option}
          checklistId={checklistId}
        />
      )}
    </div>
  );
}
