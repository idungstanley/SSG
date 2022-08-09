import React from 'react';
import PropTypes from 'prop-types';
import { CogIcon } from '@heroicons/react/outline';
import { Breadcrumb as BreadcrumbComponent } from '../../../components';

export default function Breadcrumb({ pages }) {
  return (
    <BreadcrumbComponent
      pages={pages}
      rootIcon={<CogIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />}
      rootIconHref={null}
    />
  );
}

Breadcrumb.propTypes = {
  pages: PropTypes.string.isRequired,
};
