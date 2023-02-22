import React from 'react';
import { useAppSelector } from '../../../../app/hooks';
import {
  useGetExplorerFile,
  useGetExplorerFolder,
} from '../../../../features/explorer/explorerService';
import { OutputDateTime } from '../../../../app/helpers';
import { UseGetHubDetails } from '../../../../features/hubs/hubService';
import { UseGetWalletDetails } from '../../../../features/wallet/walletService';
import { UseGetListDetails } from '../../../../features/list/listService';

export default function Information() {
  const { pilotSideOver } = useAppSelector((state) => state.slideOver);
  const { id, type } = pilotSideOver;

  const { data: folder } = useGetExplorerFolder(id, type === 'folder');

  const { data: file } = useGetExplorerFile(id, type === 'file');

  const { data: hub } = UseGetHubDetails({
    activeItemId: id,
    activeItemType: type,
  });

  const { data: wallet } = UseGetWalletDetails({
    activeItemId: id,
    activeItemType: type,
  });

  const { data: list } = UseGetListDetails({
    activeItemId: id,
    activeItemType: type,
  });

  const data =
    folder?.data.current_folder ||
    file ||
    wallet?.data.wallet ||
    list?.data.list ||
    hub?.data.hub;

  const info = [
    {
      id: 1,
      key: 'Last modified at',
      value: data && OutputDateTime(data.updated_at),
    },
    {
      id: 2,
      key: 'Created at',
      value: data && OutputDateTime(data.created_at),
    },
  ];

  return (
    <>
      {data ? (
        <div className="flex flex-col text-sm font-medium border-b divide-y divide-gray-200">
          {info.map((item) => (
            <div key={item.key} className="flex justify-between py-3">
              <p className="text-gray-500">{item.key}</p>
              <span className="text-gray-700">{item.value}</span>
            </div>
          ))}
        </div>
      ) : null}
      {/* {item.shared_by ? (
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
        ) : null} */}
    </>
  );
}
