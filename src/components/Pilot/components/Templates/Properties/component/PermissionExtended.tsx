import React, { useState } from 'react';
import SearchIcon from '../../../../../../assets/icons/SearchIcon';
import ThreeDotIcon from '../../../../../../assets/icons/ThreeDotIcon';
import ArrowRightFilled from '../../../../../../assets/icons/ArrowRightFilled';
import AlsoitIcon from '../../../../../../assets/icons/AlsoitIcon';
import AssigneeCollection from '../../../../../../assets/icons/propertyIcons/assignees.svg';
import PersonAddIcon from '../../../../../../assets/icons/propertyIcons/PersonAddIcon';
import EllipseTemp from '../../../../../../assets/icons/propertyIcons/EllipseTemp.svg';
import LockPersonIcon from '../../../../../../assets/icons/propertyIcons/LockPersonIcon';

export default function PermissionExtended() {
  const [invite, setInvite] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<string>('');

  return (
    <div
      className="w-full border-t rounded-b-md border-alsoit-gray-75 text-alsoit-gray-300"
      style={{ fontSize: '11px', fontWeight: '600', lineHeight: '13.2px' }}
    >
      <div className="grid h-8 " style={{ gridTemplateColumns: '36% 50%' }}>
        <div className="flex items-center w-40 uppercase">
          <div className="flex items-center w-full h-8 gap-2 p-2 text-white uppercase rounded-r-none rounded-br-lg bg-alsoit-gray-75 grow">
            <span>PERMISSION OPTION</span>
            <ThreeDotIcon color="white" />
          </div>
        </div>
      </div>
      <div className="gap-2 p-2 pr-6 rounded-b-md">
        <div className="w-full my-4">
          {!invite ? (
            <div
              className="relative flex items-center justify-between h-8 bg-white border rounded-md cursor-pointer"
              onClick={() => setInvite(!invite)}
            >
              <span className="ml-2 text-orange-300">Invite by name or email</span>
              <button className="absolute flex items-center justify-center w-16 h-5 text-white rounded-md bg-alsoit-purple-300 right-2">
                Invite
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between w-11/12 h-8 px-2 m-auto bg-white border rounded-md border-alsoit-danger">
              <SearchIcon className="w-4 h-4" />
              <input
                type="text"
                className="w-full border-0 h-7 outline-0 ring-0 focus:border-0 focus:outline-0 focus:ring-0 text-alsoit-text-lg"
                placeholder="Invite by name or email"
                onChange={(e) => setSearchParams(e.target.value)}
                value={searchParams}
              />
              <span
                className="flex items-center justify-center w-4 h-4 p-1 text-white bg-red-500 cursor-pointer rounded-2xl text-alsoit-text-sm"
                onClick={() => {
                  setInvite(!invite);
                  setSearchParams('');
                }}
              >
                x
              </span>
            </div>
          )}
        </div>
        <div className="text-orange-300 underline " style={{ fontSize: '10px', fontWeight: '600', lineHeight: '12px' }}>
          DEFAULT SHARE
        </div>
        <div className="flex items-center justify-between w-full h-8 gap-2 mt-2 text-orange-300">
          <div className="flex items-center gap-1">
            <ArrowRightFilled />
            <span>Share With</span>
            <div className="flex items-center justify-between w-16 gap-1 p-1 bg-white rounded-md">
              <AlsoitIcon dimensions={{ width: 15, height: 15 }} />
              <p style={{ fontSize: '8px', fontWeight: '600', lineHeight: '9.6px' }}>Workspace</p>
            </div>
          </div>
          <div className="flex items-center gap-7">
            <img src={AssigneeCollection} alt="cannot find" />
            <div className="flex items-center" style={{ transform: 'scale(.6)' }}>
              <label className="switch" onClick={(event) => event.stopPropagation()}>
                <input className="inputShow" type="checkbox" checked={true} />
                <div className="slider checked"></div>
              </label>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between w-full h-8 gap-2 mt-2 text-orange-300">
          <div className="flex items-center gap-1">
            <ArrowRightFilled />
            <span>Added to list</span>
            <div className="flex items-center justify-between w-4 h-4 p-1 bg-white rounded">
              <PersonAddIcon color="orange" />
            </div>
          </div>
          <div className="flex items-center">
            <img src={EllipseTemp} alt="cannot find" />
          </div>
        </div>
        <div className="flex items-center justify-center w-full mt-3">
          <div className="flex items-center justify-center h-6 gap-2 bg-white rounded-md w-52">
            <LockPersonIcon color="orange" />
            <p className="text-orange-300">Make Private</p>
          </div>
        </div>
      </div>
    </div>
  );
}
