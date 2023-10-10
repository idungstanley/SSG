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
import { FaFolder } from 'react-icons/fa';
import CreateWallet from './CreateWallet';
import { pilotTabs } from '../../../../../../app/constants/pilotTabs';

const sections = [
  {
    id: pilotTabs.CREATE_WALLET,
    element: <CreateWallet />
  },
  {
    id: pilotTabs.LOGS,
    element: <History />
  },
  {
    id: pilotTabs.COMMENTS,
    element: <CommentsForPilot />
  },
  {
    id: pilotTabs.WATCHERS,
    element: <WatchersForPilot />
  },
  {
    id: pilotTabs.CONNECT,
    element: <ChatForPilot />
  },
  {
    id: pilotTabs.TIME_CLOCK,
    element: <TimeClock />
  },
  {
    id: pilotTabs.CHECKLISTS,
    element: <Checklists />
  },
  {
    id: pilotTabs.SCREEN_RECORD,
    element: <RecordScreen />
  }
];

const tabs = [
  {
    id: pilotTabs.CREATE_WALLET,
    label: 'Create Wallet',
    icon: <FaFolder className="w-4 h-4" aria-hidden="true" />
  },
  {
    id: pilotTabs.LOGS,
    label: 'Logs',
    icon: <DocumentTextIcon className="w-4 h-4" />
  },
  {
    id: pilotTabs.COMMENTS,
    label: 'Comments',
    icon: <ChatBubbleLeftEllipsisIcon className="w-4 h-4" />
  },
  {
    id: pilotTabs.WATCHERS,
    label: 'Watchers',
    icon: <EyeIcon className="w-4 h-4" />
  },
  {
    id: pilotTabs.CONNECT,
    label: 'Connect',
    icon: <SignalIcon className="w-4 h-4" />
  },
  {
    id: pilotTabs.TIME_CLOCK,
    label: 'Time clock',
    icon: <ClockIcon className="w-4 h-4" />
  },
  {
    id: pilotTabs.CHECKLISTS,
    label: 'Checklists',
    icon: <VscChecklist className="w-4 h-4" />
  },
  {
    id: pilotTabs.SCREEN_RECORD,
    label: 'Screen Record',
    icon: <VscScreenFull className="w-4 h-4" />
  }
];

export const pilotWalletConfig = { sections, tabs };
