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
import { VscChecklist } from 'react-icons/vsc';
import Checklists from '../../../../../components/Pilot/components/Checklist/Checklist';
import Details from '../../../../../components/Pilot/components/details/Details';
import TimeClock from './components/TimeClock';
import HubManager from '../../../../../components/Pilot/components/HubManager/HubManager';
import TemplatesIcon from '../../../../../assets/icons/Templates';
import Templates from '../../../../../components/Pilot/components/Templates';
import Calendar from '../../../../../components/Pilot/components/Calendar';
import CalendarIcon from '../../../../../assets/icons/CalendarIcon';
import { EntityType } from '../../../../../utils/EntityTypes/EntityType';
import EntityManagerIcon from '../../../../../assets/icons/EntityManagerIcon';
import { UtilityIcon } from '../../../../../assets/icons/Utility';
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
    id: pilotTabs.UTILITIES,
    element: <TimeClock />
  },
  {
    id: pilotTabs.CHECKLISTS,
    element: <Checklists />
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
    id: pilotTabs.UTILITIES,
    label: 'Utilities',
    icon: <UtilityIcon />
  },
  {
    id: pilotTabs.CHECKLISTS,
    label: 'Checklists',
    icon: <VscChecklist className="w-4 h-4" />
  },
  {
    id: pilotTabs.ENTITY_MANAGER,
    label: 'Entity Manager',
    icon: <EntityManagerIcon />
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

  const { hubId } = useParams();
  const { activeItemName } = useAppSelector((state) => state.workspace);

  // set data for pilot
  useEffect(() => {
    const selectedItemId = hubId;

    if (selectedItemId) {
      dispatch(
        setShowPilotSideOver({
          id: selectedItemId,
          type: EntityType.hub,
          show: true,
          title: activeItemName ?? ''
        })
      );
    }
  }, [hubId, activeItemName]);

  return null;
}
