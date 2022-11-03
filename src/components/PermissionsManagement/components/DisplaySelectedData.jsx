import React from 'react';
import { PropTypes } from 'prop-types';

function DisplayData({ data }) {
  if (!data) {
    return <> </>;
  }

  return (
    <div className="p-1 font-medium">
      {data.map((i) => (
        <p key={i.id}>
          {i.title}
          <span className="font-semibold text-indigo-600 pl-1">{i.value}</span>
        </p>
      ))}
    </div>
  );
}

DisplayData.propTypes = {
  data: PropTypes.array.isRequired,
};

export default DisplayData;
