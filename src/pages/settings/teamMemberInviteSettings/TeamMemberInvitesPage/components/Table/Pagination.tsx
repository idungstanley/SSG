import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../../../../../../components';
import {
  goToPreviousTeamMemberInvitesPage,
  goToNextTeamMemberInvitesPage
} from '../../../../../../features/settings/teamMemberInvites/teamMemberInviteSlice';
import { useGetTeamMemberInvites } from '../../../../../../features/settings/teamMemberInvites/teamMemberInviteService';
import { useAppSelector } from '../../../../../../app/hooks';

export default function Pagination() {
  const dispatch = useDispatch();

  const { teamMemberInvitesPaginationPage } = useAppSelector((state) => state.teamMemberInvite);

  const { data: response } = useGetTeamMemberInvites(teamMemberInvitesPaginationPage);
  const goToPreviousPage = () => {
    dispatch(goToPreviousTeamMemberInvitesPage());
  };

  const goToNextPage = () => {
    dispatch(goToNextTeamMemberInvitesPage());
  };

  return (
    <nav
      className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing{' '}
          {response?.data.pagination.total !== 0 && (
            <>
              <span className="font-medium">{response?.data.pagination.first_item}</span> to{' '}
              <span className="font-medium">{response?.data.pagination.last_item}</span> of{' '}
            </>
          )}
          <span className="font-medium">{response?.data.pagination.total}</span> results
        </p>
      </div>
      <div className="flex-1 flex justify-between sm:justify-end space-x-3">
        <Button
          buttonStyle="white"
          onClick={goToPreviousPage}
          loading={false}
          disabled={response?.data.pagination.on_first_page}
          label="Previous"
          width={28}
        />

        <Button
          buttonStyle="white"
          onClick={goToNextPage}
          loading={false}
          disabled={response?.data.pagination.on_last_page}
          label="Next"
          width={28}
        />
      </div>
    </nav>
  );
}
