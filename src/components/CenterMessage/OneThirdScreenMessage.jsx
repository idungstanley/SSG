/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { PropTypes } from 'prop-types';
import EmptyStateSimple from '../emptyState/EmptyStateSimple';

export default function OneThirdScreenMessage(props) {
  return (
    <div className="flex flex-1 h-1/3 bg-white">
      <div className="m-auto">
        <EmptyStateSimple {...props} />
      </div>
    </div>
  );
}

OneThirdScreenMessage.defaultProps = {
  props: {},
};

OneThirdScreenMessage.propTypes = {
  props: PropTypes.object,
};
