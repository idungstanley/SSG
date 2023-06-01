import { List } from '../activetree.interfaces';

export default function UpdateList(
  existingTree: List[],
  updateFn: (i: List) => List,
  idToUpdate?: string | null
): List[] {
  return existingTree.map((list) => {
    if (list.id === idToUpdate) {
      return updateFn(list);
    } else if (list.children) {
      return {
        ...list,
        children: UpdateList(list.children, updateFn, idToUpdate)
      };
    }

    return list;
  });
}
