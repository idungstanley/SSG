import React from 'react';
import FooterTabs from '../../../sidebar/components/FooterTabs';
import NavigationItems from '../../../sidebar/components/NavigationItems';
import Places from '../../../sidebar/components/Places';
import Header from '../FullSidebar/components';

export default function MinSidebar() {
  return (
    <>
      <Header />

      <section className="relative flex flex-col overflow-scroll">
        <NavigationItems />
        <Places />
      </section>

      <FooterTabs />
    </>
  );
}
