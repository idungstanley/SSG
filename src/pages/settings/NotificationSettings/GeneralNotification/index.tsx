import React from 'react';
import { SimpleSectionHeading } from '../../../../components';
import NotificaitonTable from './components/Table';
import notificationFrame from '../../../../assets/branding/notificationFrame.png';
// import NotificationSettings from './components/NotificationSettings';

export default function NotificationSettingsPage() {
  return (
    <main className="flex-1 h-full overflow-y-scroll pb-10 px-4 sm:px-6 lg:px-6 bg-white w-full">
      <div
        className="mt-5 flex items-center rounded-t-md pl-5"
        style={{ backgroundImage: `url(${notificationFrame})`, height: '122px' }}
      >
        <SimpleSectionHeading
          title="Notifications"
          description="Manage notification for each action within workspace"
        />
      </div>

      <NotificaitonTable />
    </main>
  );
}
