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
import {
  UseUpdateTaskService,
  useDeleteAttachment,
  useGetAttachments
} from '../../../../../../features/task/taskService';
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
import { useAppSelector } from '../../../../../../app/hooks';
import FileIcons from '../../../../../Views/ui/Table/CustomField/Files/FileIcon';
import { VerticalScroll } from '../../../../../ScrollableContainer/VerticalScroll';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { IoCaretDownCircle } from 'react-icons/io5';
import { cl } from '../../../../../../utils';
import { MdOutlineVisibility } from 'react-icons/md';
import MoveItemIcon from '../../../../../../assets/icons/MoveItemIcon';

export interface tagItem {
  id: string;
  name: string;
  color: string;
}
interface PropertyDetailsProps {
  Details?: IHubDetails | ITaskFullList | IListDetails | IWalletDetails;
}

export default function PropertyDetails({ Details }: PropertyDetailsProps) {
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement | null>(null);
  // const [fileId, setFileId] = useState<string | undefined>(undefined);

  const [toggleSubTask, setToggleSubTask] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingDescription, setEditingDescription] = useState(false);
  const [toggleDetails, setToggleDetails] = useState<boolean>(true);
  const [description, setDescription] = useState<string>(Details?.description ?? '');
  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);

  const { hubId, walletId, listId, taskId } = useParams();

  const deleteAttachment = useMutation(useDeleteAttachment, {
    onSuccess: () => {
      // const remainingAttachments = attachments?.data.attachments.filter((item) => {
      //   return item.id !== fileId;
      // });
      const ITEMS_QUERY_KEY = ['attachments'];
      queryClient.invalidateQueries(ITEMS_QUERY_KEY);
    }
  });

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

  const { data: attachments } = useGetAttachments({
    activeItemId,
    activeItemType
  });

  const handleBlur = () => {
    setEditingTitle(false);
    setEditingDescription(false);
  };

  const handleDescriptionChange = (value: string) => {
    const pattern = /<a[^>]*>/gi;

    const modifiedString = value.replace(pattern, (match) => {
      return match.replace('>', ' class="text-blue-500 underline">');
    });

    setDescription(modifiedString);
  };

  const handleDetailsSubmit = async (
    e:
      | React.KeyboardEvent<HTMLParagraphElement>
      | React.FocusEvent<HTMLInputElement | HTMLParagraphElement | HTMLTextAreaElement | Element>
      | undefined = undefined
  ) => {
    e && e.preventDefault();
    handleBlur();
    try {
      if (taskId != undefined) {
        await editTaskMutation.mutateAsync({
          name: inputRef.current?.innerText.trim() as string,
          task_id: taskId,
          description
        });
      } else if (walletId != undefined) {
        await editWalletMutation.mutateAsync({
          walletName: inputRef.current?.innerText.trim(),
          walletId: Details?.id,
          description
        });
      } else if (listId != undefined) {
        await editListMutation.mutateAsync({
          listName: inputRef.current?.innerText.trim(),
          listId: Details?.id,
          description
        });
      } else if (hubId) {
        await editHubMutation.mutateAsync({
          name: inputRef.current?.innerText.trim(),
          hubId: Details?.id,
          description
        });
      }
    } catch {
      return;
    }
  };
  // const convertNewlinesToBreaks = (text: string) => {
  //   return text
  //     .split('\n')
  //     .map((line, index) => (index === 0 ? line : `\n\n ${line}`))
  //     .join('');
  // };

  const handleRemoveAttachment = async (id: string) => {
    await deleteAttachment.mutateAsync({
      id
    });
  };

  return (
    <div className="m-3 text-gray-500 rounded-md bg-alsoit-gray-50">
      <div className="flex justify-between h-8">
        <div className="flex items-center justify-between gap-2 uppercase">
          <div className="flex items-center justify-between gap-2 p-2 rounded-tl-lg rounded-br-lg bg-alsoit-gray-75 w-fit">
            <IoCaretDownCircle
              className={cl(toggleDetails ? '' : 'transform -rotate-90', 'text-base text-white cursor-pointer')}
              onClick={() => setToggleDetails((prev) => !prev)}
            />
            <p className="justify-center bg-['#b2b2b2'] text-white" style={{ fontSize: '10px' }}>
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
                <Priority details={Details} />
              </ToolTip>
            </section>
            <section className="z-10 flex items-center justify-center space-x-3">
              <CustomReference />
              <ToolTip title="Share">
                <Share taskId={Details?.id} taskName={Details?.name} />
              </ToolTip>
              <EntitySettings />
            </section>
          </div>
          <section className="flex items-center mt-3 ml-2 space-x-2">
            <ToolTip title="Assignees">
              <Assignees />
            </ToolTip>
            <span className="text-gray-300 ">|</span>
            <ToolTip title="Subscribers">
              <Subscribers />
            </ToolTip>
            <span className="text-gray-300">|</span>
            <MdOutlineVisibility className="text-xl" />
          </section>
          <section className="p-2" key={Details?.id}>
            {/* name */}
            <div id="entity name">
              <label className="text-xs text-gray-500">Title</label>
              <div className="p-1 bg-white border border-white rounded-md cursor-text">
                <VerticalScroll>
                  <p
                    ref={inputRef}
                    className="p-1 capitalize break-words max-h-52"
                    contentEditable={editingTitle}
                    onKeyDown={(e) => (e.key === 'Enter' ? handleDetailsSubmit(e) : null)}
                    onClick={() => setEditingTitle(true)}
                    onBlur={(e) => handleDetailsSubmit(e)}
                  >
                    {Details?.name}
                  </p>
                </VerticalScroll>
              </div>
            </div>
            {/* description */}
            <div id="entity description" className="mt-5">
              <label className="text-xs text-gray-500">Description</label>
              <div
                className="h-20 bg-white bg-gray-100 rounded-md cursor-text"
                onClick={() => setEditingDescription(true)}
              >
                {editingDescription ? (
                  <div className="w-full h-40 overflow-y-scroll rounded-md">
                    <CKEditor
                      editor={ClassicEditor}
                      data={description}
                      onChange={(event, editor) => handleDescriptionChange(editor.getData())}
                      onBlur={() => handleDetailsSubmit()}
                    />
                  </div>
                ) : (
                  <div className="h-20 overflow-scroll p-1.5">
                    <div dangerouslySetInnerHTML={{ __html: description }} />
                  </div>
                )}
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
            {/* Attachments */}
            <div className="my-4">
              <label className="text-xs text-gray-500 ">Attachments</label>
              <div className="flex flex-wrap items-center gap-2 my-2">
                {attachments?.data.attachments?.length ? (
                  attachments?.data.attachments.map((file) => {
                    return (
                      <div key={file.id} className="group/parent">
                        <button
                          className="absolute items-center justify-center hidden w-5 h-5 ml-6 -mt-4 text-white bg-black rounded-full hover:bg-red-500 group-hover/parent:flex"
                          style={{
                            fontSize: '6px'
                          }}
                          onClick={() => handleRemoveAttachment(file.id)}
                        >
                          X
                        </button>
                        <FileIcons
                          fileExtension={file.physical_file.file_format.extension}
                          filePath={file.path}
                          fileName={file.physical_file.display_name}
                          height="h-10"
                          width="w-10"
                        />
                      </div>
                    );
                  })
                ) : (
                  <h1>No Attachments found</h1>
                )}
              </div>
            </div>
            {/* due date */}
            <div id="due date" className="mt-2">
              <label className="text-xs text-gray-500">Due Date</label>
              <div className="p-1 bg-white bg-gray-100 rounded-md">
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
