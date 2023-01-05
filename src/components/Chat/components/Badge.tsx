import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setShowChat } from '../../../features/chat/chatSlice';

export default function Badge() {
  const dispatch = useAppDispatch();
  const { showChat } = useAppSelector((state) => state.chat);

  return !showChat ? (
    <div
      style={{ rotate: '90deg' }}
      onClick={() => dispatch(setShowChat(true))}
      className="fixed inline-block z-40 top-1/2 -right-9 bg-white border rounded-b-xl py-2 px-4 cursor-pointer"
    >
      <p className="block rotate-45">show chat</p>
    </div>
  ) : null;
}
