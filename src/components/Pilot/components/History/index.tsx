import React from 'react';
import { useAppSelector } from '../../../../app/hooks';
import FullScreenMessage from '../../../CenterMessage/FullScreenMessage';
import { InitialsAvatar, Spinner } from '../../../../common';
import { useGetItemHistory } from '../../../../features/general/history/historyService';
import { OutputDateTime } from '../../../../app/helpers';
import SectionArea from '../SectionArea';
import { DocumentTextIcon } from '@heroicons/react/24/outline';

export default function History() {
  const { pilotSideOver } = useAppSelector((state) => state.slideOver);

  const id = pilotSideOver.id;
  const type = pilotSideOver.type;

  // ! implement pagination
  const { data: logs, status } = useGetItemHistory({ type, id });

  return (
    <>
      <SectionArea label="Logs" icon={<DocumentTextIcon className="w-4 h-4" />} />

      <div className="relative h-full w-full">
        {/* status checking */}
        {status === 'error' ? (
          <FullScreenMessage title="Oops, an error occurred :(" description="Please try again later." />
        ) : status === 'loading' ? (
          <div className="mx-auto w-6 justify-center mt-12">
            <Spinner size={8} color="#0F70B7" />
          </div>
        ) : logs ? (
          !logs.length ? (
            <FullScreenMessage title="No logs yet" description="Do any action." />
          ) : (
            <ul className="absolute top-0 left-0 flex w-full h-full overflow-y-scroll flex-col divide-y divide-gray-200">
              {/* logs list */}
              {logs.map((activityLog) => (
                <li key={activityLog.id} className="py-2 flex justify-between items-center">
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

                  <p className="text-gray-400 text-sm">{OutputDateTime(activityLog.created_at)}</p>
                </li>
              ))}
            </ul>
          )
        ) : null}
      </div>
    </>
  );
}
