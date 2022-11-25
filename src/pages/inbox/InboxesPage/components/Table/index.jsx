import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Body from './Body';

function Table({ data, type }) {
  return (
    <div className="flex-1 align-middle inline-block min-w-full border-b border-gray-200">
      <table className="min-w-full">
        <Header />
        <Body data={data} type={type} />
      </table>
    </div>
  );
}

Table.propTypes = {
  data: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
};

export default Table;
