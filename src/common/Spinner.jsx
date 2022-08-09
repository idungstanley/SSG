import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

function Spinner({ size = 10, color = '#FFFFFF' }) {
  const antIcon = <LoadingOutlined style={{ fontSize: size, color }} spin />;

  return (
    <Spin indicator={antIcon} />
  );
}

Spinner.propTypes = {
  size: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default Spinner;
