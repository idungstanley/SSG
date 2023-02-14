import React from 'react';
import FooterTabs from '../FooterTabs';
import NavigationItems from '../NavigationItems';
import Places from '../Places';
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
