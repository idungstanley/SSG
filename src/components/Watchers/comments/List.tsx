import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { Spinner } from '../../../common';
import {
  useGetItemWatchers,
  useRemoveWatcher,
} from '../../../features/general/watchers/watchersService';
import { itemType } from '../../../types';
import AvatarWithInitials from '../../avatar/AvatarWithInitials';
import FullScreenMessage from '../../CenterMessage/FullScreenMessage';
import { TrashIcon } from '@heroicons/react/outline';

export default function List() {
  const { inboxId } = useParams();
  const { selectedInboxFileId } = useAppSelector((state) => state.inbox);
  const { selectedItemId, selectedItemType } = useAppSelector(
    (state) => state.explorer
  );

  const isInboxFile = !!selectedInboxFileId;
  const isInbox = !!inboxId;

  const item: { type: itemType; id: string } = isInboxFile
    ? { type: 'inbox', id: inboxId || '' }
    : isInbox
    ? { type: 'inbox_file', id: selectedInboxFileId || '' }
    : { type: selectedItemType || 'file', id: selectedItemId || '' };

  const { data, status } = useGetItemWatchers(item);
  const watchers = data?.data.watchers;

  const { mutate: onRemove } = useRemoveWatcher(item.id);

  if (status === 'error') {
    return (
      <FullScreenMessage
        title="Oops, an error occurred :("
        description="Please try again later."
      />
    );
  }

  if (status === 'loading') {
    return (
      <div className="mx-auto w-6 mt-5 justify-center">
        <Spinner size={8} color="#0F70B7" />
      </div>
    );
  }

  const handleRemove = (id: string) => {
    onRemove({
      ...item,
      team_member_ids: [id],
    });
  };

  return watchers ? (
    watchers.length ? (
      <ul role="list" className="divide-y divide-gray-200">
        {watchers.map((watcher) => (
          <li
            key={watcher.team_member.user.id}
            className="flex py-4 w-full items-center justify-between"
          >
            <div>
              <AvatarWithInitials
                initials={watcher.team_member.initials}
                height="h-4"
                width="w-4"
                backgroundColour={watcher.team_member.colour}
                roundedStyle="rounded"
              />

              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  {watcher.team_member.user.name}
                </p>
                <p className="text-sm text-gray-500">
                  {watcher.team_member.user.email}
                </p>
              </div>
            </div>

            <TrashIcon
              onClick={() => handleRemove(watcher.id)}
              className="w-6 h-6 text-gray-300 cursor-pointer hover:text-red-500 transition-all duration-300"
            />
          </li>
        ))}
      </ul>
    ) : (
      <FullScreenMessage
        title="You have no watchers yet"
        description="Get started by creating a new"
      />
    )
  ) : null;
}
