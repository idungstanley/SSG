import React from 'react';
import FileHeader from './FileHeader';
import { OutputDateTime } from '../../../../../../../../app/helpers';
import { useGetInboxFile } from '../../../../../../../../features/inbox/inboxService';
import { useAppSelector } from '../../../../../../../../app/hooks';

function Details() {
  const { selectedInboxFileId } = useAppSelector((state) => state.inbox);
  const { data: inboxFile } = useGetInboxFile(selectedInboxFileId);

  return inboxFile ? (
    <div className="h-full flex-1">
      <div className="relative h-full">
        <div className="absolute inset-0 flex h-full overflow-hidden flex-col">
          <FileHeader />

          <div className="w-full overflow-y-scroll flex-1 h-full p-6 space-y-6">
            <div className="">
              <h3 className="font-medium text-gray-900">Information</h3>
              <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
                <div
                  key={1}
                  className="py-3 flex justify-between text-sm font-medium"
                >
                  <dt className="text-gray-500">Created at</dt>
                  <dd className="text-gray-900">
                    {OutputDateTime(
                      inboxFile.inbox_file_source.created_at,
                      null
                    )}
                  </dd>
                </div>
                <div
                  key={2}
                  className="py-3 flex justify-between text-sm font-medium"
                >
                  <dt className="text-gray-500">Modified at</dt>
                  <dd className="text-gray-900">
                    {OutputDateTime(
                      inboxFile.inbox_file_source.updated_at,
                      null
                    )}
                  </dd>
                </div>
              </dl>
            </div>
            {/*
              {selectedInboxFileLoadingFullDetails === false && selectedInboxFileFullDetails !== null && (
                <>
                      <AlsoSavedIn />
                      <div>
                        <h3 className="font-medium text-gray-900">Collaborators</h3>
                        <ul className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
                          <li key={1} className="py-3 flex justify-between items-center">
                            <div className="flex items-center">
                              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="w-8 h-8 rounded-full" />
                              <div className="ml-4">
                                <p className="text-sm font-medium text-gray-900">John Smith</p>
                                <p className="text-sm text-gray-500 truncate">Sent in this file</p>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                </>
              )}
              {selectedInboxFileLoadingFullDetails === true && (<p>Loading...</p>)}
            */}
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default Details;
