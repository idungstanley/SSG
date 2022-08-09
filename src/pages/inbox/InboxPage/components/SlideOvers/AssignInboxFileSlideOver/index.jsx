import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Spinner } from '../../../../../../common';
import { setAssignInboxFileSlideOverVisibility } from '../../../../../../features/general/slideOver/slideOverSlice';
import { useGetInboxes } from '../../../../../../features/inbox/inboxesService';
import { useGetInboxFileFullDetails, assignInboxFileService, unassignInboxFileService } from '../../../../../../features/inbox/inboxService';
import {
  SearchInput,
  StackListWithHeader,
  SlideOver,
} from '../../../../../../components';
import InboxResultItem from './InboxResultItem';

function AssignInboxFileSlideOver() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const showAssignInboxFileSlideOver = useSelector((state) => state.slideOver.showAssignInboxFileSlideOver);
  const selectedInboxFileId = useSelector((state) => state.inbox.selectedInboxFileId);
  const selectedInboxId = useSelector((state) => state.inbox.currentInboxId);

  const [searchInboxesQuery, setSearchInboxesQuery] = useState('');
  const [inboxesResults, setInboxesResults] = useState([]);
  const [inboxesSearchResults, setInboxesSearchResults] = useState([]);

  const [inInboxIds, setInInboxIds] = useState([]);
  const [processingInboxId, setProcessingInboxId] = useState(null);

  const { status, data } = useGetInboxes();
  const { status: fullDetailsStatus, data: inboxFileFullDetails } = useGetInboxFileFullDetails(selectedInboxFileId);

  const assignInboxFileMutation = useMutation(assignInboxFileService, {
    onMutate: (variables) => {
      setProcessingInboxId(variables.assignToInboxId);
    },
    onSuccess: (successData) => {
      setInInboxIds([...inInboxIds, ...[successData.data.copied_to_inbox_id]]);
      queryClient.invalidateQueries(['inbox_files', successData.data.copied_to_inbox_id, { isArchived: 0 }]);
    },
    onSettled: () => {
      setProcessingInboxId(null);
    },
  });

  const unassignInboxFileMutation = useMutation(unassignInboxFileService, {
    onMutate: (variables) => {
      setProcessingInboxId(variables.unassignFromInboxId);
    },
    onSuccess: (successData) => {
      setInInboxIds(inInboxIds.filter((inboxId) => inboxId !== successData.data.unassigned_inbox_file.inbox_id));
      queryClient.invalidateQueries(['inbox_files', successData.data.unassigned_inbox_file.inbox_id, { isArchived: 0 }]);
    },
    onSettled: () => {
      setProcessingInboxId(null);
    },
  });

  useEffect(() => {
    if (status === 'success') {
      setInboxesResults(data.data.inboxes);
    }
  }, [data]);

  useEffect(() => {
    if (fullDetailsStatus === 'success') {
      setInInboxIds(inboxFileFullDetails.inbox_file_source.in_inbox_ids);
    }
  }, [inboxFileFullDetails]);

  useEffect(() => {
    if (searchInboxesQuery != null) {
      setInboxesSearchResults(inboxesResults.filter((inbox) => inbox.name.match(new RegExp(searchInboxesQuery, 'i')) || inbox.email_key.match(new RegExp(searchInboxesQuery, 'i'))));
    } else {
      setInboxesSearchResults(inboxesResults);
    }
  }, [searchInboxesQuery, inboxesResults]);

  const assignToInbox = async (inboxId) => {
    assignInboxFileMutation.mutate({
      inboxFileId: selectedInboxFileId,
      assignToInboxId: inboxId,
    });
  };

  const unassignFromInbox = async (inboxId) => {
    unassignInboxFileMutation.mutate({
      inboxFileId: selectedInboxFileId,
      unassignFromInboxId: inboxId,
    });
  };

  return (
    <SlideOver
      show={showAssignInboxFileSlideOver}
      onClose={() => dispatch(setAssignInboxFileSlideOverVisibility(false))}
      headerTitle="Assign file to inbox"
      body={(
        status === 'success' && fullDetailsStatus === 'success' && inboxFileFullDetails ? (
          <div className="px-4 sm:px-6 space-y-8 sm:py-0">
            <div className="mt-5 mb-5 flex rounded-md shadow-sm">
              <SearchInput
                onChange={(value) => setSearchInboxesQuery(value)}
                value={searchInboxesQuery}
                placeholder="Search inboxes..."
              />
            </div>
            <div className="overflow-hidden flex-1 h-full mt-5">
              <StackListWithHeader
                title={<span>Inboxes</span>}
                items={(
                  inboxesSearchResults.map((inbox) => (
                    <InboxResultItem
                      key={inbox.id}
                      inboxId={inbox.id}
                      isAssigned={inInboxIds.some((inInboxId) => inInboxId === inbox.id)}
                      isDisabled={inbox.id === selectedInboxId}
                      isProcessing={inbox.id === processingInboxId}
                      handleAssignToInbox={assignToInbox}
                      handleUnassignFromInbox={unassignFromInbox}
                    />
                  ))
                )}
              />
            </div>
          </div>
        ) : (
          <div className="mx-auto w-6 mt-5 justify-center">
            <Spinner size={22} color="#0F70B7" />
          </div>
        )
      )}
    />
  );
}

export default AssignInboxFileSlideOver;
