import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { setPreferenceState } from '../../features/task/taskSlice';
import { setShowExtendedBar } from '../../features/workspace/workspaceSlice';

export default function useTaskShortCut() {
  const { preferenceState, userSettingsProfile } = useAppSelector((state) => state.task);
  const { currentWorkspaceId } = useAppSelector((state) => state.auth);
  const { showExtendedBar } = useAppSelector((state) => state.workspace);

  const dispatch = useAppDispatch();

  useEffect(() => {
    userSettingsProfile.map((keys) => {
      if (keys.key == 'hotkeys') {
        const updatePreferenceState = {
          ...preferenceState,
          hotkeys: keys.value
        };
        dispatch(setPreferenceState(updatePreferenceState));
      }
    });
  }, [userSettingsProfile]);

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
      if (event.key === 'n' || event.key === 'N') {
        dispatch(setShowExtendedBar(true));
      }
    }
  };
  return TaskShortcutListener;
}
