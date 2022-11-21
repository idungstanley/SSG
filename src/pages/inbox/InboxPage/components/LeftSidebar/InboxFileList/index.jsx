import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment-timezone';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { useGetInboxFiles } from '../../../../../../features/inbox/inboxService';
import { setShowUploadModal } from '../../../../../../features/inbox/inboxSlice';
import { Spinner } from '../../../../../../common';
import InboxFileListItem from './InboxFileListItem';
import FullScreenMessage from '../../../../../shared/components/FullScreenMessage';

function InboxFileList() {
  const dispatch = useDispatch();
  const { inboxId } = useParams();

  const selectedInboxTabKey = useSelector(
    (state) => state.inbox.selectedInboxTabKey,
  );

  const [unpaginatedInboxFiles, setUnpaginatedInboxFiles] = useState([]);

  const {
    status, data, fetchNextPage, hasNextPage,
  } = useGetInboxFiles({
    inboxId,
    isArchived: selectedInboxTabKey === 'archived' ? 1 : 0,
  });

  const [sentryRef] = useInfiniteScroll({
    loading: status === 'loading',
    hasNextPage,
    onLoadMore: fetchNextPage,
    disabled: false,
    rootMargin: '0px 0px 800px 0px',
  });

  useEffect(() => {
    if (status === 'success' && data) {
      setUnpaginatedInboxFiles(
        data.pages.flatMap((page) => page.data.inbox_files),
      );
    }
    return true;
  }, [data]);

  return (
    <nav className="overflow-y-scroll h-full bg-white" aria-label="Directory">
      <div className="relative h-full flex-1">
        {status === 'success' && unpaginatedInboxFiles.length === 0 && (
          <FullScreenMessage
            title={
              selectedInboxTabKey === 'inbox'
                ? 'No files in your inbox'
                : 'No archived files'
            }
            description={
              selectedInboxTabKey === 'inbox'
                ? 'Upload files to start filing'
                : 'Archived files will appear here'
            }
            ctaText="Upload"
            ctaOnClick={() => dispatch(setShowUploadModal(true))}
            showCta={selectedInboxTabKey === 'inbox'}
          />
        )}

        <ul className="relative z-0 divide-y divide-gray-200">
          <div className="relative divide-y divide-gray-200">
            {status === 'loading' || (status === 'success' && hasNextPage) ? (
              <div
                className="mx-auto mt-3 mb-6 w-6 justify-center"
                ref={sentryRef}
              >
                <Spinner size={22} color="#0F70B7" />
              </div>
            ) : status === 'success' ? (
              unpaginatedInboxFiles.map((inboxFile, index) => (
                <div key={inboxFile.id}>
                  {selectedInboxTabKey === 'inbox'
                    && index !== 0
                    && moment
                      .utc(inboxFile.created_at)
                      .tz(moment.tz.guess())
                      .format('DD MMM YYYY')
                      !== moment
                        .utc(unpaginatedInboxFiles[index - 1]?.created_at)
                        .tz(moment.tz.guess())
                        .format('DD MMM YYYY') && (
                        <div className="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
                          {moment
                            .utc(inboxFile.created_at)
                            .tz(moment.tz.guess())
                            .format('DD MMM YYYY')
                        === moment
                          .utc()
                          .tz(moment.tz.guess())
                          .format('DD MMM YYYY') ? (
                            <span>Today</span>
                            ) : (
                              <span>
                                {moment
                                  .utc(inboxFile.created_at)
                                  .tz(moment.tz.guess())
                                  .format('DD MMM YYYY')}
                              </span>
                            )}
                        </div>
                  )}
                  {selectedInboxTabKey === 'inbox' && index === 0 && (
                    <div className="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
                      {moment
                        .utc(inboxFile.created_at)
                        .tz(moment.tz.guess())
                        .format('DD MMM YYYY')
                      === moment
                        .utc()
                        .tz(moment.tz.guess())
                        .format('DD MMM YYYY') ? (
                          <span>Today</span>
                        ) : (
                          <span>
                            {moment
                              .utc(inboxFile.created_at)
                              .tz(moment.tz.guess())
                              .format('DD MMM YYYY')}
                          </span>
                        )}
                    </div>
                  )}

                  {selectedInboxTabKey === 'archived'
                    && index !== 0
                    && moment
                      .utc(inboxFile.archived_at)
                      .tz(moment.tz.guess())
                      .format('DD MMM YYYY')
                      !== moment
                        .utc(unpaginatedInboxFiles[index - 1]?.archived_at)
                        .tz(moment.tz.guess())
                        .format('DD MMM YYYY') && (
                        <div className="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
                          {moment
                            .utc(inboxFile.archived_at)
                            .tz(moment.tz.guess())
                            .format('DD MMM YYYY')
                        === moment
                          .utc()
                          .tz(moment.tz.guess())
                          .format('DD MMM YYYY') ? (
                            <span>Today</span>
                            ) : (
                              <span>
                                {moment
                                  .utc(inboxFile.archived_at)
                                  .tz(moment.tz.guess())
                                  .format('DD MMM YYYY')}
                              </span>
                            )}
                        </div>
                  )}
                  {selectedInboxTabKey === 'archived' && index === 0 && (
                    <div className="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
                      {moment
                        .utc(inboxFile.archived_at)
                        .tz(moment.tz.guess())
                        .format('DD MMM YYYY')
                      === moment
                        .utc()
                        .tz(moment.tz.guess())
                        .format('DD MMM YYYY') ? (
                          <span>Today</span>
                        ) : (
                          <span>
                            {moment
                              .utc(inboxFile.archived_at)
                              .tz(moment.tz.guess())
                              .format('DD MMM YYYY')}
                          </span>
                        )}
                    </div>
                  )}

                  <InboxFileListItem inboxFileId={inboxFile.id} index={index} />
                </div>
              ))
            ) : (
              <FullScreenMessage title="Oops, an error occurred :(" description="Please try again later." />
            )}
          </div>
        </ul>
      </div>
    </nav>
  );
}

export default InboxFileList;
