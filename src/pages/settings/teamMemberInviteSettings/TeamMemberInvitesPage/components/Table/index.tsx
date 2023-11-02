import React from 'react';
import Header from './Header';
import Body from './Body';
import Pagination from './Pagination';
import { IInvite } from '../../../../../../features/settings/teamMemberInvites/teamMemberInvites.interface';

interface TableProps {
  data: IInvite[];
}

export default function Table({ data }: TableProps) {
  return (
    <div>
      <div className="flex flex-col">
        <div>
          <div className="inline-block min-w-full align-middle">
            <div className="shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <Header />
                <Body data={data} />
              </table>
              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
