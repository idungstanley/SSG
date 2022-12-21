/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { PropTypes } from 'prop-types';
import EmptyStateSimple from '../emptyState/EmptyStateSimple';

export default function FullScreenMessage(props) {
  return (
    <div className="flex flex-1 h-full bg-white">
      <div className="m-auto">
        <EmptyStateSimple {...props} />
      </div>
    </div>
  );
}

FullScreenMessage.defaultProps = {
  props: null,
};

FullScreenMessage.propTypes = {
  props: PropTypes.object,
};
