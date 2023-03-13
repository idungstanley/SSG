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
import Details from '../../../hubs/components/PilotSection/components/details/Details';
import Checklists from '../../../hubs/components/PilotSection/components/checklist/components/Checklist';

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
    id: 7,
    element: <Checklists />
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
    icon: <ClockIcon className="w-4 h-4" />
  }
];

export const pilotConfig = { sections, tabs };

export default function PilotSection() {
  const dispatch = useAppDispatch();

  const { listId } = useParams();
  const { activeItemName } = useAppSelector((state) => state.workspace);

  // set data for pilot
  useEffect(() => {
    const selectedItemId = listId;
    const selectedItemType = 'list';

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
  }, [listId]);

  return null;
}
