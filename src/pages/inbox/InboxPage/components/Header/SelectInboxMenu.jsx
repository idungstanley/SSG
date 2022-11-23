import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetInboxes } from '../../../../../features/inbox/inboxesService';
import {
  AvatarWithInitials,
  SelectMenuWithAvatar,
} from '../../../../../components';

function SelectInboxMenu() {
  const navigate = useNavigate();
  const { inboxId } = useParams();

  const [processedInboxes, setProcessedInboxes] = useState([]);
  const [selectedInboxId, setSelectedInboxId] = useState(null);

  const { showHidden } = useSelector((state) => state.inboxes);
  const { status, data } = useGetInboxes(showHidden);

  const onChangeInbox = (e) => {
    setSelectedInboxId(e.id);
    navigate(`/inbox/${e.id}`);
  };

  useEffect(() => {
    var tempInboxes = [];

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

    return true;
  }, [status, data]);

  useEffect(() => {
    setSelectedInboxId(inboxId);
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
