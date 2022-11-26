import React from 'react';
import { useSelector } from 'react-redux';
import { InitialsAvatar } from '../../../../../../../../common';
import { useGetInboxFileActivity } from '../../../../../../../../features/inbox/inboxService';

function Activity() {
  const selectedInboxFileId = useSelector(
    (state) => state.inbox.selectedInboxFileId,
  );
  const { data, status } = useGetInboxFileActivity(selectedInboxFileId);

  const logs = data?.data.logs;
  // eslint-disable-next-line no-console
  console.log(status);

  return (
    <div className="h-full flex-1">
      <div className="relative h-full">
        <div className="absolute inset-0 flex h-full overflow-y-scroll flex-col px-5 pt-2 pb-7">
          <ul className="divide-y divide-gray-200 h-full flex-1">
            {logs?.map((activityLog) => (
              <li key={activityLog.id} className="py-4 flex justify-between content-between">
                <div className="flex space-x-3">
                  {activityLog.team_member !== null ? (
                    <InitialsAvatar
                      size={6}
                      colour={activityLog.team_member.colour}
                      initials={activityLog.team_member.initials}
                    />
                  ) : (
                    <InitialsAvatar size={6} colour="#4F46E5" initials="U" />
                  )}
                  <div className="flex items-center gap-1">
                    <p className="text-sm">
                      {`${activityLog.description || ''} ${
                        activityLog.team_member !== null && 'by'
                      }`}
                    </p>
                    {activityLog.team_member !== null && (
                      <h3 className="text-sm font-medium  ml-1 text-indigo-600">
                        {activityLog.team_member.name}
                      </h3>
                    )}
                  </div>
                </div>
                <p className="text-gray-400">{activityLog.type}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Activity;
