import React from 'react';
import { useAppSelector } from '../../../../../app/hooks';
import FullScreenMessage from '../../../../../components/CenterMessage/FullScreenMessage';
import { InitialsAvatar, Spinner } from '../../../../../common';
import { useGetItemHistory } from '../../../../../features/general/history/historyService';
import { OutputDateTime } from '../../../../../app/helpers';

export default function History() {
  const { pilotSideOver } = useAppSelector((state) => state.slideOver);

  const id = pilotSideOver.id;
  const type = pilotSideOver.type;

  // ! implement pagination
  const { data: logs, status } = useGetItemHistory({ type, id });

  return (
    <div className="h-full flex-1">
      <div className="relative h-full">
        {status === 'error' ? (
          <FullScreenMessage
            title="Oops, an error occurred :("
            description="Please try again later."
          />
        ) : status === 'loading' ? (
          <div className="mx-auto w-6 justify-center mt-12">
            <Spinner size={8} color="#0F70B7" />
          </div>
        ) : (
          <div className="absolute inset-0 flex h-full overflow-y-scroll flex-col pt-2">
            <ul className="divide-y divide-gray-200 h-full flex-1">
              {logs?.map((activityLog) => (
                <li
                  key={activityLog.id}
                  className="py-2 flex justify-between items-center"
                >
                  <div className="space-y-2">
                    <div className="flex gap-3 justify-center items-center">
                      <InitialsAvatar
                        size={6}
                        colour={activityLog.team_member.colour}
                        initials={activityLog.team_member.initials}
                      />

                      <p className="text-indigo-600 mb-0">
                        {activityLog.team_member.name}
                      </p>
                    </div>

                    <p className="text-gray-400 mb-0">{activityLog.category}</p>
                  </div>

                  <p className="text-gray-400 mb-0">
                    {OutputDateTime(activityLog.created_at)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
