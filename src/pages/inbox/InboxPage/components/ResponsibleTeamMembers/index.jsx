// /* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

export default function ResponsibleTeamMembers({ setShowModal }) {
  // TODO: add modal with selection team member dropdown, list all members and removing members
  // * select team members from reusable component
  // * list all items as list blacklist emails

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
      <div className="absolute top-14 right-52 p-6 rounded-xl border bg-white z-50 w-80">
        <p>Responsible</p>
      </div>
    </>
  );
}

ResponsibleTeamMembers.propTypes = {
  setShowModal: PropTypes.func.isRequired,
};
