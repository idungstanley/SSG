import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { InitialsAvatar } from '../../../../../common';

export default function Activity() {
  const { selectedItemFullDetails } = useSelector((state) => state.explorer);

  return (
    <ul className="divide-y divide-gray-200">
      {selectedItemFullDetails.folder_activity_logs.map((activityLog) => (
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
                  <h3 className="text-sm font-medium  ml-1">
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
