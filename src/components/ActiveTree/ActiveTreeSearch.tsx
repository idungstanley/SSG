import React, { useState } from 'react';
import { BiRightArrowCircle } from 'react-icons/bi';
import { CiSearch } from 'react-icons/ci';
import { EntityType } from '../../utils/EntityTypes/EntityType';
import { IHub, IList, IWallet } from '../../features/hubs/hubs.interfaces';
import ActiveTreeDataFormater from './ActiveTreeDataFormater';
import { useAppSelector } from '../../app/hooks';

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
  const [toggle, setToggle] = useState<boolean>(false);
  const { selectedTreeDetails } = useAppSelector((state) => state.hub);
  const fetchAndToggle = () => {
    handleFetch();
    setToggle((prev) => !prev);
  };
  return (
    <div>
      <button
        type="button"
        className="relative flex items-center w-full p-1 px-1 mt-2 mb-1 transition duration-300 rounded-md cursor-pointer group"
      >
        <div
          className="absolute flex items-center justify-between w-auto w-full tracking-wider text-gray-400 grow left-2"
          style={{ fontSize: '13px' }}
        >
          <div className="flex items-center justify-between" onClick={() => fetchAndToggle()}>
            <CiSearch className="text-lg mr-2 hover:text-fuchsia-500" />
            {selectedTreeDetails.name && <p>{selectedTreeDetails.name}</p>}
          </div>
          <BiRightArrowCircle className="mr-6 text-lg hover:text-fuchsia-500" />
        </div>
        <input
          className="w-full h-8 pl-3 text-xs border-gray-400 rounded-2xl group-hover:border-fuchsia-500 group-hover:text-primary-400"
          disabled
          type="text"
        />
      </button>
      {toggle && <ActiveTreeDataFormater data={data} fetchTree={fetchTree} id={id} />}
    </div>
  );
}
