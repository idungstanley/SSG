import React from 'react';
import PropTypes from 'prop-types';

interface commandProps {
  commandSearchVisible: boolean
  onCloseCommandSearchModal: () => void;
}

function CommandSearchModal({
  commandSearchVisible,
  onCloseCommandSearchModal,
}: commandProps) {
  if (!commandSearchVisible) return null;
  return (
    <div className="fixed top-0 bottom-0 right-0 z-50 flex items-center justify-center w-full bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="flex flex-col w-5/12">
        <div
          className="text-xl text-white place-self-end"
          onClick={() => onCloseCommandSearchModal()}
        >
          X
        </div>
        <div className="p-2 bg-white rounded">
          <section className="flex flex-col items-center justify-center header h-36">
            Command Search Modal
          </section>
        </div>
      </div>
    </div>
  );
}

CommandSearchModal.defaultProps = {
  commandSearchVisible: false,
  // onCloseCommandSearchModal: false,
};

CommandSearchModal.propTypes = {
  commandSearchVisible: PropTypes.bool,
  onCloseCommandSearchModal: PropTypes.func.isRequired,
};

export default CommandSearchModal;
