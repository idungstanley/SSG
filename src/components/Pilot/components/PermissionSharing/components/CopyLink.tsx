import React, { useState } from 'react';
import { BiLinkAlt } from 'react-icons/bi';
import { BsInfoCircleFill } from 'react-icons/bs';
import ToolTip from '../../../../Tooltip/Tooltip';
import { generateViewsUrl } from '../../../../../utils/generateViewsUrl';
import { useAppSelector } from '../../../../../app/hooks';
import { useParams } from 'react-router-dom';

function CopyLink() {
  const [isCopied, setIsCopied] = useState<number>(0);
  const { activeItemId, activeItemType, entityForPermissions } = useAppSelector((state) => state.workspace);
  const currentProtocol = window.location.protocol;
  const currentHost = window.location.host;
  const { currentWorkspaceId } = useAppSelector((state) => state.auth);
  const hostWithProtocol = `${currentProtocol}//${currentHost}/${currentWorkspaceId}/`;
  const { activeView } = useAppSelector((state) => state.workspace);
  const { listId, hubId, walletId } = useParams();

  const currentActiveId = hubId ?? walletId ?? listId;

  const entityType = entityForPermissions
    ? entityForPermissions.type
      ? entityForPermissions.type
      : 'hub'
    : activeItemType;
  const entityId = entityForPermissions ? entityForPermissions.id : activeItemId ?? currentActiveId;

  const HandleCopyTaskUrl = async () => {
    const viewsUrl = generateViewsUrl(
      entityId as string,
      activeView?.id as string,
      undefined,
      entityType as string
    ) as string;
    const fullPath = hostWithProtocol + viewsUrl;
    await navigator.clipboard.writeText(fullPath);
    setIsCopied(1);
    setTimeout(() => {
      setIsCopied(2);
    }, 1000);
    setTimeout(() => {
      setIsCopied(0);
    }, 2000);
  };

  return (
    <div className="w-11/12 m-auto">
      <div className="w-full flex justify-between items-center">
        <div className="w-full flex gap-1 items-center">
          <BiLinkAlt className="w-3 h-3" />
          <h3 className="text-alsoit-text-lg">Private Link</h3>
          <ToolTip title="Only those with permissions can access with this link.">
            <BsInfoCircleFill className="w-3 h-3 text-alsoit-gray-75" />
          </ToolTip>
        </div>
        <button
          className="p-0.5 rounded bg-white border border-alsoit-gray-100 text-alsoit-text-md w-24"
          onClick={HandleCopyTaskUrl}
        >
          {isCopied === 0 ? 'Copy Link' : isCopied === 1 ? 'Copying...' : 'Copied'}
        </button>
      </div>
    </div>
  );
}

export default CopyLink;
