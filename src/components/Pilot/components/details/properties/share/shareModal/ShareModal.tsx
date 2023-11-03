import React, { useState } from 'react';
import { Menu as HeadMenu } from '@headlessui/react';
import { TfiWorld } from 'react-icons/tfi';
import { BsInfoLg, BsShare } from 'react-icons/bs';
import { BiLinkAlt } from 'react-icons/bi';
import { AiOutlineBranches } from 'react-icons/ai';
import { Menu } from '@mui/material';

export default function ShareModal({ taskId, taskName }: { taskId?: string; taskName?: string }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isBranchCopied, setIsBranchCopied] = useState(false);

  // const handleCopy = async () => {
  //   try {
  //     await navigator.clipboard.writeText(taskId as string);
  //     setIsCopied(true);
  //     setTimeout(() => {
  //       setIsCopied(false);
  //     }, 2000);
  //   } catch (error) {
  //     alert(`Failed to copy: ${error}`);
  //   }
  // };

  const branchName = `AWM-${taskId}-${taskName?.split(' ').join('_')}`;

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
    <>
      <div onClick={(e: React.MouseEvent<HTMLDivElement>) => setAnchorEl(e.currentTarget)}>
        <HeadMenu>
          <HeadMenu.Button className="flex items-center gap-1 p-0.5 text-sm text-white rounded-md bg-alsoit-purple-300">
            <BsShare className="text-xs h-2.5" />
            <p className="text-alsoit-text-lg">Share</p>
          </HeadMenu.Button>
        </HeadMenu>
      </div>
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={() => setAnchorEl(null)} style={{ marginTop: '60px' }}>
        <div className="p-2" style={{ zIndex: '100', width: '540px' }}>
          <h1 className="pt-1 text-black" style={{ fontSize: '18px' }}>
            Share this task
          </h1>
          <br />
          <p className="pb-3 " style={{ fontSize: '14px' }}>
            Sharing a task
          </p>

          <div id="inviteInput" className="flex items-center w-12/12">
            <input type="text" placeholder="Invite by name or email" style={{ width: '80%', height: '30px' }} />
            <p
              className="flex items-center justify-center text-white bg-purple-500"
              style={{ width: '20%', height: '30px' }}
            >
              Invite
            </p>
          </div>

          <div id="shareWithEveryOne" style={{ fontSize: '14px' }}>
            <div id="iconText" className="flex items-center justify-between py-1 ">
              <div className="flex items-center justify-between gap-2">
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
            <div id="private" className="flex items-center justify-between">
              <div className="flex items-center justify-between gap-2 py-1">
                <p>
                  <BiLinkAlt />
                </p>
                <p>Private link</p>
                <p id="infoIcon">
                  <BsInfoLg />
                </p>
              </div>
              <button className="p-1 text-sm border-2 rounded">Copy link</button>
            </div>

            <div id="branch" className="flex items-center justify-between pb-2">
              <div className="flex items-center justify-between gap-2">
                <p>
                  <AiOutlineBranches />
                </p>
                <p>Create Branch</p>
              </div>
              <p className="z-50 cursor-pointer bg-bl">
                <button
                  className={`${
                    !isBranchCopied
                      ? 'bg-white border-2 text-black p-1 rounded-md text-sm hover:bg-gray-300'
                      : 'bg-gray-400 border-2 text-white p-1 rounded-md text-sm'
                  }`}
                  onClick={handleBranchName}
                >
                  {!isBranchCopied ? 'Copy Branch Name' : 'Branch Name Copied'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </Menu>
    </>
  );
}
