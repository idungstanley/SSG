import React from 'react';
import moment from 'moment';
import { InitialsAvatar } from '../../../../../common';
import { useAppSelector } from '../../../../../app/hooks';


export default function Activity() {
  const { selectedItemFullDetails } = useAppSelector((state) => state.explorer);

  return (
    <ul className="divide-y divide-gray-200">
      {selectedItemFullDetails?.folder_activity_logs.map((activityLog) => (
        <li key={activityLog.id} className="py-4">
          <div className="flex space-x-3">
            <InitialsAvatar
              size={6}
              colour={activityLog.team_member.colour}
              initials={activityLog.team_member.initials}
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex">
                  <p className="text-sm text-gray-500">
                    {activityLog.description} by
                  </p>
                  <h3 className="ml-1 text-sm font-medium">
                    {activityLog.team_member.user.name}
                  </h3>
                </div>
                <p className="text-sm text-gray-500">
                  {moment(activityLog.created_at).fromNow()}
                </p>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
