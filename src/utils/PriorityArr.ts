import { useState } from 'react';
import { priorities } from '../app/constants/priorities';
import { priorityType } from '../components/priority/PriorityDropdown';
import { setNewTaskPriority } from '../features/task/taskSlice';
import { useAppDispatch } from '../app/hooks';

export const priorityArr = () => {
  const dispatch = useAppDispatch();
  const [priority, setPriority] = useState('');
  const priorityList: priorityType[] = [
    {
      id: priorities.LOW,
      title: 'Low',
      color: '#A5A5A5',
      bg: 'gray',
      handleClick: () => {
        setPriority(priorities.LOW);
        dispatch(setNewTaskPriority(priorities.LOW));
      }
    },
    {
      id: priorities.NORMAL,
      title: 'Normal',
      color: '#99BBEE',
      bg: 'blue',
      handleClick: () => {
        setPriority(priorities.NORMAL);
        dispatch(setNewTaskPriority(priorities.NORMAL));
      }
    },
    {
      id: priorities.HIGH,
      title: 'High',
      color: '#F7A100',
      bg: 'yellow',
      handleClick: () => {
        setPriority(priorities.HIGH);
        dispatch(setNewTaskPriority(priorities.HIGH));
      }
    },
    {
      id: priorities.URGENT,
      title: 'Urgent',
      color: '#FF0E0F',
      bg: 'red',
      handleClick: () => {
        setPriority(priorities.URGENT);
        dispatch(setNewTaskPriority(priorities.URGENT));
      }
    }
  ];

  return { priority, priorityList, setPriority };
};
