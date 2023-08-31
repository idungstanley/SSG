import moment from 'moment-timezone';
import { IEntries, ITimeEntriesRes } from '../../../../features/task/interface.tasks';
import { BsStopCircle } from 'react-icons/bs';
import { AiOutlinePlayCircle } from 'react-icons/ai';
import AvatarWithInitials from '../../../avatar/AvatarWithInitials';
import Duration from '../../../../utils/TimerDuration';
import { setTimerDetails } from '../../../../features/task/taskSlice';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { PoundsIcon } from '../../../../assets/icons/PoundsIcon';
import TagIcon from '../../../../assets/icons/TagIcon';

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
        <span className="text-alsoit-gray-200">Tabs Name Here: </span>
        {/* total time here */}
        <div className="flex flex-col justify-center text-center px-1 py-0.5">
          <span className="text-alsoit-gray-200">Total time</span>
          <p className="text-alsoit-gray-200 bg-white rounded-md">
            {moment.utc((getTaskEntries as ITimeEntriesRes)?.data?.total_duration * 1000).format('HH:mm:ss')}
          </p>
        </div>
      </div>
      <div id="descNote" className="w-full my-3 text-white">
        <input
          type="text"
          name="description"
          onChange={(e) => handleEndTimeChange(e.target.value)}
          placeholder="Enter a note"
          className="w-full border rounded shadow-sm text-alsoit-gray-300"
        />
      </div>
      <div id="entries" className="flex items-center justify-between py-1">
        {/* timer goes here */}
        <div className="flex flex-col">
          <div className="flex space-x-1">
            {/* Avatar */}
            <div className="flex items-center p-1 rounded-md bg-alsoit-purple-400">
              <AvatarWithInitials height="h-4" width="w-4" initials={initials ?? 'UN'} />
            </div>
            {/* Timer */}
            <div
              id="left"
              className={`flex items-center cursor-pointer ${
                !timerStatus ? 'bg-alsoit-success' : 'bg-alsoit-gray-75'
              } px-1 py-0.5 rounded-md`}
            >
              <div className="relative flex items-start mr-1">
                {timerStatus && sameEntity() ? (
                  <button onClick={stop}>
                    <BsStopCircle className="w-4 h-4 text-red-400 cursor-pointer" aria-hidden="true" />
                  </button>
                ) : (
                  <button onClick={() => activeTimerCheck()}>
                    <AiOutlinePlayCircle className="w-4 h-4 cursor-pointer text-white" aria-hidden="true" />
                  </button>
                )}
                {/* Active Timer Prompt */}
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
              <div className="flex items-center space-x-2">{timerCheck()}</div>
            </div>
          </div>
          {/* active users timer goes here */}
          <div>
            <div className="flex flex-col space-y-1 max-h-40">
              {activeTrackers?.map((trackers) => {
                const { hours, minutes, seconds } = Duration({ dateString: trackers });
                const { initials } = trackers.team_member.user;
                return (
                  <div key={trackers.id} className="flex items-center space-y-1 overflow-y-auto w-44 h-min">
                    <div className="flex items-center p-1 rounded-md bg-alsoit-purple-400">
                      <AvatarWithInitials height="h-4" width="w-4" textSize="text-alsoit-text-sm" initials={initials} />
                    </div>
                    <div className="text-alsoit-text-md">
                      {`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(
                        seconds
                      ).padStart(2, '0')}`}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div id="right" className="flex flex-col items-center text-alsoit-gray-200 font-semibold">
          <span className="flex justify-end w-full">Bill task</span>
          <div className="flex items-start">
            <span className="flex items-center justify-center">
              <TagIcon />
            </span>
            <div
              onClick={() => dispatch(setTimerDetails({ ...timerDetails, isBillable: !timerDetails.isBillable }))}
              className="flex space-x-0.5"
            >
              <PoundsIcon active={timerDetails.isBillable} />
              <span>0.00</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
