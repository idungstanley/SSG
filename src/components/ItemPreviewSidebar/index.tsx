import React from 'react';
import Header from './Components/Header';
import Details from './Components/Details';
import Comments from '../Comments';
// import Tabs from './Components/Tabs';

import { IExplorerAndSharedData } from '../../features/shared/shared.interfaces';

interface ItemPreviewProps {
  item?: IExplorerAndSharedData;
  type: 'folder' | 'file' | null;
}

function ItemPreviewSidebar({ item, type }: ItemPreviewProps) {
  return item ? (
    <aside className="absolute inset-y-0 right-0 z-10 hidden w-1/3 h-full px-6 py-4 overflow-y-scroll bg-white border-l border-gray-200 min-w-96 lg:block">
      <Header />

      <div className="h-full">
        {type ? (
          <>
            <Details item={item} type={type} />
            <Comments itemId={item.id} type={type} />
          </>
        ) : null}

        {/* Loaded after API call to fetch full folder data */}
        {/* {item.folder.name === 'something that wont be the case' && (
          <div className="h-96">
            <Tabs />
          </div>
        )} */}
      </div>
    </aside>
  ) : null;
}

export default ItemPreviewSidebar;
