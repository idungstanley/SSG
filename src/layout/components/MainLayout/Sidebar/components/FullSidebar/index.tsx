import React from 'react';
import Search from '../../../../../../pages/workspace/search';
import NavigationItems from '../NavigationItems';
import Places from '../Places';
import FooterTabs from '../FooterTabs';
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
