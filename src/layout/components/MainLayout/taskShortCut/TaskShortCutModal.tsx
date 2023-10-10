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
            <div className="flex items-center space-x-2">
              <p className="flex justify-center items-center shadow-md border-2 border-gray-200 w-12 h-12">/</p>
              <p>Slash Commands (works when creating tasks and when viewing tasks)</p>
            </div>

            <div className="flex items-center space-x-2">
              <p className="flex justify-center items-center shadow-md border-2 border-gray-200 w-16 h-12">m</p>
              <p>
                Assign task to self (works when hovering over tasks in List and Board views as well as when you are
                viewing a task)
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <p className="flex justify-center items-center shadow-md border-2 border-gray-200 w-12 h-12">q</p>
              <p>Show/hide sidebar</p>
            </div>

            <div className="flex items-center space-x-2">
              <p className="flex justify-center items-center shadow-md border-2 border-gray-200 w-16 h-11"> Ctr ^ </p>
              <p className="flex justify-center items-center shadow-md border-2 border-gray-200 w-16 h-11"> Shift ^ </p>
              <p className="flex justify-center items-center shadow-md border-2 border-gray-200 w-16 h-11"> or ^ </p>
              <p>In task view, navigate left/right between tasks</p>
            </div>

            <h1>Dashboard Navigation</h1>
            <div className="flex items-center space-x-2">
              <p className="flex justify-center items-center shadow-md border-2 border-gray-200 w-12 h-12">l</p>
              <p>Back to Task/Page views</p>
            </div>
            <div className="flex items-center space-x-2">
              <p className="flex justify-center items-center shadow-md border-2 border-gray-200 w-12 h-12">i</p>
              <p>inbox</p>
            </div>
            <div className="flex items-center space-x-2">
              <p className="flex justify-center items-center shadow-md border-2 border-gray-200 w-12 h-12">n</p>
              <p>Notifications (press Space to reload notifications)</p>
            </div>
            <div className="flex items-center space-x-2">
              <p className="flex justify-center items-center shadow-md border-2 border-gray-200 w-12 h-12">r</p>
              <p>Reminder</p>
            </div>
            <div className="flex items-center space-x-2">
              <p className="flex justify-center items-center shadow-md border-2 border-gray-200 w-12 h-12">h</p>
              <p>Home</p>
            </div>
            <div className="flex items-center space-x-2">
              <p className="flex justify-center items-center shadow-md border-2 border-gray-200 w-12 h-12">d</p>
              <p>Dashboard</p>
            </div>
            <div className="flex items-center space-x-2">
              <p className="flex justify-center items-center shadow-md border-2 border-gray-200 w-12 h-12">s</p>
              <p>Open search</p>
            </div>
            <div className="flex items-center space-x-2">
              <p className="flex justify-center items-center shadow-md border-2 border-gray-200 w-12 h-12">t</p>
              <p>Create task</p>
            </div>
            <div className="flex items-center space-x-2">
              <p className="flex justify-center items-center shadow-md border-2 border-gray-200 w-12 h-12">p</p>
              <p>Open notepad</p>
            </div>
            <div className="flex items-center space-x-2">
              <p className="flex justify-center items-center shadow-md border-2 border-gray-200 w-12 h-12">Esc</p>
              <p>Close any task or window</p>
            </div>
            <div className="flex items-center space-x-2">
              <p className="flex justify-center items-center shadow-md border-2 border-gray-200 w-12 h-12">-</p>
              <p>Clear filters</p>
            </div>
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
