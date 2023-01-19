import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setShowMembersInChatSideOver } from '../../../../features/chat/chatSlice';
import AddNew from './components/AddNew';
import List from './components/List';
import SideOver from '../../../SideOver';

interface TeamMembersInChatProps {
  chatId: string;
}

export default function TeamMembersInChat({ chatId }: TeamMembersInChatProps) {
  const dispatch = useAppDispatch();
  const { showMembersInChatSideOver } = useAppSelector((state) => state.chat);
  const onClose = () => dispatch(setShowMembersInChatSideOver(false));

  return (
    <SideOver
      show={showMembersInChatSideOver}
      onClose={onClose}
      title="Members"
    >
      <AddNew chatId={chatId} />
      <List chatId={chatId} />
    </SideOver>
  );
}
