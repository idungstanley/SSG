import React from 'react';
import { useAppSelector } from '../../../../../../../../app/hooks';
import { InitialsAvatar, Spinner } from '../../../../../../../../common';
import FullScreenMessage from '../../../../../../../../components/CenterMessage/FullScreenMessage';
import { useGetInboxFileActivity } from '../../../../../../../../features/inbox/inboxService';

function Activity() {
  const { selectedInboxFileId } = useAppSelector((state) => state.inbox);
  const { data, status } = useGetInboxFileActivity(selectedInboxFileId);

  const logs = data?.data.logs;

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
          <div className="absolute inset-0 flex h-full overflow-y-scroll flex-col px-5 pt-2">
            <ul className="divide-y divide-gray-200 h-full flex-1">
              {logs?.map((activityLog) => (
                <li
                  key={activityLog.id}
                  className="py-4 flex justify-between items-center"
                >
                  <div className="flex gap-3 justify-center items-center">
                    {activityLog.team_member ? (
                      <InitialsAvatar
                        size={6}
                        colour={activityLog.team_member.colour}
                        initials={activityLog.team_member.initials}
                      />
                    ) : (
                      <InitialsAvatar size={6} colour="#4F46E5" initials="U" />
                    )}
                    {activityLog.team_member ? (
                      <p className="text-indigo-600 mb-0">
                        {activityLog.team_member.name}
                      </p>
                    ) : null}
                  </div>

                  <p className="text-gray-400 mb-0">{activityLog.type}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Activity;
