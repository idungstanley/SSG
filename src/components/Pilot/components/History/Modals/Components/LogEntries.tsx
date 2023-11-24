import moment from 'moment-timezone';
import { IActivityLog } from '../../../../../../features/general/history/history.interfaces';
import AvatarWithImage from '../../../../../avatar/AvatarWithImage';
import { InitialsAvatar } from '../../../../../../common';
import AvatarWithInitials from '../../../../../avatar/AvatarWithInitials';

interface Props {
  logsArr: IActivityLog[];
}

export function LogEntries({ logsArr }: Props) {
  return logsArr.map((activityLog) => {
    const { created_at, category, model, created_by } = activityLog;
    const { user } = created_by;
    const startDate = moment(created_at);
    const currentDate = moment(new Date().toISOString());
    const duration = moment.duration(currentDate.diff(startDate));
    const time = moment(created_at.substring(11, 19), 'HH:mm:ss').format('h:mm A');
    return (
      <tr
        key={activityLog.id}
        className="flex items-center w-full px-1 py-1 space-x-6 border-t border-b border-blueGray-300"
      >
        <td>
          {user ? (
            user.avatar_path ? (
              <AvatarWithImage image_path={user.avatar_path} height="h-5" width="w-5" roundedStyle="circular" />
            ) : (
              <InitialsAvatar size={6} colour={user.color} initials={user.initials} />
            )
          ) : (
            <AvatarWithInitials initials="UN" height="h-5" width="w-5" roundedStyle="circular" />
          )}
        </td>
        <td className="text-xs">
          <span>{duration.humanize()} ago</span>
        </td>
        <td>
          <span className="text-xs">{time}</span>
        </td>
        {user && (
          <td className="text-xs text-gray-400 capitalize">
            {user.name} {category} {model}
          </td>
        )}
      </tr>
    );
  });
}
