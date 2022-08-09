import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../../../components';
import {
  goToPreviousTeamMemberGroupsPage,
  goToNextTeamMemberGroupsPage,
} from '../../../../../features/settings/teamMemberGroups/teamMemberGroupSlice';
import { useGetTeamMemberGroups } from '../../../../../features/settings/teamMemberGroups/teamMemberGroupService';

export default function Pagination() {
  const dispatch = useDispatch();

  const teamMemberGroupsPaginationPage = useSelector((state) => state.teamMemberGroup.teamMemberGroupsPaginationPage);

  const { data } = useGetTeamMemberGroups(teamMemberGroupsPaginationPage);

  const goToPreviousPage = () => {
    dispatch(goToPreviousTeamMemberGroupsPage());
  };

  const goToNextPage = () => {
    dispatch(goToNextTeamMemberGroupsPage());
  };

  return (
    <nav
      className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing
          {' '}
          {data.data.pagination.total !== 0 && (
            <>
              <span className="font-medium">{data.data.pagination.first_item}</span>
              {' '}
              to
              {' '}
              <span className="font-medium">{data.data.pagination.last_item}</span>
              {' '}
              of
              {' '}
            </>
          )}
          <span className="font-medium">{data.data.pagination.total}</span>
          {' '}
          results
        </p>
      </div>
      <div className="flex-1 flex justify-between sm:justify-end space-x-3">
        <Button
          buttonStyle="white"
          onClick={goToPreviousPage}
          loading={false}
          disabled={data.data.pagination.on_first_page}
          label="Previous"
          width={28}
        />

        <Button
          buttonStyle="white"
          onClick={goToNextPage}
          loading={false}
          disabled={data.data.pagination.on_last_page}
          label="Next"
          width={28}
        />
      </div>
    </nav>
  );
}
