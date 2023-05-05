import React from 'react';
import { SimpleSectionHeading } from '../../../components';
import notificationFrame from '../../../assets/branding/notificationFrame.png';

function WorkspaceSettings() {
  return (
    <main className="flex-1 h-full overflow-y-scroll pb-10 px-4 sm:px-6 lg:px-6 bg-white w-full">
      <div
        className="mt-5 flex items-center rounded-t-md pl-5"
        style={{ backgroundImage: `url(${notificationFrame})`, height: '122px' }}
      >
        <SimpleSectionHeading title="" description="" />
      </div>
    </main>
  );
}
export default WorkspaceSettings;
