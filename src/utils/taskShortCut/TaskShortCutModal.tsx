import React, { Dispatch, SetStateAction, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

function TaskShortCutModal({ setTaskShortcutModal }: { setTaskShortcutModal: Dispatch<SetStateAction<boolean>> }) {
  const [open, setOpen] = useState(true);
  const customWidth = { maxWidth: 750 };

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setTaskShortcutModal(false);
  };

  const coolThings = [
    { text: 'Slash Commands (works when creating tasks and when viewing tasks)', key: '/' },
    {
      text: ' Assign task to self (works when hovering over tasks in List and Board views as well as when you are viewing a task) ',
      key: 'm'
    },
    { text: 'Show/hide sidebar', key: 'q' },
    { text: 'In task view, navigate left/right between tasks', key: 'Ctr ^', key2: 'Shift ↑', key3: ' ← or → ' }
  ];

  const dashboardNavigation = [
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

  const textAndCommentEditor = [
    { text: 'Tag a user (while typing)', key: '↑' },
    {
      text: 'Edit your most recent comment (while in comment editor)',
      key: 'm'
    },
    { text: 'Mention a task', key: '@', key2: '@' },
    { text: 'Mention a Doc', key: '@', key2: '@', key3: '@' },
    { text: 'Open emojis (press Enter to select an emoji)', key: ':' },
    { text: 'Paste text or images', key: '⌘', key2: 'v' },
    { text: 'Anchor a link (while editing text)', key: '⌘', key2: 'k' }
  ];

  const markdown = [
    { text: 'H1 text', textMiddle: true, text2: '(task description only)', key: '#', key2: '#' },
    {
      text: 'Bold text',
      textMiddle: true,
      key: '*',
      key2: '*'
    },
    { text: 'Italicized text', textMiddle: true, key: '_', key2: '_' },
    { text: 'Text with a line through it', textMiddle: true, key: '~', key2: '~' },
    { text: 'Starts a bulleted list(task description only)', key: '-' },
    { text: 'Starts a numbered list(task description only)', key: '1.' },
    { text: 'Creates a simple checkbox(task description only)', key: '[', key2: ']' },
    { text: 'Starts long quote formatting', key: '>' },
    { text: 'inline code', textMiddle: true, key: '`', key2: '`' },
    { text: 'Code block', key: '`', key2: '`', key3: '`', key4: 'Space' },
    { text: 'Adds a dividing line into description(task description only)', key: '-', key2: '-', key3: '-' }
  ];

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
