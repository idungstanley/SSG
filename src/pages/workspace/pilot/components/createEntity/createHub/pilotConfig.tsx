import hubIcon from '../../../../../../assets/branding/hub.svg';
import { VscChecklist, VscScreenFull } from 'react-icons/vsc';
import TimeClock from '../../timeClock/subtabs/TimeClock';
import CreateHub from '../createHub/CreateHub';
import History from '../../../../../../components/Pilot/components/History';
import CommentsForPilot from '../../../../../../components/Comments/CommentsForPilot';
import WatchersForPilot from '../../../../../../components/Watchers/WatchersForPilot';
import ChatForPilot from '../../../../../../components/Chat/ChatForPilot';
import Checklists from '../../../../../../components/Pilot/components/Checklist/Checklist';
import RecordScreen from '../../../../../../components/Pilot/components/RecordScreen';
import { ChatBubbleLeftEllipsisIcon, DocumentTextIcon, EyeIcon, SignalIcon } from '@heroicons/react/24/outline';
import { ClockIcon } from '../../../../../../assets/icons/ClockIcon';
import { pilotTabs } from '../../../../../../app/constants/pilotTabs';

const sections = [
  {
    id: pilotTabs.CREATE_HUB,
    element: <CreateHub />
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
    id: pilotTabs.CREATE_HUB,
    label: 'Create Hub',
    icon: <img src={hubIcon} alt="Hub Icon" className="w-4 h-4" />
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
    icon: <ClockIcon />
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

export const pilotHubConfig = { sections, tabs };
