import { ArrowRightCircleIcon, ArrowLeftCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../../../../../app/hooks';
import { Button } from '../../../../../../../components';
import { useGetInboxFiles } from '../../../../../../../features/inbox/inboxService';
import { setCurrentInboxFile } from '../../../../../../../features/inbox/inboxSlice';

export default function NavigationBetweenFiles() {
  const dispatch = useDispatch();
  const { inboxId } = useParams();
  const { selectedInboxTabKey, selectedInboxFileIndex } = useAppSelector((state) => state.inbox);
  const { data: dt } = useGetInboxFiles({
    inboxId,
    isArchived: selectedInboxTabKey === 'archived'
  });

  const inboxFiles = dt?.pages.flatMap((page) => page.data.inbox_files);

  const handleNavigateToFile = (action: string) => {
    if (inboxFiles) {
      const relative = action === 'previous' ? -1 : 1;
      const tmp = selectedInboxFileIndex ? selectedInboxFileIndex + relative : relative;
      const navigateToFileIndex = tmp >= inboxFiles.length ? 0 : tmp < 0 ? inboxFiles.length - 1 : tmp;

      const navigateToFileId = inboxFiles[navigateToFileIndex].id;

      if (navigateToFileId && navigateToFileId) {
        dispatch(
          setCurrentInboxFile({
            inboxFileId: navigateToFileId,
            inboxFileIndex: navigateToFileIndex
          })
        );
      }
    }
  };

  const navigateItems = [
    {
      id: 'previous',
      onClick: () => handleNavigateToFile('previous'),
      icon: <ArrowRightCircleIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
    },
    {
      id: 'next',
      onClick: () => handleNavigateToFile('next'),
      icon: <ArrowLeftCircleIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
    }
  ];

  return inboxFiles ? (
    inboxFiles.length > 1 ? (
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
    ) : (
      <div />
    )
  ) : null;
}
