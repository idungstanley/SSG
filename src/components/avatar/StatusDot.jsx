import React from 'react';
import PropTypes from 'prop-types';

function StatusDot({
  on, colour, size, ringSize, top,
}) {
  return (
    <span className="inline-block relative">
      {on}
      <span
        className={`absolute ${
          top ? 'top-0 right-0' : 'bottom-0 right-0'
        } block h-${size} w-${size} rounded-full ring-${ringSize} ring-white`}
        style={{ backgroundColor: colour }}
      />
    </span>
  );
}

StatusDot.defaultProps = {
  size: 2.5,
  colour: '#4ADE80',
  ringSize: 2,
  top: true,
};

StatusDot.propTypes = {
  on: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  colour: PropTypes.string,
  size: PropTypes.number,
  ringSize: PropTypes.number,
  top: PropTypes.bool,
};

export default StatusDot;
