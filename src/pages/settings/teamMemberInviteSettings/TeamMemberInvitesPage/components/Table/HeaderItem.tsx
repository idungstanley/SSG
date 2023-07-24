import React from 'react';
import RoundedArrowUpDown from '../../../../../workspace/tasks/component/views/listLevel/component/RoundedArrowUpDown';
import { cl } from '../../../../../../utils';
import {
  setSortInvite,
  setSortTeamInviteArr,
  setRemoveSortTeamInvite
} from '../../../../../../features/settings/teamMemberInvites/teamMemberInviteSlice';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import SortDirectionCheck from '../../../../../workspace/tasks/component/views/listLevel/component/SortDirectionCheck';
import { SortOption } from '../../../../../workspace/tasks/component/views/listLevel/TaskListViews';

interface valueType {
  value: string;
  index: number;
}
function HeaderItem({ value, index }: valueType) {
  const dispatch = useAppDispatch();
  const { sortTeamInviteArr, sortInvite } = useAppSelector((state) => state.teamMemberInvite);
  const { baseColor } = useAppSelector((state) => state.account);
  const handleSort = (val: string | undefined, id: string | undefined, con: string) => {
    let field: string | undefined = '';
    if (val === 'invited at') {
      field = 'invited_at';
    } else if (val === 'expires at') {
      field = 'expires_at';
    } else {
      field = val;
    }
    dispatch(setSortTeamInviteArr({ dir: con, field: field }));
    dispatch(setSortInvite([...sortInvite, val as string]));
  };

  const handleRemoveFilter = (title?: string): void => {
    dispatch(setSortInvite(sortInvite.filter((el) => el !== title)));
    dispatch(setRemoveSortTeamInvite(title));
  };

  const sortAbles: string[] = ['name', 'email', 'role', 'status', 'invited at', 'expires at'];

  const dirCheck = (col: string): SortOption | undefined => {
    const headerTxt = col === 'Assignees' ? 'assignee' : col === 'Task' ? 'name' : col.toLowerCase();
    return sortTeamInviteArr.find((el) => el.field === headerTxt);
  };
  return (
    <th
      scope="col"
      className={cl(
        index < 2 ? 'py-3.5 pl-4 pr-3  sm:pl-6' : 'px-3 py-3.5',
        'text-left text-sm text-sm font-semibold text-gray-900 font-semibold text-gray-900 group'
      )}
    >
      <div className="flex">
        {value.charAt(0).toUpperCase() + value.slice(1)}
        <div className="mx-2">
          {sortAbles.includes(value) && (
            <>
              {sortInvite.length >= 1 && sortInvite.includes(value) ? (
                ''
              ) : (
                <RoundedArrowUpDown value={value} handleSort={handleSort} />
              )}
              {sortInvite.includes(value) && sortAbles.includes(value) && (
                <SortDirectionCheck
                  bgColor={baseColor}
                  sortItemLength={sortInvite.length}
                  sortIndex={sortInvite.indexOf(value)}
                  sortValue={value}
                  sortDesc={dirCheck(value)?.dir === 'desc'}
                  handleRemoveSortFn={handleRemoveFilter}
                />
              )}
            </>
          )}
        </div>
      </div>
    </th>
  );
}

export default HeaderItem;
