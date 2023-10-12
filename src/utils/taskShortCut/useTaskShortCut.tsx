import React, { Dispatch, SetStateAction } from 'react';

export default function useTaskShortCut() {
  const TaskShortcutListener = (event: KeyboardEvent, setTaskShortcut: Dispatch<SetStateAction<boolean>>) => {
    if (
      document.activeElement?.tagName === 'INPUT' ||
      document.activeElement?.tagName === 'TEXTAREA' ||
      document.activeElement?.getAttribute('contenteditable') === 'true'
    )
      return;

    if (event.shiftKey && event.key === '?') {
      setTaskShortcut(true);
    }
    if (event.key === 'h' || event.key === 'H') {
      window.location.href = '/';
    }
  };
  return TaskShortcutListener;
}
