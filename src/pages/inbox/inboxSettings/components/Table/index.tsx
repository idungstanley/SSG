import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../../../app/hooks';
import { Spinner } from '../../../../../common';
import FullScreenMessage from '../../../../../components/CenterMessage/FullScreenMessage';
import { setShowAddTeamMembersOrGroupsSideOver } from '../../../../../features/general/slideOver/slideOverSlice';
import { useGetInboxAccess } from '../../../../../features/inbox/inboxSettingsService';
import Header from './components/Header';
import Row from './components/Row';

interface LayoutProps {
  isGroups: boolean;
}

export default function Table({ isGroups }: LayoutProps) {
  const dispatch = useAppDispatch();
  const { inboxId } = useParams();
  const { data: dt, status } = useGetInboxAccess(inboxId);

  const data = isGroups ? dt?.data.inbox_member_groups : dt?.data.inbox_members;

  if (status === 'loading') {
    return (
      <div className="mx-auto w-6 justify-center">
        <Spinner size={10} color="#0F70B7" />
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

  const keyWord = isGroups ? 'group' : 'member';

  if (status === 'success' && !data?.length) {
    return (
      <FullScreenMessage
        title={`No ${keyWord}s have been added`}
        description={`Add access to the first ${keyWord}`}
        ctaText={`Add ${keyWord}`}
        ctaOnClick={() => dispatch(setShowAddTeamMembersOrGroupsSideOver(true))}
        showCta
      />
    );
  }

  return data ? (
    <div className="flex flex-col">
      <div className="inline-block min-w-full align-middle">
        <div className="shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <Header />
            <tbody className="divide-y divide-gray-200 bg-white">
              {data.map((item) => (
                <Row key={item.id} item={item} isGroups={isGroups} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : null;
}
