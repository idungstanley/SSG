import React, { useEffect } from 'react';
import { cl } from '../../../../../../utils';
import ToastClose from '../../../../../../assets/icons/ToastClose';
import toast from 'react-hot-toast';
import { UseSaveTaskFilters } from '../../../../../../features/task/taskService';

interface ToastProps {
  title: string;
  body: string | null;
  showClose?: boolean;
  toastId?: string;
}
function SaveFilterToast({ title, body, showClose = true, toastId }: ToastProps) {
  const { mutateAsync, status } = UseSaveTaskFilters();
  const handleSaveFilters = () => {
    mutateAsync({ key: 'tasks_filter' });
  };

  useEffect(() => {
    if (status === 'success') {
      setTimeout(() => {
        toast.remove(toastId);
      }, 1000);
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
            <div className="" style={{ width: '80%' }}>
              <div>
                <p className="text-base font-semibold text-alsoit-gray-300 font-semibold my-1">{title}</p>
                {body != null && body !== '' && (
                  <p className="text-alsoit-text-md font-semibold text-alsoit-gray-300 font-semibold my-1">{body}</p>
                )}
              </div>
              {status === 'loading' && <p>Saving</p>}
              {status === 'success' && <p>Saved</p>}
              <div className="my-1">
                <section className="flex justify-between my-1">
                  <div className="flex items-center cursor-pointer gap-0.5">
                    <button className="w-20 h-7 bg-alsoit-purple-300 rounded text-white" onClick={handleSaveFilters}>
                      Save
                    </button>
                  </div>
                  <div className="flex items-center cursor-pointer gap-0.5">
                    <button
                      className="w-20 h-7 bg-alsoit-gray-50 rounded hover:bg-alsoit-purple-50"
                      onClick={() => toast.remove(toastId)}
                    >
                      Cancel
                    </button>
                  </div>
                </section>
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
