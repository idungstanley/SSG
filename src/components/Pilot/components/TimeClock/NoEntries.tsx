import { useDispatch } from 'react-redux';
import { setActiveSubTimeClockTabId } from '../../../../features/workspace/workspaceSlice';
import { useSaveData } from '../../../../features/task/taskService';
import { useAppSelector } from '../../../../app/hooks';
import { setTimeSortArr } from '../../../../features/task/taskSlice';

export default function NoEntriesFound() {
  const { timeSortArr } = useAppSelector((state) => state.task);

  const dispatch = useDispatch();

  const { mutateAsync } = useSaveData();

  const handleClick = () => {
    mutateAsync({
      key: 'time_entry',
      value: [[]]
    });
    dispatch(setTimeSortArr([]));
  };

  const pageContent = () => {
    return !timeSortArr.length ? (
      <main className="flex min-h-full flex-col bg-white mx-auto w-full max-w-7xl flex-grow justify-center px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="mt-2 text-alsoit-text-lg font-bold tracking-tight text-alsoit-gray-300 sm:text-alsoit-text-lg">
          Sorry, No Entries
        </h1>

        <div className="mt-6">
          <div
            className="text-base font-medium text-indigo-600 hover:text-indigo-500"
            onClick={() => dispatch(setActiveSubTimeClockTabId('in_out'))}
          >
            Start the time clock to get new entry
            <span aria-hidden="true"> &rarr;</span>
          </div>
        </div>
      </main>
    ) : (
      <main className="flex min-h-full flex-col bg-white mx-auto w-full max-w-7xl flex-grow justify-center px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="mt-2 text-alsoit-text-lg font-bold tracking-tight text-alsoit-gray-300 sm:text-alsoit-text-lg">
          You have a filter on for the logs whose data is not available on this entity.
        </h3>
        <div
          className="text-base font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
          onClick={() => handleClick()}
        >
          Clear Existing filters now
          <span aria-hidden="true"> &rarr;</span>
        </div>
      </main>
    );
  };
  return pageContent();
}
