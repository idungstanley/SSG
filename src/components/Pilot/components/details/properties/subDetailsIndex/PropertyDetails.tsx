import React, { useRef, useState } from 'react';
import moment from 'moment';
import CustomReference from '../customReference/CustomReference';
import EntitySettings from '../entitySettings/EntitySettings';
import Share from '../share/Share';
import Assignees from '../assignees/Assignees';
import Subscribers from '../subscribers/Subscribers';
import ToolTip from '../../../../../Tooltip/Tooltip';
import { ITaskFullList } from '../../../../../../features/task/interface.tasks';
import { IHubDetails } from '../../../../../../features/hubs/hubs.interfaces';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseUpdateTaskService } from '../../../../../../features/task/taskService';
import Status from '../status/Status';
import Priority from '../priority/Priority';
import { UseEditHubService } from '../../../../../../features/hubs/hubService';
import { UseEditWalletService } from '../../../../../../features/wallet/walletService';
import { UseEditListService } from '../../../../../../features/list/listService';
import MoreDetails from './components/MoreDetails';
import { IListDetails } from '../../../../../../features/list/list.interfaces';
import { useParams } from 'react-router-dom';
import { IWalletDetails } from '../../../../../../features/wallet/wallet.interfaces';
import PlusIcon from '../../../../../../assets/icons/PlusIcon';
import { VerticalScroll } from '../../../../../ScrollableContainer/VerticalScroll';
import { IoCaretDownCircle } from 'react-icons/io5';
import { cl } from '../../../../../../utils';
import { MdOutlineVisibility } from 'react-icons/md';
import MoveItemIcon from '../../../../../../assets/icons/MoveItemIcon';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { setEditingPilotDetailsTitle } from '../../../../../../features/workspace/workspaceSlice';
// import Linkify from 'linkify-react';
import { Capitalize } from '../../../../../../utils/NoCapWords/Capitalize';
import LinkifyText from '../../../../../../utils/LinkifyTest';

interface PropertyDetailsProps {
  Details?: IHubDetails | ITaskFullList | IListDetails | IWalletDetails;
}

