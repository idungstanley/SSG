import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { cl } from '../../../../utils';
import { setScrollTop } from '../../../../features/account/accountSlice';
import { setSidebarWidthRD } from '../../../../features/workspace/workspaceSlice';
import Header from './components/Header';
import NavigationItems from './components/NavigationItems';
import Places from './components/Places';
import Search from './components/Search';
// import Toggle from './components/Toggle';
import { dimensions } from '../../../../app/config/dimensions';
import { useResize } from '../../../../hooks/useResize';
import { isAllowIncreaseWidth } from '../../../../utils/widthUtils';

const MAX_SIDEBAR_WIDTH = dimensions.navigationBar.max;
const MIN_SIDEBAR_WIDTH = dimensions.navigationBar.min;

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const { extendedSidebarWidth, sidebarWidthRD, showExtendedBar } = useAppSelector((state) => state.workspace);
  const { showSidebar } = useAppSelector((state) => state.account);

  const { blockRef, Dividers, size } = useResize({
    dimensions: {
      min: MIN_SIDEBAR_WIDTH,
      max: MAX_SIDEBAR_WIDTH
    },
    storageKey: 'sidebarWidth',
    direction: 'XR',
    defaultSize: dimensions.navigationBar.default
  });

  useEffect(() => {
    const { isAllow, allowedSize } = isAllowIncreaseWidth(size, extendedSidebarWidth);
    dispatch(setSidebarWidthRD(isAllow ? size : showExtendedBar ? allowedSize - size : size));
  }, [size]);

  const handleScroll = (event: React.UIEvent<HTMLElement, UIEvent>) => {
    dispatch(setScrollTop(event.currentTarget.scrollTop));
  };

  return (
    <aside className={cl('flex h-full text-center relative overflow-x-visible')}>
      <Dividers />
      {/* show / hide sidebar icon */}
      {/* sidebar */}
      <section
        style={{
          width: `${sidebarWidthRD}px`
        }}
        ref={blockRef}
        className="relative flex flex-col gap-2 pr-1 border-r border-gray-300"
      >
        <Header />
        <section
          className="relative h-full flex flex-col pr-1.5 overflow-y-auto overflow-x-hidden"
          onScroll={(e) => handleScroll(e)}
        >
          {showSidebar ? <Search /> : null}
          <NavigationItems />
          <Places />
        </section>
      </section>
    </aside>
  );
}
