import React from 'react';
import PropTypes from 'prop-types';

function PathBadge({ folder, expanded = true }) {
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

PathBadge.propTypes = {
  folder: PropTypes.string.isRequired,
  expanded: PropTypes.string.isRequired,
};

export default PathBadge;
