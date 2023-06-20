import { useAddTag, useAssignTag, useTags } from '../../../../../features/workspace/tags/tagService';

interface AddNewTagProps {
  searchValue: string;
  setSearchValue: (i: string) => void;
  entityId: string;
  entityType: string;
}

export function SearchAndAddNewTag({ searchValue, setSearchValue, entityId, entityType }: AddNewTagProps) {
  const { data: tags } = useTags();
  const { mutate: onAssign } = useAssignTag(entityId);
  const { mutateAsync: onAdd } = useAddTag();

  // create new tag and assign on press Enter
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (tags) {
      const isIncludes = tags.find((i) => i.name.toLowerCase() === searchValue.toLowerCase().trim());

      if (!isIncludes) {
        const {
          data: { tag }
        } = await onAdd({
          name: searchValue.trim(),
          color: 'purple'
        });

        onAssign({
          tagId: tag.id,
          entityId,
          entityType
        });
      }

      // reset
      setSearchValue('');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        required
        minLength={2}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        type="text"
        className="py-1.5 w-full text-sm text-gray-900 border-0 ring-0 focus:ring-0 focus:outline-0 appearance-none"
        placeholder="Search or Create New"
      />
    </form>
  );
}
