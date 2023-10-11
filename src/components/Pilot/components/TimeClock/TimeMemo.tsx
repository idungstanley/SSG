import { useAppDispatch } from '../../../../app/hooks';
import { ITimerDetails } from '../../../../features/task/interface.tasks';
import { setTimerDetails } from '../../../../features/task/taskSlice';

interface Props {
  timerDetails: ITimerDetails;
}

export function TimeMemo({ timerDetails }: Props) {
  const dispatch = useAppDispatch();
  return (
    <div className="w-full shadow-xl absolute top-7 right-64" onClick={(e) => e.stopPropagation()}>
      <textarea
        name="description"
        id="timeMemo"
        className="rounded-md w-72 h-28 text-alsoit-gray-200 text-alsoit-text-md"
        value={timerDetails.description}
        onChange={(e) => dispatch(setTimerDetails({ ...timerDetails, description: e.target.value }))}
      ></textarea>
    </div>
  );
}
