import React from 'react';
import { useDispatch } from 'react-redux';
import { Spinner } from '../../../../../common';
import { setCreateInboxSlideOverVisibility } from '../../../../../features/general/slideOver/slideOverSlice';
import { useInboxes } from '../../../../../features/inbox/inboxesService';
import FullScreenMessage from '../../../../shared/components/FullScreenMessage';
import Table from '../Table';

function Active() {
  const { data, status, type } = useInboxes('active');
  const dispatch = useDispatch();
  // eslint-disable-next-line no-console
  console.log(data, status);

  if (status === 'loading') {
    return (
      <div className="mx-auto w-6 mt-10 justify-center">
        <Spinner size={22} color="#0F70B7" />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <FullScreenMessage
        title="Oops, an error occurred :("
        description="Please try again later."
      />
    );
  }

  return data.length ? (
    <Table data={data} type={type} />
  ) : (
    <FullScreenMessage
      title="You have no inboxes yet"
      description="Get started by creating a new inbox"
      ctaText="Create inbox"
      ctaOnClick={() => dispatch(setCreateInboxSlideOverVisibility(true))}
      showCta
    />
  );
}

export default Active;
