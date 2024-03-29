import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { useList, useTaskStatuses } from '../../../../../../features/list/listService';
import { useTags } from '../../../../../../features/workspace/tags/tagService';
import { filterConfig, operators, SPECIAL_CHAR } from '../../config/filterConfig';
import { AddNewItem } from '../AddNewItem';
import { Item } from '../FilterItem/Item';
import { useGetTeamMembers } from '../../../../../../features/settings/teamMembers/teamMemberService';
import { FilterOption, FilterWithId } from '../../types/filters';
import { setFilterFields, setFiltersUpdated } from '../../../../../../features/task/taskSlice';

export function FilterList() {
  const dispatch = useAppDispatch();
  const { listId } = useParams();

  const {
    filters: { fields: filters },
    selectedTaskParentId,
    splitSubTaskState: splitMode,
    tasks,
    subtasks
  } = useAppSelector((state) => state.task);

  const [showAddNewItem, setShowAddNewItem] = useState(false);
  const [initialFilters, setInitialFilters] = useState(filterConfig);

  const { data: tags } = useTags();
  const { data: members } = useGetTeamMembers({ query: '', page: 1 });
  const { data: list } = useList(listId);
  const taskStatuses = useTaskStatuses();

  useEffect(() => {
    const teamMembers = members?.data.team_members;
    // set team members and tags to config
    // check if not exist to prevent duplication
    if (teamMembers?.length) {
      setInitialFilters((prev) => ({
        ...prev,
        assignees: {
          ...prev.assignees,
          values: [
            ...teamMembers.map((i) => ({
              value: i.user.name,
              id: i.id,
              color: i.user.color,
              initials: i.user.initials
            }))
          ]
        }
      }));
    }
  }, [members]);

  useEffect(() => {
    if (tags?.length) {
      setInitialFilters((prev) => ({
        ...prev,
        tags: { ...prev.tags, values: [...tags.map((i) => ({ value: i.name, id: i.id, color: i.color }))] }
      }));
    }
  }, [tags]);

  useEffect(() => {
    if (taskStatuses?.length) {
      setInitialFilters((prev) => ({
        ...prev,
        status: { ...prev.status, values: [...taskStatuses.map((i) => ({ value: i.name.toLowerCase(), id: i.id }))] }
      }));
    }
  }, [taskStatuses]);

  useEffect(() => {
    // set custom fields to config
    // check if not exist to prevent duplication
    if (list?.custom_field_columns.length) {
      const customFields: FilterOption = {};
      list.custom_field_columns.forEach((field) => {
        if (field.options) {
          const name = field.name + SPECIAL_CHAR + 'cus_' + field.id;

          customFields[name] = {
            operators: [operators.eq, operators.ne],
            values: [...field.options]
          };
        }
      });

      setInitialFilters((prev) => ({
        ...prev,
        ...customFields
      }));
    }
  }, [list]);

  const returnParentFilters = (parentId: string) => {
    let currentFilters: FilterWithId[] = [];
    if (Object.keys(tasks).length && Object.keys(subtasks).length) {
      Object.keys(tasks).forEach((id) => {
        tasks[id].forEach((task) => {
          if (task.id === parentId && task.filters?.data) {
            currentFilters = task.filters.data as FilterWithId[];
          }
        });
      });
      if (!currentFilters.length) {
        Object.keys(subtasks).forEach((id) => {
          subtasks[id].forEach((sub) => {
            if (sub.id === parentId && sub.filters?.data) {
              currentFilters = sub.filters.data as FilterWithId[];
            }
          });
        });
      }
    }
    return currentFilters;
  };

  useEffect(() => {
    if (splitMode && selectedTaskParentId) {
      dispatch(setFiltersUpdated(false));
      dispatch(setFilterFields(returnParentFilters(selectedTaskParentId)));
    }
  }, [splitMode, selectedTaskParentId]);

  return (
    <div className="w-full p-2 space-y-4">
      {filters?.length
        ? filters.map((filter) => <Item initialFilters={initialFilters} filter={filter} key={filter.key} />)
        : null}

      {showAddNewItem ? (
        <AddNewItem initialFilters={initialFilters} onHideNewItem={() => setShowAddNewItem(false)} />
      ) : null}

      <button type="button" onClick={() => setShowAddNewItem(true)}>
        <p className="text-xs text-gray-500">+ Add filter</p>
      </button>
    </div>
  );
}
