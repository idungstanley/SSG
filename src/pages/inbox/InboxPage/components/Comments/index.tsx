import React from 'react';
import { useParams } from 'react-router-dom';
import CommentsT from '../../../../../components/Comments';

interface CommentsProps {
  setShowModal: (i: boolean) => void;
}

export default function Comments({ setShowModal }: CommentsProps) {
  const { inboxId } = useParams();

  return (
    <>
      <div
        className="fixed top-0 bottom-0 left-0 right-0 z-40 opacity-0"
        tabIndex={0}
        role="button"
        onClick={() => setShowModal(false)}
      >
        {' '}
      </div>
      <div className="absolute z-50 p-6 bg-white border top-14 -left-4 h-80 rounded-xl w-96">
        {inboxId ? <CommentsT itemId={inboxId} type="inbox" /> : null}
      </div>
    </>
  );
}
