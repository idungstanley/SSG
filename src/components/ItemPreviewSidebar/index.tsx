import React from 'react';
import Header from './Components/Header';
import Details from './Components/Details';
import Comments from '../Comments';
import Tabs from './Components/Tabs';

interface itemType {
  id: string;
  display_name: string;
  name: string;
  shared_by: {
    user: {
      name: string;
      email: string;
    };
  };
  updated_at: string;
  created_at: string;
  size: number | null;
  file: {
    display_name: string;
    name: string;
    size: number | null;
  };
  folder: {
    name: string;
  };
}
interface ItemPreviewType {
  item: itemType;
  type: string;
}
function ItemPreviewSidebar({ item, type }: ItemPreviewType) {
  return item ? (
    <aside className="absolute inset-y-0 right-0 z-10 hidden w-1/3 h-full px-6 py-4 overflow-y-scroll bg-white border-l border-gray-200 min-w-96 lg:block">
      <Header />

      <div className="h-full">
        <Details item={item} type={type} />

        <Comments itemId={item.id} type={type} />

        {/* Loaded after API call to fetch full folder data */}
        {item.folder.name === 'something that wont be the case' && (
          <div className="h-96">
            <Tabs />
          </div>
        )}
      </div>
    </aside>
  ) : null;
}

export default ItemPreviewSidebar;
