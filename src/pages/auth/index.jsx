import React from 'react';
import { PropTypes } from 'prop-types';

export default function Wrapper({ children }) {
  return (
    <div className="min-h-full flex bg-gradient-to-br from-indigo-400 to-indigo-600">
      <div className="flex-1 flex items-center justify-center w-full py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="w-full max-w-lg border-2 rounded-2xl p-6 sm:p-16 shadow-2xl bg-white transition-all duration-150">
          {children}
        </div>
      </div>
    </div>
  );
}

Wrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
