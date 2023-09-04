import { AiOutlinePlayCircle } from 'react-icons/ai';
import { IEntries } from '../../../../features/task/interface.tasks';
import Duration from '../../../../utils/TimerDuration';
import AvatarWithInitials from '../../../avatar/AvatarWithInitials';

interface ActiveUsersTimerProps {
  activeTrackers: IEntries[] | undefined;
}

export function ActiveUsersTimer({ activeTrackers }: ActiveUsersTimerProps) {
  return (
    <div>
      <div className="flex flex-col space-y-1 max-h-40">
        {activeTrackers?.map((trackers) => {
          const { hours, minutes, seconds } = Duration({ dateString: trackers });
          const { initials, color } = trackers.team_member.user;
          return (
            <div key={trackers.id} className="flex space-x-1 items-center space-y-1 overflow-y-auto w-44 h-min">
              <div className="flex items-center">
                <AvatarWithInitials
                  textSize="8px"
                  height="h-4"
                  width="w-4"
                  initials={initials}
                  backgroundColour={color}
                />
              </div>
              <div className="flex space-x-1 text-alsoit-text-md bg-alsoit-gray-75 p-1 rounded-md">
                <AiOutlinePlayCircle className="w-4 h-4 cursor-pointer text-white" aria-hidden="true" />
                <span>{`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(
                  seconds
                ).padStart(2, '0')}`}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
