import React from 'react';
import { PropTypes } from 'prop-types';
import Details from './components/Details';
import Header from './components/Header';
import Comments from '../Comments';

function FilePreview({ file }) {
  return file ? (
    <aside className="fixed h-full right-0 z-10 hidden min-w-96 w-1/3 bg-white px-6 py-4 border-l border-gray-200 lg:block overflow-y-scroll">
      <Header id={file.id} />

      <Details file={file} />

      <Comments itemId={file.id} type="file" />
    </aside>
  ) : null;
}

FilePreview.propTypes = {
  file: PropTypes.shape({
    id: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
    display_name: PropTypes.string,
    size: PropTypes.number,
    file: PropTypes.shape({
      display_name: PropTypes.string,
      size: PropTypes.number,
    }),
    shared_by: PropTypes.shape({
      user: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
      }),
    }),
  }).isRequired,
};

export default FilePreview;
