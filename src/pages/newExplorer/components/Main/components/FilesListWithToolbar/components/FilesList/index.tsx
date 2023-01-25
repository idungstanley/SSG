import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../app/hooks';
import { Spinner } from '../../../../../../../../common';
import FullScreenMessage from '../../../../../../../../components/CenterMessage/FullScreenMessage';
import { useGetExplorerFiles } from '../../../../../../../../features/explorer/explorerService';
import {
  setFastPreview,
  setSelectedFileId,
  setSelectedFiles,
} from '../../../../../../../../features/explorer/explorerSlice';
import { setShowUploadModal } from '../../../../../../../../features/general/uploadFile/uploadFileSlice';
import Table from './components/Table';

export interface IStringifiedFile {
  name: string;
  created_at: string;
  updated_at: string;
  size: number;
  fileType: string;
  id: string;
}

interface FilesListProps {
  data: IStringifiedFile[];
}

export default function FilesList({ data }: FilesListProps) {
  const { folderId } = useParams();
  const dispatch = useAppDispatch();

  const { status } = useGetExplorerFiles(folderId);

  const checkbox = useRef<HTMLInputElement | null>(null);
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const { selectedFileIds, selectedFileId } = useAppSelector(
    (state) => state.explorer
  );

  const selectedIds = [...selectedFileIds, selectedFileId || ''].filter(
    (i) => i
  );

  useLayoutEffect(() => {
    const isIndeterminate =
      selectedIds.length > 0 && selectedIds.length < data?.length;

    if (
      selectedIds.length === data.length &&
      +selectedIds.length + +data.length > 0
    ) {
      setChecked(selectedIds.length === data.length);
    }
    setIndeterminate(isIndeterminate);
    if (checkbox.current) {
      checkbox.current.indeterminate = isIndeterminate;
    }

    if (!selectedIds.length && checked) {
      setChecked(false);
    }
  }, [selectedIds]);

  useEffect(() => {
    if (selectedIds.length) {
      dispatch(setSelectedFiles([]));
      setChecked(false);
    }
  }, [folderId]);

  function toggleAll() {
    if (checked || indeterminate) {
      dispatch(setSelectedFiles([]));
    } else {
      dispatch(setSelectedFiles([...data.map((i) => i.id)]));
    }

    dispatch(setSelectedFileId(null));

    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  return (
    <div className="flex flex-col h-full w-full gap-2 px-2">
      {/* file table with selection */}
      {/* status checking */}
      {status === 'loading' ? (
        <div className="mx-auto w-6 mt-10 justify-center">
          <Spinner size={8} color="#0F70B7" />
        </div>
      ) : status === 'error' ? (
        <FullScreenMessage
          title="Oops, an error occurred :("
          description="Please try again later."
        />
      ) : null}

      {/* table */}
      {status == 'success' ? (
        !data.length ? (
          <FullScreenMessage
            title="No files in your folder"
            description="Upload one to start working"
            ctaText="Upload"
            ctaOnClick={() => dispatch(setShowUploadModal(true))}
            showCta
          />
        ) : (
          <div className="flex flex-col h-full w-full">
            <Table
              checkbox={checkbox}
              checked={checked}
              toggleAll={toggleAll}
              items={data}
            />
          </div>
        )
      ) : null}
    </div>
  );
}
