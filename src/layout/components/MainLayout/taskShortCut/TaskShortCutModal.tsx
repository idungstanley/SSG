import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

function TaskShortCutModal() {
  const [open, setOpen] = useState(true); // State to control the modal's visibility

  // Function to open the modal
  const openModal = () => {
    setOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setOpen(false);
  };

  const shortcutTabs1 = [
    { text: 'Slash Commands (works when creating tasks and when viewing tasks)', key: '/' },
    {
      text: ' Assign task to self (works when hovering over tasks in List and Board views as well as when you are viewing a task) ',
      key: 'm'
    },
    { text: 'Show/hide sidebar', key: 'q' },
    { text: 'In task view, navigate left/right between tasks', key: 'Ctr ^ ', key2: 'Shift ^', key3: 'or ^ ' }
  ];
  const shortcutTabs2 = [
    { text: 'Back to Task/Page views', key: 'l' },
    {
      text: ' inbox',
      key: 'i'
    },
    { text: 'Notifications (press Space to reload notifications)', key: 'n' },
    {
      text: ' Reminder',
      key: 'r'
    },
    {
      text: ' Home',
      key: 'h'
    },
    {
      text: ' Dashboard',
      key: 'd'
    },
    {
      text: ' Open search',
      key: 's'
    },
    {
      text: ' Create task',
      key: 't'
    },
    {
      text: ' Open notepad',
      key: 'p'
    },
    {
      text: ' Close any task or window',
      key: 'Esc'
    },
    {
      text: ' Clear filters',
      key: '-'
    }
  ];

  return (
    <div>
      <Button variant="contained" color="primary" onClick={openModal}>
        Open Modal
      </Button>
      <Dialog open={open} onClose={closeModal}>
        <DialogTitle>Hotkeys</DialogTitle>
        <DialogTitle>Cool Things</DialogTitle>

        <DialogContent>
          <div className="flex flex-col gap-7">
            {shortcutTabs1.map((tab) => (
              <div key={tab.key} className="flex items-center space-x-2">
                <p className="flex justify-center items-center shadow-md border-2 border-gray-200 w-12 h-12">
                  <p>{tab.key}</p>
                </p>
                {tab.key2 && tab.key3 && (
                  <>
                    <p className="flex justify-center items-center shadow-md border-2 border-gray-200 w-12 h-12">
                      <p>{tab.key2}</p>
                    </p>
                    <p className="flex justify-center items-center shadow-md border-2 border-gray-200 w-12 h-12">
                      <p>{tab.key3}</p>
                    </p>
                  </>
                )}
                <p>{tab.text}</p>
              </div>
            ))}

            <h1>Dashboard Navigation</h1>

            {shortcutTabs2.map((tab) => (
              <div key={tab.key} className="flex items-center space-x-2">
                <p className="flex justify-center items-center shadow-md border-2 border-gray-200 w-12 h-12">
                  {tab.key}
                </p>
                <p>{tab.text}</p>
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
