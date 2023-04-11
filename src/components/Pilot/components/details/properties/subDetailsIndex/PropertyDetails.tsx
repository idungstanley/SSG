import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
// import SubTask from '../../../../../../../tasks/subtasks/create/SubTask';
import SubTask from '../../../../../../pages/workspace/subtasks/subtask1/SubTask';
import moment from 'moment';
// import Status from '../status/Status';
// import Priority from '../priority/Priority';
import CustomReference from '../customReference/CustomReference';
import EntitySettings from '../entitySettings/EntitySettings';
import Share from '../share/Share';
import Assignees from '../assignees/Assignees';
import Subscribers from '../subscribers/Subscribers';
import AvatarWithInitials from '../../../../../avatar/AvatarWithInitials';
import ToolTip from '../../../../../Tooltip';
import { ITaskFullList } from '../../../../../../features/task/interface.tasks';
import { IHubDetails } from '../../../../../../features/hubs/hubs.interfaces';
import { useAppSelector } from '../../../../../../app/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseUpdateTaskService } from '../../../../../../features/task/taskService';
import Status from '../status/Status';
import Priority from '../priority/Priority';
import { useEditHubService } from '../../../../../../features/hubs/hubService';
import { UseEditWalletService } from '../../../../../../features/wallet/walletService';
import { UseEditListService } from '../../../../../../features/list/listService';
import MoreDetails from './MoreDetails';

export interface tagItem {
  id: string;
  name: string;
  color: string;
}
interface PropertyDetailsProps {
  Details: IHubDetails | undefined | ITaskFullList;
}
export default function PropertyDetails({ Details }: PropertyDetailsProps) {
  const [toggleSubTask, setToggleSubTask] = useState(false);
  const { activeItemName, activeItemType } = useAppSelector((state) => state.workspace);
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingDescription, setEditingDescription] = useState(false);
  const [title, setTitle] = useState<string>(activeItemName as string);
  const [description, setDescription] = useState<string | null>(Details?.description || null);
  const queryClient = useQueryClient();

  console.log(Details);

  const editTaskMutation = useMutation(UseUpdateTaskService, {
    onSuccess: () => {
      queryClient.invalidateQueries(['task']);
    }
  });

  const editHubMutation = useMutation(useEditHubService, {
    onSuccess: () => {
      queryClient.invalidateQueries(['hub-details']);
    }
  });

  const editWalletMutation = useMutation(UseEditWalletService, {
    onSuccess: () => {
      queryClient.invalidateQueries(['wallet-details']);
    }
  });

  const editListMutation = useMutation(UseEditListService, {
    onSuccess: () => {
      queryClient.invalidateQueries(['wallet-details']);
    }
  });

  const handleBlur = () => {
    setEditingTitle(false);
    setEditingDescription(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleBlur();
    if (activeItemType === 'task') {
      await editTaskMutation.mutateAsync({
        name: title,
        task_id: Details?.id,
        description
      });
    } else if (activeItemType === 'hub' || activeItemType === 'subhub') {
      await editHubMutation.mutateAsync({
        name: title,
        currHubId: Details?.id,
        description
      });
    } else if (activeItemType === 'wallet' || activeItemType === 'subwallet') {
      await editWalletMutation.mutateAsync({
        walletName: title,
        WalletId: Details?.id,
        description
      });
    } else if (activeItemType === 'list') {
      await editListMutation.mutateAsync({
        listName: title,
        listId: Details?.id,
        description
      });
    }
  };

  return (
    <>
      <div className="flex items-center justify-between p-2">
        <section className="flex items-center space-x-3">
          <Status Details={Details} />
          <ToolTip tooltip="Priority">
            <Priority Details={Details} />
          </ToolTip>
        </section>
        <section className="z-0 flex items-center justify-center space-x-3">
          <CustomReference />
          <ToolTip tooltip="Share">
            <Share />
          </ToolTip>
          <EntitySettings />
        </section>
      </div>
      <section className="flex items-center mt-3 space-x-2">
        <ToolTip tooltip="Assignees">
          <Assignees />
        </ToolTip>
        <span className="text-gray-300">|</span>
        <ToolTip tooltip="Subscribers">
          <Subscribers />
        </ToolTip>
        <span className="text-gray-300">|</span>
        <AvatarWithInitials initials="DN" backgroundColour="blue" roundedStyle="rounded" height="h-5" width="w-5" />
      </section>
      <section className="p-2" key={Details?.id}>
        {/* tags */}

        {Details?.tags && (
          <div id="tags" className="mt-2">
            <label className="text-xs text-gray-500">Tags</label>
            <div className="border p-1 bg-gray-100 border-white rounded-md">
              {/* <p> {groupTags(Details?.tags)}</p> */}
            </div>
          </div>
        )}

        {/* name */}
        <div id="entity name">
          <label className="text-xs text-gray-500">Title</label>
          <div className="border p-1 bg-gray-100 border-white rounded-md cursor-text">
            {editingTitle ? (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  onBlur={handleBlur}
                  autoFocus
                  className="bg-transparent border-none rounded-md outline-none focus:outline-none w-full"
                />
              </form>
            ) : (
              <p className="capitalize" onClick={() => setEditingTitle(true)}>
                {title}
              </p>
            )}
          </div>
        </div>
        {/* description */}
        <div id="entity description" className="mt-5">
          <label className="text-xs text-gray-500">Description</label>
          <div
            className="border p-1 bg-gray-100 border-white rounded-md h-20 cursor-text"
            onClick={() => setEditingDescription(true)}
          >
            {editingDescription ? (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={description ?? ''}
                  onChange={handleDescriptionChange}
                  onBlur={handleBlur}
                  autoFocus
                  className="bg-transparent border-none rounded-md outline-none focus:outline-none w-full h-20"
                />
              </form>
            ) : (
              <div className="capitalize">
                <p>{description ?? ''}</p>
              </div>
            )}
          </div>
        </div>
        {/* created time */}
        <div id="created time" className="mt-2">
          <label className="text-xs text-gray-500">Created</label>
          <div className="border p-1 bg-gray-100 border-white rounded-md">
            <p>{moment(Details?.created_at).format('MMM DD, hh:mm a')}</p>
          </div>
        </div>
        {/* due date */}
        <div id="due date" className="mt-2">
          <label className="text-xs text-gray-500">Due Date</label>
          <div className="border p-1 bg-gray-100 border-white rounded-md">
            <p>Dec 31 2022</p>
          </div>
        </div>

        <div>
          <MoreDetails />
        </div>

        {/* create subtask */}
        <div id="create subtask" className="mt-2">
          <div
            className="flex p-0.5 items-center space-x-0.5 border border-gray-400 cursor-pointer w-20 rounded-md hover:bg-gray-400 hover:text-white"
            onClick={() => setToggleSubTask(!toggleSubTask)}
          >
            <AiOutlinePlus className="text-xs h-2.5" />
            <button className="text-xs text-gray-500  ">Subtask</button>
          </div>
        </div>
        <div className="mt-4">{toggleSubTask && <SubTask />}</div>
      </section>
    </>
  );
}
