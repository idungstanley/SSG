import React, { ReactNode } from 'react';

interface WrapperProps {
  children?: ReactNode;
  setShowPopup: (i: boolean) => void;
  showPopup: boolean;
  hidePopup: () => void;
}

function Wrapper({
  children,
  setShowPopup,
  showPopup,
  hidePopup,
}: WrapperProps) {
  return (
    <>
      <p
        onClick={() => setShowPopup(true)}
        className="text-right text-gray-600 underline cursor-pointer"
      >
        Manage permissions
      </p>
      {showPopup ? (
        <>
          <div
            className="fixed left-0 right-0 bottom-0 top-0 bg-black opacity-0"
            tabIndex={0}
            role="button"
            onClick={hidePopup}
          >
            {' '}
          </div>
          <div
            role="document"
            className="absolute top-0 right-0 w-80 bg-white m-2 rounded-xl border p-3 flex flex-col z-10 gap-3"
          >
            {children}
          </div>
        </>
      ) : null}
    </>
  );
}

export default Wrapper;
