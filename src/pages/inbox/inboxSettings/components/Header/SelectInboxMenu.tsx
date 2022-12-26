import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetInboxes } from '../../../../../features/inbox/inboxesService';
import {
  AvatarWithInitials,
  SelectMenuWithAvatar,
} from '../../../../../components';

interface IInbox {
  id: string;
  name: string;
  badge: number | null;
  avatar: JSX.Element;
}

function SelectInboxMenu() {
  const navigate = useNavigate();
  const { inboxId } = useParams();

  const [processedInboxes, setProcessedInboxes] = useState<IInbox[]>([]);
  const [selectedInboxId, setSelectedInboxId] = useState<string | null>(null);

  const { status, data } = useGetInboxes();

  const onChangeInbox = (e: { id: string }) => {
    setSelectedInboxId(e.id);
    navigate(`/inbox/${e.id}`);
  };

  useEffect(() => {
    const tempInboxes: IInbox[] = [];

    if (status === 'success' && data != null) {
      data.data.inboxes.map((inbox) => {
        const avatar = (
          <AvatarWithInitials
            height="h-6"
            width="w-6"
            initials={inbox.initials}
            backgroundColour={inbox.colour}
            textSize="text-xs"
          />
        );

        return tempInboxes.push({
          id: inbox.id,
          name: inbox.name,
          badge: inbox.unfiled_count !== 0 ? inbox.unfiled_count : null,
          avatar,
        });
      });
    }

    setProcessedInboxes(tempInboxes);
  }, [status, data]);

  useEffect(() => {
    if (inboxId) {
      setSelectedInboxId(inboxId);
    }
  }, [inboxId]);

  return status === 'success' && data ? (
    <SelectMenuWithAvatar
      options={processedInboxes}
      selectedId={selectedInboxId}
      onChange={onChangeInbox}
    />
  ) : null;
}

export default SelectInboxMenu;
