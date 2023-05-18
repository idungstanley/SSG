import React from 'react';
import subscribersFrame from '../../../../assets/branding/subscribersFrame.svg';
import { SimpleSectionHeading } from '../../../../components';

function SubscribersSettings() {
  const settings = [
    'When I create a task or subtask',
    'When a new subtask is created in a parent task I am watching',
    'When I edit a task or subtask',
    'When I comment on a task or subtask'
  ];
  return (
    <main className="h-full overflow-y-scroll pb-10 px-4 sm:px-6 lg:px-6 bg-white w-full">
      <div
        className="mt-5 flex items-center rounded-t-md pl-5"
        style={{ backgroundImage: `url(${subscribersFrame})`, height: '122px', backgroundSize: 'contain' }}
      >
        <div className="ml-12">
          <SimpleSectionHeading
            title="Subscribers"
            description="When do you want to be added as a watcher on a task?"
          />
        </div>
      </div>
      <div>
        {settings.map((txt) => {
          return (
            <div className="flex ml-16 items-center my-6" key={txt}>
              <input type="checkbox" className="mr-4" style={{ width: '15px', height: '15px' }} />
              <h2 className="text-base font-medium">{txt}</h2>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default SubscribersSettings;
