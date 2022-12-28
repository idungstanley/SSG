import React, { ReactNode } from 'react';

interface WrapperProps {
  children: ReactNode;
  managePopup: (i: 'show' | 'hide') => void;
  showPopup: boolean;
}

function Wrapper({ children, showPopup, managePopup }: WrapperProps) {
  return showPopup ? (
    <>
      <div
        className="fixed left-0 right-0 bottom-0 top-0 bg-black opacity-0"
        tabIndex={0}
        role="button"
        onClick={() => managePopup('hide')}
      >
        {' '}
      </div>
      <div
        role="document"
        className="absolute top-0 right-0 w-80 bg-white m-2 rounded-xl border p-3 flex flex-col z-10 gap-3"
      >
        <button
          type="button"
          onClick={() => managePopup('hide')}
          className="flex w-full justify-end"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {children}
      </div>
    </>
  ) : (
    <p
      onClick={() => managePopup('show')}
      className="text-right text-gray-600 underline cursor-pointer"
    >
      Manage permissions
    </p>
  );
}

export default Wrapper;
