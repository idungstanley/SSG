import React from 'react';
import Header from '../../../../../layout/components/MainLayout/Sidebar/components/Header/index';
import Workspace from './Workspace';
import User from './User';
import { IUserData } from '../../../../../features/workspace/workspace.interfaces';

interface dataProps {
  data: IUserData | undefined;
}

function SideBar({ data }: dataProps) {
  return (
    <div>
      <section>
        <Header />
      </section>
      <section>
        <Workspace />
      </section>
      <section>
        <User userName={data?.name} />
      </section>
    </div>
  );
}

export default SideBar;
