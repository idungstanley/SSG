/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { PropTypes } from 'prop-types';
import EmptyStateSimple from '../emptyState/EmptyStateSimple';

export default function HalfScreenMessage(props) {
  return (
    <div className="flex flex-1 h-2/4 bg-white">
      <div className="m-auto">
        <EmptyStateSimple {...props} />
      </div>
    </div>
  );
}

HalfScreenMessage.defaultProps = {
  props: {},
};

HalfScreenMessage.propTypes = {
  props: PropTypes.object,
};
