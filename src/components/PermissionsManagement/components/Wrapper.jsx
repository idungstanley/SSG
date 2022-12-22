import React from 'react';
import { PropTypes } from 'prop-types';

function Wrapper({
  children, setShowPopup, showPopup, hidePopup,
}) {
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

Wrapper.defaultProps = {
  children: null,
};

Wrapper.propTypes = {
  setShowPopup: PropTypes.func.isRequired,
  showPopup: PropTypes.bool.isRequired,
  hidePopup: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Wrapper;
