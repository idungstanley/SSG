import React from 'react';
import { Link } from 'react-router-dom';

function Files() {
  return (
    <Link
      to="/explorer"
      id="home"
      key=""
      className="flex items-center justify-start space-x-3 pl-2 h-10 rounded hover:bg-gray-200"
    >
      <p>Explorer</p>
    </Link>
  );
}

export default Files;
