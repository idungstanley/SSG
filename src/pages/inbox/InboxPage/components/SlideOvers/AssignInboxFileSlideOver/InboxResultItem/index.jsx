import React from 'react';
import PropTypes from 'prop-types';
import { PlusIcon, CheckCircleIcon } from '@heroicons/react/solid';
import {
  Button,
  StackListItemNarrow,
  AvatarWithInitials,
} from '../../../../../../../components';
import { useGetInbox } from '../../../../../../../features/inbox/inboxesService';

function InboxResultItem({
  inboxId,
  isAssigned,
  // isProcessing,
  isDisabled,
  handleAssignToInbox,
  handleUnassignFromInbox,
}) {
  const { data: inbox } = useGetInbox(inboxId);

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
          // loading={isProcessing}
          disabled={isDisabled}
          label={isAssigned ? 'Assigned' : 'Assign'}
          icon={isAssigned ? <CheckCircleIcon className="mr-1 -ml-2 h-5 w-5 text-green-500" aria-hidden="true" /> : <PlusIcon className="mr-1 -ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />}
          width="w-36"
        />
      )}
    />
  ) : null;
}

InboxResultItem.propTypes = {
  inboxId: PropTypes.string.isRequired,
  isAssigned: PropTypes.bool.isRequired,
  // isProcessing: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  handleAssignToInbox: PropTypes.func.isRequired,
  handleUnassignFromInbox: PropTypes.func.isRequired,
};

export default InboxResultItem;
