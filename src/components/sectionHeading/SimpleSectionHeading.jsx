import React from 'react';
import PropTypes from 'prop-types';

function SimpleSectionHeading({ title, description, actions }) {
  return (
    <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
      <div>
        <h3 className="text-xl leading-6 font-medium text-gray-900">{title}</h3>
        {description && (
          <p className="mt-2 max-w-4xl text-sm text-gray-500">{description}</p>
        )}
      </div>
      {actions && (
        <div className="mt-3 flex sm:mt-0 sm:ml-4 space-x-3">{actions}</div>
      )}
    </div>
  );
}

SimpleSectionHeading.defaultProps = {
  description: null,
  actions: null,
};

SimpleSectionHeading.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  actions: PropTypes.string,
};

export default SimpleSectionHeading;
