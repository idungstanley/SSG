import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../../../../app/hooks';
import { useList } from '../../../../../../features/list/listService';
import { useTags } from '../../../../../../features/workspace/tags/tagService';
import { filterConfig, operators, SPECIAL_CHAR } from '../../config/filterConfig';
import { AddNewItem } from '../AddNewItem';
import { Item } from '../FilterItem/Item';
import { useGetTeamMembers } from '../../../../../../features/settings/teamMembers/teamMemberService';
import { FilterOption } from '../../types/filters';

export function List() {
  const [showAddNewItem, setShowAddNewItem] = useState(false);
  const { filters } = useAppSelector((state) => state.task);

  const [initialFilters, setInitialFilters] = useState(filterConfig);

  const { listId } = useParams();
  const { data: tags } = useTags();
  const { data: members } = useGetTeamMembers({ query: '', page: 1 });
  const { data: list } = useList(listId);

  useEffect(() => {
    const teamMembers = members?.data.team_members;

    // set team members and tags to config
    // check if not exist to prevent duplication
    if (
      teamMembers?.length &&
      !initialFilters.assignees.values.length &&
      tags?.length &&
      !initialFilters.tags.values.length
    ) {
      setInitialFilters((prev) => ({
        ...prev,
        assignees: { ...prev.assignees, values: [...teamMembers.map((i) => ({ value: i.user.name, id: i.id }))] },
        tags: { ...prev.tags, values: [...tags.map((i) => ({ value: i.name, id: i.id }))] }
      }));
    }

    // set custom fields to config
    // check if not exist to prevent duplication
    if (
      list?.custom_fields.length &&
      !initialFilters[list.custom_fields[0].name + SPECIAL_CHAR + 'cus_' + list.custom_fields[0].id]
    ) {
      const customFields: FilterOption = {};
      list.custom_fields.forEach((field) => {
        if (field.properties) {
          const name = field.name + SPECIAL_CHAR + 'cus_' + field.id;

          customFields[name] = {
            operators: [operators.eq, operators.ne],
            values: [...field.properties]
          };
        }
      });

      setInitialFilters((prev) => ({
        ...prev,
        ...customFields
      }));
    }
  }, [members, tags, list]);

  return (
    <div className="space-y-4 w-full p-2">
      {filters.map((filter, index) => (
        <Item initialFilters={initialFilters} index={index} filter={filter} key={filter.key} />
      ))}

      {showAddNewItem ? (
        <AddNewItem initialFilters={initialFilters} onHideNewItem={() => setShowAddNewItem(false)} />
      ) : null}

      <button type="button" onClick={() => setShowAddNewItem(true)}>
        <p className="text-xs text-gray-500">+ Add filter</p>
      </button>
    </div>
  );
}
