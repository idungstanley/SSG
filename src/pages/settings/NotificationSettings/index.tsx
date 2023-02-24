import React from 'react';
import { SimpleSectionHeading } from '../../../components';
import NotificaitonTablle from './components/Table';

export default function NotificationSettingsPage() {
  return (
    <main className="flex-1 h-full overflow-y-scroll pb-10 px-4 sm:px-6 lg:px-6">
      <div className="my-10">
        <SimpleSectionHeading
          title="Notifications"
          description="Manage notification for each action within workspace"
        />
      </div>
      <NotificaitonTablle />
    </main>
  );
}
