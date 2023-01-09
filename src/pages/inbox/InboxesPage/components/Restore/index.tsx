import React from 'react';
import { Spinner } from '../../../../../common';
import FullScreenMessage from '../../../../../components/CenterMessage/FullScreenMessage';
import { useGetTrashedInboxes } from '../../../../../features/inbox/inboxesService';
import Header from '../Table/Header';
import Row from '../Table/Row';

export default function Restore() {
  const { data, status } = useGetTrashedInboxes();
  const trashed = data?.data.inboxes;

  if (status === 'loading') {
    return (
      <div className="mx-auto w-6 mt-10 justify-center">
        <Spinner size={8} color="#0F70B7" />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <FullScreenMessage
        title="Oops, an error occurred :("
        description="Please try again later."
        showHalFScreen
      />
    );
  }

  return trashed && trashed.length ? (
    <div className="flex-1 align-middle inline-block min-w-full border-b border-gray-200">
      <table className="min-w-full">
        <Header />
        <tbody className="bg-white divide-y divide-gray-100">
          {trashed.map((inbox) => (
            <Row
              key={inbox.id}
              inboxId={inbox.id}
              type="trashed"
              inbox={inbox}
            />
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <FullScreenMessage
      title="You have no trashed yet"
      description="Get started by creating a new inbox"
      showHalFScreen
    />
  );
}
