import React from 'react';
import RoundedArrowUpDown from '../../../../../workspace/tasks/component/views/listLevel/component/RoundedArrowUpDown';
import { cl } from '../../../../../../utils';
import { useGetTeamMemberInvites } from '../../../../../../features/settings/teamMemberInvites/teamMemberInviteService';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { SetTriggerGetTeammeberInvite } from '../../../../../../features/settings/teamMemberInvites/teamMemberInviteSlice';

export default function Header() {
  const dispatch = useAppDispatch();
  const [dir, setDir] = React.useState<string | undefined>('');
  const [name, setName] = React.useState<string | undefined>('');
  const { teamMemberInvitesPaginationPage, triggerGetTeammeberInvite } = useAppSelector(
    (state) => state.teamMemberInvite
  );

  const handleNameSort = (val: string | undefined, id: string | undefined, con: string) => {
    setDir(con);
    setName(val);
    dispatch(SetTriggerGetTeammeberInvite(true));
  };

  useGetTeamMemberInvites(teamMemberInvitesPaginationPage, triggerGetTeammeberInvite, name, dir);

  const heading = ['Name', 'email', 'Role', 'Status', 'Invited at', 'Expires at'];
  return (
    <thead className="bg-gray-50">
      <tr>
        {heading.map((elem, index) => {
          return (
            <th
              key={elem}
              scope="col"
              className={cl(
                index < 2 ? 'py-3.5 pl-4 pr-3  sm:pl-6' : 'px-3 py-3.5',
                'text-left text-sm text-sm font-semibold text-gray-900 font-semibold text-gray-900 group'
              )}
            >
              <div className="flex">
                {elem}
                <div className="mx-2">
                  <RoundedArrowUpDown value={elem} handleSort={handleNameSort} />
                </div>
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
