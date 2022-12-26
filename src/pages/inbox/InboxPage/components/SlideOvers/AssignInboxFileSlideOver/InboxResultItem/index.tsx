import React from 'react';
import { PlusIcon, CheckCircleIcon } from '@heroicons/react/solid';
import {
  Button,
  StackListItemNarrow,
  AvatarWithInitials,
} from '../../../../../../../components';
import { useGetInbox } from '../../../../../../../features/inbox/inboxesService';

interface InboxResultItemProps {
  inboxId: string,
  isAssigned: boolean,
  isDisabled: boolean,
  handleAssignToInbox: (i: string) => void,
  handleUnassignFromInbox: (i: string) => void,
}

function InboxResultItem({
  inboxId,
  isAssigned,
  isDisabled,
  handleAssignToInbox,
  handleUnassignFromInbox,
}: InboxResultItemProps) {
  const { data: inbox } = useGetInbox(inboxId, 'active');

  return inbox ? (
    <StackListItemNarrow
      key={inbox.id}
      title={inbox.name}
      description={`${inbox.email_key}@inbox.alsofile.com`}
      icon={(
        <AvatarWithInitials
          backgroundColour={inbox.colour}
          initials={inbox.initials}
        />
      )}
      button={(
        <Button
          buttonStyle="white"
          onClick={isAssigned ? () => handleUnassignFromInbox(inbox.id) : () => handleAssignToInbox(inbox.id)}
          disabled={isDisabled}
          label={isAssigned ? 'Assigned' : 'Assign'}
          icon={isAssigned ? <CheckCircleIcon className="mr-1 -ml-2 h-5 w-5 text-green-500" aria-hidden="true" /> : <PlusIcon className="mr-1 -ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />}
          width="w-36"
        />
      )}
    />
  ) : null;
}

export default InboxResultItem;
