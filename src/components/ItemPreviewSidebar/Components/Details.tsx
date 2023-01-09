import React, { useState } from 'react';
import { FileIcon } from '../../../common';
import {
  DownloadFile,
  OutputDateTime,
  OutputFileSize,
} from '../../../app/helpers';
import ComboBoxForTeamMembers from '../../comboBox/ComboBoxForTeamMembers';
import { useGetFilteredTeamMembers } from '../../../features/permissions/permissionsService';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { IExplorerAndSharedData } from '../../../features/shared/shared.interfaces';
import { explorerItemType } from '../../../types';
import { setShowWatchersSideOver } from '../../../features/general/slideOver/slideOverSlice';
import { useShareItem } from '../../../features/shared/sharedService';

interface DetailsProps {
  item: IExplorerAndSharedData;
  type: explorerItemType;
}

export default function Details({ item, type }: DetailsProps) {
  const dispatch = useAppDispatch();
  const onShowWatchers = () =>
    dispatch(setShowWatchersSideOver({ show: true, type }));
  const [showPopup, setShowPopup] = useState(false);

  const title =
    item.display_name || item.name || item.file.name || item.folder.name;
  const size = type === 'file' ? item.size : null;
  const extension = type === 'file' ? title.split('.').at(-1) : 'folder';

  const { currentUserId } = useAppSelector((state) => state.auth);
  const { users } = useGetFilteredTeamMembers(currentUserId);
  const { mutate: onShare } = useShareItem();

  const onClickUser = (userId: string) => {
    if (userId) {
      onShare({
        type,
        itemId: item.id,
        userId,
      });
    }
    setShowPopup(false);
  };

  const onDownload = async () => {
    DownloadFile(type, item.id, title);
  };

  const buttonsArr = [
    {
      id: 1,
      label: 'Download',
      onClick: onDownload,
      isVisible: true,
    },
    {
      id: 2,
      label: 'Share',
      onClick: () => setShowPopup(true),
      isVisible: users?.length && !item.shared_by,
    },
    {
      id: 3,
      label: 'Watchers',
      onClick: onShowWatchers,
      isVisible: true,
    },
    {
      id: 4,
      label: 'Chat',
      onClick: () => ({}),
      isVisible: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="block w-24 h-10 overflow-hidden">
          <FileIcon extensionKey={extension} size={10} />
        </div>
        <div className="flex items-start justify-between mt-4">
          <div>
            <h2 className="text-lg font-medium text-gray-900">
              <span className="sr-only">Details for </span>
              {title}
            </h2>
            {size ? (
              <p className="text-sm font-medium text-gray-500">
                {OutputFileSize(size)}
              </p>
            ) : null}
          </div>
        </div>
      </div>
      <div className="relative flex flex-wrap gap-3">
        {buttonsArr.map((button) =>
          button.isVisible ? (
            <button
              key={button.id}
              onClick={button.onClick}
              type="button"
              className="flex-1 px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none ring-0 focus:ring-0"
            >
              {button.label}
            </button>
          ) : null
        )}
        {showPopup && users ? (
          <ComboBoxForTeamMembers
            setShowPopup={setShowPopup}
            onClickArrow={onClickUser}
            absolute={!false}
            users={users}
          />
        ) : null}
      </div>
      <div>
        <h3 className="font-medium text-gray-900">Information</h3>
        <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
          <div className="flex justify-between py-3 text-sm font-medium">
            <dt className="text-gray-500">Last modified</dt>
            <dd className="text-gray-900">{OutputDateTime(item.updated_at)}</dd>
          </div>
          <div className="flex justify-between py-3 text-sm font-medium">
            <dt className="text-gray-500">Created</dt>
            <dd className="text-gray-900">{OutputDateTime(item.created_at)}</dd>
          </div>
          {item.shared_by ? (
            <>
              <h3 className="py-2 font-medium text-gray-900">Shared by</h3>
              <div className="flex justify-between py-3 text-sm font-medium">
                <dt className="text-gray-500">User name</dt>
                <dd className="text-gray-900">{item.shared_by.user.name}</dd>
              </div>
              <div className="flex justify-between py-3 text-sm font-medium">
                <dt className="text-gray-500">User email</dt>
                <dd className="text-gray-900">{item.shared_by.user.email}</dd>
              </div>
            </>
          ) : null}
        </dl>
      </div>
    </div>
  );
}
