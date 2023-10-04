import moment from 'moment-timezone';
import { IEntries, ITimeEntriesRes } from '../../../../features/task/interface.tasks';
import { BsStopCircle } from 'react-icons/bs';
import { AiOutlinePlayCircle } from 'react-icons/ai';
import AvatarWithInitials from '../../../avatar/AvatarWithInitials';
import { setTimerDetails } from '../../../../features/task/taskSlice';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { PoundsIcon } from '../../../../assets/icons/PoundsIcon';
import TagIcon from '../../../../assets/icons/TagIcon';
import { ActiveUsersTimer } from './ActiveUsersTimer';

interface Props {
  getTaskEntries: ITimeEntriesRes | undefined;
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
  handleTimeSwitch,
  prompt,
  sameEntity,
  setPrompt,
  stop,
  timerCheck
}: Props) {
  const dispatch = useAppDispatch();

  const { timerStatus, timerDetails } = useAppSelector((state) => state.task);
  const { initials, color } = useAppSelector((state) => state.userSetting);

  return (
    <>
      <div id="entries" className="flex items-center justify-between mt-8 pb-1.5">
        {/* timer goes here */}
        <div className="flex flex-col">
          <div className="flex space-x-1">
            {/* Avatar */}
            <div className="flex items-center">
              <AvatarWithInitials height="h-5" width="w-5" initials={initials ?? 'UN'} backgroundColour={color} />
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
            {/* Total Time */}
            <div className="flex items-center">
              <div
                onClick={() => dispatch(setTimerDetails({ ...timerDetails, isBillable: !timerDetails.isBillable }))}
                className="flex space-x-0.5 p-0.5 bg-white rounded-full"
              >
                <PoundsIcon active={timerDetails.isBillable} className="w-20 h-20" />
              </div>
              <span className="flex items-center justify-center">
                <TagIcon />
              </span>
            </div>
          </div>
          {/* active users timer goes here */}
          <ActiveUsersTimer activeTrackers={activeTrackers} />
        </div>
        {/* total time here */}
        <div id="right" className="flex flex-col items-center text-alsoit-gray-200 font-semibold">
          <div className="flex flex-col justify-center text-center px-1 py-0.5 relative border border-alsoit-success rounded-sm bg-white">
            <span className="text-alsoit-gray-200 absolute text-alsoit-text-sm -top-1.5 bg-alsoit-gray-50">
              Total time
            </span>
            <p className="text-alsoit-gray-200 bg-white rounded-md">
              {moment.utc((getTaskEntries as ITimeEntriesRes)?.data?.total_duration * 1000).format('HH:mm:ss')}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
