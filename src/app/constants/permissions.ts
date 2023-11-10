export const LIST_PERMISSION_TYPES = [
  {
    name: 'Full',
    description: 'Can create tasks in the list, edit list settings, and delete the list'
  },
  {
    name: 'Edit',
    description: 'Can edit tasks and list settings. Cant create task or delete the list'
  },
  {
    name: 'Comment',
    description: 'Can comment. Assigness can set task status. Cant edit List settings'
  },
  {
    name: 'View Only',
    description: 'Read Only. Cant comment or edit on task in this list'
  }
];
