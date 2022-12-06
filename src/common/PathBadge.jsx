import React from 'react';
import PropTypes from 'prop-types';

function PathBadge({ folder, expanded }) {
  if (folder === null) {
    return (
      <span className="truncate px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
        Home
      </span>
    );
  }

  if (expanded === false && folder.ancestor_path === null) {
    return (
      <span className="truncate px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
        Home
      </span>
    );
  }

  return (
    <span className={`truncate px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${folder.tailwind_colour}-200 text-${folder.tailwind_colour}-800`}>
      {expanded === true ? folder.full_path : folder.ancestor_path}
    </span>
  );
}

PathBadge.defaultProps = {
  folder: null,
  expanded: true,
};

PathBadge.propTypes = {
  folder: PropTypes.object,
  expanded: PropTypes.bool,
};

export default PathBadge;
