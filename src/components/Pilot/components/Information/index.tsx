import React from 'react';
import { useAppSelector } from '../../../../app/hooks';
import {
  useGetExplorerFile,
  useGetExplorerFolder,
} from '../../../../features/explorer/explorerService';
import { OutputDateTime } from '../../../../app/helpers';
import { UseGetHubDetails } from '../../../../features/hubs/hubService';

export default function Information() {
  const { pilotSideOver } = useAppSelector((state) => state.slideOver);

  const id = pilotSideOver.id;
  const type = pilotSideOver.type;

  const { data: folder } = useGetExplorerFolder(id, type === 'folder');

  const { data: file } = useGetExplorerFile(id, type === 'file');

  const { data: hub } = UseGetHubDetails({
    activeItemId: id,
    activeItemType: type,
  });

  const data = folder?.data.current_folder || file || hub?.data.hub;

  const info = [
    {
      key: 'Last modified at',
      value: data && OutputDateTime(data.updated_at),
    },
    {
      key: 'Created at',
      value: data && OutputDateTime(data.created_at),
    },
  ];

  return (
    <>
      {data ? (
        <div className="flex border-b flex-col justify-center text-sm font-medium divide-y divide-gray-200">
          {info.map((item) => (
            <div key={item.key} className="flex py-3 justify-between">
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
