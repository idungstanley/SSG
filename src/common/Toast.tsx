import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';
import { cl } from '../utils';
import Success from '../assets/icons/Success';
import ToastClose from '../assets/icons/ToastClose';
import Checkbox from '../assets/icons/Checkbox';
import CopyUrl from '../assets/icons/CopyUrl';
import { useAppSelector } from '../app/hooks';

interface ToastProps {
  title: string;
  body: string | null;
  type: string;
  showClose?: boolean;
  toastId?: string;
}

export default function Toast({ type = 'success', title, body, showClose = true, toastId }: ToastProps) {
  if (title === 'Query data cannot be undefined' || !title) {
    return null;
  }

  const { newTaskData } = useAppSelector((state) => state.task);

  return (
    <div aria-live="assertive" className="inset-0 flex items-end pointer-events-none z-50 w-80 max-w-xl">
      <div className="w-full flex flex-col items-center space-y-4">
        <div
          className={cl(
            'w-full shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden',
            type === 'success'
              ? 'bg-alsoit-success-50 border border-alsoit-success'
              : 'bg-alsoit-danger-50 border border-alsoit-danger'
          )}
        >
          <div className="p-2 flex items-center w-full">
            <div className="flex-shrink-0 w-1/5">
              {type === 'success' && <Success />}
              {type === 'error' && <ExclamationCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />}
            </div>
            <div className="w-3/5">
              <div>
                <p className="text-alsoit-text-lg font-semibold text-alsoit-gray-300 font-semibold my-1">{title}</p>
                {body != null && body !== '' && (
                  <p className="text-alsoit-text-lg font-semibold text-alsoit-gray-300 font-semibold my-1">{body}</p>
                )}
              </div>
              {newTaskData && (
                <div className="my-1">
                  <h3 className="my-1">{`${newTaskData.name} created`}</h3>
                  <section className="flex justify-between my-1">
                    <div className="flex items-center cursor-pointer">
                      <Checkbox />
                      <h4 className="text-alsoit-text-lg text-alsoit-gray-300">Open(1)</h4>
                    </div>
                    <div className="flex items-center cursor-pointer">
                      <CopyUrl />
                      <h4 className="text-alsoit-text-lg text-alsoit-gray-300">Copy URL(1)</h4>
                    </div>
                  </section>
                </div>
              )}
            </div>
            {showClose && (
              <div className="flex pt-0.5 w-1/5">
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
