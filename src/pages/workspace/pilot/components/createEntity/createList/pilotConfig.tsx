import React from 'react';
import { VscChecklist, VscScreenFull } from 'react-icons/vsc';
import TimeClock from '../../timeClock/subtabs/TimeClock';
import History from '../../../../../../components/Pilot/components/History';
import CommentsForPilot from '../../../../../../components/Comments/CommentsForPilot';
import WatchersForPilot from '../../../../../../components/Watchers/WatchersForPilot';
import ChatForPilot from '../../../../../../components/Chat/ChatForPilot';
import Checklists from '../../../../../../components/Pilot/components/Checklist/Checklist';
import RecordScreen from '../../../../../../components/Pilot/components/RecordScreen';
import {
  ChatBubbleLeftEllipsisIcon,
  ClockIcon,
  DocumentTextIcon,
  EyeIcon,
  SignalIcon
} from '@heroicons/react/24/outline';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import CreateList from './CreateList';

const sections = [
  {
    id: 1,
    element: <CreateList />
  },
  {
    id: 2,
    element: <History />
  },
  {
    id: 3,
    element: <CommentsForPilot />
  },
  {
    id: 4,
    element: <WatchersForPilot />
  },
  {
    id: 5,
    element: <ChatForPilot />
  },
  {
    id: 6,
    element: <TimeClock />
  },
  {
    id: 7,
    element: <Checklists />
  },
  {
    id: 8,
    element: <RecordScreen />
  }
];

const tabs = [
  {
    id: 1,
    label: 'Create List',
    icon: <AiOutlineUnorderedList className="w-4 h-4" aria-hidden="true" />
  },
  {
    id: 2,
    label: 'Logs',
    icon: <DocumentTextIcon className="w-4 h-4" />
  },
  {
    id: 3,
    label: 'Comments',
    icon: <ChatBubbleLeftEllipsisIcon className="w-4 h-4" />
  },
  {
    id: 4,
    label: 'Watchers',
    icon: <EyeIcon className="w-4 h-4" />
  },
  {
    id: 5,
    label: 'Connect',
    icon: <SignalIcon className="w-4 h-4" />
  },
  {
    id: 6,
    label: 'Time clock',
    icon: <ClockIcon className="w-4 h-4" />
  },
  {
    id: 7,
    label: 'Checklists',
    icon: <VscChecklist className="w-4 h-4" />
  },
  {
    id: 8,
    label: 'Screen Record',
    icon: <VscScreenFull className="w-4 h-4" />
  }
];

export const pilotListConfig = { sections, tabs };
