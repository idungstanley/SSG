import moment from 'moment-timezone';
import { IEntries, ITimeEntriesRes } from '../../../../features/task/interface.tasks';
import { BsStopCircle } from 'react-icons/bs';
import { AiOutlinePlayCircle } from 'react-icons/ai';
import AvatarWithInitials from '../../../avatar/AvatarWithInitials';
import Duration from '../../../../utils/TimerDuration';
import TagIcon from '../../../../assets/icons/TagIcon';
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { setTimerDetails } from '../../../../features/task/taskSlice';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';

interface Props {
  getTaskEntries: ITimeEntriesRes | undefined;
  handleEndTimeChange: (value: string) => void;
  sameEntity: () => boolean;
  stop: () => void;
  timerCheck: () => JSX.Element;
  activeTimerCheck: () => void;
  prompt: boolean;
  setPrompt: (value: React.SetStateAction<boolean>) => void;
  handleTimeSwitch: () => void;
  activeTrackers: IEntries[] | undefined;
}

export default function AutomaticTimeElement({
  activeTimerCheck,
  activeTrackers,
  getTaskEntries,
  handleEndTimeChange,
  handleTimeSwitch,
  prompt,
  sameEntity,
  setPrompt,
  stop,
  timerCheck
}: Props) {
  const dispatch = useAppDispatch();

  const { timerStatus, timerDetails } = useAppSelector((state) => state.task);
  const { initials } = useAppSelector((state) => state.userSetting);

  return (
    <>
      <div
        id="taskUser"
        className="flex items-center justify-between h-10 py-3 font-semibold cursor-pointer text-alsoit-text-lg"
      >
        <span>Tabs Name Here: </span>
        {/* total time here */}
        <p>{moment.utc((getTaskEntries as ITimeEntriesRes)?.data?.total_duration * 1000).format('HH:mm:ss')}</p>
      </div>
      <div id="descNote" className="w-full my-3 text-white">
        <input
          type="text"
          name="description"
          onChange={(e) => handleEndTimeChange(e.target.value)}
          placeholder="Enter a note"
          className="w-full border-0 rounded shadow-sm text-alsoit-gray-300"
        />
      </div>
      <div id="entries" className="flex items-center justify-between py-1">
        <div id="left" className="flex items-center space-x-1 cursor-pointer">
          <div className="relative flex items-start mr-1">
            {timerStatus && sameEntity() ? (
              <button onClick={stop}>
                <BsStopCircle className="w-4 h-4 text-red-400 cursor-pointer" aria-hidden="true" />
              </button>
            ) : (
              <button onClick={() => activeTimerCheck()}>
                <AiOutlinePlayCircle className="w-4 h-4 cursor-pointer text-alsoit-success" aria-hidden="true" />
              </button>
            )}
            {prompt && (
              <div className="absolute z-50 flex flex-col p-2 space-y-1 rounded-lg shadow-2xl top-5 bg-alsoit-gray-75 w-72">
                <span className="text-center text-alsoit-gray-300">
                  Another Timer Already Running would you want to stop the active timer and continue here?
                </span>
                <div className="flex justify-end w-full space-x-1">
                  <button
                    className="p-1 font-bold text-white rounded-lg bg-alsoit-text hover:bg-alsoit-text-active"
                    onClick={() => setPrompt(false)}
                  >
                    No
                  </button>
                  <button
                    className="p-1 font-bold text-white rounded-lg bg-alsoit-text-active hover:bg-purple-600"
                    onClick={() => handleTimeSwitch()}
                  >
                    Yes
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* timer goes here */}
          <div className="flex flex-col space-y-1">
            <div className="flex items-center space-x-2">
              {timerCheck()}
              <AvatarWithInitials height="h-4" width="w-4" initials={initials ?? 'UN'} />
            </div>
            {activeTrackers?.map((trackers) => {
              const { hours, minutes, seconds } = Duration({ dateString: trackers });
              const { initials } = trackers.team_member.user;
              return (
                <div key={trackers.id} className="flex items-center space-x-2 space-y-1 overflow-y-auto w-44 h-min">
                  <div className="text-alsoit-text-md">
                    {`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
                      2,
                      '0'
                    )}`}
                  </div>
                  <AvatarWithInitials height="h-4" width="w-4" textSize="text-alsoit-text-sm" initials={initials} />
                </div>
              );
            })}
          </div>
        </div>
        <div id="right" className="flex items-center space-x-1">
          <span className="flex items-center justify-center p-1 ml-1 border-2 border-white border-dotted rounded-full">
            <TagIcon className="h-5 text-white" aria-hidden="true" />
          </span>
          <CurrencyDollarIcon
            className={`${
              timerDetails.isBillable
                ? 'bg-alsoit-success rounded-full h-9  text-alsoit-gray-50 cursor-pointer text-alsoit-text-lg'
                : 'text-alsoit-gray-50 cursor-pointer text-alsoit-text-lg rounded-full h-9'
            }`}
            aria-hidden="true"
            onClick={() => dispatch(setTimerDetails({ ...timerDetails, isBillable: !timerDetails.isBillable }))}
          />
        </div>
      </div>
    </>
  );
}
