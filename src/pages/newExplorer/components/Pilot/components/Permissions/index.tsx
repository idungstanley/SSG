import React from 'react';
import { useAppSelector } from '../../../../../../app/hooks';
import { Spinner } from '../../../../../../common';
import FullScreenMessage from '../../../../../../components/CenterMessage/FullScreenMessage';
import { useGetItemAccess } from '../../../../../../features/permissions/permissionsService';
import MembersList from './components/MembersList';

export default function Permissions() {
  const { pilotSideOver } = useAppSelector((state) => state.slideOver);

  const id = pilotSideOver.id;
  const type = pilotSideOver.type;

  const { data, status } = useGetItemAccess({ id, type });

  const fileMembers = data?.file_members;
  const folderMembers = data?.folder_team_members;
  const folderGroupMembers = data?.folder_team_member_groups;

  // console.log(fileMembers, folderMembers, folderGroupMembers);

  return (
    <div>
      {status === 'error' ? (
        <FullScreenMessage
          title="Oops, an error occurred :("
          description="Please try again later."
        />
      ) : status === 'loading' ? (
        <div className="mx-auto w-6 justify-center mt-12">
          <Spinner size={8} color="#0F70B7" />
        </div>
      ) : (
        <div className="mt-3 w-full">
          {fileMembers?.length ? (
            <MembersList title="Members:" membersList={fileMembers} />
          ) : null}
          {folderMembers?.length ? (
            <MembersList title="Members:" membersList={folderMembers} />
          ) : null}
          {folderGroupMembers?.length ? (
            <MembersList
              title="Member groups:"
              isGroup
              membersList={folderGroupMembers}
            />
          ) : null}
        </div>
      )}
    </div>
  );
}
