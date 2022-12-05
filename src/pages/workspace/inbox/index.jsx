import React from 'react';
import { Link } from 'react-router-dom';

function Inbox() {
  return (
    <Link
      to="/inbox"
      id="home"
      key=""
      className="flex items-center justify-start space-x-3 pl-2 h-10 rounded hover:bg-gray-200"
    >
      <p>Inbox</p>
    </Link>
  );
}

export default Inbox;
