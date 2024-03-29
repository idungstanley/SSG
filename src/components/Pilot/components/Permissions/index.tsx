import React from 'react';
import { useAppSelector } from '../../../../app/hooks';
import { Spinner } from '../../../../common';
import FullScreenMessage from '../../../CenterMessage/FullScreenMessage';
import { useGetItemAccess } from '../../../../features/permissions/permissionsService';
import AddAccess from './components/AddAccess';
import MembersList from './components/MembersList';
import SectionArea from '../SectionArea';
import { TbShield } from 'react-icons/tb';

export default function Permissions() {
  const { pilotSideOver } = useAppSelector((state) => state.slideOver);
  const { id, type } = pilotSideOver;

  const { data, status } = useGetItemAccess({
    id,
    type: type as 'file' | 'folder'
  });

  const fileMembers = data?.file_members;
  const folderMembers = data?.folder_team_members;
  const folderGroupMembers = data?.folder_team_member_groups;

  return (
    <>
      <SectionArea label="Permissions" icon={<TbShield className="w-4 h-4" />} />
      {status === 'error' ? (
        <FullScreenMessage title="Oops, an error occurred :(" description="Please try again later." />
      ) : status === 'loading' ? (
        <div className="justify-center w-6 mx-auto mt-12">
          <Spinner size={8} color="#0F70B7" />
        </div>
      ) : (
        <div className="w-full border-t space-y-3">
          {/* in all lists no members */}
          <div className="space-y-3">
            {!fileMembers?.length && !folderMembers?.length && !folderGroupMembers?.length ? (
              <p className="text-center">No active permission members</p>
            ) : null}

            {/* list with members */}
            {fileMembers?.length ? <MembersList title="Members:" membersList={fileMembers} /> : null}
            {folderMembers?.length ? <MembersList title="Members:" membersList={folderMembers} /> : null}
            {folderGroupMembers?.length ? (
              <MembersList title="Member groups:" isGroup membersList={folderGroupMembers} />
            ) : null}
          </div>

          {/* add access menu */}
          <div className="space-y-3">
            {fileMembers ? (
              <AddAccess type="member" actualMemberIds={fileMembers?.map((i) => i.team_member.id)} />
            ) : null}
            {folderMembers ? (
              <AddAccess type="member" actualMemberIds={folderMembers?.map((i) => i.team_member.id)} />
            ) : null}
            {folderGroupMembers ? (
              <AddAccess type="member-group" actualMemberIds={folderGroupMembers?.map((i) => i.team_member_group.id)} />
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}
