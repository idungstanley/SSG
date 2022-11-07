import React from 'react';
import { PropTypes } from 'prop-types';

function Columns({ data }) {
  if (!data) {
    return <> </>;
  }

  return (
    <div className='p-1 font-medium'>
      {data.map((i) => (
        <p key={i.id}>
          {i.title}
          <span className='font-semibold text-indigo-600 pl-1'>{i.value}</span>
        </p>
      ))}
    </div>
  );
}

Columns.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Columns;
