import React, { useState, useEffect } from 'react';
import { BiRightArrowCircle } from 'react-icons/bi';
import { CiSearch } from 'react-icons/ci';
import { EntityType } from '../../utils/EntityTypes/EntityType';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setActiveSubHubManagerTabId, setActiveTabId, setShowOverlay } from '../../features/workspace/workspaceSlice';
import { getHub, getSubMenu } from '../../features/hubs/hubSlice';
import { EntityManagerTabsId, PilotTabsId } from '../../utils/PilotUtils';
import { Hub } from '../../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';
import ActiveTreeDataFormater from './ActiveTreeDataFormater';
import { useGetAllHubs, useGetActiveHubChildren } from '../../features/hubs/hubService';
import { useParams } from 'react-router';
import CreateTree from '../../pages/workspace/hubs/components/ActiveTree/CreateTree';
import { setFilteredResults } from '../../features/search/searchSlice';

interface ActiveTreeSearchProps {
  closeDropdown?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ActiveTreeSearch({ closeDropdown }: ActiveTreeSearchProps) {
  const dispatch = useAppDispatch();
  const { hubId } = useParams();

  const { selectedTreeDetails, entityToCreate, hub } = useAppSelector((state) => state.hub);

  const [hubs, setHubs] = useState<Hub[]>(hub.length ? hub : []);
  const [toggleTree, setToggleTree] = useState<boolean>(false);

  const { data: allHubs } = useGetAllHubs();
  const { data: allHubTree } = useGetActiveHubChildren({ hub_id: hubId ?? null });

  useEffect(() => {
    if (allHubTree && allHubs && hubs.length) {
      const currentHubId = hubId || allHubTree.tree[0].parent_id;
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
