import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { useGetTeamMembers } from '../../../../../../features/settings/teamMembers/teamMemberService';
import { setFilters } from '../../../../../../features/task/taskSlice';
import { filterConfig, unitValues } from '../../config/filterConfig';
import { FilterId, FilterWithId, onChangeProps } from '../../types/filters';
import { Label } from './Label';
import { useTags } from '../../../../../../features/workspace/tags/tagService';
import { ListBox } from '../ListBox';
import { modifyFilters } from '../../lib/filterUtils';
import { DeleteItem } from './DeleteItem';

interface ItemProps {
  filter: FilterWithId;
  index: number;
}

export function Item({ filter, index }: ItemProps) {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.task);

  const [initialFilters, setInitialFilters] = useState(filterConfig);

  // set team members and tags to config
  const { data: tags } = useTags();
  const { data: members } = useGetTeamMembers({ query: '', page: 1 });

  useEffect(() => {
    const teamMembers = members?.data.team_members;

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
  }, [members, tags]);

  const { key, values, operator, id } = filter;

  const onDelete = (id: FilterId) => dispatch(setFilters(filters.filter((i) => i.id !== id)));

  const onChange = (data: onChangeProps) => {
    dispatch(setFilters(modifyFilters(data, filters)));
  };

  return (
    <div className="flex items-center w-full space-x-2">
      <Label show={index === 0} />

      {/* key */}
      <ListBox
        setSelected={(newValue) => onChange({ newValue, id, type: 'key' })}
        selected={key}
        values={Object.keys(initialFilters)}
      />

      {/* operator */}
      <ListBox
        setSelected={(newValue) => onChange({ newValue, id, type: 'operator' })}
        selected={operator}
        values={initialFilters[key].operators}
      />

      {/* values */}
      {operator.requireValues ? (
        <ListBox
          setSelected={(newValue) => onChange({ newValue, id, type: 'value' })}
          selected={values}
          values={initialFilters[key].values}
          showSearch
        />
      ) : null}

      {/* count */}
      {'count' in operator ? (
        <ListBox.Input
          initialValue={operator.count}
          onChange={(newValue) => onChange({ newValue, id, type: 'count' })}
        />
      ) : null}

      {/* unit */}
      {'unit' in operator ? (
        <ListBox
          setSelected={(newValue) => onChange({ newValue, id, type: 'unit' })}
          selected={operator.unit ?? unitValues[0]}
          values={unitValues}
        />
      ) : null}

      {/* date picker */}
      {'start' in operator && operator.start ? (
        <ListBox.Date onChange={(newValue) => onChange({ newValue, id, type: 'start' })} value={operator.start} />
      ) : null}

      <DeleteItem onClick={() => onDelete(id)} />
    </div>
  );
}
