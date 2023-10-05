import dayjs from 'dayjs';
import { IEntries } from '../../../../features/task/interface.tasks';
import ToolTip from '../../../Tooltip/Tooltip';
import AvatarWithImage from '../../../avatar/AvatarWithImage';
import AvatarWithInitials from '../../../avatar/AvatarWithInitials';
import { RealTime } from './RealTime';

interface Props {
  timeData?: IEntries[];
}

export function ActiveTimeStrip({ timeData }: Props) {
  const Timers = () =>
    timeData?.map((entry) => (
      <div key={entry.id} className="w-full flex py-2.5 bg-white">
        <span className="text-alsoit-text-xi font-semibold w-20 flex justify-center items-center">
          <ToolTip title={entry.team_member.user.name}>
            {!entry.team_member.user.avatar_path ? (
              <AvatarWithInitials
                height="h-5"
                width="w-5"
                initials={entry.team_member.user.initials}
                backgroundColour={entry.team_member.user.color}
              />
            ) : (
              <AvatarWithImage image_path={entry.team_member.user.avatar_path} />
            )}
          </ToolTip>
        </span>
        <span className="text-alsoit-text-xi font-semibold w-20 flex justify-center items-center">
          <RealTime />
        </span>
        <span className="text-alsoit-text-xi font-semibold w-20 flex justify-center items-center">
          {dayjs(entry.start_date).format('ddd D, HH:mm a')}
        </span>
      </div>
    ));

  if (!timeData || timeData.length === 0) {
    return (
      <span className="text-center text-alsoit-text-sm italic w-full py-2.5">
        Timer already running on another entity
      </span>
    );
  }

  return Timers();
}
