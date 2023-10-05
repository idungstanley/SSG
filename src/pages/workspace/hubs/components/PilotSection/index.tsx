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
import { STORAGE_KEYS } from '../../../../../app/config/dimensions';
import { IUserParams } from '../../../../../features/account/account.interfaces';

const sections = [
  {
    id: 1,
    element: <Details />
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
    id: 9,
    element: <HubManager />
  },
  {
    id: 10,
    element: <Templates />
  },
  {
    id: 11,
    element: <Calendar />
  }
];

const tabs = [
  {
    id: 1,
    label: 'Details',
    icon: <InformationCircleIcon className="w-4 h-4" />
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
    label: 'Utilities',
    icon: <UtilityIcon />
  },
  {
    id: 7,
    label: 'Checklists',
    icon: <VscChecklist className="w-4 h-4" />
  },
  {
    id: 9,
    label: 'Entity Manager',
    icon: <EntityManagerIcon />
  },
  {
    id: 10,
    label: 'Templates',
    icon: <TemplatesIcon />
  },
  {
    id: 11,
    label: 'Calendar',
    icon: <CalendarIcon active={false} />
  }
];

export const pilotConfig = { sections, tabs };

export default function PilotSection() {
  const dispatch = useAppDispatch();

  const { hubId } = useParams();
  const { activeItemName } = useAppSelector((state) => state.workspace);
  const isPilotMinifiedFromLS = (
    JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_SETTINGS_DATA) || '""') as IUserParams
  ).isPilotMinified as boolean;

  // set data for pilot
  useEffect(() => {
    const selectedItemId = hubId;

    if (selectedItemId) {
      dispatch(
        setShowPilotSideOver({
          id: selectedItemId,
          type: EntityType.hub,
          show: isPilotMinifiedFromLS || true,
          title: activeItemName ?? ''
        })
      );
    }
  }, [hubId, activeItemName]);

  return null;
}
