// /* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

export default function MultipleArchiveFiles({ setShowModal }) {
  return (
    <>
      <div
        className="fixed left-0 right-0 bottom-0 top-0 opacity-0 z-40"
        tabIndex={0}
        role="button"
        onClick={() => setShowModal(false)}
        onKeyDown={() => {}}
      >
        {' '}
      </div>
      <div className="absolute top-14 -left-4 p-6 rounded-xl border bg-white z-50 w-80">
        <div className="border w-9 h-3">{' '}</div>
      </div>
    </>
  );
}

MultipleArchiveFiles.propTypes = {
  setShowModal: PropTypes.func.isRequired,
};
