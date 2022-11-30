/* eslint-disable implicit-arrow-linebreak */
import 'antd/dist/antd.css';
import React, { useState } from 'react';
import { Table } from 'antd';
import { useParams } from 'react-router-dom';
import { useGetInboxFiles } from '../../../../../../features/inbox/inboxService';
import { FileIcon } from '../../../../../../common';

const columns = [
  {
    title: 'Name',
    dataIndex: 'logo',
  },
  {
    title: 'Title',
    dataIndex: 'title',
  },
];

export default function TableWithSelection() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const { inboxId } = useParams();

  const { data: dataT } = useGetInboxFiles({
    inboxId,
    isArchived: 0,
  });

  const inboxFiles = [];

  dataT?.pages.flatMap((page) =>
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
  // console.log(inboxFiles);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return inboxFiles ? (
    <Table
      rowClassName="cursor-pointer"
      onRow={(record, rowIndex) => ({
        onClick: () => console.log(record, rowIndex), // click row
      })}
      rowSelection={rowSelection}
      pagination={false}
      showHeader={false}
      columns={columns}
      dataSource={inboxFiles}
    />
  ) : null;
}
