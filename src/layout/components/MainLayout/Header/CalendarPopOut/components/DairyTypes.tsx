import React from 'react';
import TaskIcon from '../../../../../../assets/icons/TaskIcon';
import MeetingIcon from '../../../../../../assets/icons/MeetingIcon';
import OutOfOfficeIcon from '../../../../../../assets/icons/OutOfOfficeIcon';
import FocusTimeIcon from '../../../../../../assets/icons/FocusTimeIcon';
import WorkingLocationIcon from '../../../../../../assets/icons/WorkingLocationIcon';
import ReminderIcon from '../../../../../../assets/icons/ReminderIcon';
import CalendarIcon from '../../../../../../assets/icons/CalendarIcon';

export interface dairyTypesProps {
  id: string;
  title: string;
  icon: JSX.Element;
  children?: {
    id: string;
    name: string;
    icon?: JSX.Element;
    onclick?: () => void;
    type?: string;
  }[];
  active: boolean;
}

function DairyTypes() {
  const dairyTypes: dairyTypesProps[] = [
    {
      id: 'Task',
      title: 'Task',
      icon: <TaskIcon color="#424242" />,
      active: true
    },
    {
      id: 'calendar_event',
      title: 'Calendar event',
      icon: <CalendarIcon dimensions={{ width: 12, height: 12 }} active={false} color="#424242" />,
      active: true,
      children: [
        {
          id: 'Meeting',
          name: 'meeting',
          icon: <MeetingIcon />,
          onclick: () => null
        },
        {
          id: 'out_of_office',
          name: 'Out of office',
          icon: <OutOfOfficeIcon />,
          onclick: () => null
        },
        {
          id: 'focus_time',
          name: 'Focus time',
          icon: <FocusTimeIcon />,
          onclick: () => null
        },
        {
          id: 'working_location',
          name: 'Working location',
          icon: <WorkingLocationIcon />,
          onclick: () => null
        }
      ]
    },
    {
      id: 'Reminder',
      title: 'reminder',
      icon: <ReminderIcon />,
      active: true
    }
  ];
  return { dairyTypes };
}

export default DairyTypes;
