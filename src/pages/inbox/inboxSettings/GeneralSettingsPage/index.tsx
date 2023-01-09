import React from 'react';
import Header from '../components/Header';
import TabbedHeading from '../components/TabbedHeading';
import Form from './components/Form';

function GeneralSettingsPage() {
  return (
    <div className="h-full flex flex-col w-full flex-1 bg-white overflow-hidden">
      <Header />
      <div className="flex-1 h-full overflow-y-scroll pb-10 px-4 sm:px-6 lg:px-6">
        <div className="my-10">
          <TabbedHeading selectedTabKey="general" />
        </div>
        <Form />
      </div>
    </div>
  );
}

export default GeneralSettingsPage;
