import { Dispatch, SetStateAction, useEffect } from 'react';
import { cl } from '../../../../../../utils';
import ToastClose from '../../../../../../assets/icons/ToastClose';
import toast from 'react-hot-toast';
import { EndTimeEntriesService, UseSaveTaskFilters, useSaveData } from '../../../../../../features/task/taskService';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { setTimeZone } from '../../../../../../features/settings/user/userSettingsSlice';
import { setTimerInterval, setTimerStatus, setUpdateTimerDuration } from '../../../../../../features/task/taskSlice';
import { Header } from '../../../../../../features/task/interface.tasks';

interface ToastProps {
  title: string;
  body: string | null;
  showClose?: boolean;
  toastId?: string;
  extended?: 'taskFilter' | 'timeZone' | 'calendar' | 'clockReminder' | 'timeSort' | 'timeLogColumns';
  extendedFn?: Dispatch<SetStateAction<string | undefined>>;
  extendedState?: string | Header[];
}
function SaveFilterToast({ title, body, showClose = true, toastId, extended, extendedState }: ToastProps) {
  const dispatch = useAppDispatch();
  const { activeItemId } = useAppSelector((state) => state.workspace);
  const { timerDetails, period } = useAppSelector((state) => state.task);

  const timeOutFn = () =>
    setTimeout(() => {
      toast.remove(toastId);
    }, 1000);

  const { mutate } = EndTimeEntriesService();
  const { mutateAsync, status: taskFilterStatus } = UseSaveTaskFilters();
  const { mutateAsync: saveUsersetting } = useSaveData();

  const handleSaveFilters = () => {
    extended === 'taskFilter' && mutateAsync({ key: 'tasks_filter' });
    if (extended === 'timeZone') {
      dispatch(setTimeZone(extendedState as string));
      extendedState && localStorage.setItem('userTimeZone', extendedState as string);
      timeOutFn();
    }
    if (extended === 'clockReminder') stop();
    if (extended === 'timeLogColumns') {
      saveUsersetting({
        key: 'time_entry',
        value: extendedState as Header[]
      });
      timeOutFn();
    }
  };

  const stop = () => {
    mutate({
      id: activeItemId,
      is_Billable: timerDetails.isBillable,
      description: timerDetails.description
    });
    dispatch(setTimerStatus(false));
    clearInterval(period);
    dispatch(setUpdateTimerDuration({ h: 0, s: 0, m: 0 }));
    dispatch(setTimerInterval());
    timeOutFn();
  };

  const status = extended === 'taskFilter' ? taskFilterStatus : '';

  useEffect(() => {
    if (status === 'success') {
      timeOutFn();
    }
  }, [status]);
  return (
    <div
      aria-live="assertive"
      className="inset-0 flex items-end pointer-events-none z-50 max-w-xl"
      style={{ width: '350px' }}
    >
      <div className="w-full flex flex-col items-center space-y-4">
        <div
          className={cl(
            'w-full shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden bg-white border border-alsoit-purple-300'
          )}
        >
          <div className="p-2 flex items-center justify-between w-full">
            <div style={{ width: '80%' }}>
              <div>
                <p className="text-base font-semibold text-alsoit-gray-300 my-1">{title}</p>
                {body != null && body !== '' && (
                  <p className="text-alsoit-text-md font-semibold text-alsoit-gray-300 my-1">{body}</p>
                )}
              </div>
              <div className="my-1">
                {extended ? (
                  <section className="flex justify-between my-1">
                    <div className="flex items-center cursor-pointer gap-0.5">
                      <button
                        className="w-28 h-7 bg-alsoit-purple-300 rounded text-white text-alsoit-text-sm font-semibold"
                        onClick={handleSaveFilters}
                      >
                        {extended === 'clockReminder' ? 'Stop Timer Now' : 'Save'}
                      </button>
                    </div>
                    <div className="flex items-center cursor-pointer gap-0.5">
                      <button
                        className="w-28 h-7 bg-alsoit-gray-50 rounded hover:bg-alsoit-purple-50 text-alsoit-text-sm font-semibold"
                        onClick={() => toast.remove(toastId)}
                      >
                        {extended === 'clockReminder' ? 'Continue' : 'Cancel'}
                      </button>
                    </div>
                  </section>
                ) : (
                  <button
                    className="w-28 h-7 bg-alsoit-gray-50 rounded hover:bg-alsoit-purple-50 text-alsoit-text-sm font-semibold"
                    onClick={() => toast.remove(toastId)}
                  >
                    Close
                  </button>
                )}
              </div>
            </div>
            {showClose && (
              <div className="flex pt-0.5 " style={{ width: '10%' }}>
                <button type="button" onClick={() => toast.remove(toastId)}>
                  <ToastClose />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SaveFilterToast;
