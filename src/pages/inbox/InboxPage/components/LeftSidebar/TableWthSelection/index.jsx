/* eslint-disable implicit-arrow-linebreak */
import 'antd/dist/antd.css';
import React, { useState } from 'react';
import { Table } from 'antd';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetInboxFiles,
  useMultipleArchiveOrUnArchive,
} from '../../../../../../features/inbox/inboxService';
import { FileIcon, Spinner } from '../../../../../../common';
import {
  setCurrentInboxFile,
  setShowUploadModal,
} from '../../../../../../features/inbox/inboxSlice';
import FullScreenMessage from '../../../../../shared/components/FullScreenMessage';

const columns = [
  {
    dataIndex: 'logo',
  },
  {
    title: 'File name',
    dataIndex: 'title',
  },
];

export default function TableWithSelection() {
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { mutate: multipleArchive } = useMultipleArchiveOrUnArchive();
  const { inboxId } = useParams();
  const selectedInboxTabKey = useSelector(
    (state) => state.inbox.selectedInboxTabKey,
  );
  const { data, status } = useGetInboxFiles({
    inboxId,
    isArchived: selectedInboxTabKey === 'archived' ? 1 : 0,
  });

  const inboxFiles = [];

  data?.pages.flatMap((page) =>
    page.data.inbox_files.map((i) =>
      inboxFiles.push({
        key: i.id,
        logo: (
          <FileIcon
            extensionKey={i.inbox_file_source.file_format.key}
            size={10}
          />
        ),
        title: i.inbox_file_source.display_name,
      })));

  const handleClick = (fileId, index) => {
    dispatch(
      setCurrentInboxFile({
        inboxFileId: fileId,
        inboxFileIndex: index,
      }),
    );
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: selectedRowKeys.length
      ? [
        {
          key: 'archive',
          text: `${
            selectedInboxTabKey === 'inbox' ? 'Archive' : 'Unarchive'
          } selected`,
          onSelect: () => {
            const type = selectedInboxTabKey === 'inbox' ? 'archive' : 'unarchive';
            multipleArchive({
              inboxId,
              type,
              fileIdsArr: selectedRowKeys,
            });
            setSelectedRowKeys([]);
          },
        },
      ]
      : null,
  };

  if (status === 'loading') {
    return (
      <div className="mx-auto w-6 mt-10 justify-center">
        <Spinner size={22} color="#0F70B7" />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <FullScreenMessage
        title="Oops, an error occurred :("
        description="Please try again later."
      />
    );
  }

  return !inboxFiles.length ? (
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
  ) : (
    <Table
      size="middle"
      className="bg-red-700"
      rowClassName="cursor-pointer"
      onRow={(record, rowIndex) => ({
        onClick: () => handleClick(record.key, rowIndex),
      })}
      rowSelection={rowSelection}
      pagination={false}
      columns={columns}
      dataSource={inboxFiles}
    />
  );
}
