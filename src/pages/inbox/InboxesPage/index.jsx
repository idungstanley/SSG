import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Header';
import Table from './components/Table';
import PinnedInboxes from './components/PinnedInboxes';
import CreateInboxSlideOver from './components/CreateInboxSlideOver';
import { setCreateInboxSlideOverVisibility } from '../../../features/general/slideOver/slideOverSlice';
import { useGetInboxes } from '../../../features/inbox/inboxesService';
import { Spinner } from '../../../common';
import FullScreenMessage from '../../shared/components/FullScreenMessage';

function InboxDashboard() {
  const dispatch = useDispatch();

  const { showHidden } = useSelector((state) => state.inboxes);
  const { status, data } = useGetInboxes(showHidden);
  console.log(data?.data);

  return (
    <>
      <div className="h-full flex flex-1 flex-col w-full bg-white overflow-hidden">
        <Header />
        <div className="flex-1 h-full overflow-y-scroll">
          <PinnedInboxes />

          {status === 'loading' && (
            <div className="mx-auto w-6 mt-10 justify-center">
              <Spinner size={22} color="#0F70B7" />
            </div>
          )}
          {status === 'success' ? (
            data?.data?.inboxes.length === 0 ? (
              <div className="flex flex-1 h-full bg-white">
                <div className="m-auto">
                  <FullScreenMessage
                    title="You have no inboxes yet"
                    description="Get started by creating a new inbox"
                    ctaText="Create inbox"
                    ctaOnClick={() => dispatch(setCreateInboxSlideOverVisibility(true))}
                    showCta
                  />
                </div>
              </div>
            ) : (
              <Table />
            )
          ) : status === 'error' ? (
            <FullScreenMessage
              title="Oops, an error occurred :("
              description="Please try again later."
            />
          ) : null}
        </div>
      </div>
      <CreateInboxSlideOver />
    </>
  );
}

export default InboxDashboard;
