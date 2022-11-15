import React from 'react';
import { PropTypes } from 'prop-types';
import { EmptyStateSimple } from '../../../../components';

export default function FullScreenMessage({ title, description }) {
  return (
    <div className="flex flex-1 h-full bg-white">
      <div className="m-auto">
        <EmptyStateSimple title={title} description={description} />
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
