import React, { useState } from 'react';
import { cl } from '../../../../../../utils';
import { GrAttachment, GrOnedrive } from 'react-icons/gr';
import { FcDocument, FcGoogle } from 'react-icons/fc';
import { FaDropbox } from 'react-icons/fa';
import { SiBox } from 'react-icons/si';
import { useDispatch } from 'react-redux';
import { setOpenFileUploadModal, setShowTaskUploadModal } from '../../../../../../features/task/taskSlice';
import { useAppSelector } from '../../../../../../app/hooks';
import { IoCaretDown, IoCaretDownCircle } from 'react-icons/io5';
import ToolTip from '../../../../../Tooltip/Tooltip';
import { AiFillCloseCircle, AiOutlineEye } from 'react-icons/ai';
import { CgSortAz } from 'react-icons/cg';
import SearchIcon from '../../../../../../assets/icons/SearchIcon';
import { paletteViews } from '../../../../../ColorPalette';
import GridViews from '../../../../../../assets/icons/GridViews';
import FormatListBullet from '../../../../../../assets/icons/FormatListBullet';
import { CiSearch } from 'react-icons/ci';
import Input from '../../../../../input/Input';
import AlsoitMenuDropdown from '../../../../../DropDowns';
import { InlineBorderLabel } from '../../../../../Dropdown/MenuDropdown';
import { useDeleteAttachment, useGetAttachments } from '../../../../../../features/task/taskService';
import FileIcons from '../../../../../Views/ui/Table/CustomField/Files/FileIcon';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import moment from 'moment-timezone';
// import UserAvatar from '../../../../../../pages/workspace/tasks/assignTask/UserAvatar';

interface statusType {
  id: string;
  title: string;
  handleClick: () => void;
  color: string;
  bg: string;
  icon: JSX.Element;
}

