import React from 'react';
import { useDispatch } from 'react-redux';
import { Spinner } from '../../../../../common';
import HalfScreenMessage from '../../../../../components/CenterMessage/HalfScreenMessage';
import { setCreateInboxSlideOverVisibility } from '../../../../../features/general/slideOver/slideOverSlice';
import { useInboxes } from '../../../../../features/inbox/inboxesService';
import Header from '../Table/Header';
import Row from '../Table/Row';

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
      <HalfScreenMessage
        title="Oops, an error occurred :("
        description="Please try again later."
      />
    );
  }

  return data.length ? (
    <div className="flex-1 align-middle inline-block min-w-full border-b border-gray-200">
      <table className="min-w-full">
        <Header />
        <tbody className="bg-white divide-y divide-gray-100">
          {data.map((inbox) => (
            <Row key={inbox.id} inboxId={inbox.id} type={type} />
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <HalfScreenMessage
      title="You have no inboxes yet"
      description="Get started by creating a new inbox"
      ctaText="Create inbox"
      ctaOnClick={() => dispatch(setCreateInboxSlideOverVisibility(true))}
      showCta
    />
  );
}

export default Active;
