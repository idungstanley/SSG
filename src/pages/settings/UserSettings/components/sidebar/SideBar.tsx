import React from 'react';
import Header from '../../../../../layout/components/MainLayout/Sidebar/components/Header/index';
import Workspace from './Workspace';
import User from './User';

function SideBar() {
  return (
    <div>
      <section>
        <Header />
      </section>
      <section>
        <Workspace />
      </section>
      <section>
        <User />
      </section>
    </div>
  );
}

export default SideBar;
