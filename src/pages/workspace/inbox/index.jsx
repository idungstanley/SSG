import React from 'react';
import { Link } from 'react-router-dom';
import CreateNewItemBtn from '../../../components/CreateNewItemBtn';

function Inbox() {
  return (
    <>
      <CreateNewItemBtn onClick={() => {}} title="Create new Inbox" />
      <Link
        to="/inbox"
        id="home"
        key=""
        className="flex items-center justify-start space-x-3 pl-2 h-10 rounded hover:bg-gray-200"
      >
        <p>Inbox</p>
      </Link>
    </>
  );
}

export default Inbox;
