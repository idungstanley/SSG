import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { InitialsAvatar } from '../../../../../../../../common';

function Activity() {
  const selectedInboxFileFullDetails = useSelector((state) => state.inbox.selected_inbox_file_full_details);
  const selectedInboxFileLoadingFullDetails = useSelector((state) => state.inbox.selected_inbox_file_loading_full_details);

  if (selectedInboxFileLoadingFullDetails === true) {
    return (
      <p className="p-5">Loading...</p>
    );
  }

  return (
    <div className="h-full flex-1">
      <div className="relative h-full">
        <div className="absolute inset-0 flex h-full overflow-y-scroll flex-col px-5 pt-2 pb-7">
          <ul className="divide-y divide-gray-200 h-full flex-1">
            {selectedInboxFileFullDetails?.inbox_file_activity_logs.map((activityLog) => (
              <li key={activityLog.id} className="py-4">
                <div className="flex space-x-3">
                  {activityLog.team_member !== null ? (
                    <InitialsAvatar
                      size={6}
                      colour={activityLog.team_member.colour}
                      initials={activityLog.team_member.initials}
                    />
                  ) : (
                    <InitialsAvatar
                      size={6}
                      colour="#4F46E5"
                      initials="U"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex">
                        <p className="text-sm text-gray-500">
                          {activityLog.description}
                          {' '}
                          {activityLog.team_member !== null && 'by'}
                        </p>
                        {activityLog.team_member !== null && (
                          <h3 className="text-sm font-medium  ml-1">{activityLog.team_member.user.name}</h3>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{ moment(activityLog.created_at).fromNow() }</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Activity;
