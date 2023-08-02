import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';
import { cl } from '../utils';
import Success from '../assets/icons/Success';
import ToastClose from '../assets/icons/ToastClose';

interface ToastProps {
  title: string;
  body: string | null;
  type: string;
  showClose?: boolean;
  toastId?: string;
}

export default function Toast({ type = 'success', title, body, showClose = true, toastId }: ToastProps) {
  console.log(toastId);
  if (title === 'Query data cannot be undefined' || !title) {
    return null;
  }

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
          <div className="p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {type === 'success' && <Success />}
                {type === 'error' && <ExclamationCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />}
              </div>
              <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className="text-sm font-medium text-gray-900">{title}</p>
                {body != null && body !== '' && <p className="mt-1 text-sm text-gray-500">{body}</p>}
              </div>
              {showClose && (
                <div className="ml-4 flex-shrink-0 flex pt-0.5">
                  <button
                    type="button"
                    onClick={() => toast.remove(toastId)}
                    className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="sr-only">Close</span>
                    <ToastClose />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
