import React from 'react';
import PropTypes from 'prop-types';

export default function Header({ title }) {
  return (
    <div className="md:flex md:items-center md:justify-between py-8">
      <div className="flex-1 min-w-0">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">{title}</h2>
      </div>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
