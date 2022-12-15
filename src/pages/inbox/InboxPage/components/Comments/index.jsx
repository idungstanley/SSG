import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import CommentsT from '../../../../../components/Comments';

export default function Comments({ setShowModal }) {
  const { inboxId } = useParams();

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
        <CommentsT itemId={inboxId} type="inbox" />
      </div>
    </>
  );
}

Comments.propTypes = {
  setShowModal: PropTypes.func.isRequired,
};
