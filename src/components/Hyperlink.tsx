import React from 'react';
import { Link } from 'react-router-dom';

interface HyperLinkProps {
  label: string;
  href: string;
  internal?: boolean;
  openInNewTab?: boolean;
}

function Hyperlink({
  label,
  href,
  internal = true,
}: HyperLinkProps) {
  return !internal ? (
    <a
      href={href}
      rel="noreferrer"
      target="_blank"
      className="text-sm font-medium text-primary-600 hover:text-primary-700"
    >
      {label}
    </a>
  ) : (
    <Link
      to={href}
      className="text-sm font-medium text-primary-600 hover:text-primary-700"
    >
      {label}
    </Link>
  );
}

export default Hyperlink;
