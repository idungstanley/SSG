import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
} from '@heroicons/react/outline';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button } from '../../../../../../../components';
import { useGetInboxFiles } from '../../../../../../../features/inbox/inboxService';
import { setCurrentInboxFile } from '../../../../../../../features/inbox/inboxSlice';

export default function NavigationBetweenFiles() {
  const dispatch = useDispatch();
  const { inboxId } = useParams();
  const { selectedInboxTabKey, selectedInboxFileIndex } = useSelector(
    (state) => state.inbox,
  );
  const { data: dt } = useGetInboxFiles({
    inboxId,
    isArchived: selectedInboxTabKey === 'archived' ? 1 : 0,
  });

  const inboxFiles = dt?.pages.flatMap((page) => page.data.inbox_files);

  const handleNavigateToFile = (action) => {
    const relative = action === 'previous' ? -1 : 1;
    const tmp = selectedInboxFileIndex + relative;
    const navigateToFileIndex = tmp >= inboxFiles.length ? 0 : tmp < 0 ? inboxFiles.length - 1 : tmp;

    const navigateToFileId = inboxFiles[navigateToFileIndex].id;

    if (navigateToFileId && navigateToFileId) {
      dispatch(
        setCurrentInboxFile({
          inboxFileId: navigateToFileId,
          inboxFileIndex: navigateToFileIndex,
        }),
      );
    }
  };

  const navigateItems = [
    {
      id: 1,
      onClick: () => handleNavigateToFile('previous'),
      icon: (
        <ArrowCircleLeftIcon
          className="h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      ),
    },
    {
      id: 2,
      onClick: () => handleNavigateToFile('next'),
      icon: (
        <ArrowCircleRightIcon
          className="h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      ),
    },
  ];

  return inboxFiles?.length > 1 ? (
    <div className="relative z-0 inline-flex space-x-2">
      {navigateItems.map((i) => (
        <Button
          key={i.id}
          buttonStyle="white"
          onClick={i.onClick}
          icon={i.icon}
          iconPosition="center"
          disabled={false}
          ringOnFocus
        />
      ))}
    </div>
  ) : <div> </div>;
}
