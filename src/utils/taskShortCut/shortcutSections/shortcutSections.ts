export const coolThings = [
  { text: 'Slash Commands (works when creating tasks and when viewing tasks)', key: '/' },
  {
    text: ' Assign task to self (works when hovering over tasks in List and Board views as well as when you are viewing a task) ',
    key: 'm'
  },
  { text: 'Show/hide sidebar', key: 'q' },
  { text: 'In task view, navigate left/right between tasks', key: 'Ctr ^', key2: 'Shift ↑', key3: ' ← or → ' }
];

export const dashboardNavigation = [
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

export const textAndCommentEditor = [
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

export const markdown = [
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
