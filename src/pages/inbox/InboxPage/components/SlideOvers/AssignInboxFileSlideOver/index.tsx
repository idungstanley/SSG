import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Spinner } from '../../../../../../common';
import { setAssignInboxFileSlideOverVisibility } from '../../../../../../features/general/slideOver/slideOverSlice';
import { useGetInboxes } from '../../../../../../features/inbox/inboxesService';
import {
  useAssignOrUnassignInboxFile,
  useGetInboxFileFullDetails,
} from '../../../../../../features/inbox/inboxService';
import {
  SearchInput,
  StackListWithHeader,
  SlideOver,
} from '../../../../../../components';
import InboxResultItem from './InboxResultItem';
import FullScreenMessage from '../../../../../../components/CenterMessage/FullScreenMessage';
import { useAppSelector } from '../../../../../../app/hooks';

function AssignInboxFileSlideOver() {
  const dispatch = useDispatch();

  const { showAssignInboxFileSlideOver } = useAppSelector(
    (state) => state.slideOver
  );
  const { selectedInboxFileId, currentInboxId } = useAppSelector(
    (state) => state.inbox
  );

  const [searchQuery, setSearchQuery] = useState('');

  const { status, data } = useGetInboxes();
  const inboxes = data?.data.inboxes;

  const { status: detailsStatus, data: inboxFileFullDetails } =
    useGetInboxFileFullDetails(selectedInboxFileId || null);

  const { mutate: AssignFile } =
    useAssignOrUnassignInboxFile(selectedInboxFileId);

  const filteredItems = useMemo(
    () =>
      searchQuery.length > 1
        ? inboxes?.filter(
            (inbox) =>
              inbox.name.match(new RegExp(searchQuery, 'i')) ||
              inbox.email_key.match(new RegExp(searchQuery, 'i'))
          )
        : inboxes,
    [searchQuery, inboxes]
  );

  const assignToInbox = (inboxId: string, isAssigned: boolean) => {
    AssignFile({
      isAssigned,
      inboxId,
      inboxFileId: selectedInboxFileId,
    });
  };

  return (
    <SlideOver
      show={showAssignInboxFileSlideOver}
      onClose={() => dispatch(setAssignInboxFileSlideOverVisibility(false))}
      headerTitle="Assign file to inbox"
      body={
        status === 'loading' || detailsStatus === 'loading' ? (
          <div className="mx-auto w-6 mt-10 justify-center">
            <Spinner size={8} color="#0F70B7" />
          </div>
        ) : status === 'error' || detailsStatus === 'error' ? (
          <div className=" mt-72">
            <FullScreenMessage
              title="Oops, an error occurred :("
              description="Please try again later."
            />
          </div>
        ) : inboxFileFullDetails ? (
          <div className="px-4 sm:px-6 space-y-8 sm:py-0">
            <div className="mt-5 mb-5 flex rounded-md shadow-sm">
              <SearchInput
                onChange={(value) => setSearchQuery(value)}
                value={searchQuery}
                placeholder="Search inboxes..."
              />
            </div>
            <div className="overflow-hidden flex-1 h-full mt-5">
              {filteredItems ? (
                <StackListWithHeader
                  title={<span>Inboxes</span>}
                  items={filteredItems.map((inbox) => (
                    <InboxResultItem
                      key={inbox.id}
                      inboxId={inbox.id}
                      isAssigned={inboxFileFullDetails.inbox_file_source.in_inbox_ids.includes(
                        inbox.id
                      )}
                      isDisabled={inbox.id === currentInboxId}
                      handleAssignToInbox={() => assignToInbox(inbox.id, false)}
                      handleUnassignFromInbox={() =>
                        assignToInbox(inbox.id, true)
                      }
                    />
                  ))}
                />
              ) : null}
            </div>
          </div>
        ) : null
      }
    />
  );
}

export default AssignInboxFileSlideOver;
