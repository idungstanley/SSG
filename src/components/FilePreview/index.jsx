import React from 'react';
// import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
// import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
// import { useGetFile } from '../../features/shared/sharedService';
import { PropTypes } from 'prop-types';
import {
  OutputDateTime,
  OutputFileSize,
  // GetFileWithHeaders,
  DownloadFile,
} from '../../app/helpers';
import requestNew from '../../app/requestNew';
import Toast from '../../common/Toast';
import { FileIcon } from '../../common';

function FilePreview({ file }) {
  const title = file.display_name ? file.display_name : file.file.display_name;
  const size = file.size || file.file.size;

  const extension = title.split('.').at(-1);

  const onDownload = async () => {
    DownloadFile('file', file.id, title);
  };

  const onClickHandler = async () => {
    const request = await requestNew({ method: 'post', url: `files/${file.id}/share/3037545c-461a-4039-a296-e9ff6916cb0f` });
    const type = request.success === true ? 'success' : 'error';
    toast.custom((t) => (<Toast type={type} title={request.message.title} body={null} toastId={t.id} />));
  };

  return file ? (
    <aside className="hidden min-w-96 w-1/3 bg-white p-6 border-l border-gray-200 lg:block overflow-y-scroll">
      <div className="pb-16 space-y-6">
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
              <p className="text-sm font-medium text-gray-500">{ OutputFileSize(size) }</p>
            </div>
          </div>
        </div>
        <div className="flex">
          <button
            onClick={onDownload}
            type="button"
            className="flex-1 bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Download
          </button>
          <button
            onClick={onClickHandler}
            type="button"
            disabled
            className="flex-1 ml-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Share
          </button>
        </div>
        <div>
          <h3 className="font-medium text-gray-900">Information</h3>
          <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
            <div className="py-3 flex justify-between text-sm font-medium">
              <dt className="text-gray-500">Last modified</dt>
              <dd className="text-gray-900">{ OutputDateTime(file.updated_at) }</dd>
            </div>
            <div className="py-3 flex justify-between text-sm font-medium">
              <dt className="text-gray-500">Created</dt>
              <dd className="text-gray-900">{ OutputDateTime(file.created_at) }</dd>
            </div>
            {file.shared_by
              ? (
                <>
                  <h3 className="font-medium text-gray-900 py-2">Shared by</h3>
                  <div className="py-3 flex justify-between text-sm font-medium">
                    <dt className="text-gray-500">User name</dt>
                    <dd className="text-gray-900">{file.shared_by.user.name}</dd>
                  </div>
                  <div className="py-3 flex justify-between text-sm font-medium">
                    <dt className="text-gray-500">User email</dt>
                    <dd className="text-gray-900">{file.shared_by.user.email}</dd>
                  </div>
                </>
              ) : null }
          </dl>
        </div>
      </div>
    </aside>
  ) : null;
}

FilePreview.propTypes = {
  file: PropTypes.shape({
    id: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
    display_name: PropTypes.string,
    size: PropTypes.number,
    file: PropTypes.shape({
      display_name: PropTypes.string,
      size: PropTypes.number,
    }),
    shared_by: PropTypes.shape({
      user: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
      }),
    }),
  }).isRequired,
};

export default FilePreview;
