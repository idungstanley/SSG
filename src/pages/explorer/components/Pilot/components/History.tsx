import React from 'react';
import { useAppSelector } from '../../../../../app/hooks';
import FullScreenMessage from '../../../../../components/CenterMessage/FullScreenMessage';
import { InitialsAvatar, Spinner } from '../../../../../common';
import { useGetItemHistory } from '../../../../../features/general/history/historyService';
import { OutputDateTime } from '../../../../../app/helpers';

export default function History() {
  const { pilotSideOver } = useAppSelector((state) => state.slideOver);
  const { id, type } = pilotSideOver;

  // ! implement pagination
  const { data: logs, status } = useGetItemHistory({ type, id });

  return (
    <div className="flex-1 h-full">
      <div className="relative h-full">
        {status === 'error' ? (
          <FullScreenMessage title="Oops, an error occurred :(" description="Please try again later." />
        ) : status === 'loading' ? (
          <div className="justify-center w-6 mx-auto mt-12">
            <Spinner size={8} color="#0F70B7" />
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col h-full overflow-y-scroll">
            <ul className="flex-1 h-full divide-y divide-gray-200">
              {logs?.map((activityLog) => (
                <li key={activityLog.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <InitialsAvatar
                      size={10}
                      colour={activityLog.team_member.colour}
                      initials={activityLog.team_member.initials}
                    />

                    <div className="ml-3">
                      <p className="text-indigo-600">{activityLog.team_member.name}</p>
                      <p className="text-gray-400">{activityLog.category}</p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-400">{OutputDateTime(activityLog.created_at)}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
