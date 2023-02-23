import {
  ChatBubbleLeftEllipsisIcon,
  DocumentTextIcon,
  EyeIcon,
  InformationCircleIcon,
  SignalIcon,
} from '@heroicons/react/24/outline';
import React, { useEffect } from 'react';
import { TbShield } from 'react-icons/tb';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import ChatForPilot from '../../../../components/Chat/ChatForPilot';
import CommentsForPilot from '../../../../components/Comments/CommentsForPilot';
import Permissions from '../../../../components/Pilot/components/Permissions';
import WatchersForPilot from '../../../../components/Watchers/WatchersForPilot';
import {
  useGetExplorerFile,
  useGetExplorerFolder,
} from '../../../../features/explorer/explorerService';
import { setShowPilotSideOver } from '../../../../features/general/slideOver/slideOverSlice';
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
];

const tabs = [
  {
    id: 1,
    label: 'Details',
    icon: <InformationCircleIcon className="w-4 h-4" />,
  },
  {
    id: 2,
    label: 'Logs',
    icon: <DocumentTextIcon className="w-4 h-4" />,
  },
  {
    id: 3,
    label: 'Permissions',
    icon: <TbShield className="w-4 h-4" />,
  },
  {
    id: 4,
    label: 'Comments',
    icon: <ChatBubbleLeftEllipsisIcon className="w-4 h-4" />,
  },
  {
    id: 5,
    label: 'Watchers',
    icon: <EyeIcon className="w-4 h-4" />,
  },
  {
    id: 6,
    label: 'Connect',
    icon: <SignalIcon className="w-4 h-4" />,
  },
];

export const pilotConfig = { sections, tabs };

export default function PilotSection() {
  const dispatch = useAppDispatch();

  const { selectedFileId, selectedFolderId } = useAppSelector(
    (state) => state.explorer
  );

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
          title: file?.display_name || folder?.data.current_folder.name,
        })
      );
    }
  }, [file, folder]);

  return null;
}
