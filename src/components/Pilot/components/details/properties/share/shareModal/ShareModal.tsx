import React, { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { TfiWorld } from 'react-icons/tfi';
import { BsInfoLg } from 'react-icons/bs';
import { BiLinkAlt } from 'react-icons/bi';
import { AiOutlineBranches } from 'react-icons/ai';

export default function ShareModal({ taskId, taskName }: { taskId?: string; taskName?: string }) {
  const [isBranchCopied, setIsBranchCopied] = useState(false);

  const branchName = `${taskId}/${taskName?.split(' ').join('_')}`;

  const handleBranchName = async () => {
    try {
      await navigator.clipboard.writeText(branchName);
      setIsBranchCopied(true);
      setTimeout(() => {
        setIsBranchCopied(false);
      }, 1000);
    } catch (error) {
      alert(`Failed to copy: ${error}`);
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex text-sm ">
          <p className="text-gray-400 ">Share</p>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="thickBoxShadow origin-top-right absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none -ml-32 p-2"
          style={{ minHeight: '140px', width: '940%', marginLeft: '-302px', marginTop: '60px', zIndex: '100' }}
        >
          <div id="taskDetals">
            <h1 className="text-black pt-1" style={{ fontSize: '18px' }}>
              Share this task
            </h1>
            <br />
            <p className="pb-3 " style={{ fontSize: '14px' }}>
              Sharing a task
            </p>

            <div id="inviteInput" className="flex items-center w-12/12">
              <input
                type="text"
                placeholder="Invite by name or email"
                className=""
                style={{ width: '80%', height: '30px' }}
              />
              <p
                className="flex justify-center items-center text-white bg-purple-500"
                style={{ width: '20%', height: '30px' }}
              >
                Invite
              </p>
            </div>

            <div id="shareWithEveryOne" style={{ fontSize: '14px' }}>
              <div id="iconText" className="flex justify-between items-center py-1 ">
                <div className="flex justify-between items-center gap-2">
                  <p>
                    <TfiWorld />
                  </p>
                  <p className="text-md">Share link with anyone</p>
                  <p id="infoIcon">
                    <BsInfoLg />
                  </p>
                </div>
                <input type="checkbox" />
              </div>
              <div id="private" className="flex justify-between items-center">
                <div className="flex justify-between items-center gap-2 py-1">
                  <p>
                    <BiLinkAlt />
                  </p>
                  <p>Private link</p>
                  <p id="infoIcon">
                    <BsInfoLg />
                  </p>
                </div>
                <button className="border-2 p-1 rounded text-sm">Copy link</button>
              </div>

              <div id="branch" className="flex justify-between items-center pb-2">
                <div className="flex justify-between items-center gap-2">
                  <p>
                    <AiOutlineBranches />
                  </p>
                  <p>Create Branch</p>
                </div>
                <p className=" cursor-pointer bg-bl z-50">
                  <button
                    className={`${
                      !isBranchCopied
                        ? 'bg-white border-2 text-black p-1 rounded-md text-sm hover:bg-gray-300'
                        : 'bg-gray-400 border-2 text-white p-1 rounded-md text-sm'
                    }`}
                    onClick={handleBranchName}
                  >
                    {!isBranchCopied ? 'Copy Branch Name' : 'Branch Name Copid'}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
