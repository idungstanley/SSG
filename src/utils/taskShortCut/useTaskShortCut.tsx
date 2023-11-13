import { Dispatch, SetStateAction, startTransition, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import {
  setAssignOnHoverState,
  setCopyNewlyCreatedTask,
  setCreateTaskShortCut,
  setEscapeKey,
  setF2State,
  setHilightNewlyCreatedTask,
  setPreferenceState
} from '../../features/task/taskSlice';
import { setActiveTabId, setShowExtendedBar } from '../../features/workspace/workspaceSlice';

export default function useTaskShortCut() {
  const { preferenceState, userSettingsProfile } = useAppSelector((state) => state.task);
  const { currentWorkspaceId } = useAppSelector((state) => state.auth);

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
    startTransition(() => {
      const handleInputFields = () => {
        if (
          document.activeElement?.tagName === 'INPUT' ||
          document.activeElement?.tagName === 'TEXTAREA' ||
          document.activeElement?.getAttribute('contenteditable') === 'true'
        ) {
          dispatch(setHilightNewlyCreatedTask(false));
          dispatch(setCopyNewlyCreatedTask(false));
          return false;
        } else {
          return true;
        }
      };

      if (preferenceState.hotkeys) {
        if (handleInputFields() == true) {
          switch (event.key) {
            case '?':
              if (event.shiftKey) {
                setTaskShortcut(true);
              }
              break;
            case 'h':
            case 'H':
              navigate(`/${currentWorkspaceId}`);
              break;
            case 'c':
            case 'C':
              dispatch(setActiveTabId('calendar'));
              break;
            case 'n':
            case 'N':
              dispatch(setShowExtendedBar(true));
              break;
            case '1':
              dispatch(setHilightNewlyCreatedTask(true));
              break;
            case '3':
              dispatch(setCopyNewlyCreatedTask(true));
              break;
            case 'm':
            case 'M':
              dispatch(setAssignOnHoverState(true));
              break;
            case 'F2':
              dispatch(setF2State(true));
              break;
            case 't':
            case 'T':
              dispatch(setCreateTaskShortCut(true));
              break;

            default:
              break;
          }
        }
        switch (event.key) {
          case 'Escape':
            dispatch(setEscapeKey(true));
            break;
          default:
        }
      }
    });
  };
  return TaskShortcutListener;
}
