import React, { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
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
import FullScreenMessage from '../../../../../shared/components/FullScreenMessage';

function AssignInboxFileSlideOver() {
  const dispatch = useDispatch();
  // const queryClient = useQueryClient();

  const { showAssignInboxFileSlideOver } = useSelector(
    (state) => state.slideOver,
  );
  const { selectedInboxFileId, currentInboxId } = useSelector(
    (state) => state.inbox,
  );

  const [searchQuery, setSearchQuery] = useState('');
  // const [inboxesSearchResults, setInboxesSearchResults] = useState([]);

  // const [inInboxIds, setInInboxIds] = useState([]);
  // const [processingInboxId, setProcessingInboxId] = useState(null);

  const { status, data } = useGetInboxes();
  const inboxes = data?.data.inboxes;

  const { status: detailsStatus, data: inboxFileFullDetails } = useGetInboxFileFullDetails(selectedInboxFileId);

  const { mutate: AssignFile } = useAssignOrUnassignInboxFile();

  // const assignOrUnassignMutation = useMutation(assignOrUnassignInboxFile, {
  //   onSuccess: (successData) => {
  //     queryClient.invalidateQueries(['inbox_files', successData.data.copied_to_inbox_id, { isArchived: 0 }]);
  //   },
  // });

  // const assignInboxFileMutation = useMutation(assignOrUnassignInboxFile, {
  //   // onMutate: (variables) => {
  //   //   setProcessingInboxId(variables.assignToInboxId);
  //   // },
  //   onSuccess: (successData) => {
  //     // setInInboxIds([...inInboxIds, ...[successData.data.copied_to_inbox_id]]);
  //     queryClient.invalidateQueries(['inbox_files', successData.data.copied_to_inbox_id, { isArchived: 0 }]);
  //   },
  //   // onSettled: () => {
  //   //   setProcessingInboxId(null);
  //   // },
  // });

  // const unassignInboxFileMutation = useMutation(assignOrUnassignInboxFile, {
  //   // onMutate: (variables) => {
  //   //   setProcessingInboxId(variables.unassignFromInboxId);
  //   // },
  //   onSuccess: (successData) => {
  //     // setInInboxIds(inInboxIds.filter((inboxId) => inboxId !== successData.data.unassigned_inbox_file.inbox_id));
  //     queryClient.invalidateQueries(['inbox_files', successData.data.unassigned_inbox_file.inbox_id, { isArchived: 0 }]);
  //   },
  //   // onSettled: () => {
  //   //   setProcessingInboxId(null);
  //   // },
  // });

  // useEffect(() => {
  //   if (detailsStatus === 'success') {
  //     setInInboxIds(inboxFileFullDetails.inbox_file_source.in_inbox_ids);
  //   }
  // }, [inboxFileFullDetails]);

  const filteredItems = useMemo(
    () => (searchQuery.length > 1
      ? inboxes?.filter(
        (inbox) => inbox.name.match(new RegExp(searchQuery, 'i'))
              || inbox.email_key.match(new RegExp(searchQuery, 'i')),
      )
      : inboxes),
    [searchQuery, inboxes],
  );

  // useEffect(() => {
  //   if (searchQuery != null) {
  //     setInboxesSearchResults(
  //       inboxes?.filter(
  //         (inbox) => inbox.name.match(new RegExp(searchQuery, 'i'))
  //           || inbox.email_key.match(new RegExp(searchQuery, 'i')),
  //       ),
  //     );
  //   } else {
  //     setInboxesSearchResults(inboxes);
  //   }
  // }, [searchQuery, inboxes]);

  const assignToInbox = (inboxId, isAssigned) => {
    AssignFile({
      inboxFileId: selectedInboxFileId,
      isAssigned,
      inboxId,
    });
  };

  // const unassignFromInbox = async (inboxId) => {
  //   AssignFile({
  //     inboxFileId: selectedInboxFileId,
  //     unassignFromInboxId: inboxId,
  //   });
  // };

  // const assignToInbox = async (inboxId) => {
  //   assignInboxFileMutation.mutate({
  //     inboxFileId: selectedInboxFileId,
  //     assignToInboxId: inboxId,
  //   });
  // };

  // const unassignFromInbox = async (inboxId) => {
  //   unassignInboxFileMutation.mutate({
  //     inboxFileId: selectedInboxFileId,
  //     unassignFromInboxId: inboxId,
  //   });
  // };

  return (
    <SlideOver
      show={showAssignInboxFileSlideOver}
      onClose={() => dispatch(setAssignInboxFileSlideOverVisibility(false))}
      headerTitle="Assign file to inbox"
      body={
        status === 'loading' || detailsStatus === 'loading' ? (
          <div className="mx-auto w-6 mt-10 justify-center">
            <Spinner size={22} color="#0F70B7" />
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
              <StackListWithHeader
                title={<span>Inboxes</span>}
                items={filteredItems.map((inbox) => (
                  <InboxResultItem
                    key={inbox.id}
                    inboxId={inbox.id}
                    // isAssigned={inInboxIds.some((inInboxId) => inInboxId === inbox.id)}
                    isAssigned={inboxFileFullDetails.inbox_file_source.in_inbox_ids.includes(
                      inbox.id,
                    )}
                    isDisabled={inbox.id === currentInboxId}
                    // isProcessing={inbox.id === processingInboxId}
                    handleAssignToInbox={() => assignToInbox(inbox.id, false)}
                    handleUnassignFromInbox={() => assignToInbox(inbox.id, true)}
                  />
                ))}
              />
            </div>
          </div>
        ) : null
      }
    />
  );
}

export default AssignInboxFileSlideOver;
