import React from 'react';
import {
  useGetItemWatchers,
  useRemoveWatcher,
} from '../../../features/general/watchers/watchersService';
import { itemType } from '../../../types';
import AvatarWithInitials from '../../avatar/AvatarWithInitials';
import FullScreenMessage from '../../CenterMessage/FullScreenMessage';
import { TrashIcon } from '@heroicons/react/24/outline';

interface ListProps {
  item: { type: itemType; id: string };
}

export default function List({ item }: ListProps) {
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

  const handleRemove = (id: string) => {
    onRemove({
      ...item,
      team_member_ids: [id],
    });
  };

  return watchers ? (
    watchers.length ? (
      <div>
        <h3>Watchers list:</h3>
        <ul role="list" className="divide-y divide-gray-200">
          {watchers.map((watcher) => (
            <li
              key={watcher.id}
              className="flex py-4 w-full items-center justify-between"
            >
              <div className="flex">
                <AvatarWithInitials
                  initials={watcher.team_member.initials}
                  backgroundColour={watcher.team_member.colour}
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
                onClick={() => handleRemove(watcher.team_member_id)}
                className="w-6 h-6 text-gray-300 cursor-pointer hover:text-red-500 transition-all duration-300"
              />
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <FullScreenMessage
        title="You have no watchers yet"
        description="Get started by creating a new"
      />
    )
  ) : null;
}