export default function AddTo({ locationn }: { locationn?: string }) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { fileUploadProps } = useAppSelector((state) => state.task);
  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);

  const [toggleDetails, setToggleDetails] = useState<boolean>(true);
  const [selectedViews, setSelectedViews] = useState<string>(paletteViews.BOARD);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<HTMLDivElement | null>(null);

  const deleteAttachment = useMutation(useDeleteAttachment, {
    onSuccess: () => {
      const ITEMS_QUERY_KEY = ['attachments'];
      queryClient.invalidateQueries(ITEMS_QUERY_KEY);
    }
  });

  const handleCloseSearch = () => {
    setIsSearch(false);
  };

  const handleCloseDropdown = () => {
    setShowDropdown(null);
  };

  const handleOpenDropdown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setShowDropdown(event.currentTarget);
  };

  const { data: attachments } = useGetAttachments({
    activeItemId,
    activeItemType
  });

  const handleRemoveAttachment = async (id: string) => {
    await deleteAttachment.mutateAsync({
      id
    });
  };

  const statusList: statusType[] = [
    {
      id: 'upload_file',
      title: 'Upload File',
      handleClick: () => {
        if (locationn === 'list view') {
          dispatch(setOpenFileUploadModal({ ...fileUploadProps, openModal: true }));
        } else {
          dispatch(setShowTaskUploadModal(true));
          setShowDropdown(null);
        }
      },
      color: '#d3d3d3',
      bg: 'gray',
      icon: <GrAttachment className="w-5 text-gray-400 h-7" aria-hidden="true" />
    },
    {
      id: 'new_doc',
      title: 'New Doc',
      handleClick: () => ({}),
      color: '#a875ff',
      bg: 'purple',
      icon: <FcDocument className="w-5 text-gray-200 h-7" aria-hidden="true" />
    },
    {
      id: 'dropbox',
      title: 'Dropbox',
      handleClick: () => ({}),
      color: '#f7cb04',
      bg: 'yellow',
      icon: <FaDropbox className="w-5 text-blue-700 h-7" aria-hidden="true" />
    },
    {
      id: 'one_drive_sharepoint',
      title: 'OneDrive/Sharepoint',
      handleClick: () => ({}),
      color: '#6bc951',
      bg: 'green',
      icon: <GrOnedrive className="w-5 text-blue-700 h-7" aria-hidden="true" />
    },
    {
      id: 'box',
      title: 'Box',
      handleClick: () => ({}),
      color: '#6bc951',
      bg: 'green',
      icon: <SiBox className="w-5 text-blue-600 h-7" aria-hidden="true" />
    },
    {
      id: 'google_drive',
      title: 'Google Drive',
      handleClick: () => ({}),
      color: '#6bc951',
      bg: 'green',
      icon: <FcGoogle className="w-5 h-7" aria-hidden="true" />
    },
    {
      id: 'new_google_doc',
      title: 'New Google Doc',
      handleClick: () => ({}),
      color: '#6bc951',
      bg: 'green',
      icon: <FcGoogle className="w-5 h-7" aria-hidden="true" />
    }
  ];

  const views = [
    {
      label: paletteViews.BOARD,
      element: <></>,
      icon: <GridViews color={selectedViews === paletteViews.BOARD ? 'rgb(191, 0, 255)' : '#424242'} />
    },
    {
      label: paletteViews.LIST,
      element: <></>,
      icon: <FormatListBullet color={selectedViews === paletteViews.LIST ? 'rgb(191, 0, 255)' : '#424242'} />
    }
  ];

  return (
    <div className="h-full pb-2 m-3 text-gray-500 rounded-md bg-alsoit-gray-50">
      <div className="flex justify-between h-8">
        <div className="flex items-center justify-between gap-2">
          <div
            className="flex items-center justify-between gap-2 p-1.5 rounded-tl-lg rounded-br-lg bg-alsoit-gray-75 grow"
            style={{ maxWidth: '200px' }}
          >
            <span className="w-4 h-4">
              <IoCaretDownCircle
                className={cl(toggleDetails ? '' : 'transform -rotate-90', 'text-base text-white cursor-pointer')}
                onClick={() => setToggleDetails((prev) => !prev)}
              />
            </span>
            <p className="justify-center bg-['#b2b2b2'] text-white truncate" style={{ fontSize: '10px' }}>
              ATTACHMENT
            </p>
            <div
              className="flex items-center gap-px p-0.5 text-white rounded-md bg-alsoit-purple-300 cursor-pointer"
              style={{ fontSize: '10px' }}
              onClick={(e) => handleOpenDropdown(e)}
            >
              <p>Add</p>
              <span>
                <IoCaretDown />
              </span>
            </div>
          </div>
        </div>
        {!isSearch ? (
          <div className="flex items-center gap-1 px-2">
            {views.map((item, index) => (
              <div
                key={index}
                className={`rounded p-1 cursor-pointer ${
                  selectedViews === item.label ? 'bg-primary-200' : 'rounded bg-white shadow-md'
                }`}
                onClick={() => setSelectedViews(item.label)}
              >
                <ToolTip title={item.label + ' View'}>
                  <span>{item.icon}</span>
                </ToolTip>
              </div>
            ))}
            <ToolTip title="View">
              <span className="p-1 bg-white rounded shadow-md" onClick={() => ({})}>
                <AiOutlineEye className="w-4 h-4" />
              </span>
            </ToolTip>
            <ToolTip title="Sort">
              <span className="p-1 bg-white rounded shadow-md" onClick={() => ({})}>
                <CgSortAz className="w-4 h-4" />
              </span>
            </ToolTip>
            <ToolTip title="Open Search">
              <span className="p-1 bg-white rounded shadow-md" onClick={() => setIsSearch(true)}>
                <SearchIcon className="w-4 h-4" />
              </span>
            </ToolTip>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <Input
              placeholder="Search"
              bgColor="bg-white"
              borderRadius="rounded-md py-0.5 h-6"
              type="text"
              name="search"
              leadingIcon={<CiSearch style={{ color: 'rgb(191, 0, 255)' }} />}
              trailingIcon={
                <ToolTip title="Close Search">
                  <span>
                    <AiFillCloseCircle className="text-sm" style={{ color: 'rgb(191, 0, 255)' }} />
                  </span>
                </ToolTip>
              }
              trailingClick={handleCloseSearch}
              onChange={() => null}
            />
          </div>
        )}
      </div>
      {toggleDetails ? (
        <div className="grid grid-cols-4 gap-2 p-2 m-2 bg-white place-items-center">
          {attachments?.data.attachments?.length ? (
            attachments?.data.attachments.map((file) => {
              return (
                <div key={file.id} className="relative p-1 group/parent">
                  <button
                    className="absolute right-0 items-center justify-center hidden w-5 h-5 ml-6 -mt-2 text-white bg-black rounded-full hover:bg-red-500 group-hover/parent:flex"
                    style={{
                      fontSize: '6px'
                    }}
                    onClick={() => handleRemoveAttachment(file.id)}
                  >
                    X
                  </button>
                  <div className="flex" style={{ fontSize: '10px' }}>
                    <div className="absolute -left-1">
                      {/* <UserAvatar user={file.team_member} width="w-6" height="h-6" /> */}
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <FileIcons
                        fileExtension={file.physical_file.file_format.extension}
                        filePath={file.path}
                        fileName={file.physical_file.display_name}
                        height="h-10"
                        width="w-10"
                      />
                      <div>{file.physical_file.display_name}</div>
                      <div>{moment(file.physical_file.created_at).format('MMM DD, hh:mm a')}</div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <h1>No Attachments found</h1>
          )}
        </div>
      ) : null}
      <AlsoitMenuDropdown handleClose={handleCloseDropdown} anchorEl={showDropdown}>
        <div className="origin-top-right">
          <InlineBorderLabel
            label="SELECT OPTION"
            topElement={<p className="flex items-center justify-center">ADD</p>}
          />
          {statusList.map((i) => (
            <div key={i.id} className="p-1">
              <button
                type="button"
                className={cl(
                  'flex items-center px-4 py-1 text-sm text-gray-600 text-left space-x-2 w-full hover:bg-alsoit-gray-50 rounded-md'
                )}
                onClick={i.handleClick}
              >
                <p>{i.icon}</p>
                <p>{i.title}</p>
              </button>
            </div>
          ))}
        </div>
      </AlsoitMenuDropdown>
    </div>
  );
}
