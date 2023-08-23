import React, { useState } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';
import { cl } from '../utils';
import Success from '../assets/icons/Success';
import ToastClose from '../assets/icons/ToastClose';
import Checkbox from '../assets/icons/Checkbox';
import CopyUrl from '../assets/icons/CopyUrl';
import { useAppSelector } from '../app/hooks';
import { useNavigate } from 'react-router-dom';
import { ImyTaskData } from '../features/task/taskSlice';

interface ToastProps {
  title: string;
  body: string | null;
  type: string;
  showClose?: boolean;
  toastId?: string;
  taskData?: ImyTaskData;
}

export default function Toast({ type = 'success', title, body, showClose = true, toastId, taskData }: ToastProps) {
  const navigate = useNavigate();
  if (title === 'Query data cannot be undefined' || !title) {
    return null;
  }

  const [isCopied, setIsCopied] = useState<number>(0);
  const { currentWorkspaceId } = useAppSelector((state) => state.auth);
  const currentHost = window.location.host;
  const task_Id = taskData?.id;
  const list_Id = taskData?.list_id;
  const taskUrl = `${currentHost}/${currentWorkspaceId}/tasks/l/${list_Id}/t/${task_Id}`;

  const HandleCopyTaskUrl = async () => {
    try {
      await navigator.clipboard.writeText(taskUrl);
      setIsCopied(1);
      setTimeout(() => {
        setIsCopied(2);
      }, 1000);
      setTimeout(() => {
        setIsCopied(0);
      }, 2000);
    } catch (error) {
      console.warn(`Failed to copy: ${error}`);
    }
  };

  const handleHighlight = () => {
    navigate(`/${currentWorkspaceId}/tasks/l/${list_Id}/t/${task_Id}`);
  };

  return (
    <div
      aria-live="assertive"
      className="inset-0 flex items-end pointer-events-none z-50 max-w-xl"
      style={{ width: '350px' }}
    >
      <div className="w-full flex flex-col items-center space-y-4">
        <div
          className={cl(
            'w-full shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden',
            type === 'success'
              ? 'bg-alsoit-success-50 border border-alsoit-success'
              : 'bg-alsoit-danger-50 border border-alsoit-danger'
          )}
        >
          <div className="p-2 flex items-center justify-between w-full">
            <div className="flex-shrink-0" style={{ width: '10%' }}>
              {type === 'success' && <Success />}
              {type === 'error' && <ExclamationCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />}
            </div>
            <div className="" style={{ width: '80%' }}>
              <div>
                <p className="text-alsoit-text-lg font-semibold text-alsoit-gray-300 font-semibold my-1">{title}</p>
                {body != null && body !== '' && (
                  <p className="text-alsoit-text-lg font-semibold text-alsoit-gray-300 font-semibold my-1">{body}</p>
                )}
              </div>
              {taskData && (
                <div className="my-1">
                  <h3 className="my-1">{`${taskData.name} created`}</h3>
                  <section className="flex justify-between my-1">
                    <div onClick={handleHighlight} className="flex items-center cursor-pointer gap-0.5">
                      <Checkbox />
                      <h4 className="text-alsoit-text-lg text-alsoit-gray-300">Highlight Task(1)</h4>
                    </div>
                    <div onClick={HandleCopyTaskUrl} className="flex items-center cursor-pointer gap-0.5">
                      <CopyUrl />
                      <h4 className="text-alsoit-text-lg text-alsoit-gray-300">
                        {isCopied === 0 ? 'Copy URL(1)' : isCopied === 1 ? 'Copying...' : 'Copied'}
                      </h4>
                    </div>
                  </section>
                </div>
              )}
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
