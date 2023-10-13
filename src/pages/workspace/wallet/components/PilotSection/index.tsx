import {
  ChatBubbleLeftEllipsisIcon,
  DocumentTextIcon,
  EyeIcon,
  InformationCircleIcon,
  SignalIcon
} from '@heroicons/react/24/outline';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import ChatForPilot from '../../../../../components/Chat/ChatForPilot';
import CommentsForPilot from '../../../../../components/Comments/CommentsForPilot';
import History from '../../../../../components/Pilot/components/History';
import WatchersForPilot from '../../../../../components/Watchers/WatchersForPilot';
import { setShowPilotSideOver } from '../../../../../features/general/slideOver/slideOverSlice';
import Details from '../../../../../components/Pilot/components/details/Details';
import TimeClock from '../../../hubs/components/PilotSection/components/TimeClock';
import Checklists from '../../../../../components/Pilot/components/Checklist/Checklist';
import { VscChecklist, VscScreenFull } from 'react-icons/vsc';
import RecordScreen from '../../../../../components/Pilot/components/RecordScreen';
import HubManager from '../../../../../components/Pilot/components/HubManager/HubManager';
import hubIcon from '../../../../../assets/branding/hub.svg';
import Templates from '../../../../../components/Pilot/components/Templates';
import TemplatesIcon from '../../../../../assets/icons/Templates';
import Calendar from '../../../../../components/Pilot/components/Calendar';
import CalendarIcon from '../../../../../assets/icons/CalendarIcon';
import { EntityType } from '../../../../../utils/EntityTypes/EntityType';
import { ClockIcon } from '../../../../../assets/icons/ClockIcon';
import { pilotTabs } from '../../../../../app/constants/pilotTabs';

const sections = [
  {
    id: pilotTabs.DETAILS,
    element: <Details />
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
  },
  {
    id: pilotTabs.ENTITY_MANAGER,
    element: <HubManager />
  },
  {
    id: pilotTabs.TEMPLATES,
    element: <Templates />
  },
  {
    id: pilotTabs.CALENDAR,
    element: <Calendar />
  }
];

const tabs = [
  {
    id: pilotTabs.DETAILS,
    label: 'Details',
    icon: <InformationCircleIcon className="w-4 h-4" />
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
  },
  {
    id: pilotTabs.ENTITY_MANAGER,
    label: 'Entity Manager',
    icon: <img src={hubIcon} alt="Hub Icon" className="w-4 h-4" />
  },
  {
    id: pilotTabs.TEMPLATES,
    label: 'Templates',
    icon: <TemplatesIcon />
  },
  {
    id: pilotTabs.CALENDAR,
    label: 'Calendar',
    icon: <CalendarIcon active={false} />
  }
];

export const pilotConfig = { sections, tabs };

export default function PilotSection() {
  const dispatch = useAppDispatch();
  const { walletId } = useParams();

  const { activeItemName } = useAppSelector((state) => state.workspace);

  // set data for pilot
  useEffect(() => {
    const selectedItemId = walletId;
    const selectedItemType = EntityType.wallet;

    if (selectedItemId) {
      dispatch(
        setShowPilotSideOver({
          id: selectedItemId,
          type: selectedItemType,
          show: true,
          title: activeItemName ?? ''
        })
      );
    }
  }, [walletId, activeItemName]);

  return null;
}
