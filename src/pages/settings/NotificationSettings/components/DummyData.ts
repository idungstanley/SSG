interface NotificationType {
  id: number;
  name: string;
  key: string;
  notificationCategory: {
    id: string;
    key: string;
    name: string;
  };
}

export const NotificationData: NotificationType[] = [
  {
    id: 1,
    name: 'Assigned comments',
    key: 'comments',
    notificationCategory: { id: 'comments', key: 'comments', name: 'comments' }
  },
  {
    id: 2,
    name: 'Reactions',
    key: 'comments',
    notificationCategory: { id: 'comments', key: 'comments', name: 'comments' }
  },
  {
    id: 3,
    name: 'Comments @mentioned in',
    key: 'comments',
    notificationCategory: { id: 'comments', key: 'comments', name: 'comments' }
  },
  {
    id: 4,
    name: 'New Comments',
    key: 'comments',
    notificationCategory: { id: 'comments', key: 'comments', name: 'comments' }
  },
  {
    id: 5,
    name: 'Resolved comments',
    key: 'comments',
    notificationCategory: { id: 'comments', key: 'comments', name: 'comments' }
  },
  {
    id: 6,
    name: 'New Task Created',
    key: 'task',
    notificationCategory: { id: 'task', key: 'task', name: 'task' }
  },
  {
    id: 7,
    name: 'Assigned Task',
    key: 'task',
    notificationCategory: { id: 'task', key: 'task', name: 'task' }
  },
  {
    id: 8,
    name: 'UnAssigned Task',
    key: 'task',
    notificationCategory: { id: 'task', key: 'task', name: 'task' }
  },
  {
    id: 9,
    name: 'Assignee Changes',
    key: 'task',
    notificationCategory: { id: 'task', key: 'task', name: 'task' }
  },
  {
    id: 10,
    name: 'Status Changes',
    key: 'task',
    notificationCategory: { id: 'task', key: 'task', name: 'task' }
  }
];
