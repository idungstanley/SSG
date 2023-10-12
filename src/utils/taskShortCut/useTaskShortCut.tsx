import React, { Dispatch, SetStateAction } from 'react';
import { useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';

export default function useTaskShortCut() {
  const { preferenceState } = useAppSelector((state) => state.task);
  const { currentWorkspaceId } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  const TaskShortcutListener = (event: KeyboardEvent, setTaskShortcut: Dispatch<SetStateAction<boolean>>) => {
    if (
      document.activeElement?.tagName === 'INPUT' ||
      document.activeElement?.tagName === 'TEXTAREA' ||
      document.activeElement?.getAttribute('contenteditable') === 'true'
    )
      return;

    if (preferenceState.hotkeys) {
      if (event.shiftKey && event.key === '?') {
        setTaskShortcut(true);
      }
      if (event.key === 'h' || event.key === 'H') {
        // window.location.href = '/';
        navigate(`/${currentWorkspaceId}`);
      }
    }
  };
  return TaskShortcutListener;
}
