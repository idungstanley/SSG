import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Hyperlink({
  label,
  href,
  internal,
  openInNewTab,
}) {
  return !internal ? (
    <a href={href} target={openInNewTab && '_blank'} className="text-sm font-medium text-primary-600 hover:text-primary-700">{label}</a>
  ) : (
    <Link to={href} className="text-sm font-medium text-primary-600 hover:text-primary-700">{label}</Link>
  );
}

Hyperlink.defaultProps = {
  internal: true,
  openInNewTab: false,
};

Hyperlink.propTypes = {
  label: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  internal: PropTypes.bool,
  openInNewTab: PropTypes.bool,
};

export default Hyperlink;
