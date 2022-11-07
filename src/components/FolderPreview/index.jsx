import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { FileIcon } from '../../common';
import Toast from '../../common/Toast';
import { OutputDateTime } from '../../app/helpers';
import Tabs from './Tabs';
import ComboBox from '../comboBox/ComboBoxForTeamMembers';
import PermissionsManagement from '../PermissionsManagement';
import requestNew from '../../app/requestNew';
import { useGetFilteredTeamMembers } from '../../features/permissions/permissionsService';

function FolderPreview({ folder }) {
  const title = folder.name || folder.folder.name;
  const [showPopup, setShowPopup] = useState(false);
  const { currentUserId } = useSelector((state) => state.auth);
  const { users } = useGetFilteredTeamMembers(currentUserId);

  const onClickUser = async (id) => {
    if (id) {
      try {
        const request = await requestNew({ method: 'post', url: `folders/${folder.id}/share/${id}` });
        toast.custom((t) => (<Toast type='success' title={request.message.title} body={null} toastId={t.id} />));
      } catch (e) {
        toast.custom((t) => (<Toast type='error' title="You don't have permission to share this." body={null} toastId={t.id} />));
      }
      setShowPopup(false);
    }
  };

  return folder ? (
    <aside className='relative hidden min-w-96 w-1/3 bg-white p-6 border-l border-gray-200 lg:block overflow-y-scroll'>
      <PermissionsManagement dataId={folder.id} type='folder' />
      <div className='pb-16 space-y-6'>
        <div>
          <div className='block w-24 h-10 overflow-hidden'>
            <FileIcon extensionKey='folder' size={10} />
          </div>
          <div className='mt-4 flex items-start justify-between'>
            <div>
              <h2 className='text-lg font-medium text-gray-900'>
                <span className='sr-only'>Details for </span>
                {title}
              </h2>
              <p className='text-sm font-medium text-gray-500'>Folder</p>
            </div>
          </div>
        </div>

        <div className='flex relative'>
          <button
            type='button'
            className='flex-1 bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            Download
          </button>
          <button
            onClick={() => setShowPopup(true)}
            type='button'
            className='flex-1 ml-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            Share
          </button>
          {showPopup && users ? <ComboBox setShowPopup={setShowPopup} onClickArrow={onClickUser} absolute={!false} users={users} /> : null}
        </div>
        <div>
          <h3 className='font-medium text-gray-900'>Information</h3>
          <dl className='mt-2 border-t border-b border-gray-200 divide-y divide-gray-200'>
            <div className='py-3 flex justify-between text-sm font-medium'>
              <dt className='text-gray-500'>Last modified</dt>
              <dd className='text-gray-900'>{ OutputDateTime(folder.updated_at) }</dd>
            </div>
            <div className='py-3 flex justify-between text-sm font-medium'>
              <dt className='text-gray-500'>Created</dt>
              <dd className='text-gray-900'>{ OutputDateTime(folder.created_at) }</dd>
            </div>
            {folder.shared_by
              ? (
                <>
                  <h3 className='font-medium text-gray-900 py-2'>Shared by</h3>
                  <div className='py-3 flex justify-between text-sm font-medium'>
                    <dt className='text-gray-500'>User name</dt>
                    <dd className='text-gray-900'>{folder.shared_by.user.name}</dd>
                  </div>
                  <div className='py-3 flex justify-between text-sm font-medium'>
                    <dt className='text-gray-500'>User email</dt>
                    <dd className='text-gray-900'>{folder.shared_by.user.email}</dd>
                  </div>
                </>
              ) : null }
          </dl>
        </div>

        {/* Loaded after API call to fetch full folder data */}
        {folder === 'something that wont be the case' && (
          <div className='h-96'>
            <Tabs />
          </div>
        )}

      </div>
    </aside>
  ) : null;
}

FolderPreview.propTypes = {
  folder: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
    folder: PropTypes.shape({
      name: PropTypes.string,
    }),
    shared_by: PropTypes.shape({
      user: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
      }).isRequired,
    }),
  }).isRequired,
};

export default FolderPreview;
