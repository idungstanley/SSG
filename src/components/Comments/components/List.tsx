import React from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/solid';
import { Spinner } from '../../../common';
import FullScreenMessage from '../../CenterMessage/FullScreenMessage';
import { IMentionUser } from '../../../features/chat/chat.interfaces';
import { mentionTeamMemberInMessageReg } from '../../../regex';

interface itemType {
  id: string;
  message: string;
  can_modify: boolean;
  mention_users: IMentionUser[];
}
interface ListType {
  status: string;
  comments: itemType[];
  onEdit: (id: string, message: string, users: IMentionUser[]) => void;
  onDelete: (value: string) => void;
}

export default function List({ status, comments, onEdit, onDelete }: ListType) {
  return status === 'loading' ? (
    <div className="mx-auto mt-3 mb-6 w-6 justify-center">
      <Spinner size={8} color="#0F70B7" />
    </div>
  ) : status === 'success' ? (
    comments?.length ? (
      <ul className="divide-y divide-gray-200">
        {comments.map((item) => (
          <li key={item.id} className="flex items-center justify-between py-4">
            <p>{item.message.replaceAll(mentionTeamMemberInMessageReg, '')}</p>
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                {item.mention_users?.map((user) => (
                  <div
                    key={user.id}
                    className="px-3 py-1 text-sm bg-indigo-100 border border-primary-400 rounded-2xl"
                  >
                    {user.name}
                  </div>
                ))}
              </div>
              {item.can_modify ? (
                <>
                  <PencilIcon
                    onClick={() =>
                      onEdit(item.id, item.message, item.mention_users)
                    }
                    className="w-6 h-6 text-gray-300 transition-all duration-300 cursor-pointer hover:text-indigo-500"
                  />
                  <TrashIcon
                    onClick={() => onDelete(item.id)}
                    className="w-6 h-6 text-gray-300 transition-all duration-300 cursor-pointer hover:text-red-500"
                  />
                </>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <FullScreenMessage title="No messages yes." description="Create one." />
    )
  ) : (
    <FullScreenMessage
      title="Oops, an error occurred :("
      description="Please try again later."
    />
  );
}
