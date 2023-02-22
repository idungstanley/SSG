import {
  ChatBubbleLeftEllipsisIcon,
  // ClockIcon,
  DocumentTextIcon,
  EyeIcon,
  InformationCircleIcon,
  SignalIcon,
} from '@heroicons/react/24/outline';
import React from 'react';
import { TbShield } from 'react-icons/tb';
import ChatForPilot from '../../../../components/Chat/ChatForPilot';
import CommentsForPilot from '../../../../components/Comments/CommentsForPilot';
// import Information from '../../../../components/Pilot/components/Information';
import Permissions from '../../../../components/Pilot/components/Permissions';
import WatchersForPilot from '../../../../components/Watchers/WatchersForPilot';
// import TimeClock from '../../../workspace/pilot/components/timeClock/TimeClock';
import History from '../Pilot/components/History';
import Details from './components/Details';

const sections = [
  {
    id: 1,
    element: <Details />,
  },
  {
    id: 2,
    element: <History />,
  },
  {
    id: 3,
    element: <Permissions />,
  },
  {
    id: 4,
    element: <CommentsForPilot />,
  },
  {
    id: 5,
    element: <WatchersForPilot />,
  },
  {
    id: 6,
    element: <ChatForPilot />,
  },
  // {
  //   id: 7,
  //   element: <TimeClock />,
  // },
];

const tabs = [
  {
    id: 1,
    label: 'Details',
    icon: <InformationCircleIcon className="w-5 h-5" />,
  },
  {
    id: 2,
    label: 'Logs',
    icon: <DocumentTextIcon className="w-5 h-5" />,
  },
  {
    id: 3,
    label: 'Permissions',
    icon: <TbShield className="w-5 h-5" />,
  },
  {
    id: 4,
    label: 'Comments',
    icon: <ChatBubbleLeftEllipsisIcon className="w-5 h-5" />,
  },
  {
    id: 5,
    label: 'Watchers',
    icon: <EyeIcon className="w-5 h-5" />,
  },
  {
    id: 6,
    label: 'Connect',
    icon: <SignalIcon className="w-5 h-5" />,
  },
  // {
  //   id: 7,
  //   label: 'Time clock',
  //   icon: <ClockIcon className="w-5 h-5" />,
  // },
];

const pilotConfig = { sections, tabs };

export default pilotConfig;
