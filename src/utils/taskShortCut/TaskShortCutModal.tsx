import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { coolThings, dashboardNavigation, markdown, textAndCommentEditor } from './shortcutSections/shortcutSections';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setPreferenceState } from '../../features/task/taskSlice';

function TaskShortCutModal({ setTaskShortcutModal }: { setTaskShortcutModal: Dispatch<SetStateAction<boolean>> }) {
  const [open, setOpen] = useState(true);
  const customWidth = { maxWidth: 750 };

  const { preferenceState, userSettingsProfile } = useAppSelector((state) => state.task);
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

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setTaskShortcutModal(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={openModal}>
        Open Modal
      </Button>
      <Dialog open={open} onClose={closeModal} PaperProps={{ style: customWidth }} fullWidth>
        <DialogTitle>Hotkeys</DialogTitle>
        <DialogTitle>Cool Things</DialogTitle>

        <DialogContent>
          <div className="flex flex-col gap-7">
            {coolThings.map((tab) => (
              <div key={tab.key} className="flex items-center space-x-2 p-1 rounded-sm hover:bg-gray-300">
                <p
                  className={`flex bg-white justify-center ${tab.key == 'm' && 'w-14'} ${
                    tab.key == 'Ctr ^' && 'h-10 w-16'
                  } items-center shadow-md border-2 font-extrabold text-lg w-12 h-12`}
                >
                  <p>{tab.key}</p>
                </p>
                {tab.key2 && tab.key3 && (
                  <>
                    <p className="flex justify-center items-center bg-white font-extrabold text-lg shadow-md border-2 w-16 h-12">
                      <p>{tab.key2}</p>
                    </p>
                    <p className="flex justify-center items-center bg-white font-extrabold shadow-md border-2 w-16 h-12">
                      <p>{tab.key3}</p>
                    </p>
                  </>
                )}
                <p>{tab.text}</p>
              </div>
            ))}

            <h1 className="text-lg font-bold">Dashboard Navigation</h1>
            {dashboardNavigation.map((tab) => (
              <div key={tab.key} className="flex items-center space-x-2 p-1 rounded-sm hover:bg-gray-300">
                <p className="flex justify-center items-center shadow-md border-2 bg-white font-extrabold text-lg w-12 h-12">
                  {tab.key}
                </p>
                <p>{tab.text}</p>
              </div>
            ))}

            <h1 className="text-lg font-bold">Text and Comment Editor</h1>
            <h1 className="text-lg font-bold">Shortcuts</h1>

            {textAndCommentEditor.map((tab) => (
              <div key={tab.key} className="flex items-center space-x-2 p-1 rounded-sm hover:bg-gray-300">
                <p className="flex justify-center items-center shadow-md border-2 bg-white font-extrabold text-lg w-12 h-12">
                  <p>{tab.key}</p>
                </p>
                {tab.key2 && (
                  <>
                    <p className="flex justify-center items-center shadow-md border-2 bg-white font-extrabold text-lg w-12 h-12">
                      <p>{tab.key2}</p>
                    </p>
                  </>
                )}
                {tab.key3 && (
                  <>
                    <p className="flex justify-center items-center shadow-md border-2 bg-white font-extrabold text-lg w-12 h-12">
                      <p>{tab.key3}</p>
                    </p>
                  </>
                )}
                <p>{tab.text}</p>
              </div>
            ))}

            <h1 className="text-lg font-bold">Markdown</h1>
            {markdown.map((tab) => (
              <div key={tab.key} className="flex items-center space-x-2 p-1 rounded-sm hover:bg-gray-300">
                <p className="flex justify-center items-center shadow-md border-2 bg-white font-extrabold text-lg w-12 h-12">
                  <p>{tab.key}</p>
                </p>
                {tab.textMiddle && <p>{tab.text}</p>}
                {tab.key2 && (
                  <>
                    <p className="flex justify-center items-center shadow-md border-2 bg-white font-extrabold text-lg w-12 h-12">
                      <p>{tab.key2}</p>
                    </p>
                  </>
                )}
                {tab.text2 && <p>{tab.text2}</p>}
                {tab.key3 && (
                  <>
                    <p className="flex justify-center items-center shadow-md border-2 bg-white font-extrabold text-lg w-12 h-12">
                      <p>{tab.key3}</p>
                    </p>
                  </>
                )}
                {tab.key4 && (
                  <>
                    <p className="flex justify-center items-center shadow-md border-2 bg-white font-extrabold text-lg w-16 h-12">
                      <p>{tab.key4}</p>
                    </p>
                  </>
                )}
                {!tab.textMiddle && <p>{tab.text}</p>}
              </div>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TaskShortCutModal;
