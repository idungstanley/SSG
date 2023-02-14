import React from 'react';
import Search from '../../../../../../pages/workspace/search';
import NavigationItems from '../../../sidebar/components/NavigationItems';
import Places from '../../../sidebar/components/Places';
import FooterTabs from '../../../sidebar/components/FooterTabs';
import Header from './components';

export default function FullSidebar() {
  return (
    <>
      <Header />

      <section className="relative flex flex-col overflow-scroll">
        <Search />
        <NavigationItems />
        <Places />
      </section>

      <FooterTabs />
    </>
  );
}
