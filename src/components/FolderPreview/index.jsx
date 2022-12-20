import React from 'react';
import { PropTypes } from 'prop-types';
import Tabs from './Components/Tabs';
import Header from '../FilePreview/components/Header';
import Details from '../FilePreview/components/Details';
import Comments from '../Comments';

function FolderPreview({ folder }) {
  return folder ? (
    <aside className="absolute inset-y-0 h-full right-0 z-10 hidden min-w-96 w-1/3 bg-white px-6 py-4 border-l border-gray-200 lg:block overflow-y-scroll">
      <Header id={folder.id} type="folder" />

      <div className="h-full">
        <Details item={folder} type="folder" />

        <Comments itemId={folder.id} type="folder" />

        {/* Loaded after API call to fetch full folder data */}
        {folder === 'something that wont be the case' && (
          <div className="h-96">
            <Tabs />
          </div>
        )}
      </div>
    </aside>
  ) : null;
}

FolderPreview.propTypes = {
  folder: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
    folder: PropTypes.shape({
      name: PropTypes.string,
    }),
    shared_by: PropTypes.shape({
      user: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
      }).isRequired,
    }),
  }).isRequired,
};

export default FolderPreview;
