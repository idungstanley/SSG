import React from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { ViewListIcon } from '@heroicons/react/outline';
import { Button } from '../../../../../components';

interface ListNavProps {
  navName?: string;
  viewsList?: string;
  viewsList2?: string;
  changeViews?: string;
  Assigned?: string;
  buttonLabel?: string;
}

function ListNav({
  navName, viewsList, viewsList2, changeViews, Assigned, buttonLabel,
}: ListNavProps) {
  return (
    <nav className="flex justify-between items-center p-3 h-12 border-b-2 bg-white border-gray-200">
      <section className="space-x-2 text-gray-500 flex justify-start items-center">
        <span className="space-x-2">
          <span className="font-bold">{navName}</span>
          <span>|</span>
        </span>
        <span className="space-x-1 flex items-center justify-start">
          <span>
            {' '}
            <ViewListIcon
              className="flex-shrink-0 h-4 w-5"
              aria-hidden="true"
            />
            {' '}
          </span>
          <span className="text-sm hover:bg-gray-100">
            {' '}
            {viewsList}
          </span>
          <span>|</span>
        </span>
        <span className="space-x-1 flex items-center justify-start">
          <span>
            {' '}
            <ViewListIcon
              className="flex-shrink-0 h-4 w-5"
              aria-hidden="true"
            />
            {' '}
          </span>
          <span className="text-sm hover:bg-gray-100">
            {' '}
            {viewsList2}
          </span>
          <span>|</span>
        </span>
        <span className="space-x-1 flex items-center justify-start">
          <span>
            {' '}
            <ViewListIcon
              className="flex-shrink-0 h-4 w-5"
              aria-hidden="true"
            />
            {' '}
          </span>
          <span className="text-sm hover:bg-gray-100">
            {' '}
            {changeViews}
          </span>
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


export default ListNav;
