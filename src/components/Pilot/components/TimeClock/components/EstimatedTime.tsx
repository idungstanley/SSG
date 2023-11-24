import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { StartIcon } from '../../../../../assets/icons/StartIcon';
import { StopIcon } from '../../../../../assets/icons/StopIcon';
import toast from 'react-hot-toast';
import Toast from '../../../../../common/Toast';

function Timer() {
  const [inputDuration, setInputDuration] = useState('');
  const [remainingTime, setRemainingTime] = useState<moment.Duration | null>(null);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    let intervalId: string | number | NodeJS.Timeout | undefined;

    const startTimer = () => {
      const duration = moment.duration(inputDuration);
      setRemainingTime(duration);
      const startTime = moment();

      intervalId = setInterval(() => {
        const currentTime = moment();
        const elapsedTime = moment.duration(currentTime.diff(startTime));
        const updatedDuration = moment.duration(duration.asMilliseconds() - elapsedTime.asMilliseconds());

        if (updatedDuration.asMilliseconds() > 0) {
          setRemainingTime(updatedDuration);
        } else {
          clearInterval(intervalId);
          setTimerActive(false);
          setRemainingTime(moment.duration(0));
          toast.custom((t) => <Toast type="Success" title="Timer" body="Countdown completed" toastId={t.id} />, {
            duration: 3000
          });
        }
      }, 1000);
    };

    if (timerActive) {
      startTimer();
    }

    return () => clearInterval(intervalId);
  }, [timerActive, inputDuration]);

  const handleStartTimer = () => {
    setTimerActive(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputDuration(e.target.value);
  };

  const formatTime = (duration: moment.Duration) => {
    if (duration) {
      const hours = String(duration.hours()).padStart(2, '0');
      const minutes = String(duration.minutes()).padStart(2, '0');
      const seconds = String(duration.seconds()).padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    }
    return '00:00:00';
  };
  return (
    <div>
      {timerActive ? (
        <div>
          {remainingTime !== null && (
            <div className="w-full flex justify-center items-center">
              <StopIcon className="w-4 h-4 cursor-pointer" />
              <p className="w-14 h-5 bg-none text-alsoit-text-sm text-center tracking-wide px-1.5 border-none flex justify-center items-center">
                {formatTime(remainingTime)}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center">
          <StartIcon className="w-4 h-4 cursor-pointer" onClick={handleStartTimer} />
          <input
            type="text"
            value={inputDuration}
            onChange={handleInputChange}
            className="w-14 h-5 bg-none text-alsoit-text-sm text-center tracking-wide px-1.5 border-none hover:ring-0 focus:ring-0"
            placeholder="HH:mm:ss"
          />
        </div>
      )}
    </div>
  );
}

export default Timer;
