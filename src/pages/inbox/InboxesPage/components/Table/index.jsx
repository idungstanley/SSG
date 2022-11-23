import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import Body from './Body';
import {
  useGetHiddenInboxes,
  useGetInboxes,
} from '../../../../../features/inbox/inboxesService';
import { Spinner } from '../../../../../common';
import FullScreenMessage from '../../../../shared/components/FullScreenMessage';
import { setCreateInboxSlideOverVisibility } from '../../../../../features/general/slideOver/slideOverSlice';

function Table() {
  const dispatch = useDispatch();
  const { showHidden } = useSelector((state) => state.inboxes);
  const { status: activeStatus, data: active } = useGetInboxes();
  const { status: hiddenStatus, data: hidden } = useGetHiddenInboxes();
  const data = activeStatus === 'success' && hiddenStatus === 'success'
    ? showHidden
      ? [...hidden.data.inboxes]
      : [...active.data.inboxes]
    : null;

  return (
    <>
      {(activeStatus === 'loading' || hiddenStatus === 'loading') && (
        <div className="mx-auto w-6 mt-10 justify-center">
          <Spinner size={22} color="#0F70B7" />
        </div>
      )}
      {activeStatus === 'success' && hiddenStatus === 'success' ? (
        data.length === 0 ? (
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
          <div className="flex-1 align-middle inline-block min-w-full border-b border-gray-200">
            <table className="min-w-full">
              <Header />
              <Body data={data} />
            </table>
          </div>
        )
      ) : activeStatus === 'error' || hiddenStatus === 'error' ? (
        <FullScreenMessage
          title="Oops, an error occurred :("
          description="Please try again later."
        />
      ) : null}
    </>
  );
}

export default Table;
