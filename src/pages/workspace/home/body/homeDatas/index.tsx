import CommentsTabs from '../myWorkTabs/commentsTabs';
import TodoTabs from '../myWorkTabs/todoTabs';
import Today from '../myWorkTabs/todoTabs/Today';
import Next from '../myWorkTabs/todoTabs/next';
import Overdue from '../myWorkTabs/todoTabs/overdue';
import Unscheduled from '../myWorkTabs/todoTabs/unscheduled';

export const todoTabs = [{ node: <Today /> }, { node: <Overdue /> }, { node: <Next /> }, { node: <Unscheduled /> }];

export const myWorkTabsHeader = [
  {
    id: 'todo',
    label: 'To do'
  },
  {
    id: 'comments',
    label: 'Comments'
  },
  {
    id: 'done',
    label: 'Done'
  },
  {
    id: 'delegated',
    label: 'Delegated'
  }
];

export const myWorkTabs = [
  {
    id: 'todo',
    content: <TodoTabs />
  },
  {
    id: 'comments',
    content: <CommentsTabs />
  },
  {
    id: 'done',
    content: <h1></h1>
  },
  {
    id: 'delegated',
    content: <h1 className=""></h1>
  }
];
