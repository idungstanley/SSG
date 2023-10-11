import { useEffect } from 'react';
import {
  ChatBubbleLeftEllipsisIcon,
  DocumentTextIcon,
  EyeIcon,
  InformationCircleIcon,
  SignalIcon
} from '@heroicons/react/24/outline';
import { TbShield } from 'react-icons/tb';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import ChatForPilot from '../../../../components/Chat/ChatForPilot';
import CommentsForPilot from '../../../../components/Comments/CommentsForPilot';
import History from '../../../../components/Pilot/components/History';
import Permissions from '../../../../components/Pilot/components/Permissions';
import WatchersForPilot from '../../../../components/Watchers/WatchersForPilot';
import { useGetExplorerFile, useGetExplorerFolder } from '../../../../features/explorer/explorerService';
import { setShowPilotSideOver } from '../../../../features/general/slideOver/slideOverSlice';
import Details from './components/Details';
import { pilotTabs } from '../../../../app/constants/pilotTabs';

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
    id: pilotTabs.PERMISSIONS,
    element: <Permissions />
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
    id: pilotTabs.PERMISSIONS,
    label: 'Permissions',
    icon: <TbShield className="w-4 h-4" />
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
  }
];

export const pilotConfig = { sections, tabs };

export default function PilotSection() {
  const dispatch = useAppDispatch();

  const { selectedFileId, selectedFolderId } = useAppSelector((state) => state.explorer);

  const { data: file } = useGetExplorerFile(selectedFileId);
  const { data: folder } = useGetExplorerFolder(selectedFolderId);

  // set data for pilot
  useEffect(() => {
    const selectedItemId = selectedFileId || selectedFolderId;
    const selectedItemType = selectedFileId ? 'file' : 'folder';

    if (selectedItemId) {
      dispatch(
        setShowPilotSideOver({
          id: selectedItemId,
          type: selectedItemType,
          show: true,
          title: file?.display_name || folder?.data.current_folder.name
        })
      );
    }
  }, [file, folder]);

  return null;
}
