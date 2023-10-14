import dayjs from 'dayjs';
import { IEntries } from '../../../../features/task/interface.tasks';
import ToolTip from '../../../Tooltip/Tooltip';
import AvatarWithImage from '../../../avatar/AvatarWithImage';
import AvatarWithInitials from '../../../avatar/AvatarWithInitials';

interface Props {
  timeEntry: IEntries;
}

export function TimeLogEntries({ timeEntry }: Props) {
  return (
    <div className="flex items-center w-full border-t-2">
      <div className="flex items-center space-x-14">
        {/* User Avatar */}
        <ToolTip title={timeEntry.team_member.user.name}>
          <div className="py-1.5 w-14 flex justify-center">
            {timeEntry.team_member.user.avatar_path ? (
              <AvatarWithImage
                image_path={timeEntry.team_member.user.avatar_path}
                height="h-7"
                width="w-7"
                roundedStyle="circular"
              />
            ) : (
              <ToolTip title={timeEntry.team_member.user.name}>
                <AvatarWithInitials
                  initials={timeEntry.team_member.user.initials}
                  height="h-7"
                  width="w-7"
                  textSize="7px"
                  backgroundColour={timeEntry.team_member.user.color}
                />
              </ToolTip>
            )}
          </div>
        </ToolTip>
        {/* Duration */}
        <div className="py-1.5 w-14 text-alsoit-text-sm text-center tracking-wide relative">
          <div className="absolute text-alsoit-text-sm capitalize -top-0.5 -left-9 font-light px-0.5 bg-alsoit-gray-50 rounded-md">
            {timeEntry.type === 'real' ? 'real time' : timeEntry.type}
          </div>
          {dayjs.duration(timeEntry.duration, 'seconds').format('HH:mm:ss')}
        </div>
      </div>
      <div className="flex justify-around space-x-9">
        {/* Start Date */}
        <div className="py-1.5 w-40 text-alsoit-text-sm flex justify-center border-r-2">
          {dayjs(timeEntry.start_date).format('ddd DD, MMM')}
        </div>
        {/* single label */}
        <div className="py-1.5 w-40 flex justify-center border-r-2 gapFixes">-</div>
        {/* End Date */}
        <div className="py-1.5 w-40 flex justify-center text-alsoit-text-sm border-r-2 gapFixes">
          {dayjs(timeEntry.end_date).format('ddd DD, MMM')}
        </div>
        {/* tags */}
        <div className="py-1.5 w-40 flex justify-center border-r-2 gapFixes">-</div>
      </div>
    </div>
  );
}
