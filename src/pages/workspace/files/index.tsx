import React from 'react';
import { Link } from 'react-router-dom';

const Files: React.FC = () => {
  return (
    <Link
      to="/explorer"
      id="home"
      key=""
      className="flex items-center justify-start h-10 pl-2 space-x-3 rounded hover:bg-gray-200"
    >
      <p>Explorer</p>
    </Link>
  );
}

export default Files;
