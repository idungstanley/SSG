import React, { useState } from 'react';
import SectionArea from '../SectionArea';
import { TbShield } from 'react-icons/tb';
import SearchIcon from '../../../../assets/icons/SearchIcon';
import CopyLink from './components/CopyLink';
import ShareWith from './components/ShareWith';
import { FaLock, FaLockOpen } from 'react-icons/fa';

function Permissions() {
  const [invite, setInvite] = useState<boolean>(false);
  const [privateMode, setPrivateMode] = useState(false);
  return (
    <div className="w-full">
      <SectionArea label="Permissions" icon={<TbShield className="w-4 h-4" />} />
      <div className="bg-alsoit-gray-50 rounded-md  m-auto p-2 mt-2" style={{ width: '98%' }}>
        <h1 className="text-lg font-semibold w-full text-center">Share this Space</h1>
        <h2 className="text-md font-semibold w-full text-center">Sharing Entity name with all views</h2>
        <div className="w-full my-4">
          {!invite ? (
            <div
              className="border h-8 flex w-11/12 bg-white m-auto items-center justify-between rounded-md cursor-pointer"
              onClick={() => setInvite(!invite)}
            >
              <span className="ml-2 text-alsoit-text-lg">Invite by name or email</span>
              <button className="bg-alsoit-purple-300 h-full rounded-r-md w-1/6 text-white">Invite</button>
            </div>
          ) : (
            <div className="w-11/12 m-auto h-8 rounded-md flex justify-between items-center bg-white px-2">
              <SearchIcon className="w-4 h-4" />
              <input
                type="text"
                className="w-full h-8 border-0 outline-0 ring-0 focus:border-0 focus:outline-0 focus:ring-0 text-alsoit-text-lg"
                placeholder="Invite by name or email"
              />
              <span
                className="w-4 h-4 p-1 rounded-2xl bg-red-500 text-white text-alsoit-text-sm flex justify-center items-center cursor-pointer"
                onClick={() => setInvite(!invite)}
              >
                x
              </span>
            </div>
          )}
          <div className="w-full my-4">
            <CopyLink />
          </div>
          <div className="w-11/12 m-auto">
            <ShareWith privateMode={privateMode} />
          </div>
        </div>
        {privateMode ? (
          <button
            className="w-11/12 m-auto py-1 flex justify-center items-center border border-alsoit-gray-100 rounded gap-1"
            onClick={() => setPrivateMode(!privateMode)}
          >
            <FaLockOpen />
            Make Private
          </button>
        ) : (
          <button
            className="w-11/12 m-auto py-1 flex justify-center items-center border border-alsoit-gray-100 rounded gap-1"
            onClick={() => setPrivateMode(!privateMode)}
          >
            <FaLock />
            Make Public
          </button>
        )}
      </div>
    </div>
  );
}

export default Permissions;
