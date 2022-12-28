import React, { ReactNode } from 'react';
import { IInboxMember } from '../../../features/inbox/inbox.interfaces';
import SelectMenuTeamMembers from '../../selectMenu';
import Columns from './DisplaySelectedData';

interface SelectAndDisplayDataProps {
  usersList: IInboxMember[];
  selectedData?: IInboxMember | null;
  columnsData?: { id: number; title: string; value: string }[] | null;
  type: string;
  title: string;
  children?: ReactNode;
  setSelectedData: (i: IInboxMember | null) => void;
}

function SelectAndDisplayData({
  usersList,
  selectedData,
  setSelectedData,
  columnsData,
  type,
  title,
  children,
}: SelectAndDisplayDataProps) {
  const users = usersList.map((i) => ({
    id: i.id,
    name: type === 'user' ? i.team_member.user.name : i.team_member_group.name,
  }));

  return (
    <>
      <SelectMenuTeamMembers
        teamMembers={users}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
        title={title}
      />
      {selectedData ? (
        <div className="border border-indigo-400 rounded-xl p-2 mt-2 font-medium">
          {columnsData ? <Columns data={columnsData} /> : null}
          {children ? (
            <div className="flex flex-col justify-between content-center text-sm mt-3 gap-3">
              {children}
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
}

export default SelectAndDisplayData;
