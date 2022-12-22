import React from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { Button } from '../../../components';

function Nav({
  navName, newd, Cleared, Assigned, buttonLabel,
}) {
  return (
    <nav className="flex justify-between items-center p-3 bg-white border-gray-200">
      <section className="space-x-5 text-gray-500">
        <span className="font-bold">{navName}</span>
        <span className="rounded-full text-sm px-2 py-1 hover:bg-gray-100">
          {newd}
        </span>
        <span className="rounded-full text-sm px-2 py-1 hover:bg-gray-100">
          {Cleared}
        </span>
      </section>
      <section className="flex items-center space-x-5 text-gray-500">
        <span>
          <Button
            buttonStyle="primary"
            label={buttonLabel}
            padding="py-2 px-4"
            height="h-6"
            width="w-full"
            onClick={() => ({})}
          />
        </span>
        <span className="rounded-full text-sm px-2 py-1 hover:bg-gray-100">
          {Assigned}
        </span>
        <span className="rounded-full text-sm px-2 py-1 hover:bg-gray-100">
          @mentions
        </span>
        <span className="flex items-center font-bold rounded-full text-xl px-2 py-1 hover:bg-gray-200">
          {' '}
          <EllipsisOutlined />
        </span>
      </section>
    </nav>
  );
}

Nav.defaultProps = {
  navName: null,
  newd: null,
  Cleared: null,
  Assigned: null,
  buttonLabel: null,
};

Nav.propTypes = {
  navName: PropTypes.string,
  newd: PropTypes.string,
  Cleared: PropTypes.string,
  Assigned: PropTypes.string,
  buttonLabel: PropTypes.string,
};

export default Nav;
