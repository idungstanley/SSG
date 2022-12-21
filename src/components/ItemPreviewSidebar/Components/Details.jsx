import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { FileIcon } from '../../../common';
import {
  DownloadFile,
  OutputDateTime,
  OutputFileSize,
} from '../../../app/helpers';
import ComboBoxForTeamMembers from '../../comboBox/ComboBoxForTeamMembers';
import { useGetFilteredTeamMembers } from '../../../features/permissions/permissionsService';
import requestNew from '../../../app/requestNew';
import Toast from '../../../common/Toast';

export default function Details({ item, type }) {
  const [showPopup, setShowPopup] = useState(false);
  const title = type === 'file' ? (item.display_name || item.file.display_name) : (item.name || item.folder.name);
  const size = type === 'file' ? (item.size || item.file.size) : null;
  const extension = type === 'file' ? title.split('.').at(-1) : 'folder';

  const { currentUserId } = useSelector((state) => state.auth);
  const { users } = useGetFilteredTeamMembers(currentUserId);

  const onClickUser = async (id) => {
    if (id) {
      try {
        const request = await requestNew({
          method: 'POST',
          url: `${type}s/${item.id}/share/${id}`,
        });
        toast.custom((t) => (
          <Toast
            type="success"
            title={request.message.title}
            body={null}
            toastId={t.id}
          />
        ));
      } catch (e) {
        toast.custom((t) => (
          <Toast
            type="error"
            title="You don't have permission to share this."
            body={null}
            toastId={t.id}
          />
        ));
      }
      setShowPopup(false);
    }
  };

  const onDownload = async () => {
    DownloadFile(type, item.id, title);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="block w-24 h-10 overflow-hidden">
          <FileIcon extensionKey={extension} size={10} />
        </div>
        <div className="mt-4 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-900">
              <span className="sr-only">Details for </span>
              {title}
            </h2>
            {size ? (
              <p className="text-sm font-medium text-gray-500">
                {OutputFileSize(size)}
              </p>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex relative">
        <button
          onClick={onDownload}
          type="button"
          className="flex-1 bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none ring-0 focus:ring-0"
        >
          Download
        </button>
        {users?.length && !item.shared_by ? (
          <button
            onClick={() => setShowPopup(true)}
            type="button"
            className="flex-1 ml-3 bg-white
             py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none ring-0 focus:ring-0"
          >
            Share
          </button>
        ) : null}
        {showPopup && users ? (
          <ComboBoxForTeamMembers
            setShowPopup={setShowPopup}
            onClickArrow={onClickUser}
            absolute={!false}
            users={users}
          />
        ) : null}
      </div>
      <div>
        <h3 className="font-medium text-gray-900">Information</h3>
        <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
          <div className="py-3 flex justify-between text-sm font-medium">
            <dt className="text-gray-500">Last modified</dt>
            <dd className="text-gray-900">{OutputDateTime(item.updated_at)}</dd>
          </div>
          <div className="py-3 flex justify-between text-sm font-medium">
            <dt className="text-gray-500">Created</dt>
            <dd className="text-gray-900">{OutputDateTime(item.created_at)}</dd>
          </div>
          {item.shared_by ? (
            <>
              <h3 className="font-medium text-gray-900 py-2">Shared by</h3>
              <div className="py-3 flex justify-between text-sm font-medium">
                <dt className="text-gray-500">User name</dt>
                <dd className="text-gray-900">{item.shared_by.user.name}</dd>
              </div>
              <div className="py-3 flex justify-between text-sm font-medium">
                <dt className="text-gray-500">User email</dt>
                <dd className="text-gray-900">{item.shared_by.user.email}</dd>
              </div>
            </>
          ) : null}
        </dl>
      </div>
    </div>
  );
}

Details.propTypes = {
  item: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};
