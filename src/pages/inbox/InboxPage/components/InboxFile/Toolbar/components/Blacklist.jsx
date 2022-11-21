import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from '../../../../../../../components';
import {
  useAddFileToBlacklist,
  useDeleteBlacklistFile,
  useGetBlacklistFiles,
} from '../../../../../../../features/inbox/inboxesService';

const noSymbolIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="mr-2.5 h-5 w-5 text-gray-400"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
    />
  </svg>
);

export default function Blacklist() {
  const fileId = useSelector((state) => state.inbox.selectedInboxFileId);
  const { mutate: addToBlacklist } = useAddFileToBlacklist(fileId);
  const { mutate: removeFromBlacklist } = useDeleteBlacklistFile();

  const { data: bl } = useGetBlacklistFiles();
  const blacklist = bl?.data.blacklist;

  const fileInBlacklist = blacklist?.length > 0
    ? blacklist?.find((i) => i.inbox_file.id === fileId)
    : null;

  const onClickHandle = () => {
    if (fileInBlacklist) {
      removeFromBlacklist(fileInBlacklist.id);
    } else {
      addToBlacklist();
    }
  };

  return blacklist ? (
    <Button
      buttonStyle="white"
      label={fileInBlacklist ? 'Remove from blacklist' : 'Add to blacklist'}
      onClick={onClickHandle}
      icon={noSymbolIcon}
      iconPosition="center"
      disabled={false}
      roundedLeft={false}
      roundedRight={false}
      borderRight={false}
      ringOnFocus
      width="w-46"
    />
  ) : null;
}
