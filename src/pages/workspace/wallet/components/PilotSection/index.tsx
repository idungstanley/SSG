import {
  ChatBubbleLeftEllipsisIcon,
  ClockIcon,
  DocumentTextIcon,
  EyeIcon,
  InformationCircleIcon,
  SignalIcon
} from '@heroicons/react/24/outline';
import React, { useEffect } from 'react';
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
    id: 8,
    element: <RecordScreen />
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
  },
  {
    id: 9,
    label: 'Entity Manager',
    icon: <img src={hubIcon} alt="Hub Icon" className="w-4 h-4" />
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
  const { walletId } = useParams();

  const { currentWalletName } = useAppSelector((state) => state.wallet);

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
          title: currentWalletName ?? ''
        })
      );
    }
  }, [walletId, currentWalletName]);

  return null;
}
