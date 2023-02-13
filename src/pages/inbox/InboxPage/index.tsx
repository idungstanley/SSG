import React, { Suspense } from 'react';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import InboxFile from './components/InboxFile';
import LeftSidebar from './components/LeftSidebar';
import Header from './components/Header';
import AssignInboxFileSlideOver from './components/SlideOvers/AssignInboxFileSlideOver';
import UploadModal from '../../../components/UploadModal';
import { useParams } from 'react-router-dom';

const Watchers = React.lazy(
  () => import('../../../components/Watchers/WatchersForPilot')
);

function InboxPage() {
  const { inboxId } = useParams();

  return (
    <>
      <UploadModal />
      <div className="h-full flex flex-col w-full flex-1 bg-white overflow-hidden">
        <Header />
        <div className="flex flex-1 h-full w-full overflow-x-hidden">
          {/* Left sidebar */}
          <div className="h-full border-b border-gray-200 xl:border-b-0 hidden xl:w-96 xl:block xl:border-r xl:border-gray-200 bg-white">
            <LeftSidebar />
          </div>

          {/* Main */}
          <div className="h-full bg-white lg:min-w-0 flex-1">
            <InboxFile />
          </div>
        </div>

        {/* Slide Overs */}
        <Suspense fallback={<div>Loading...</div>}>
          {inboxId ? <Watchers /> : null}
        </Suspense>
        <AssignInboxFileSlideOver />
      </div>
    </>
  );
}

export default InboxPage;