export default function PropertyDetails({ Details }: PropertyDetailsProps) {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const textAreaRef = useRef<HTMLInputElement | null>(null);

  const [toggleSubTask, setToggleSubTask] = useState(false);
  const [editingDescription, setEditingDescription] = useState(false);
  const [toggleDetails, setToggleDetails] = useState<boolean>(true);

  const { hubId, walletId, listId, taskId } = useParams();
  const { editingPilotDetailsTitle } = useAppSelector((state) => state.workspace);

  const editTaskMutation = useMutation(UseUpdateTaskService, {
    onSuccess: () => {
      queryClient.invalidateQueries(['task']);
    }
  });

  const editHubMutation = useMutation(UseEditHubService, {
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
    setEditingDescription(false);
    dispatch(setEditingPilotDetailsTitle(false));
  };

  const handleEditTitle = () => {
    dispatch(setEditingPilotDetailsTitle(true));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevents the default behavior (e.g., line break in contentEditable)
      document.execCommand('insertText', false, '\n');
    }
  };

  const handleDetailsSubmit = async (
    e:
      | React.KeyboardEvent<HTMLParagraphElement>
      | React.FocusEvent<HTMLInputElement | HTMLParagraphElement | HTMLTextAreaElement | Element>
      | undefined = undefined
  ) => {
    const name = inputRef.current?.innerText.trim() as string;
    const description = textAreaRef.current?.innerText.trim() as string;
    e && e.preventDefault();
    handleBlur();
    try {
      if (taskId != undefined) {
        await editTaskMutation.mutateAsync({
          name: name,
          task_id: taskId,
          description: description as string
        });
      } else if (walletId != undefined) {
        await editWalletMutation.mutateAsync({
          walletName: name,
          walletId: Details?.id,
          description: description as string
        });
      } else if (listId != undefined) {
        await editListMutation.mutateAsync({
          listName: name,
          listId: Details?.id,
          description: description as string
        });
      } else if (hubId) {
        await editHubMutation.mutateAsync({
          name: name,
          hubId: Details?.id,
          description: description as string
        });
      }
    } catch {
      return;
    }
  };

  return (
    <div className="m-3 text-gray-500 rounded-md bg-alsoit-gray-50">
      <div className="flex justify-between h-8">
        <div className="flex items-center justify-between gap-2 uppercase">
          <div
            className="flex items-center justify-between gap-2 p-2 rounded-tl-lg rounded-br-lg bg-alsoit-gray-75 grow"
            style={{ maxWidth: '150px' }}
          >
            <span className="w-4 h-4">
              <IoCaretDownCircle
                className={cl(toggleDetails ? '' : 'transform -rotate-90', 'text-base text-white cursor-pointer')}
                onClick={() => setToggleDetails((prev) => !prev)}
              />
            </span>
            <p className="justify-center bg-['#b2b2b2'] text-white truncate" style={{ fontSize: '10px' }}>
              {Details?.name}
            </p>
          </div>
          <div className="flex items-center h-6 gap-2 cursor-pointer">
            <div className="flex items-center h-6 p-1 border rounded border-alsoit-gray-75 w-fit">
              <p className="flex items-center w-full lowercase">
                <span className="flex items-center justify-center w-4 h-4 bg-white rounded mr-0.5">2 </span> of 9
              </p>
            </div>
            <div className="flex items-center justify-center w-5 h-5 px-1 bg-white rounded cursor-pointer">
              <MoveItemIcon active={false} />
            </div>
          </div>
        </div>
        <div style={{ fontSize: '10px' }} className="mx-2">
          <p>Created</p>
          <p>{moment(Details?.created_at).format('MMM DD, hh:mm a')}</p>
        </div>
      </div>
      {toggleDetails ? (
        <div>
          <div className="flex items-center justify-between p-2">
            <section className="flex items-center space-x-1">
              <Status details={Details} />
              <ToolTip title="Priority">
                <span>
                  <Priority details={Details} />
                </span>
              </ToolTip>
            </section>
            <section className="z-10 flex items-center justify-center space-x-3">
              <CustomReference />
              <ToolTip title="Share">
                <span>
                  <Share taskId={Details?.id} taskName={Details?.name} />
                </span>
              </ToolTip>
              <EntitySettings />
            </section>
          </div>
          <section className="flex items-center mt-3 ml-2 space-x-2">
            <ToolTip title="Assignees">
              <span>
                <Assignees />
              </span>
            </ToolTip>
            <span className="text-gray-300 ">|</span>
            <ToolTip title="Subscribers">
              <span>
                <Subscribers />
              </span>
            </ToolTip>
            <span className="text-gray-300">|</span>
            <MdOutlineVisibility className="text-xl" />
          </section>
          <section className="p-2" key={Details?.id}>
            {/* name */}
            <div id="entity name">
              <label className="text-xs text-gray-500">Title</label>
              <div className="p-1 break-words bg-white border border-white rounded-md cursor-text">
                <VerticalScroll>
                  {editingPilotDetailsTitle ? (
                    <div
                      ref={inputRef}
                      className="p-1 max-h-32"
                      contentEditable={editingPilotDetailsTitle}
                      onKeyDown={(e) => (e.key === 'Enter' ? handleDetailsSubmit(e) : null)}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => handleDetailsSubmit(e)}
                    >
                      {Details?.name && Capitalize(Details?.name)}
                    </div>
                  ) : (
                    <div className="w-full p-1 max-h-32" onDoubleClick={() => handleEditTitle()}>
                      <LinkifyText
                        checker={editingPilotDetailsTitle}
                        text={
                          (Details?.name && Details?.name?.length > 0 && inputRef.current?.innerText) ||
                          ((Details?.name && Capitalize(Details?.name)) as string)
                        }
                      />
                    </div>
                  )}
                </VerticalScroll>
              </div>
            </div>
            {/* description */}
            <div id="entity description" className="mt-5">
              <label className="text-xs text-gray-500">Description</label>
              <div className="p-1 break-words bg-white border border-white rounded-md cursor-text">
                <VerticalScroll>
                  {editingDescription ? (
                    <div
                      ref={textAreaRef}
                      onKeyDown={(e) => (e.key === 'Enter' ? handleKeyDown(e) : null)}
                      onBlur={(e) => handleDetailsSubmit(e)}
                      className="w-full py-2 space-y-1 max-h-52"
                      suppressContentEditableWarning={true}
                      contentEditable={editingDescription}
                    >
                      {Details?.description}
                    </div>
                  ) : (
                    <div className="w-full max-h-52" onDoubleClick={() => setEditingDescription(true)}>
                      <LinkifyText
                        checker={editingDescription}
                        text={
                          (Details?.description &&
                            Details?.description?.length > 0 &&
                            textAreaRef.current?.innerText) ||
                          (Details?.description as string)
                        }
                      />
                    </div>
                  )}
                </VerticalScroll>
              </div>
            </div>
            {/* tags */}
            {Details
              ? 'tags' in Details && (
                  <div id="tags" className="mt-2">
                    <label className="text-xs text-gray-500">Tags</label>
                    <div className="h-10 p-1 bg-white rounded-md">{/* <p> {groupTags(Details?.tags)}</p> */}</div>
                  </div>
                )
              : null}
            {/* due date */}
            <div id="due date" className="mt-2">
              <label className="text-xs text-gray-500">Due Date</label>
              <div className="p-1 bg-gray-100 rounded-md">
                <p>Dec 31 2022</p>
              </div>
            </div>
            <div className="mt-2">
              <MoreDetails />
            </div>
            {/* create subtask */}
            <div id="create subtask" className="mt-2">
              <div
                className="flex p-1 items-center space-x-0.5 border border-gray-400 cursor-pointer w-20 rounded-md hover:bg-gray-400 hover:text-white"
                onClick={() => setToggleSubTask(!toggleSubTask)}
              >
                <PlusIcon active dimensions={{ width: 9, height: 9 }} />
                <button className="text-xs text-gray-500 ">Subtask</button>
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}
