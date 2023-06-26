import React, { useState } from 'react';
import { BiRightArrowCircle } from 'react-icons/bi';
import { CiSearch } from 'react-icons/ci';
import { EntityType } from '../../utils/EntityTypes/EntityType';
import { IHub, IList, IWallet } from '../../features/hubs/hubs.interfaces';
import ActiveTreeDataFormater from './ActiveTreeDataFormater';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setActiveSubHubManagerTabId, setActiveTabId } from '../../features/workspace/workspaceSlice';
import { getSubMenu } from '../../features/hubs/hubSlice';

interface ActiveTreeSearchProps {
  handleFetch: () => void;
  data:
    | {
        hubs: IHub[];
        wallets: IWallet[];
        lists: IList[];
      }
    | undefined;
  fetchTree: boolean;
  id?: string | null;
}

export default function ActiveTreeSearch({ data, handleFetch, fetchTree, id }: ActiveTreeSearchProps) {
  const [toggleTree, setToggleTree] = useState<boolean>(false);
  const { selectedTreeDetails, entityToCreate } = useAppSelector((state) => state.hub);
  const dispatch = useAppDispatch();
  const fetchAndToggle = () => {
    handleFetch();
    setToggleTree((prev) => !prev);
  };

  const directToPilot = () => {
    dispatch(setActiveTabId(9));
    if (entityToCreate === EntityType.hub || entityToCreate === EntityType.subHub) {
      dispatch(setActiveSubHubManagerTabId(1));
    } else if (entityToCreate === EntityType.wallet) {
      dispatch(setActiveSubHubManagerTabId(2));
    } else if (entityToCreate === EntityType.list) {
      dispatch(setActiveSubHubManagerTabId(3));
    }
    dispatch(
      getSubMenu({
        SubMenuId: null,
        SubMenuType: null
      })
    );
  };
  return (
    <div>
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
            {selectedTreeDetails.name && <p>{selectedTreeDetails.name}</p>}
          </div>
          <BiRightArrowCircle className="mr-6 text-lg hover:text-fuchsia-500" onClick={() => directToPilot()} />
        </div>
        <input
          className="w-full h-8 pl-3 text-xs border-gray-400 rounded-2xl group-hover:border-fuchsia-500 group-hover:text-primary-400"
          disabled
          type="text"
        />
      </button>
      {toggleTree && <ActiveTreeDataFormater setToggleTree={setToggleTree} data={data} fetchTree={fetchTree} id={id} />}
    </div>
  );
}
