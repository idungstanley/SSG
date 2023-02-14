import React from 'react';
import NavigationItems from '../../../sidebar/components/NavigationItems';
import Header from '../FullSidebar/components';

export default function MinSidebar() {
  return (
    <>
      <Header />

      <section className="relative flex flex-col overflow-scroll">
        <NavigationItems />
        {/* <Places /> */}
      </section>

      {/* <FooterTabs /> */}
    </>
  );
}
