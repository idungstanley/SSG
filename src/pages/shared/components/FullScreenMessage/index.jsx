/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { PropTypes } from 'prop-types';
import { EmptyStateSimple } from '../../../../components';

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
  description: '',
};

FullScreenMessage.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};
