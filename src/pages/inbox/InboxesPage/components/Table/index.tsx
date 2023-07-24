import React from 'react';
import Header from './Header';
import Body from './Body';
import { IInbox } from '../../../../../features/inbox/inbox.interfaces';
import { inboxType } from '../../../../../types';

interface TableProps {
  data: IInbox[];
  type: inboxType;
}

function Table({ data, type }: TableProps) {
  return (
    <div className="flex-1 align-middle inline-block min-w-full border-b border-gray-200">
      <table className="min-w-full">
        <Header />
        <Body data={data} type={type} />
      </table>
    </div>
  );
}

export default Table;
