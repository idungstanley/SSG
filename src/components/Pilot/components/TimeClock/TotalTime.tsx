import dayjs from 'dayjs';
import { TotalTimeIcon } from '../../../../assets/icons/TotalTimeIcon';

export function TotalTime({ totalDuration }: { totalDuration?: number }) {
  if (totalDuration) {
    const duration = dayjs.duration(totalDuration * 1000);
    return (
      <div className="flex items-center justify-center w-full tracking-widest text-alsoit-text-md">
        <div className="w-1/3">
          <TotalTimeIcon className="w-4 h-4" />
        </div>
        <span>
          {`${String(duration.hours()).padStart(2, '0')}:${String(duration.minutes()).padStart(2, '0')}:${String(
            duration.seconds()
          ).padStart(2, '0')}`}
        </span>
      </div>
    );
  }
  return (
    <span className="flex items-center justify-center w-12 tracking-wide text-alsoit-text-md">{`${String(0).padStart(
      2,
      '0'
    )}:${String(0).padStart(2, '0')}:${String(0).padStart(2, '0')}`}</span>
  );
}
