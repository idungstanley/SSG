import React, { useState, useEffect } from 'react';
import { BiRightArrowCircle } from 'react-icons/bi';
import { CiSearch } from 'react-icons/ci';
import { EntityType } from '../../utils/EntityTypes/EntityType';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setActiveSubHubManagerTabId, setActiveTabId, setShowOverlay } from '../../features/workspace/workspaceSlice';
import { getHub, getSubMenu } from '../../features/hubs/hubSlice';
import { EntityManagerTabsId, PilotTabsId } from '../../utils/PilotUtils';
import { Hub, InputData } from '../../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';
import ActiveTreeDataFormater from './ActiveTreeDataFormater';
import { useGetHubs } from '../../features/hubs/hubService';
import { useParams } from 'react-router';
import CreateTree from '../../pages/workspace/hubs/components/ActiveTree/CreateTree';
import UpdateTree from '../../pages/workspace/hubs/components/ActiveTree/updateTree/UpdateTree';
import { setFilteredResults } from '../../features/search/searchSlice';

interface ActiveTreeSearchProps {
  closeDropdown?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ActiveTreeSearch({ closeDropdown }: ActiveTreeSearchProps) {
  const dispatch = useAppDispatch();
  const { listId, workSpaceId } = useParams();

  const { currentWorkspaceId } = useAppSelector((state) => state.auth);
  const { currentItemId } = useAppSelector((state) => state.workspace);
  const { selectedTreeDetails, entityToCreate, hub } = useAppSelector((state) => state.hub);

  const [hubs, setHubs] = useState<Hub[]>(hub.length ? hub : []);
  const [toggleTree, setToggleTree] = useState<boolean>(false);

  const fetch = currentWorkspaceId == workSpaceId;
  const fetchTree = !hubs.length && fetch;
  const id = currentItemId;

  const { data } = useGetHubs({ includeTree: fetchTree, hub_id: id, wallet_id: id, list_id: listId });

  useEffect(() => {
    if (data) {
      const incoming: InputData = {
        hubs: data.hubs ? [...data.hubs.map((i) => ({ ...i, children: [], wallets: [], lists: [] }))] : [],
        wallets: data.wallets ? [...data.wallets.map((i) => ({ ...i, children: [], lists: [] }))] : [],
        lists: data.lists ? [...data.lists.map((i) => ({ ...i, children: [] }))] : []
      };

      if (fetchTree) {
        setHubs(() => [...CreateTree(incoming)]);
      } else {
        setHubs((prev) =>
          !prev.length
            ? [...incoming.hubs]
            : [
                ...UpdateTree(
                  hubs,
                  (item) => {
                    if ('wallets' in item && 'lists' in item) {
                      return {
                        ...item,
                        children: [...incoming.hubs],
                        wallets: [...incoming.wallets],
                        lists: [...incoming.lists]
                      };
                    } else if ('lists' in item) {
                      return {
                        ...item,
                        children: [...incoming.wallets],
                        lists: [...incoming.lists]
                      };
                    } else if ('children' in item) {
                      return {
                        ...item,
                        children: [...incoming.lists]
                      };
                    } else {
                      return item;
                    }
                  },
                  id || listId
                )
              ]
        );
      }
    }
  }, [data]);

  useEffect(() => {
    if (hubs) {
      dispatch(setFilteredResults(hubs));
      dispatch(getHub(hubs));
    }
  }, [hubs, data]);

  const fetchAndToggle = () => {
    setToggleTree((prev) => !prev);
  };

  const directToPilot = () => {
    dispatch(setActiveTabId(PilotTabsId.entityManager));
    dispatch(setShowOverlay(true));
    if (entityToCreate === EntityType.hub || entityToCreate === EntityType.subHub) {
      dispatch(setActiveSubHubManagerTabId(EntityManagerTabsId.hub));
    } else if (entityToCreate === EntityType.wallet || entityToCreate === EntityType.subWallet) {
      dispatch(setActiveSubHubManagerTabId(EntityManagerTabsId.wallet));
    } else if (entityToCreate === EntityType.list) {
      dispatch(setActiveSubHubManagerTabId(EntityManagerTabsId.list));
    }
    dispatch(
      getSubMenu({
        SubMenuId: null,
        SubMenuType: null
      })
    );
    closeDropdown?.(false);
  };

  return (
    <div className="relative">
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
            <p>{selectedTreeDetails.name ? selectedTreeDetails.name : 'Choose Location'}</p>
          </div>
          <BiRightArrowCircle className="mr-6 text-lg hover:text-fuchsia-500" onClick={() => directToPilot()} />
        </div>
        <input
          className="w-full h-8 pl-3 text-xs border-gray-400 rounded-2xl group-hover:border-fuchsia-500 group-hover:text-primary-400"
          disabled
          type="text"
        />
      </button>
      {toggleTree && <ActiveTreeDataFormater data={hubs} setToggleTree={setToggleTree} />}
    </div>
  );
}
