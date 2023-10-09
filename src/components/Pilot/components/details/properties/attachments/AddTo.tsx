import React from 'react';
import { cl } from '../../../../../../utils';
import { GrAttachment, GrOnedrive } from 'react-icons/gr';
import { FcDocument, FcGoogle } from 'react-icons/fc';
import { FaDropbox } from 'react-icons/fa';
import { SiBox } from 'react-icons/si';
import { useDispatch } from 'react-redux';
import { setOpenFileUploadModal, setShowTaskUploadModal } from '../../../../../../features/task/taskSlice';
import { useAppSelector } from '../../../../../../app/hooks';

interface statusType {
  id: number;
  title: string;
  handleClick: () => void;
  color: string;
  bg: string;
  icon: JSX.Element;
}

export default function AddTo({ locationn }: { locationn?: string }) {
  const dispatch = useDispatch();
  const { fileUploadProps } = useAppSelector((state) => state.task);
  const statusList: statusType[] = [
    {
      id: 1,
      title: 'Upload File',
      handleClick: () => {
        locationn === 'list view'
          ? dispatch(setOpenFileUploadModal({ ...fileUploadProps, openModal: true }))
          : dispatch(setShowTaskUploadModal(true));
      },
      color: '#d3d3d3',
      bg: 'gray',
      icon: <GrAttachment className="w-5 text-gray-400 h-7" aria-hidden="true" />
    },
    {
      id: 2,
      title: 'New Doc',
      handleClick: () => ({}),
      color: '#a875ff',
      bg: 'purple',
      icon: <FcDocument className="w-5 text-gray-200 h-7" aria-hidden="true" />
    },
    {
      id: 3,
      title: 'Dropbox',
      handleClick: () => ({}),
      color: '#f7cb04',
      bg: 'yellow',
      icon: <FaDropbox className="w-5 text-blue-700 h-7" aria-hidden="true" />
    },
    {
      id: 4,
      title: 'OneDrive/Sharepoint',
      handleClick: () => ({}),
      color: '#6bc951',
      bg: 'green',
      icon: <GrOnedrive className="w-5 text-blue-700 h-7" aria-hidden="true" />
    },
    {
      id: 5,
      title: 'Box',
      handleClick: () => ({}),
      color: '#6bc951',
      bg: 'green',
      icon: <SiBox className="w-5 text-blue-600 h-7" aria-hidden="true" />
    },
    {
      id: 6,
      title: 'Google Drive',
      handleClick: () => ({}),
      color: '#6bc951',
      bg: 'green',
      icon: <FcGoogle className="w-5 h-7" aria-hidden="true" />
    },
    {
      id: 7,
      title: 'New Google Doc',
      handleClick: () => ({}),
      color: '#6bc951',
      bg: 'green',
      icon: <FcGoogle className="w-5 h-7" aria-hidden="true" />
    }
  ];

  return (
    <div className="text-left w-full h-full">
      <div className="origin-top-right absolute w-full mr-4 rounded-md">
        {statusList.map((i) => (
          <div key={i.id}>
            <button
              type="button"
              className={cl(
                'flex items-center px-4 py-2 text-sm text-gray-600 text-left space-x-2 w-full hover:bg-gray-300'
              )}
              onClick={i.handleClick}
            >
              <p>{i.icon}</p>
              <p>{i.title}</p>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
