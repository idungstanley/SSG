import React from 'react';
import { PropTypes } from 'prop-types';
import Header from './Components/Header';
import Details from './Components/Details';
import Comments from '../Comments';
import Tabs from './Components/Tabs';

function ItemPreviewSidebar({ item, type }) {
  console.log(item);
  return item ? (
    <aside className="absolute inset-y-0 h-full right-0 z-10 hidden min-w-96 w-1/3 bg-white px-6 py-4 border-l border-gray-200 lg:block overflow-y-scroll">
      <Header id={item.id} type={type} />

      <div className="h-full">
        <Details item={item} type={type} />

        <Comments itemId={item.id} type={type} />

        {/* Loaded after API call to fetch full folder data */}
        {item === 'something that wont be the case' && (
          <div className="h-96">
            <Tabs />
          </div>
        )}
      </div>
    </aside>
  ) : null;
}

ItemPreviewSidebar.propTypes = {
  item: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default ItemPreviewSidebar;
