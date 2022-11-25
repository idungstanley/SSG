import React from 'react';
import PropTypes from 'prop-types';
import Row from './Row';

function Body({ data, type }) {
  return (
    <tbody className="bg-white divide-y divide-gray-100">
      {data.map((inbox) => (
        <Row
          key={inbox.id}
          inboxId={inbox.id}
          type={type}
        />
      ))}
    </tbody>
  );
}

Body.propTypes = {
  data: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
};

export default Body;
