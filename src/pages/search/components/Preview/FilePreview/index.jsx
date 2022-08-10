import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { useGetSearchEverythingFile } from '../../../../../features/search/searchService';
import { OutputDateTime, OutputFileSize, GetFileWithHeaders } from '../../../../../app/helpers';
import { Button } from '../../../../../components';

function FilePreview() {
  const navigate = useNavigate();

  const selectedItemId = useSelector((state) => state.search.selectedItemId);
  const { data: file } = useGetSearchEverythingFile(selectedItemId);

  const [numPages, setNumPages] = useState(null);
  const [fileData, setFileData] = useState(null);

  const onDocumentLoadSuccess = (data) => {
    setNumPages(data.numPages);
  };

  const onShowInFolder = async () => {
    navigate(`/explorer/${file.folder_id}`);
  };

  useEffect(async () => {
    if (selectedItemId == null) {
      return setFileData(null);
    }

    const data = await GetFileWithHeaders('file', selectedItemId);
    return setFileData(data);
  }, [selectedItemId]);

  return file ? (
    <aside className="hidden min-w-96 w-1/3 bg-white p-6 border-l border-gray-200 lg:block overflow-y-scroll">
      <div className="pb-16 space-y-6">
        <div>
          <div className="block w-full rounded-md overflow-hidden">

            {(file.file_format.extension === 'pdf' && fileData != null) && (
              <div className="h-full overflow-y-scroll overflow-x-hidden aspect-w-10 aspect-h-7 border-gray-200 border" id="PDF_PREVIEW">
                <Document
                  className="h-full"
                  width={150}
                  file={fileData}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  {/* eslint-disable-next-line prefer-spread */}
                  {Array.apply(null, Array(numPages))
                    .map((x, i) => i + 1)
                    .map((page) => <Page key={page} pageNumber={page} />)}
                </Document>
              </div>
            )}

            {(file.file_format.extension === 'jpeg' || file.file_format.extension === 'jpg' || file.file_format.extension === 'png') && (
              <div className="w-full">
                <img src={fileData} alt="" className="object-cover" />
              </div>
            )}
          </div>

          <div className="mt-4 flex items-start justify-between">
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                <span className="sr-only">Details for </span>
                {file.display_name}
              </h2>
              <p className="text-sm font-medium text-gray-500">{ OutputFileSize(file.size) }</p>
            </div>
          </div>
        </div>
        <div className="flex">
          <Button
            buttonStyle="white"
            onClick={onShowInFolder}
            label="Show in folder"
            width="w-full"
            ringOnFocus
          />
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

          </dl>
        </div>
      </div>
    </aside>
  ) : null;
}

export default FilePreview;
