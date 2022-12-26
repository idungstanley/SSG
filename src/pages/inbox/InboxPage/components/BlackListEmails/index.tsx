import React from 'react';
import AddNewEmail from './AddNewEmail';
import EmailList from './EmailList';

interface BlackListEmailsProps {
  setShowModal: (i: boolean) => void;
}

export default function BlackListEmails({ setShowModal }: BlackListEmailsProps) {
  return (
    <>
      <div
        className="fixed left-0 right-0 bottom-0 top-0 opacity-0 z-40"
        tabIndex={0}
        role="button"
        onClick={() => setShowModal(false)}
      >
        {' '}
      </div>
      <div className="absolute top-14 -left-4 p-6 rounded-xl border bg-white z-50 w-80">
        <AddNewEmail />
        <EmailList />
      </div>
    </>
  );
}
